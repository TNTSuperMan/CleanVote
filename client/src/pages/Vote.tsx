import "./Vote.scss"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UncoolTurnstile } from "../components/Turnstile";

type BulletBoxData = {
  title: string,
  description: string,
  options: string[]
}

export const Vote = () => {
  const { token } = useParams();
  const [tstoken, setTsToken] = useState<string>();
  const [data, setData] = useState<BulletBoxData>();
  const [err, setErr] = useState("");

  useEffect(()=>{
    setErr("");
    if(!tstoken) return;
    fetch(new URL("/data",import.meta.env.VITE_API_KEY), {
      method: "POST",
      body: JSON.stringify({
        ts: tstoken, token
      })
    })
    .then(e=>new Promise<[number,string]>(res=>e.text().then(t=>res([e.status,t]))))
    .then(e=>{
      if(e[0] !== 200){
        setErr("情報の取得に失敗しました: " + e[1]);
      }else{
        try{
          const raw = JSON.parse(e[1]) as {
            title: string, description: string, options: string
          };
          setData({
            title: raw.title,
            description: raw.description,
            options: JSON.parse(raw.options)
          })
        }catch{
          setErr("JSONの解析に失敗しました");
        }
      }
    })
  },[token, tstoken])

  return <div className="vote">
    <h1>投票{data ? `: ${data.title}` : null}</h1>
    {err ? <div className="error">{err}</div> : null}
    {!data ? <UncoolTurnstile onVerify={setTsToken}/> : <>
     説明:
     <pre>{data?.description}</pre>
     {data.options.map(e=><span className="option">{e}</span>)}
    </>}
  </div>
}

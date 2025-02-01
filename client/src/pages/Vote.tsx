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
  const [active, select] = useState(-1);
  const [isSubmitting, setSubState] = useState(false);

  useEffect(()=>{
    setErr("");
    if(!tstoken) return;
    fetch(new URL("/data",import.meta.env.VITE_API_KEY), {
      method: "POST",
      body: token
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

  const submit = () => {
    if(localStorage.getItem(token??"")){
      setErr("あなたは既に投票しています。");
      return;
    }
    setSubState(true)
    fetch(new URL("/vote",import.meta.env.VITE_API_KEY),{
      method: "POST",
      body: JSON.stringify({
        ts: tstoken,
        token,
        option: active
      })
    }).then(e=>new Promise<[number,string]>(res=>e.text().then(t=>res([e.status,t]))))
    .then(e=>{
      if(e[0] !== 200){
        setErr(e[1])
      }else{
        localStorage.setItem(token??"", "voted")
        alert("Submitted!")
      }
    })
    .finally(()=>setSubState(false))
  }

  return <div className="vote">
    <h1>投票{data ? `: ${data.title}` : null}</h1>
    {err ? <div className="error">{err}</div> : null}
     説明:
     <pre>{data?.description}</pre>
     {data?.options.map((e,i)=>
      <span key={i} className={"option"+(active==i?" active":"")}
        onClick={()=>select(i)}>
        {e}
      </span>)}<br/>
    <UncoolTurnstile onVerify={setTsToken}/>
    <button className="button" onClick={isSubmitting?()=>{}:submit}>
      {isSubmitting ? "送信中..." : "送信"}
    </button>
  </div>
}

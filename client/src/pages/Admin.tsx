import "./Admin.scss"
import { useState } from "react";
import { useParams } from "react-router-dom"
import { UncoolTurnstile } from "../components/Turnstile";

export const Admin = () => {
 const median = (array: number[]) => {
   const sorted = array.toSorted((a, b) => a - b)
   const ci = sorted.length / 2
   if (Number.isInteger(ci)) {
     const a = sorted[ci - 1]
     const b = sorted[ci]
     const val = (a + b) / 2;
     return isNaN(val) ? 0 : val;
   } else {
     return sorted[Math.floor(ci)]
   };
 }

  const { token } = useParams();
  const [ts, setTs] = useState<string>();
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [isSending, setSending] = useState(false);
  const [ip_o_max, SetIPOMax] = useState(Infinity);

  const [vdata, setVData] = useState<{
    meta: { title: string, options: string[] },
    votes: number[][],
    raw: { option: number, count: number }[]
  }>();

  const send = () => {
    setErr("");
    if(!ts) setErr("Turnstileの認証をしてください");
    setSending(true);
    fetch(new URL("/admin", import.meta.env.VITE_API_KEY),{
      method: "POST",
      body: JSON.stringify({token, ts, pass})
    }).then(e=>new Promise<[number,string]>(res=>e.text().then(t=>res([e.status,t]))))
    .then(e=>{
      if(e[0] !== 200){
        setErr("エラー: " + e[1]);
      }else{
        try{
          const raw = JSON.parse(e[1]) as {
            data: {title: string, options: string},
            votes: { option: number, count: number }[]
          }
          const options: string[] = JSON.parse(raw.data.options)
          const vbo: number[][] = options.map(()=>[]);
          raw.votes.forEach(e=>
            vbo[e.option]=[...(vbo[e.option]??[]),e.count])
          setVData({
            meta: {
              title: raw.data.title,
              options
            },
            votes: vbo,
            raw: raw.votes
          })
        }catch(e){
          console.log(e)
          setErr("レスポンスJSONの解析に失敗しました")
        }
      }
    }).finally(()=>setSending(false))
  }
  return <div className="admin">
    {!vdata ? <>
      <h1>ログイン</h1>
      {err ? <div className="error">{err}</div> : null}
      <label>パスワード:<input type="password" value={pass} onChange={e=>setPass(e.target.value)}/></label>
      <UncoolTurnstile onVerify={setTs}/>
      <button onClick={isSending?()=>{}:send}>{isSending?"送信中":"送信"}</button>
    </> : <>
      <h1>管理画面: {vdata.meta.title}</h1>
      <label>IPごとの一つの選択肢への最大票数:
        <input type="number" value={ip_o_max} onChange={e=>SetIPOMax(e.target.valueAsNumber)} />
        <input type="range" value={ip_o_max} onChange={e=>SetIPOMax(e.target.valueAsNumber)}/>
      </label>
      <table>
        <thead>
          <tr>
            <th>選択肢</th>
            <th>総投票数</th>
            <th title="IPアドレスごとの投票数の平均">平均</th>
            <th title="IPアドレスごとの投票数の中央値">中央値</th>
            <th title="上の最大票数の制限後の総投票数">制限後の総投票数</th>
            <th title="上の最大票数の制限後のIPアドレスごとの投票数の平均">制限後の平均</th>
            <th title="上の最大票数の制限後のIPアドレスごとの投票数の中央値">制限後の中央値</th>
          </tr>
        </thead>
        <tbody>
          {vdata.meta.options.map((e,i)=>{
            const vd = vdata.votes[i];
            return(<tr key={i}>
              <td>{e}</td>

              <td>{vd.reduce((v,e)=>v+e,0)}</td>
              <td>{!vd.length ? 0 :
                vd.reduce((v,e)=>v+e,0)/vd.length}</td>
              <td>{median(vd)}</td>

              <td>{vd.reduce((v,e)=>v+Math.min(ip_o_max,e),0)}</td>
              <td>{!vd.length ? 0 :
                vd.reduce((v,e)=>v+Math.min(ip_o_max,e),0)/vd.length}</td>
              <td>{median(vd.map(e=>Math.min(ip_o_max,e)))}</td>
            </tr>
          )})}
        </tbody>
        <tfoot>
          <tr>
            <td>全て</td>

            <td>{vdata.raw.reduce((v,e)=>v+e.count,0)}</td>
            <td>{!vdata.raw.length ? 0 :
              vdata.raw.reduce((v,e)=>v+e.count,0)/vdata.raw.length}</td>
            <td>{median(vdata.raw.map(e=>e.count))}</td>

            <td>{vdata.raw.reduce((v,e)=>v+Math.min(ip_o_max,e.count),0)}</td>
            <td>{!vdata.raw.length ? 0 :
              vdata.raw.reduce((v,e)=>v+Math.min(ip_o_max,e.count),0)/vdata.raw.length}</td>
            <td>{median(vdata.raw.map(e=>Math.min(ip_o_max,e.count)))}</td>
          </tr>
        </tfoot>
      </table>
    </>}
  </div>
}

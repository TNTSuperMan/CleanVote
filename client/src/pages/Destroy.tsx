import "./Destroy.scss"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UncoolTurnstile } from "../components/Turnstile";
import { tsheadid } from "../auth";

export const Destroy = () => {
  const { token } = useParams();
  const navigate = useNavigate()
  const [pass, setPass] = useState("");
  const [ts, setTs] = useState<string|void>();
  const [err, setErr] = useState("");
  const [isSending, changeSend] = useState(false);

  const send = () => {
    if(!ts){
      setErr("Turnstileの認証をしてください");
      return;
    }
    setErr("");
    changeSend(true);
    fetch(new URL("/destroy", import.meta.env.VITE_API_KEY), {
      method: "POST",
      headers: {
        [tsheadid]: ts
      },
      body: JSON.stringify({token, pass})
    }).then<string | void>(e=>e.status === 200 ? undefined : e.text())
    .then(e=>{
      if(e !== undefined){
        setErr(e);
      }else{
        alert("成功しました。ホームにリダイレクトします。");
        navigate("/");
      }
    }).finally(()=>changeSend(false))
  }

  return <div className="destroy">
    <h1>削除フォーム</h1>
    {err ? <div className="error">{err}</div> : null}
    <label>もう一度パスワードを入力してください: 
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)}/>
    </label><br/>
    <UncoolTurnstile onVerify={setTs}/>
    <button className="button" onClick={send}>{isSending ? "送信中" : "送信"}</button>
  </div>
}

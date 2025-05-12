import './SubscribeForm.scss';
import { useState } from "react";
import { UncoolTurnstile } from "./Turnstile";
import { Limitter } from './Limitter';
import { tsheadid } from '../auth';

export const SubscribeForm = ({onSubmit}: {onSubmit: (e: {pass: string, token: string}) => void}) => {
  const [token, setToken] = useState<string|undefined>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const [isSending, setSending] = useState(false);
  const [error, setError] = useState("");

  const send = () => {
    if(!token){
      setError("Turnstileの認証をしてください");
    }else if(title.length > 256){
      setError("タイトルが長すぎます。");
    }else if(description.length > 688){
      setError("説明が長すぎます。");
    }else{
      if(options.some(e=>e.length > 256)){
        setError("選択肢が長すぎます")
      }else{
        setError(""); setSending(true);
        fetch(new URL("/subscribe",import.meta.env.VITE_API_KEY), {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            [tsheadid]: token
          },
          body: JSON.stringify({title, description, options})
        }).then(e=>new Promise<[number, string]>(res=>e.text().then(t=>res([e.status, t]))))
        .then(e=>{
          if(e[0] == 400){
            setError(e[1]);
          }else if(e[0] == 500){
            setError("サーバーエラー: " + e[1])
          }else{
            try{
              const json = JSON.parse(e[1]);
              if(typeof json != "object" ||
                typeof json.pass != "string" ||
                typeof json.token != "string")
                throw new TypeError("Response type not conforming");
              onSubmit(json);
            }catch{
              setError("レスポンスの読込に失敗しました。");
            }
          }
        }).finally(()=>setSending(false));
      }
    }
  }

  return <div className="subscribe">
    <h1>登録フォーム</h1>
    {error ? <div className="err">{error}</div> : <></>}

    <table>
      <tbody>
        <tr>
          <td>タイトル</td>
          <td><Limitter len={title.length} max={256}/></td>
          <td><input type="text" value={title} onChange={e=>setTitle(e.target.value)} /><br/></td>
        </tr>
        <tr>
          <td>説明</td>
          <td><Limitter len={description.length} max={688}/></td>
        </tr>
      </tbody>
    </table>
    <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="説明を入力" />
    
    選択肢
    <ul>
      {options.map((e,i)=><li key={i}>
        <button onClick={()=>setOptions(options.toSpliced(i, 1))}>X</button>
        <Limitter len={e.length} max={256}/>
        <input type="text" value={e} onChange={e=>{
          const optionsCopy = options.map(e=>e);
          optionsCopy[i] = e.target.value;
          setOptions(optionsCopy);
        }} />
      </li>)}
      <li>
        <button onClick={()=>{
          if(options.length >= 32){
            setError("選択肢が多すぎます。");
            setTimeout(()=>setError(""), 1000)
          }else{
            setOptions([...options, ""]);
          }
        }}>+</button>
      </li>
    </ul>
    <UncoolTurnstile onVerify={setToken}/>
    登録した場合<a href="/tos" target="_blank">利用規約等</a>に同意したものとします。<br/>
    <button className='button' onClick={isSending ? ()=>{} : send}>
      {isSending ? "送信中..." : "送信"}
    </button>
  </div>
}

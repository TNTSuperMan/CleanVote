import './Subscribe.scss';
import { useEffect, useRef, useState } from "react";
import { UncoolTurnstile } from "../components/Turnstile";
import { Link } from 'react-router-dom';

export const Subscribe = () => {
    const [token, setToken] = useState<string|undefined>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const {current: encoder} = useRef(new TextEncoder);
    const [titlelen, setTitlelen] = useState(0);
    useEffect(()=>{
        setTitlelen(encoder.encode(title).length);
    },[title, encoder])
    const [desclen, setDesclen] = useState(0);
    useEffect(()=>{
        setDesclen(encoder.encode(description).length);
    },[description, encoder])

    const send = () => {
        if(!token){
            setError("CAPCHAに失敗しました。");
        }else if(titlelen > 256){
            setError("タイトルが長すぎます。");
        }else if(desclen > 1024){
            setError("説明が長すぎます。");
        }else{
            setError("");
            fetch(new URL("/subscribe",import.meta.env.VITE_API_KEY), {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, description, token}),
                cache: "no-cache"
            }).then(e=>new Promise<[number, string]>(res=>e.text().then(t=>res([e.status, t]))))
            .then(e=>{
                if(e[0] == 400){
                    setError("サーバーエラー：" + e[1]);
                }else{
                    //TODO:成功コード
                }
            })
        }
    }

    return <div className="subscribe">
        <h1>登録フォーム</h1>
        <Link to="/">戻る</Link><br/>
        {error ? <div className="err">{error}</div> : <></>}

        タイトル(<span style={{
            color: titlelen > 256 ? "red" : "black"
        }}>長さ：{titlelen.toString()}b / 256b</span>)：
        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} /><br></br>

        説明(<span style={{
            color: desclen > 1024 ? "red" : "black"
        }}>長さ：{desclen.toString()}b / 1024b</span>)<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="説明を入力" />
        
        <UncoolTurnstile onVerify={setToken}/>
        <button onClick={send}>送信</button>
    </div>
}
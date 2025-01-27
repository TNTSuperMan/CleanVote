import './Subscribe.scss';
import { useEffect, useRef, useState } from "react";
import { UncoolTurnstile } from "../components/Turnstile";

export const Subscribe = () => {
    const [token, setToken] = useState<string|undefined>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const send = () => {
        if(!token){
            setError("CAPCHAに失敗しました。");
        }else if(title.length > 256){
            setError("タイトルが長すぎます。");
        }else if(description.length > 1024){
            setError("説明が長すぎます。");
        }else{
            setError("");        
            fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, description, token})
            })
        }
    }
    const {current: encoder} = useRef(new TextEncoder);
    const [titlelen, setTitlelen] = useState(0);
    useEffect(()=>{
        setTitlelen(encoder.encode(title).length);
    },[title, encoder])
    const [desclen, setDesclen] = useState(0);
    useEffect(()=>{
        setDesclen(encoder.encode(description).length);
    },[description, encoder])

    return <div className="subscribe">
        <h1>登録フォーム</h1>
        {error ? <div className="err"></div> : <></>}
        タイトル(長さ：{titlelen.toString()}b / 256b)：<input type="text" value={title} onChange={e=>setTitle(e.target.value)} /><br></br>
        説明(長さ：{desclen.toString()}b / 1024b)<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="説明を入力" />
        <UncoolTurnstile onVerify={setToken}/>
        <button onClick={send}>送信</button>
    </div>
}
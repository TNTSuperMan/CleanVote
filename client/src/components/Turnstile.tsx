import { useEffect, useState } from "react";
import "./Turnstile.scss"
import ReactTurnstile from 'react-turnstile';

export const UncoolTurnstile = ({onVerify}: {onVerify: (token?: string) => void}) => {
  const [token, setToken] = useState<string | undefined>();
  const [isSupported, setIsSupported] = useState<boolean>(true);
  useEffect(()=>{
    onVerify(token);
  },[token, onVerify]);
  return <>{isSupported ? <div className="ts-container">
    <h2>{token ?
      <>あなたは人間<br/>です！！！！！</> :
      <>今すぐあなたが<br/>ロボットでは<br/>ないことを証明<br/>しましょう！！！</>}</h2>
    <div className="ts-main">
      <ReactTurnstile
        sitekey={import.meta.env.VITE_TURNSTILE_KEY}
        onVerify={setToken}
        onTimeout={()=>setToken(undefined)}
        onUnsupported={()=>setIsSupported(false)}/>
    </div>
  </div> : "CAPCHAに失敗したため投票できません。"}</>
}

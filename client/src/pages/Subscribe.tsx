import { useState } from "react"
import { SubscribeForm } from "../components/SubscribeForm";
import { Subscribed } from "../components/Subscribed";

export const Subscribe = () => {
    const [bulletBoxData, setBB] = useState<void | {
        pass: string,
        token: string
    }>();
    return <>{
        bulletBoxData ? <Subscribed
            pass={bulletBoxData.pass}
            token={bulletBoxData.token} /> :
        <SubscribeForm onSubmit={setBB}/>
    }</>
}
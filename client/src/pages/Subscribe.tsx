import { useState } from "react"
import { SubscribeForm } from "./SubscribeForm";

export const Subscribe = () => {
    const [bulletBoxData, setBB] = useState<void | {
        pass: string,
        token: string
    }>();
    return <>{
        bulletBoxData ? "" : <SubscribeForm onSubmit={setBB}/>
    }</>
}
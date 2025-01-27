import { UncoolTurnstile } from "../components/Turnstile";

export const Subscribe = () => <div className="subscribe">
    <UncoolTurnstile onVerify={console.log}/>
</div>
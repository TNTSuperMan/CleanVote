import './Home.scss'
import { UncoolTurnstile } from '../components/Turnstile'

export const Home = () => <>
  <UncoolTurnstile onVerify={console.log}/>
</>
import './Home.scss'
import { Turnstile } from '../components/Turnstile'

export const Home = () => <>
  <Turnstile onVerify={console.log}/>
</>
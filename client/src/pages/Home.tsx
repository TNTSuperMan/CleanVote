import './App.scss'
import { Turnstile } from '../components/Turnstile'

export const Home = () => <>
  <Turnstile onVerify={console.log}/>
</>
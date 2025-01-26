import './App.css'
import { Turnstile } from './components/Turnstile'

function App() {
  return (
    <>
      <Turnstile onVerify={console.log}/>
    </>
  )
}

export default App

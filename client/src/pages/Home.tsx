import { Link } from 'react-router-dom'
import './Home.scss'

export const Home = () => <div className="home">
  <h1>CleanVote</h1>
  <p>荒らし対策を施したりした投票アプリです！</p>
  <p>大量投票防止のためCloudflare Turnstileを使用しています。</p>
  <Link to="/subscribe">投票を始める</Link>
  <h2>Cloudflare Turnstileとは？</h2>
  <p>Turnstileとは、Cloudflareが作ったボット判定のプログラムです。(俗にいうCAPCHA)</p>
  <h2>Cloudflare Turnstileのメリット</h2>
  <ul><li>無料</li><li>信頼できる</li><li>広告の最適化に悪用されない</li></ul>
</div>

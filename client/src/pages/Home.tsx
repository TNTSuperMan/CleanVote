import './Home.scss'

export const Home = () => <div className="home">
  <h1>CleanVote</h1>
  <p>荒らし対策を施したりした投票アプリです！</p>
  <p>大量投票防止のためCloudflare Turnstileを使用しています。</p>
  <h2>Cloudflare Turnstileとは？</h2>
  <p>Turnstileとは、Cloudflareが作ったボット判定のプログラムです。(俗にいうCAPCHA)</p>
  <h2>Cloudflare Turnstileのメリット</h2>
  <ul><li>無料</li><li>信頼できる</li></ul>
</div>

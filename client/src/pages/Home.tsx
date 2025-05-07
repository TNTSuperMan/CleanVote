import { Link } from 'react-router-dom'
import Icon from '../assets/CleanVote.png'
import './Home.scss'

export const Home = () => <div className="home">
  <div className="title">
    <img src={Icon} alt="" width="100" height="100" />
    <h1>CleanVote</h1>
  </div>
  <p>荒らし対策を施した投票アプリです！</p>
  <Link className="button" to="/subscribe">投票を始める</Link>
  <div className="widget" style={{margin:"20px 0 0 0"}}>
    <div>
      <h2>Cloudflare Turnstile</h2>
    </div>
    <div>
      Cloudflare Turnstileとは、CAPTCHAに変わるボット検証ツールです。
      これは時間を浪費することなく、労力をかける必要もありません。
      また、広告のためにデータを収集することはありません。
    </div>
  </div>
  <div className="widget">
    <div>
      <h2>疑似キュー</h2>
    </div>
    <div>
      投票データはIPアドレスと投票先と選択肢によって選別されて
      疑似的にキューにプッシュします。これにより
      同一IPアドレス・同一選択肢に対する攻撃を吸収することが可能で、
      なおかつ同一IPアドレスでの別人の投票も可能になっています。
    </div>
  </div>
  <div className="widget">
    <div>
      <h2>攻撃に強い</h2>
    </div>
    <div>
      CloudflareのサービスはDDos攻撃に対して強く、
      ユーザーは快適な投票体験を得ることができます。
    </div>
  </div>
  <footer>
    <a href="https://github.com/TNTSuperMan/CleanVote">公式GitHub</a>
    <Link to="/tos">利用規約・プライバシーポリシー</Link>
    <Link to="/qa">Q&A</Link>
  </footer>
</div>

export const Tos = () => {
  return <div className="about">
    <h1>利用規約</h1>
    <h2>0.定義</h2>
    <table border={1}>
      <thead>
        <tr><th>名称</th><th>内容</th></tr>
      </thead>
      <tbody>
        <tr><td>当サービス</td><td>CleanVoteのサービス</td></tr>
        <tr><td>当サーバー</td><td>CleanVoteを運営するのに使われているサーバー</td></tr>
        <tr><td>運営者</td><td>CleanVoteを運営している人</td></tr>
      </tbody>
    </table>
    <h2>1.適用</h2>
    本規約はユーザーと当サービスとの一切の関係に適用されるものとします。<br/>
    また、本規約の解釈にあたっては日本法を準拠法とします。
    <h2>2.禁止事項</h2>
    当サービスの機能を用いて以下のような行為はしてはなりません。
    <ol>
      <li>法律に違反する行為</li>
      <li>公序良俗に反する行為</li>
      <li>個人を中傷する行為</li>
      <li>当サービスを妨害する行為</li>
      <li>著作権を侵害する行為</li>
      <li>当サービスの機能を障害する行為</li>
      <li>当サーバーを破壊・妨害をする行為</li>
      <li>当サーバーへ不正アクセスをし、またはこれを試みる行為</li>
      <li>AIの学習に使う行為</li>
      <li>その他、運営者が不適切と判断した行為</li>
    </ol>
    以下のような行為を運営者が発見した場合、当サービスは予告なくその情報の消去、アクセスのブロック等をできます。
    <h2>3.変更</h2>
    運営者はユーザーの同意に関わらず自由に規約等を変更できます。
    
    <h1>プライバシーポリシー</h1>
    <br/>
    当サイトでは票の送信・登録時に以下の情報を収集します。
    <ul>
        <li>入力・送信した情報</li>
        <li>グローバルIPアドレス</li>
        <li><a target="_blank" href="https://www.cloudflare.com/ja-jp/application-services/products/turnstile/">Cloudflare Turnstile</a>を通してユーザーがボットであるかを判定するための情報</li>
    </ul>
    そのうち以下の情報は当サーバーのデータベースに保存します。
    <ul>
        <li>入力・送信した情報</li>
        <li>グローバルIPアドレス</li>
    </ul>
    使用方法については、以下になります。
    <table border={1}>
      <thead>
        <tr><th>情報</th><th>目的</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>登録フォームに入力した情報</td>
          <td>URLを通じて投票者にタイトル・説明・選択肢を表示・投票させるため</td>
        </tr>
        <tr>
          <td>投票フォームに入力した情報</td>
          <td>投票を開始した人に、何が投票されているかを見せるため。<br/>
            IPアドレス・選択肢ごとにグルーピングされて保存されて<br/>
            表示されますが、IPアドレスが伝わることはありません。</td>
        </tr>
        <tr>
          <td>グローバルIPアドレス</td>
          <td>個人の大量投票の対策のため
            (<a target="_blank" href="https://github.com/TNTSuperMan/CleanVote/wiki/%E8%8D%92%E3%82%89%E3%81%97%E5%AF%BE%E7%AD%96%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6">詳細</a>)と、<br/>
            IPBAN・法的処置のため
          </td>
        </tr>
      </tbody>
    </table>
  </div>
}

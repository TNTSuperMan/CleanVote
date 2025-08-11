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
        <tr><td>ユーザー</td><td>当サービスに情報を送信した者</td></tr>
      </tbody>
    </table>
    <h2>1.適用</h2>
    本規約は当サービスへの情報の送信をもって、ユーザーと当サービスとの一切の関係に適用されるものとします。<br/>
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
      <li>Cloudflareによるセキュリティ処理の回避・妨害をする行為</li>
      <li>その他、運営者が不適切と判断した行為</li>
    </ol>
    以下のような行為を運営者が発見した場合、当サービスは予告なくその情報の消去、アクセスのブロック等をできます。
    <h2>3.技術的介入の免責</h2>
    当サーバーはCloudflareのサービスを利用しており、<br/>
    セキュリティおよびパフォーマンス向上等のため、以下の技術的介入が自動的に行われる場合があります:
    <ul>
      <li>脅威となる通信に対して以下をする</li>
      <li><ul>
        <li>チャレンジページの提示</li>
        <li>通信の傍受</li>
        <li>通信の破棄</li>
        <li>リダイレクト</li>
        <li>その他同様の措置</li>
      </ul></li>
      <li>ロボットではないことが証明された際、ユーザーを追跡するCookieの追加</li>
      <li>追加のパフォーマンス追跡のための、当サービスへのスクリプトの追加</li>
      <li>当サービスへのファイアウォールルールの追加</li>
      <li>パフォーマンス・セキュリティ・分析機能を向上させるため、その他の変更の追加</li>
    </ul>
    詳細は、<a href="https://www.cloudflare.com/terms/">Cloudflare</a>をご参照ください。<br/>
    運営者は、これらのような技術的介入に起因する不具合・制限などについて責任を負いません。
    <h3>4.連絡</h3>
    もし規約や処置について不満がある場合、下記メールアドレスへご連絡ください。
    <a href="mailto:tnt-super-man@outlook.com">tnt-super-man@outlook.com</a>
    <h3>5.変更</h3>
    運営者はユーザーの同意に関わらず自由に規約等を変更できます。<br/>
    最終変更: 2025年8月11日<br/>
    プルリクエスト: <a href="https://github.com/TNTSuperMan/CleanVote/pull/23">#23</a>
    
    <h1>プライバシーポリシー</h1>
    <br/>
    当サイトでは票の送信・登録時に以下の情報を収集します。
    <ul>
        <li>入力・送信した情報</li>
        <li>グローバルIPアドレス</li>
        <li><a target="_blank" href="https://www.cloudflare.com/ja-jp/application-services/products/turnstile/">Cloudflare Turnstile</a>を通してユーザーがボットであるかを判定するための情報</li>
        <li>上記、利用規約3で収集すると記述した情報</li>
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
          <td>URLを通じて投票者に投票に関する説明を表示し、投票させるため・<br/>
            運営者が違反や傾向を確認するため</td>
        </tr>
        <tr>
          <td>投票フォームに入力した情報</td>
          <td>投票を開始した人に、何が投票されているかを見せるため。<br/>
            IPアドレス・選択肢ごとにグルーピングされますが、<br/>
            外部にIPアドレスが伝わることはありません。</td>
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

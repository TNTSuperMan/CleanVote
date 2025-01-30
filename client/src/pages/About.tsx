export const About = () => {
    return <div className="about">
        <h2>利用規約(簡易)</h2>
        <ul>
            <li>サービスは突然終了する可能性があります。</li>
            <li>投票データ等は予告なく消滅させることがあります。</li>
            <li>全ては自己責任で行ってください。</li>
            <li>公序良俗に反する情報を送信した場合、その情報の削除や、IPアドレスブロック等を行います。</li>
        </ul>
        
        追加で、<a href="https://www.cloudflare.com/ja-jp/website-terms/">Cloudflare Turnstileの利用規約</a>もご参照ください。
        <h2>プライバシーポリシー</h2>
        これはCloudflare Turnstileによるボット判定を行っています。そのプライバシーポリシーについては以下をご参照ください。<br/>
        <a href="https://www.cloudflare.com/ja-jp/privacypolicy/">Cloudflare&#x27;s Privacy Policy | Cloudflare</a>
        <br/>
        当サイトでは票の送信・登録時に以下の情報を収集します。
        <ul>
            <li>あなたが入力した情報</li>
            <li>グローバルIPアドレス</li>
            <li>Cloudflare Turnstileの認証情報</li>
        </ul>
    </div>
}
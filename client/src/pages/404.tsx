import "./404.scss"

export const NotFound = () => {
    return <div className="notfound">
        <h2>404 Not Found</h2>
        <small>これはReact Router上で存在しないルートに対する意図的なメッセージであり、HTTPレスポンスステータスコードとは無関係で、実際のHTTPレスポンスステータスコードは200です。メタすぎますか？</small>
    </div>
}

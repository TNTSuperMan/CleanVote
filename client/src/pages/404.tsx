import "./404.scss"

export const NotFound = () => {
    return <div className="notfound">
        <h2>404 Not Found</h2>
        <small>しかし実際のHTTPステータス上では200であり、これはReact Router上で存在しないルートに対するHTTPステータスとは無関係で意図的なメッセージです。メタすぎますか？</small>
    </div>
}

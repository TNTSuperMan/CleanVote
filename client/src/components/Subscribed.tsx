import "./Subscribed.scss"
import { Link } from "react-router-dom"

export const Subscribed = ({pass, token}: {pass: string, token: string}) => {
    return <div className="subscribed">
        投票枠の登録に完了しました。パスワードは以下で、変更不可能です。確実に記録してください。<br/>
        <input value={pass} readOnly/><br/>
        <Link to={`/admin/${token}`} className="button">管理画面</Link>
    </div>
}
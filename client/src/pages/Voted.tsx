import { Link } from "react-router-dom"

export const Voted = () => {
  return <>
    <h2>投票が完了しました。</h2>
    <Link to="/" className="button">ホーム</Link>
  </>
}

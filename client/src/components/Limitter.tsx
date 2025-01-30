import "./Limitter.scss"
export const Limitter = ({len, max}: {len: number, max: number}) => {
    return <span className={
        "limitter "+(len > max ? "over" : "")
    }>{len.toString()}b / {max.toString()}b</span>
}

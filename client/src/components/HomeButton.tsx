import { Link, useLocation } from "react-router-dom";

export const HomeButton = () => {
  const { pathname } = useLocation();
  return pathname=="/" ? null :
    <Link to="/" className='button'>ホーム</Link>
}

import {Navigate, useLocation} from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const AuthRoute = ({ children }) => {
    const location = useLocation()  //we want to redirect an unauthenticate user to the login page we want to set the return url. when login is finished come back to the current page. after login in checkout then comeback to checkout page
    const { user } = useAuth(); //to verify user is login or not

  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  )
}

export default AuthRoute
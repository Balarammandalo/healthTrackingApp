import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Protect = ({ children }) => {

  const isLoggedIn = Cookies.get("token");
  console.log(Cookies.get("token"))
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protect;
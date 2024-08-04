import { useContext, createContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoutPage } from "../components/Login/LogoutPage";
import { URL_SERVER_LOGIN } from "../store/CONSTANT";
import { LOGIN_PAGE, WELCOME_PAGE } from "../store/ComponentName";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // debugger;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("image") || ""
  );
  const navigate = useNavigate();
  const loginAction = async (data) => {
    console.log(data);

    return await fetch(URL_SERVER_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status != "200") throw new Error(res);
        if (
          res == null ||
          res.length == 0 ||
          res == "undefined" ||
          (res instanceof Object &&
            (res.message == "Invalid credentials" ||
              res.message == "Authentication Problem"))
        )
          throw new Error(res.message);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setUserSessionData(res);
        navigate(WELCOME_PAGE);
        return;
      })
      .catch((error) => console.error(error));
  };
  const setUserSessionData = (res) => {
    try {
      //check for token size to thow error in case not token
      console.log("token length : " + res.token.length);
      setUser(res);
      setToken(res.refreshToken);
      localStorage.setItem("site", res.token);
      localStorage.setItem("image", res.image);
      setProfileImg(res.image);
    } catch (err) {
      throw err;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("image");
    navigate(LOGIN_PAGE);
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {token != "" && <LogoutPage imgUrl={profileImg} logOut={logOut} />}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

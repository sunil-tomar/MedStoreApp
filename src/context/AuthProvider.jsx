import { useContext, createContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    console.log(data);

    // const fetchCall = await fetch("https://dummyjson1.com/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    return await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        debugger;
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
        navigate("/");
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
    } catch (err) {
      throw err;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("image");
    navigate("/login");
  };
  const getUserImage = () => {
    console.log("image path : " + localStorage.getItem("image"));
    return localStorage.getItem("image");
  };
  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      <div>
        <span>
          <img
            src={getUserImage()}
            alt="User Image"
            style={{ height: "8rem", width: "8rem", float: "left" }}
          />
        </span>
        <span onClick={logOut} style={{ color: "red", float: "right" }}>
          logOut
        </span>
      </div>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

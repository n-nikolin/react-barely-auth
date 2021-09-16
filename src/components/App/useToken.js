import { useState } from "react";

export default function useToken() {
  function getToken() {
    const tokenString = localStorage.getItem("access_token");
    // console.log(tokenString)
    const userToken = JSON.parse(tokenString);
    // console.log(userToken.token)
    return userToken?.token;
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("access_token", `{"token": "${userToken}"}`);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}

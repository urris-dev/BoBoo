import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { googleLogin } from "@/api/auth.js";

import './GoogleButton.scss'

export default function GoogleButton() {
    const navigate = useNavigate();
    const login = async (credentialResponse) => {
        const token = credentialResponse.credential;
        const resp = await googleLogin(token);

        if (resp.status == 401) {
          alert("Что-то пошло не так...Попробуйте войти ещё раз");
        } else {
          navigate("login");
        }
      };

    return (
        <GoogleLogin
        onSuccess={login}
        onError={() => alert("Что-то пошло не так...Попробуйте войти ещё раз")}
      />
    )
}

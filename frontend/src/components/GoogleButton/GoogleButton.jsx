import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

import { setUserData } from "@/store/userDataSlice.js";
import { googleLogin } from "@/store/authSlice.js";

import './GoogleButton.scss'

export default function GoogleButton() {
    const dispatch = useDispatch();

    const login = async (credentialResponse) => {
        const token = credentialResponse.credential;
    
        dispatch(setUserData({token}));
        await dispatch(googleLogin());
      };

    return (
        <GoogleLogin
        onSuccess={login}
        onError={() => alert("Что-то пошло не так...Попробуйте войти ещё раз")}
      />
    )
}

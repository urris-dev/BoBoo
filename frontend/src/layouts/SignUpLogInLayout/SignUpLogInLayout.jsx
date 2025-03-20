import {Outlet} from "react-router-dom"

import './SignUpLogInLayout.scss'

export default function SignUpLogInLayout() {
    return (
        <div className="sign-up-log-in-layout">
            <div className="sign-up-log-in-container">
                <Outlet />
            </div>
        </div>
    )
}
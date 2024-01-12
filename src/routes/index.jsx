import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../container/auth/login"
import Register from "../container/auth/register"
import Home from "../container/user"
import { useDispatch, useSelector } from "react-redux"
import Admin from "../container/admin"
import VerifyEmail from "../container/auth/verifyEmail"
import ConfirmAccount from "../container/auth/confirmAccount"
import ConfirmForgotPassword from "../container/auth/confirmForgotPassword"
import ForgotPassword from "../container/auth/forgotPassword"
import Chat from "../container/user/chat"


export const GeneralRoute = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm-account" element={<ConfirmAccount />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/confirm-forgot-password" element={<ConfirmForgotPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="*" element={<Login />} />

        </Routes>
    )
}


export const LoggedRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Chat />} />
        </Routes>
    )
}

function Router() {
    const { logged, user } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    
    return (
        <BrowserRouter>
            {!logged ? <GeneralRoute /> : <LoggedRoute />}
            {/* <Admin /> */}
        </BrowserRouter>
    )
}

export default Router
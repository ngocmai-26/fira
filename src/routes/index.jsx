import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../container/auth/login";
import Register from "../container/auth/register";
import { useDispatch, useSelector } from "react-redux";
import VerifyEmail from "../container/auth/verifyEmail";
import ConfirmAccount from "../container/auth/confirmAccount";
import ConfirmForgotPassword from "../container/auth/confirmForgotPassword";
import ForgotPassword from "../container/auth/forgotPassword";
import Chat from "../container/user/chat";
import CreateNewUser from "../container/auth/createNewUser";
import { NotFoundPage } from "../container/error/404";
import { useLayoutEffect } from "react";
import { AppMiddleware } from "../middleware/AppMiddleware";
import AdminHome from "../container/admin";

export const GeneralRoute = () => {
  return (
    <AppMiddleware>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/confirm-forgot-password"
          element={<ConfirmForgotPassword />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </AppMiddleware>
  );
};

export const LoggedRoute = () => {
  return (
    <AppMiddleware>
      <Routes>
        <Route path="/create-new-user" element={<CreateNewUser />} />
        <Route path="/" element={<AdminHome />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppMiddleware>
  );
};

function Router() {
  const { logged } = useSelector((state) => state.authReducer);
  
  return (
    <BrowserRouter>
      {logged ? <LoggedRoute /> : <GeneralRoute />}
      {/* <AdminHome /> */}
    </BrowserRouter>
  );
}

export default Router;

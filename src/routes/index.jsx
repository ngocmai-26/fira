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
import Home from "../container/user";
import ManagerAccount from "../container/user/managerAccounts";
import AddNewAccount from "../container/user/managerAccounts/AddNewAccount";
import ManagerRoles from "../container/user/managerRoles";
import AddNewRole from "../container/user/managerRoles/AddNewRole";
import ManagerPermissions from "../container/user/managerPermissions";
import Account from "../container/user/profile/account";
import AddNewPermission from "../container/user/managerPermissions/AddNewPermission";
import ManagerJobs from "../container/user/managerJobs";

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
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/quan-ly-tai-khoan" element={<ManagerAccount />} />
        <Route path="/quan-ly-chuc-vu" element={<ManagerRoles />} />
        <Route path="/quan-ly-chuc-nang" element={<ManagerPermissions />} />
        <Route path="/quan-ly-cong-viec" element={<ManagerJobs />} />
        <Route path="/them-chuc-vu" element={<AddNewRole />} />
        <Route path="/them-tai-khoan" element={<AddNewAccount />} />
        <Route path="/them-chuc-nang" element={<AddNewPermission />} />
        <Route path="/tai-khoan" element={<Account />} />
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

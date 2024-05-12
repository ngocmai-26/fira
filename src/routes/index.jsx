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
import ManagerJobs from "../container/user/managerJobs/listJob";
import JobsBoard from "../container/user/managerJobs/jobsBoard";
import JobDetail from "../container/user/managerJobs/jobDetail";
import ManagerNote from "../container/user/managerPlans/ListNote";
import ManagerTimeKeep from "../container/user/managerTimeKeep";
import ManagerKPICategories from "../container/user/managerKPICategory";
import KPI from "../container/user/managerKPI";
import ListKPI from "../container/user/managerKPI/ListKPI";
import EvaluateKPI from "../container/user/managerKPI/evaluate";
import ListActivePlan from "../container/user/managerPlans/listActivePlan";
import JobPerformed from "../container/user/managerJobs/jobPerformed";
import JobsReport from "../container/user/managerJobs/jobsReport";

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
        <Route path="/cong-viec-dang-thuc-hien" element={<JobPerformed />} />
        <Route path="/bao-cao-cong-viec" element={<JobsReport />} />
        <Route path="/quan-ly-cong-viec-dang-bang" element={<JobsBoard />} />
        <Route path="/quan-ly-diem-danh" element={<ManagerTimeKeep />} />
        <Route path="/quan-ly-ke-hoach" element={<ManagerNote />} />
        <Route path="/quan-ly-danh-muc-kpi" element={<ManagerKPICategories />} />
        <Route path="/quan-ly-phieu-danh-gia" element={<ListKPI />} />
        <Route path="/danh-gia-KPI" element={<EvaluateKPI />} />
        <Route path="/them-chuc-vu" element={<AddNewRole />} />
        <Route path="/them-tai-khoan" element={<AddNewAccount />} />
        <Route path="/them-chuc-nang" element={<AddNewPermission />} />
        <Route path="/tai-khoan" element={<Account />} />
        <Route path="/chi-tiet-cong-viec" element={<JobDetail />} />
        <Route path="/ke-hoach-dang-thuc-hien" element={<ListActivePlan />} />
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

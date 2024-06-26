import { BrowserRouter, Route, Routes, useNavigation } from "react-router-dom";
import Login from "../container/auth/login";
import Register from "../container/auth/register";
import { useSelector } from "react-redux";
import VerifyEmail from "../container/auth/verifyEmail";
import ConfirmAccount from "../container/auth/confirmAccount";
import ConfirmForgotPassword from "../container/auth/confirmForgotPassword";
import ForgotPassword from "../container/auth/forgotPassword";
import Chat from "../container/user/chat";
import CreateNewUser from "../container/auth/createNewUser";
import { NotFoundPage } from "../container/error/404";
import { AppMiddleware } from "../middleware/AppMiddleware";
import Home from "../container/user";
import ManagerAccount from "../container/user/managerAccounts";
import ManagerRoles from "../container/user/managerRoles";
import ManagerPermissions from "../container/user/managerPermissions";
import Account from "../container/user/profile/account";
import ManagerJobs from "../container/user/managerJobs/listJob";
import JobsBoard from "../container/user/managerJobs/jobsBoard";
import ManagerNote from "../container/user/managerPlans/ListNote";
import ManagerTimeKeep from "../container/user/managerTimeKeep";
import ManagerKPICategories from "../container/user/managerKPICategory";
import ListKPI from "../container/user/managerKPI/ListKPI";
import EvaluateKPI from "../container/user/managerKPI/evaluate";
import ListActivePlan from "../container/user/managerPlans/listActivePlan";
import JobPerformed from "../container/user/managerJobs/jobPerformed";
import JobsReport from "../container/user/managerJobs/jobsReport";
import ListExpertise from "../container/user/managerKPI/ListExpertise";
import Expertise from "../container/user/managerKPI/expertise";
import KPICheck from "../container/user/managerKPI/KPICheck";
import JobEvaluated from "../container/user/managerJobs/jobEvaluated";
import ResultOfEvaluation from "../container/user/managerKPI/resultOfEvaluation";
import KPIDetail from "../container/user/managerKPI/KPIDetail";
import { useEffect } from "react";

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
  const { user} = useSelector((state) => state.authReducer);
  
  return (
    <AppMiddleware>
      <Routes>
        <Route
          path={!user ? "/create-new-user" : "/"}
          element={!user ? <CreateNewUser /> : <Home />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/quan-ly-tai-khoan" element={<ManagerAccount />} />
        <Route path="/quan-ly-chuc-vu" element={<ManagerRoles />} />
        <Route path="/quan-ly-chuc-nang" element={<ManagerPermissions />} />
        <Route path="/quan-ly-cong-viec" element={<ManagerJobs />} />
        <Route path="/cong-viec-dang-thuc-hien" element={<JobPerformed />} />
        <Route path="/bao-cao-cong-viec" element={<JobsReport />} />
        <Route path="/quan-ly-cong-viec-dang-bang" element={<JobsBoard />} />
        <Route
          path="/quan-ly-cong-viec-da-thuc-hien"
          element={<JobEvaluated />}
        />
        <Route path="/quan-ly-diem-danh" element={<ManagerTimeKeep />} />
        <Route path="/quan-ly-ke-hoach" element={<ManagerNote />} />
        <Route
          path="/quan-ly-danh-muc-kpi"
          element={<ManagerKPICategories />}
        />
        <Route path="/quan-ly-phieu-danh-gia" element={<ListKPI />} />
        <Route path="/ket-qua-tham-dinh" element={<ResultOfEvaluation />} />
        <Route path="/danh-sach-kpi-danh-gia" element={<ListExpertise />} />
        <Route path="/danh-gia-KPI" element={<EvaluateKPI />} />
        <Route path="/chi-tiet-phieu-danh-gia-KPI" element={<KPIDetail />} />
        <Route path="/tham-dinh-danh-gia-KPI" element={<Expertise />} />
        <Route path="/kiem-tra-danh-gia-KPI" element={<KPICheck />} />
        <Route path="/tai-khoan" element={<Account />} />
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

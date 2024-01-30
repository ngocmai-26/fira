import {
  faChartPie,
  faListCheck,
  faUsers,
  faCalendar,
  faUserPen,
  faUsersGear,
  faComments,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { AdminSideNavItem } from "../interfaces/AdminSideNavItem";

const ADMIN_NAVBAR_ITEMS = [
  new AdminSideNavItem(1, "", faChartPie, "Dashboards"),
  new AdminSideNavItem(2, "/quan-ly-tai-khoan", faUsers, "Quản lý tài khoản"),
  new AdminSideNavItem(3, "", faListCheck, " Quản lý công việc"),
  new AdminSideNavItem(4, "", faCalendar, "Quản lý lịch làm việc"),
  new AdminSideNavItem(
    5,
    "/quan-ly-chuc-vu",
    faUserPen,
    " Quản lý lịch chức vụ"
  ),
  new AdminSideNavItem(
    6,
    "/quan-ly-chuc-nang",
    faUsersGear,
    "Quản lý lịch chức năng"
  ),
  new AdminSideNavItem(7, "", faPenToSquare, " Quản lý danh sách kpi"),
  new AdminSideNavItem(8, "/chat", faComments, "Tin nhắn"),
];
export const DEFAULT_AVATAR =
  "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg";

export { ADMIN_NAVBAR_ITEMS };
export const CONTACT_SEARCH_MODAL_TYPE = {
  SEARCH: 1,
  CONTACT: 2,
  REQUEST: 3,
  SENT_REQUEST: 4,
};

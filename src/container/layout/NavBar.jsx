import {
  faCalendar,
  faChartPie,
  faComment,
  faCommentAlt,
  faCommentDots,
  faComments,
  faListCheck,
  faMessage,
  faPenToSquare,
  faUserPen,
  faUsers,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AdminSideContainer } from "../component/nav/AdminSideContainer";
import { ADMIN_NAVBAR_ITEMS } from "../../app/static";
import { AdminSideNavItem } from "../component/nav/AdminSideNavItem";

function NavBarAdmin() {
  const RenderAdminItem = () =>
    ADMIN_NAVBAR_ITEMS.map((item) => (
      <AdminSideNavItem key={item.id} item={item} />
    ));
  return (
    <AdminSideContainer>
      <RenderAdminItem />
    </AdminSideContainer>
  );
}

export default NavBarAdmin;

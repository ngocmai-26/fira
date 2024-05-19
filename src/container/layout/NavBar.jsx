import { AdminSideContainer } from "../component/nav/AdminSideContainer";
import { ADMIN_NAVBAR_ITEMS, STAFF_NAVBAR_ITEMS, MANAGER_NAVBAR_ITEMS, ANONYMOUS, CONTACT_NOTI_EVENT_TYPE } from "../../app/static";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { AdminSideNavItem } from "../component/nav/AdminSideNavItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAddContactRequestByUser,
  getAllAddContactRequestByUserRelate,
  getAllContactByUser,
} from "../../thunks/ContactThunk";
import { useLayoutEffect } from "react";
import { getAllRoomByUser } from "../../thunks/RoomThunk";
import { pushMessageToRoom } from "../../slices/RoomSlice";
import { useLocation } from "react-router-dom";

function NavBarAdmin() {
  const { user, account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;

  const RenderAdminItem = () => {
    let navbarItems = [];
    if (account?.role?.roleName === 'ROLE_ADMIN') {
      navbarItems = ADMIN_NAVBAR_ITEMS;
    } else if (account?.role?.roleName === 'ROLE_STAFF') {
      navbarItems = STAFF_NAVBAR_ITEMS;
    } else if (account?.role?.roleName === 'ROLE_MANAGER') {
      navbarItems = MANAGER_NAVBAR_ITEMS;
    } else if (account?.role?.roleName === 'ANONYMOUS') {
      navbarItems = ANONYMOUS;
    } else {
      const permissions = account?.role?.permissions;
      navbarItems = ADMIN_NAVBAR_ITEMS.filter(item => {
        if (item.id === 3 && permissions.some(permission => permission.name === 'MANAGE_JOB_READ')) return true;
        if (item.id === 5 && permissions.some(permission => permission.name === 'MANAGE_ROLE_READ')) return true;
        if (item.id === 6 && permissions.some(permission => permission.name === 'MANAGE_PERMISSION_READ')) return true;
        if (item.id === 7 && permissions.some(permission => permission.name === 'MANAGE_KPI_READ')) return true;
        if (item.id === 8 || item.id === 4) return true;
        return false;
      });
    }
    return navbarItems.map((item) => (
      <AdminSideNavItem key={item.id} item={item} isActive={pathname === item.to} />
    ));
  };

  useLayoutEffect(() => {
    const ws = new SockJS("http://127.0.0.1:8082/ws");
    const client = Stomp.over(ws);
    client.connect({}, function (frame) {
      client.subscribe("/contact", (resp) => {
        const respBody = JSON.parse(resp.body);
        if (respBody?.type == CONTACT_NOTI_EVENT_TYPE.NEW_REQUEST) {
          if (respBody?.contact?.relate?.id == user?.id) {
            dispatch(getAllAddContactRequestByUserRelate(user?.id));
          }
        }
        if (respBody.type == CONTACT_NOTI_EVENT_TYPE.RESPONSE_REQUEST) {
          dispatch(getAllContactByUser(user?.id));
          dispatch(getAllAddContactRequestByUser(user?.id));
        }
      });
      client.subscribe("/notification", (resp) => {
        console.log(JSON.parse(resp.body));
      });
      client.subscribe("/room", (resp) => {
        const newMessage = JSON.parse(resp.body);
        dispatch(pushMessageToRoom(newMessage));
      });
    });
    // for chat
    dispatch(getAllAddContactRequestByUser(user?.id));
    dispatch(getAllAddContactRequestByUserRelate(user?.id));
    dispatch(getAllContactByUser(user?.id));
    dispatch(getAllRoomByUser());
    // end for chat
  }, []);

  return (
    <AdminSideContainer>
      <RenderAdminItem />
    </AdminSideContainer>
  );
}

export default NavBarAdmin;

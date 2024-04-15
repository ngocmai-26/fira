import { AdminSideContainer } from "../component/nav/AdminSideContainer";
import { ADMIN_MANAGER, ADMIN_NAVBAR_ITEMS, ANONYMOUS, CONTACT_NOTI_EVENT_TYPE, MANAGER_NAVBAR_ITEMS, STAFF_NAVBAR_ITEMS } from "../../app/static";
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

function NavBarAdmin() {
  const { user, account } = useSelector((state) => state.authReducer);
  console.log("user", account)
  const dispatch = useDispatch();
  const RenderAdminItem = () =>
  {
    if (account?.role?.roleName === 'ROLE_ADMIN') {
      // If the user is an admin, render all items
      return ADMIN_NAVBAR_ITEMS.map((item) => (
        <AdminSideNavItem key={item.id} item={item} />
      ));
    } else if(account?.role?.roleName === 'ROLE_STAFF') {
      // If the user is an admin, render all items
      return STAFF_NAVBAR_ITEMS.map((item) => (
        <AdminSideNavItem key={item.id} item={item} />
      ));
    } else if(account?.role?.roleName === 'ROLE_MANAGER') {
      // If the user is an admin, render all items
      return MANAGER_NAVBAR_ITEMS.map((item) => (
        <AdminSideNavItem key={item.id} item={item} />
      ));
    } else if(account?.role?.roleName === 'ANONYMOUS') {
      // If the user is an admin, render all items
      return ANONYMOUS.map((item) => (
        <AdminSideNavItem key={item.id} item={item} />
      ));
    } 
    else {
      // If the user is not an admin, check permissions to render items accordingly
      const permissions = account?.role?.permissions;
      console.log("permissions", permissions?.includes('MANAGE_JOB_READ'))
      return ADMIN_NAVBAR_ITEMS.map((item) => {
        if (item.id === 3 && permissions.some(permission => permission.name === 'MANAGE_JOB_READ')) {
          return <AdminSideNavItem key={item.id} item={item} />;
        }
        if (item.id === 5 && permissions.some(permission => permission.name === 'MANAGE_ROLE_READ')) {
          return <AdminSideNavItem key={item.id} item={item} />;
        }
        if (item.id === 6 && permissions.some(permission => permission.name === 'MANAGE_PERMISSION_READ')) {
          return <AdminSideNavItem key={item.id} item={item} />;
        }
        if (item.id === 7 && permissions.some(permission => permission.name === 'MANAGE_KPI_READ')) {
          return <AdminSideNavItem key={item.id} item={item} />;
        }
        // Always render chat and schedule items
        if (item.id === 8 || item.id === 4) {
          return <AdminSideNavItem key={item.id} item={item} />;
        }
        return null;
      });
    }
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
        console.log("newMessage", newMessage)
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

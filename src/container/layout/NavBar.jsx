import { AdminSideContainer } from "../component/nav/AdminSideContainer";
import { ADMIN_NAVBAR_ITEMS, CONTACT_NOTI_EVENT_TYPE } from "../../app/static";
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
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const RenderAdminItem = () =>
    ADMIN_NAVBAR_ITEMS.map((item) => (
      <AdminSideNavItem key={item.id} item={item} />
    ));
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

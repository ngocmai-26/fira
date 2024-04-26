import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactModal from "../../modal/ContactModal";
import ModalRoomChat from "../../modal/ModalRoomChat";
import QRCodeModal from "../../modal/QRCodeModal";
import NavBarAdmin from "../../layout/NavBar";
import { RoomItem } from "./RoomItem";
import { RoomInfo } from "./RoomInfo";
import { getRoomTags } from "../../../thunks/RoomThunk";
import { RoomMessageGenerator } from "./RoomMessageGenerator";
import AddMember from "../../modal/AddMemberModal";

function Chat() {
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [contactModalVisible, setContactNodalVisible] = useState(false);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [addNewMemberModalVisible, setAddNewMemberModalVisible] =
    useState(false);
  const [roomAddMember, setRoomAddMember] = useState({});
  const [activeRoom, setActiveRoom] = useState("");
  const { userRoom } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  
  useLayoutEffect(() => {
    dispatch(getRoomTags());
    if (activeRoom == "" && userRoom.length > 0) {
      setActiveRoom(userRoom[0].id);
    }
  }, []);

  const handleHiddenAddMember = (item) => {
    setRoomAddMember(item);
    setAddNewMemberModalVisible(!addNewMemberModalVisible);
  };
  const handleExpandBox = (id, roomMember) => {
    setActiveRoom(id);
  };

  const [hiddenRoomMess , setHiddenRoomMess]  =useState(false)
  const handleCloseRoomMess = () => {
    setHiddenRoomMess(!hiddenRoomMess)
  }
  
  const { expandFileMedia } = useSelector((state) => state.toggleReducer).room;
  return (
    <article className="overflow-hidden relative flex">
      <NavBarAdmin />
      <div
        className={`grid xl:grid-cols-4 md:grid-cols-3 h-screen relative w-full`}
      >
        <RoomItem
          activeRoom={activeRoom}
          handleExpandBox={handleExpandBox}
          rooms={userRoom}
          handleOpenContactModal={setContactNodalVisible}
          handleOpenModalRoom={setRoomModalVisible}
          setHiddenRoomMess={setHiddenRoomMess}
        />
        <RoomMessageGenerator rooms={userRoom} activeRoom={activeRoom}  handleCloseRoomMess={handleCloseRoomMess} hiddenRoomMess={hiddenRoomMess} />
        {userRoom?.map((room, index) => {
          return (
            <RoomInfo
              room={room}
              key={index.toString()}
              activeRoom={activeRoom}
              handleHiddenAddMember={handleHiddenAddMember}
            />
          );
        })}
      </div>
      <ModalRoomChat
        modalVisible={roomModalVisible}
        setModalVisible={setRoomModalVisible}
      />

      {contactModalVisible && <ContactModal setOpen={setContactNodalVisible} />}
      <QRCodeModal
        setQrModalVisible={setQrCodeModalVisible}
        qrModalVisible={qrCodeModalVisible}
      />
      <AddMember
        modalVisible={addNewMemberModalVisible}
        roomAddMember={roomAddMember}
        setModalVisible={handleHiddenAddMember}
      />
    </article>
  );
}

export default Chat;

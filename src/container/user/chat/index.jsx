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

function Chat() {
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [contactModalVisible, setContactNodalVisible] = useState(false);
  const [qrCodeModalVisible, setQrCodeModalVisible] = useState(false);
  const [activeRoom, setActiveRoom] = useState("");
  const { userRoom } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const file = [
    {
      id: 1,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "PNG",
      capacity: "29MB",
    },
    {
      id: 2,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "MP4",
      capacity: "29MB",
    },
    {
      id: 1,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "PNG",
      capacity: "29MB",
    },
    {
      id: 2,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "MP4",
      capacity: "29MB",
    },
    {
      id: 1,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "PNG",
      capacity: "29MB",
    },
    {
      id: 2,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "MP4",
      capacity: "29MB",
    },
    {
      id: 1,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "PNG",
      capacity: "29MB",
    },
    {
      id: 2,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "MP4",
      capacity: "29MB",
    },
    {
      id: 1,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "PNG",
      capacity: "29MB",
    },
    {
      id: 2,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "MP4",
      capacity: "29MB",
    },
    {
      id: 1,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "PNG",
      capacity: "29MB",
    },
    {
      id: 2,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "MP4",
      capacity: "29MB",
    },
    {
      id: 1,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "PNG",
      capacity: "29MB",
    },
    {
      id: 2,
      name: "loremipsum.png",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      type: "MP4",
      capacity: "29MB",
    },
  ];

  useLayoutEffect(() => {
    dispatch(getRoomTags());
    if (activeRoom == "" && userRoom.length > 0) {
      setActiveRoom(userRoom[0].id);
    }
  }, []);

  const handleExpandBox = (id, roomMember) => {
    setActiveRoom(id);
  };
  const { expandFileMedia } = useSelector((state) => state.toggleReducer).room;
  return (
    <article className="overflow-hidden relative flex">
      <NavBarAdmin />
      <div
        className={`grid grid-cols-4
         h-screen relative w-full`}
      >
        <RoomItem
          activeRoom={activeRoom}
          handleExpandBox={handleExpandBox}
          rooms={userRoom}
          handleOpenContactModal={setContactNodalVisible}
          handleOpenModalRoom={setRoomModalVisible}
        />
        <RoomMessageGenerator rooms={userRoom} activeRoom={activeRoom} />
        {userRoom.map((room, index) => {
          return (
            <RoomInfo
              room={room}
              key={index.toString()}
              activeRoom={activeRoom}
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
    </article>
  );
}

export default Chat;

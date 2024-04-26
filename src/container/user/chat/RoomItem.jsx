import { faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import NotificationComponent from "../../component/Notification";
import SearchComponent from "../../component/SearchComponent";
import { RoomItemContainer } from "../../component/room/RoomItemContainer";
export const RoomItem = ({
  rooms,
  handleOpenContactModal,
  handleOpenModalRoom,
  handleExpandBox,
  activeRoom,
  setHiddenRoomMess
}) => {
  const { addContactRequest, contactRequest } = useSelector(
    (state) => state.contactReducer
  );
  return (
    <div className="p-2 col-span-3 md:col-span-1 border-e-gray-100 border-e-2 h-screen">
      <div className="flex justify-between border-b-gray-100 border-b-2 py-2">
        <span className="font-bold text-2xl">Tin nhắn</span>
        <div className="flex justify-center items-center">
          <button
            className={`text-lg text-gray-800 px-2 relative ${
              (contactRequest.length > 0 || addContactRequest.length > 0) && (
                <span className="absolute -top-1 -right-2 bg-red-600 w-3 h-3 rounded-lg"></span>
              )
                ? "shadow-lg rounded"
                : ""
            }`}
            onClick={() => {
              handleOpenContactModal(true);
            }}
          >
            <FontAwesomeIcon icon={faUser} />
            {(contactRequest.length > 0 || addContactRequest.length > 0) && (
              <span className="absolute -top-1 -right-2 bg-red-600 w-3 h-3 rounded-lg"></span>
            )}
          </button>
          <button
            className="text-lg text-gray-800 px-2"
            onClick={() => {
              handleOpenModalRoom(true);
            }}
          >
            <FontAwesomeIcon icon={faUserGroup} />
          </button>
          <NotificationComponent />
        </div>
      </div>
      <SearchComponent placeholder="Tìm kiếm người dùng" />
      <RoomItemContainer
        rooms={rooms}
        handleExpandBox={handleExpandBox}
        activeRoom={activeRoom}
        setHiddenRoomMess={setHiddenRoomMess}
      />
    </div>
  );
};

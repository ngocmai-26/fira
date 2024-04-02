import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteRooms } from "../../../thunks/RoomThunk";
import { useDispatch } from "react-redux";

export const RoomItem = ({ room, activeRoom }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`w-full p-2 ${
        activeRoom == room.id ? "bg-gray-100" : "hover:bg-gray-100"
      } rounded-sm flex justify-between items-center gap-2 relative`}
    >
      <div className="flex justify-start items-center gap-1">
        <div className="w-10 h-10 ">
          <img
            className="object-cover rounded-full w-full h-full"
            src={room?.leader?.avatar}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-md truncate mb-1">
            {room?.roomName?.charAt(0).toUpperCase() + room?.roomName?.slice(1)}
          </p>
          <p
            style={{ maxWidth: "88%" }}
            className="text-xs truncate text-gray-400"
          >
            {room?.lastMessage?.content}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start h-full">
        <div className="">
          <FontAwesomeIcon color="rgba(0,0,0,0.4)" icon={faEllipsisH} />
        </div>
      </div>
      {/* <div className="absolute right-0 top-8 ">
        <button
          className="text-xs px-2 bg-slate-200 py-1 w-10 rounded-sm"
          onClick={() => {
            if (window.confirm("Bạn có muốn xóa chức vụ này không?")) {
              dispatch(deleteRooms(room.id));
            }
          }}
        >
          Xóa
        </button>
      </div> */}
    </div>
  );
};

import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RoomItem = ({ room, activeRoom }) => {
  return (
    <div
      className={`w-full p-2 ${
        activeRoom == room.id ? "bg-gray-100" : "hover:bg-gray-100"
      } rounded-sm flex justify-between items-center gap-2`}
    >
      <div className="flex justify-start items-center gap-4">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={room.leader.avatar}
        />
        <div className="flex flex-col">
          <p className="text-md truncate mb-1">
            {room.roomName.charAt(0).toUpperCase() + room.roomName.slice(1)}
          </p>
          <p
            style={{ maxWidth: "90%" }}
            className="text-xs truncate text-gray-400"
          >
            {room.lastMessage.content}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start h-full">
        <button>
          <FontAwesomeIcon color="rgba(0,0,0,0.4)" icon={faEllipsisH} />
        </button>
      </div>
    </div>
  );
};

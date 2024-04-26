import MsgItem from "../MsgItem";
import { RoomItem } from "./RoomItem";

export const RoomItemContainer = ({ rooms, handleExpandBox, activeRoom, setHiddenRoomMess }) => {
  return (
    <div className="scroll">
      {rooms.map((item, index) => {
        return (
          <div
            key={index.toString()}
            className="pt-3 scroll-item"
            style={{ maxHeight: "90vh" }}
          >
            <button
              className="text-left w-full"
              onClick={() => {
                handleExpandBox(item.id, item.members)
                setHiddenRoomMess(true)
              }}
            >
              <RoomItem room={item} activeRoom={activeRoom} />
            </button>
          </div>
        );
      })}
      {rooms.length == 0 && (
        <p className="text-gray-400 text-sm">
          Bạn chưa có cuộc trò chuyện nào.
        </p>
      )}
    </div>
  );
};

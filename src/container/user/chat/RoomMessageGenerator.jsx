import { RoomMessage } from "./RoomMessage";

export const RoomMessageGenerator = ({ rooms ,activeRoom, hiddenRoomMess, handleCloseRoomMess }) => {
  return (
    <>
      {rooms.map((room, index) => {
        return <RoomMessage room={room} key={index.toString()} activeRoom={activeRoom} handleCloseRoomMess={handleCloseRoomMess} hiddenRoomMess={hiddenRoomMess} />;
      })}
    </>
  );
};

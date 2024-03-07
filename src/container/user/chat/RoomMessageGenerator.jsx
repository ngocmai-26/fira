import { RoomMessage } from "./RoomMessage";

export const RoomMessageGenerator = ({ rooms ,activeRoom }) => {
  return (
    <>
      {rooms.map((room, index) => {
        return <RoomMessage room={room} key={index.toString()} activeRoom={activeRoom} />;
      })}
    </>
  );
};

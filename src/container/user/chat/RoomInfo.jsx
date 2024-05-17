import { useLayoutEffect } from "react";
import MsgItem from "../../component/MsgItem";
import { useDispatch, useSelector } from "react-redux";
import { EXPAND_FILE_MEDIA, setRoomToggle } from "../../../slices/ToglleSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";

export const RoomInfo = ({ activeRoom, room, handleHiddenAddMember }) => {
  const { expandFileMedia } = useSelector((state) => state.toggleReducer).room;
  useLayoutEffect(() => {}, [expandFileMedia]);
  const dispatch = useDispatch();
  return (
    <div
      className={`p-2 px-5 lg:px-2 lg:col-span-1 absolute lg:relative w-full bg-white h-screen lg:right-0 ${
        expandFileMedia && activeRoom == room.id ? "block" : "hidden"
      }`}
    >
      <div className="flex -b-2 py-2 justify-between">
        <div className="title">
          <span className="text-2xl font-bold">Thông tin</span>
        </div>
        <div className="time flex justify-center lg:hidden">
        <button
          onClick={() => {
            dispatch(
              setRoomToggle({
                type: EXPAND_FILE_MEDIA,
                value: !expandFileMedia,
              })
            );
          }}
          className="text-sm text-black my-auto px-3 font-medium py-1 rounded-md rotate-90"
        >
          <FontAwesomeIcon
            icon={expandFileMedia ? faUpRightAndDownLeftFromCenter : faCompress}
            size="md"
          />
        </button>
      </div>
      </div>
      <div className="h-screen">
        <div className="flex flex-col">
          <div className="teams">
            <div className="number-title flex justify-between">
              <span className="text-sm font-bold">Thành viên nhóm</span>
              <button
                onClick={() => handleHiddenAddMember(room)}
                className="font-medium rounded-sm text-sm text-white bg-blue-500 hover:bg-blue-600 focus:ring-4me-1 px-3"
              >
                +
              </button>
            </div>
            <div
              className="scroll h-1/3 overflow-x-hidden overflow-y-scroll"
              style={{ height: "40vh" }}
            >
              {room?.members?.map((item) => (
                <MsgItem data={item} type={2} />
              ))}
            </div>
          </div>
          <div className="border-t-gray-100border-t-2 my-2">
            <div className="number-title">
              <span className="text-sm font-bold">File</span>
            </div>
            <div
              className="overflow-x-hidden overflow-y-scroll"
              style={{ height: "45vh" }}
            >
              <div className="scroll-item">
                {room?.media?.map((item) => (
                  <MsgItem data={item} type={1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

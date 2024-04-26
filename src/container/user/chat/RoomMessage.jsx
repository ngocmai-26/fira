import {
  faCompress,
  faImage,
  faLeftLong,
  faPlus,
  faTimes,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useRef, useState } from "react";
import ButtonComponent from "../../component/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { EXPAND_FILE_MEDIA, setRoomToggle } from "../../../slices/ToglleSlice";
import BoxMsg from "../../component/Boxmsg";
import { sendMessage } from "../../../thunks/RoomThunk";
import { setAlert } from "../../../slices/AlertSlice";
import { TOAST_ERROR } from "../../../constants/toast";
export const RoomMessage = ({ room, activeRoom, hiddenRoomMess, handleCloseRoomMess }) => {
  const contentRef = useRef(null);
  return (
    <RoomMessageContainer active={hiddenRoomMess && activeRoom == room?.id}>
      <RoomHeader room={room} handleCloseRoomMess={handleCloseRoomMess} />
      <RoomMessageContent
        messages={room.allMessages.content}
        contentRef={contentRef}
      />
      <RoomInput room={room} contentRef={contentRef} />
    </RoomMessageContainer>
  );
};
const RoomMessageContainer = (props) => {
  return (
    <div
      className={`${
        props.active ? "block" : "hidden"
      } col-span-3 md:col-span-2 p-2 border-e-gray-100 absolute w-full md:relative bg-white md:right-0 border-e-2 `}
    >
      <div className="relative h-screen">{props.children}</div>
    </div>
  );
};

const RoomMessageContent = ({ messages, contentRef }) => {
  return (
    <div className="content scroll">
      <div
        className="scroll-item pb-10"
        ref={contentRef}
        style={{ maxHeight: "85vh" }}
      >
        {[...messages].reverse().map((item) => (
          <BoxMsg data={item} />
        ))}
      </div>
    </div>
  );
};
const RoomHeader = ({ room, handleCloseRoomMess }) => {
  const { expandFileMedia } = useSelector((state) => state.toggleReducer).room;
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between border-b-gray-100 border-b-2">
      <div className="flex">
        <button onClick={handleCloseRoomMess}>
          <FontAwesomeIcon icon={faLeftLong} className="text-gray-400" />
        </button>
        <div className="image w-10 ml-3 md:ml-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnBVsv4lu6ob9X3QlOOC0xMgAxOvHkfA8yptzdqcNMtQ&s"
            alt=""
            className="rounded-lg my-1"
          />
        </div>
        <div className="information px-1.5">
          <div className="information-name">
            <span className="font-medium">{room.roomName}</span>
          </div>
          <div className="information-chat">
            <span className="text-xs font-medium">online</span>
          </div>
        </div>
      </div>

      <div className="time flex justify-center">
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
  );
};
const RoomStatus = ({ room }) => {};
const RoomInput = ({ room, contentRef }) => {
  const { user } = useSelector((state) => state.authReducer);
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);
  const addImageInputRef = useRef(null);
  const handleRemoveImage = (index) => {
    const tem = [...selectedImages];
    tem.splice(index, 1);
    setSelectedImages(tem);
  };
  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files]);
  };
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const handleIconClick = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };
  const handleAddImages = () => {
    addImageInputRef.current.click();
  };
  const handleAddImageChange = (e) => {
    console.log(".e.target.files", selectedImages)
    setSelectedImages([...selectedImages, ...e.target.files]);
  };
  const handleSendMessage = () => {
    if (message.length == 0) {
      dispatch(setAlert({ type: TOAST_ERROR, content: "Hãy nhập gì đó" }));
      return;
    }
    
    const selectedMedia = selectedImages?.map((image) => {
      return {
        mediaLink: image,
        mediaType: image.type,
        senderId: user.id,
        sendAt: new Date(),
        mediaName: image.name,
        mediaSize: image.size,
      };
    });
    const msgData = {
      content: message,
      media: [...selectedMedia],
      roomId: room.id,
    };
    dispatch(sendMessage(msgData)).then((resp) => {
      if (resp?.payload) {
        setMessage("");
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    });
    setSelectedImages([]);
  };
  return (
    <div className="absolute border-t-gray-100 border-t-2 w-full bottom-2 p-2 bg-white">
      <div className="flex w-full gap-2 justify-center">
        <div className="w-4/5">
          <div className="flex gap-2 justify-start items-center flex-wrap">
            {selectedImages?.map((image, index) => (
              <div key={index} className="py-2">
                <img
                  title="Remove image"
                  onClick={() => handleRemoveImage(index)}
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index + 1}`}
                  className="w-16 h-16 rounded-sm cursor-pointer"
                />
              </div>
            ))}
            {selectedImages.length > 0 && (
              <div
                title="Add new image"
                onClick={handleAddImages}
                className="h-16 w-16 cursor-pointer flex justify-center items-center bg-white border-2 border-gray-300 rounded-sm"
              >
                <FontAwesomeIcon icon={faPlus} color="rgba(0,0,0,0.4)" />
              </div>
            )}
          </div>
          <input
            value={message}
            placeholder="Nhập tin nhắn"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            className="text-sm border w-full p-1.5 rounded-lg"
          />
        </div>
        <div
          className="flex gap-2 justify-center items-center"
          style={{ alignItems: "flex-end" }}
        >
          <ButtonComponent
            handleClick={handleSendMessage}
            textButton={"GỬI"}
            type={"button"}
            style={"text-sky-600 px-3 rounded-lg h-8 "}
          />
          <div>
            <label htmlFor="image-upload" className="image-upload-label">
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                multiple
                style={{ display: "none" }}
              />
              <input
                ref={addImageInputRef}
                id="image-upload-add"
                type="file"
                accept="image/*"
                onChange={handleAddImageChange}
                multiple
                style={{ display: "none" }}
              />
              <button onClick={handleIconClick} className="image-upload-icon">
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-xl text-blue-600"
                />
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

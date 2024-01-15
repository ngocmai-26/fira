import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BoxMsg from "../../component/boxmsg";
import MsgItem from "../../component/msgItem";
import {
  faAngleLeft,
  faArrowLeft,
  faCamera,
  faCameraAlt,
  faLeftLong,
  faLeftRight,
  faMinus,
  faPlus,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import ModalRoomChat from "../../modal/modalRoomChat";

function Chat() {
  const [seeMore, setSeeMore] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expandBox, setExpandBox] = useState(false);
  const [hiddenModalRoom, setHiddenModalRoom] = useState(false);

  const { user } = useSelector((state) => state.authReducer);
  console.log(user);
  const handleSeeMore = () => {
    setSeeMore(!seeMore);
  };

  const handleHiddenModalRoom = () => {
    setHiddenModalRoom(!hiddenModalRoom)
  }

  const handleExpandBox = () => {
    setExpandBox(!expandBox);
  };
  const data = {
    name: "Đăng Văn Nam",
    img:
      "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    time: "12m",
    content:
      "ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e",
  };
  const chat = [
    {
      isSender: 1,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 2,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 1,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 2,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 1,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 2,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 1,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 2,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 1,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 2,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 1,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 2,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 1,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
    {
      isSender: 2,
      content: "Hôm qua em xinh quá trời",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
    },
  ];

  const member = [
    {
      id: 1,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 2,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 1,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 2,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 1,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 2,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 1,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 2,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 1,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 2,
      name: "Đăng Văn Nam",
      img:
        "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
  ];
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
  return (
    <article className="overflow-hidden relative">
      <div className="grid grid-cols-3 lg:grid-cols-4 h-screen relative">
        <div className="p-2 col-span-3 md:col-span-1 border-e-gray-100 border-e-2 h-screen">
          <div className="flex justify-between border-b-gray-100 border-b-2 py-2">
            <span className="font-bold text-2xl">Message</span>
            <button className="bg-blue-500 text-lg text-white px-2" onClick={handleHiddenModalRoom}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="search">
            <input type="text" className="border-2 w-full my-2 rounded-md px-2 py-2 text-sm" placeholder="Tìm kiếm người dùng" />
          </div>
          <div className="scroll">
            <div className="pt-3 scroll-item" style={{ maxHeight: "90vh" }}>
              <button className="text-left" onClick={handleExpandBox}>
                <MsgItem data={data} />
              </button>
            </div>
          </div>
        </div>
        <div
          className={`col-span-3 md:col-span-2 p-2 border-e-gray-100 absolute w-full md:relative bg-white md:right-0 border-e-2 ${
            expandBox ? "right-0" : "right-[-100vw]"
          }`}
          style={{
            display: expandBox ? "block" : "hidden ",
            transition: "right 0.7s ease",
          }}
        >
          <div className="relative h-screen">
            <div className="flex justify-between border-b-gray-100 border-b-2">
              <div className="flex">
                <button
                  className="come-back block md:hidden "
                  onClick={handleExpandBox}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className="image w-10 ml-3 md:ml-0">
                  <img
                    src="https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg"
                    alt=""
                    className="rounded-lg my-1"
                  />
                </div>
                <div className="information px-1.5">
                  <div className="information-name">
                    <span className="font-medium">Đăng Văn Nam</span>
                  </div>
                  <div className="information-chat">
                    <span className="text-xs font-medium">online</span>
                  </div>
                </div>
              </div>

              <div className="time flex justify-center">
                <button className="text-sm text-white my-auto bg-blue-500 px-3 font-medium py-1 rounded-md">
                  <FontAwesomeIcon icon={faVideo} />
                </button>
                <button
                  onClick={() => setExpand(!expand)}
                  className="bg-black rounded-lg my-auto p-1 mx-2 block lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.16669 8.33341H5.83335C7.50002 8.33341 8.33335 7.50008 8.33335 5.83341V4.16675C8.33335 2.50008 7.50002 1.66675 5.83335 1.66675H4.16669C2.50002 1.66675 1.66669 2.50008 1.66669 4.16675V5.83341C1.66669 7.50008 2.50002 8.33341 4.16669 8.33341Z"
                      stroke="#F9FAFB"
                      stroke-width="1.2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.1667 8.33341H15.8334C17.5 8.33341 18.3334 7.50008 18.3334 5.83341V4.16675C18.3334 2.50008 17.5 1.66675 15.8334 1.66675H14.1667C12.5 1.66675 11.6667 2.50008 11.6667 4.16675V5.83341C11.6667 7.50008 12.5 8.33341 14.1667 8.33341Z"
                      stroke="#F9FAFB"
                      stroke-width="1.2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.1667 18.3334H15.8334C17.5 18.3334 18.3334 17.5001 18.3334 15.8334V14.1667C18.3334 12.5001 17.5 11.6667 15.8334 11.6667H14.1667C12.5 11.6667 11.6667 12.5001 11.6667 14.1667V15.8334C11.6667 17.5001 12.5 18.3334 14.1667 18.3334Z"
                      stroke="#F9FAFB"
                      stroke-width="1.2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.16669 18.3334H5.83335C7.50002 18.3334 8.33335 17.5001 8.33335 15.8334V14.1667C8.33335 12.5001 7.50002 11.6667 5.83335 11.6667H4.16669C2.50002 11.6667 1.66669 12.5001 1.66669 14.1667V15.8334C1.66669 17.5001 2.50002 18.3334 4.16669 18.3334Z"
                      stroke="#F9FAFB"
                      stroke-width="1.2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="content scroll">
              <div className="scroll-item" style={{ maxHeight: "90vh" }}>
                <div className="text-center">
                  <span className=" text-xs">12:33 04/04/2023</span>
                </div>
                <div>
                  {chat.map((item) => (
                    <BoxMsg data={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute border-t-gray-100 border-t-2 w-full bottom-2 p-2 bg-white">
              <div className="flex w-full gap-2 justify-center">
                <div className="w-4/5">
                  <input
                    type="text"
                    className="text-sm border-2 w-full p-1.5 rounded-lg"
                  />{" "}
                </div>

                <button className="bg-blue-500 text-white px-3 rounded-lg">
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-2 px-5 lg:px-2 lg:col-span-1 absolute lg:relative w-full bg-white h-screen lg:right-0 ${
            expand ? "right-0" : "right-[-150vw]"
          }`}
          style={{
            display: expand ? "block" : "hidden ",
            transition: "right 0.7s ease",
          }}
        >
          <div className="flex border-b-gray-100 border-b-2 py-2 justify-between">
            <div className="title">
              <span className="text-2xl font-bold">Directory</span>
            </div>
            <button
              className="font-bold block lg:hidden"
              onClick={() => setExpand(!expand)}
            >
              X
            </button>
          </div>
          <div>
            <div className="number-title">
              <span className="text-sm font-bold">Team Members</span>
            </div>
            <div className="scroll">
              <div
                className="scroll-item"
                style={{ maxHeight: seeMore ? "80vh" : "35vh" }}
              >
                {member.map((item) => (
                  <MsgItem data={item} />
                ))}
              </div>
            </div>
            <button className="text-xs underline " onClick={handleSeeMore}>
              {seeMore ? "Collapse" : "See more"}
            </button>
          </div>
          <div className="border-t-gray-100 border-t-2 my-2">
            <div className="number-title">
              <span className="text-sm font-bold">File</span>
            </div>
            <div className="scroll">
              <div
                className="scroll-item"
                style={{ maxHeight: seeMore ? "0vh" : "45vh" }}
              >
                {file.map((item) => (
                  <MsgItem data={item} />
                ))}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <ModalRoomChat hiddenModalRoom={hiddenModalRoom} handleHiddenModalRoom={handleHiddenModalRoom} />
    </article>
  );
}

export default Chat;

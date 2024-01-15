import { faSearch, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function ModalRoomChat({handleHiddenModalRoom, hiddenModalRoom}) {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleRadioClick = (buttonId) => {

    if (selectedButtons.some((item) => item.id === buttonId.id)) {
      setSelectedButtons(selectedButtons.filter((item) => item.id !== buttonId.id));
    } else {
      setSelectedButtons([...selectedButtons, buttonId]);
    }
  };

  const handleRemoveSelectUser = (item) => {
    setSelectedButtons(selectedButtons.filter((props) => item.id !== props.id))
  }

  const member = [
    {
      id: 1,
      name: "Đăng Văn Nam",
      img: "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 2,
      name: "Đăng Văn Nam",
      img: "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 3,
      name: "Đăng Văn x",
      img: "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 4,
      name: "Đăng Văn Nam",
      img: "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 5,
      name: "Đăng Văn Nam",
      img: "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 6,
      name: "Đăng Văn Nam",
      img: "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 7,
      name: "Đăng Văn Nam",
      img: "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 8,
      name: "Đăng Văn Nam",
      img: "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    {
      id: 9,
      name: "Đăng Văn Nam",
      img: "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
      content: "abc@gmail.com",
    },
    
  ];

  return (
    <div className={`absolute top-0 left-0 right-0 bottom-0 bg-[#b5b3b354] m-auto rounded-sm ${hiddenModalRoom? "block": "hidden"}`}>
      <div className="flex h-screen  " style={{ alignItems: "center" }}>
        <div className=" bg-white w-11/12 lg:w-5/12 m-auto p-4">
          <div className="title text-md font-bold pt-1.5 pb-3.5 flex justify-between">
            <span>Tạo nhóm</span>
            <button className="text-end mx-3" onClick={handleHiddenModalRoom}>
              <FontAwesomeIcon icon={faX} className="text-xs" />
            </button>
          </div>
          <hr></hr>
          <div className="new-name py-3">
            <input
              type="text"
              className="text-sm border-b-2 p-2 w-full focus-visible:border-b-2 focus-visible:outline-0"
              placeholder="Nhập tên nhóm"
            />
          </div>
          <div className="search py-2">
            <div className="border-2 w-full flex justify-between p-1 rounded-3xl">
              <FontAwesomeIcon icon={faSearch} className="font-thin p-1.5" />
              <input
                type="text"
                className=" w-full focus-visible:border-0 focus-visible:outline-0 text-sm"
                placeholder="Nhập tên, số điện thoại"
              ></input>
            </div>
          </div>
          <hr />
          <div className="group">
            <div className="title-group py-2">
              <span className="text-sm font-bold ">Danh sách người dùng</span>
              <div className="flex">
                <div className="w-full sm:w-8/12 py-1.5 scroll">
                  <div
                    className="scroll-item"
                    style={{ minHeight: "50vh", maxHeight: "55vh" }}
                  >
                    {member.map((item) => (
                      <button
                        className={`w-full flex py-2 }`}
                        onClick={() => handleRadioClick(item)}
                      >
                        <input
                          type="radio"
                          checked={selectedButtons.some((props) => props.id === item.id)}
                          onChange={() => {}}
                          onClick={() => handleRadioClick(item)}
                          className="my-auto"
                        />
                        <div className="w-10 h-10 rounded-full overflow-hidden mx-1.5">
                          <img
                            src={item.img}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                        <div className="my-auto">{item.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-4/12 border-2 py-1.5 hidden sm:block">
                  <div className="px-2">
                    <span className="text-sm font-bold">Đã chọn</span>
                  </div>
                  <div className="w-full scroll">
                    <div
                      className="scroll-item"
                      style={{ minHeight: "50vh", maxHeight: "55vh" }}
                    >
                      {selectedButtons.map((item) => (
                        <div
                          className={`w-11/12 my-2 mx-auto flex py-1 px-2 justify-between rounded-full bg-[#1da1f238]`}
                        >
                          <div className="flex ">
                            <div className="w-8 h-8 rounded-full overflow-hidden me-1.5">
                              <img
                                src={item.img}
                                alt=""
                                className="w-full h-full"
                              />
                            </div>
                            <div className="my-auto text-sm w-24 overflow-hidden text-ellipsis">
                              <span className="single-line text-xs ">
                                {item.name}
                              </span>
                            </div>
                          </div>

                          <button className="text-end" onClick={() => handleRemoveSelectUser(item)}>
                            <FontAwesomeIcon icon={faX} className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="group-btn flex justify-end my-2">
            <button className="btn bg-slate-300 px-3 py-1.5 mx-2 font-medium rounded-sm">
              Hủy
            </button>
            <button className="btn bg-blue-500 px-3 py-1.5 text-white font-medium rounded-sm">
              Tạo nhóm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalRoomChat;

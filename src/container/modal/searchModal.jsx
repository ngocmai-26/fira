import {
  faCheck,
  faUser,
  faUserPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import UserItem from "../component/UserItem";
import SearchComponent from "../component/SearchComponent";
import ButtonComponent from "../component/ButtonComponent";

function SearchModal() {
  const [searchFriend, setSearchFriend] = useState(false);

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
      name: "Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam",
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
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#b5b3b354] m-auto rounded-sm">
      <div className="flex h-screen  " style={{ alignItems: "center" }}>
        <div className=" w-11/12 lg:w-3/12 m-auto">
          <div className="icon-headerSearch flex">
            <button
              className="bg-white py-2 px-4 border rounded-tl-md rounded-tr-md"
              onClick={() => setSearchFriend(false)}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="text-lg text-gray-400"
              />
            </button>
            <button
              className="bg-white py-2 px-4 border rounded-tl-md rounded-tr-md"
              onClick={() => setSearchFriend(true)}
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                className="text-lg text-gray-400"
              />
            </button>
          </div>
          <div className={`bg-white p-2 rounded-md `}>
            <div className={`${!searchFriend ? "block" : "hidden"}`}>
              <div className="title text-md font-bold pt-1.5 pb-3.5 flex justify-between">
                <span>Tìm kiếm</span>
              </div>
              <hr></hr>
              <div className="search-content ">
                <SearchComponent placeholder="Nhập tên" />
                <div className="w-full py-1.5 scroll">
                  <div
                    className="scroll-item"
                    style={{ minHeight: "50vh", maxHeight: "55vh" }}
                  >
                    {member.map((item) => (
                      <div className={`w-full flex py-2 justify-between`}>
                        <UserItem
                          img={item.img}
                          name={item.name}
                          widthContent="max-w-64"
                        />
                        <div className="requestBtn flex my-auto">
                          <button className="text-sm  px-1 mx-1 py-1 text-gray-500">
                            <FontAwesomeIcon icon={faUserPlus} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`  ${searchFriend ? "block" : "hidden"}`}>
              <div className="title text-md font-bold pt-1.5 pb-3.5 flex justify-between">
                <span>Yêu cầu kết bạn</span>
              </div>
              <hr></hr>
              <div className="search-content">
                <div className="w-full py-1.5 scroll">
                  <div
                    className="scroll-item"
                    style={{ minHeight: "50vh", maxHeight: "62vh" }}
                  >
                    {member.map((item) => (
                      <div className={`w-full flex py-2 justify-between`}>
                        <UserItem
                          img={item.img}
                          name={item.name}
                          widthContent="max-w-40"
                        />
                        <div className="requestBtn flex my-auto">
                          <button className="text-xs px-1 mx-1 bg-red-500 py-1 text-white">
                            <FontAwesomeIcon
                              icon={faX}
                              className="text-xs"
                              style={{ marginRight: "2px" }}
                            />
                            <span>Từ chối</span>
                          </button>

                          <button className="text-xs px-1 mx-1 bg-blue-500 py-1 text-white">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-xs"
                              style={{ marginRight: "2px" }}
                            />
                            <span>Từ chối</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="group-btn flex justify-end my-2">
              <ButtonComponent
                textButton={"Đóng"}
                style={
                  "btn bg-slate-300 px-3 py-2 font-medium rounded-sm text-sm text-black"
                }
                type={"button"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;

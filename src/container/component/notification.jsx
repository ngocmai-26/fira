import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MsgItem from "./MsgItem";
import { styled } from "@mui/material";

function NotificationComponent({styles, data}) {
  // const data = [
  //   {
  //     id: 1,
  //     name: "Đăng Văn Nam",
  //     img:
  //       "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
  //     time: "12m",
  //     typeNotify: 1,
  //     content:
  //       "ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e",
  //   },
  //   {
  //     id: 2,
  //     name: "Đăng Văn Nam",
  //     img:
  //       "https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg",
  //     time: "12m",
  //     typeNotify: 2,
  //     content:
  //       "ABC Đăng Văn Nam Đăng Văn Nam Đăng Văn Nam  m Đăng Văn Nam Đăng Văn Nam Hôm qua Hôm qua em xinh quá trời Đăng Văn Nam Hôm qua e",
  //   },
  // ];
  return (
    <div className="relative notification m-auto px-3 cursor-pointer">
      <div className="notification-icon pt-1">
        <FontAwesomeIcon icon={faBell} className={styles || "text-gray-800 text-lg"} />
      </div>
      <div className="notification-content absolute w-96 h-96 z-30 bg-white shadow-md p-2 right-0">
        <div className="title-notification">
          <span className="font-bold text-md">Thông báo</span>
        </div>
        <hr />
        <div className="scroll py-3">
          <div className="scroll-item">
            {data?.map((item) => (
              <MsgItem data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationComponent;

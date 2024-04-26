import { faBell, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MsgItem from "./MsgItem";
import { styled } from "@mui/material";

function NotificationComponent({ styles, data }) {

  return (
    <div className="relative notification m-auto px-3 cursor-pointer">
      <div className="notification-icon pt-1">
        <FontAwesomeIcon
          icon={faBell}
          className={styles || "text-gray-800 text-lg"}
        />
      </div>
      <div className="notification-content absolute w-96 h-96 z-30 bg-white shadow-md p-2 right-0">
        <div className="title-notification">
          <span className="font-bold text-md">Thông báo</span>
        </div>
        <hr />
        <div className="scroll py-3">
          <div className="scroll-item h-80">
            {data?.map((item) => (
              // <MsgItem data={item} />
              <div
                className={`flex p-1 justify-between hover:bg-gray-100 rounded-md cursor-pointer`}
              >
                <div className="flex">
                  <div className="m-1">
                    <img
                      src={
                        item?.avatar
                          ? item?.avatar
                          : "https://upload.tanca.io/api/image/news/611bed5f035cef73103a6107?name=2021-08-18-000951-quan-ly-cong-viec.jpg"
                      }
                      alt=""
                      className="rounded-lg object-cover w-12 h-12 "
                    />
                  </div>
                  <div
                    className={`information px-1.5 md:max-w-36 lg:max-w-72  ${
                      item?.typeNotify === 1 ? "text-gray-400" : ""
                    }`}
                  >
                    <div
                      className={`information-name ${
                        item?.content ? "block" : "hidden"
                      }`}
                    >
                      <span className="font-medium">{item?.content}</span>
                    </div>
                    <div
                      className={`information-chat overflow-hidden text-ellipsis max-w-64 text-start`}
                    >
                      <span className="text-xs font-medium single-line ">
                        Bạn đã được giao việc từ {item?.from?.fullName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationComponent;

import { faBell, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { readNotification } from "../../thunks/NotificationThunk";

function NotificationComponent({ styles, data }) {
  const unreadCount = data?.filter((item) => item?.read === false).length;
  const dispatch = useDispatch();

  const handleReadNotification = (item) => {
    dispatch(readNotification(item));
  };

  return (
    <div className="relative notification m-auto px-3 cursor-pointer">
      <div className="notification-icon pt-1">
        <FontAwesomeIcon
          icon={faBell}
          className={styles || "text-gray-800 text-lg"}
        />
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {unreadCount ? unreadCount : 0}
        </div>
      </div>
      <div className="notification-content absolute w-96 h-96 z-30 bg-white shadow-md p-2 right-0">
        <div className="title-notification">
          <span className="font-bold text-md">Thông báo</span>
        </div>
        <hr />
        <div className="scroll py-3">
          <div className="scroll-item h-80">
            {data
              ?.slice()
              .reverse()
              .map((item) => (
                // <MsgItem data={item} />
                <div
                  key={item.id}
                  className={`flex p-1 justify-between hover:bg-gray-100 rounded-md cursor-pointer ${
                    item.read ? "" : "bg-gray-200"
                  }`}
                  onClick={() => handleReadNotification(item.id)}
                >
                  <div className="flex">
                    <div className="m-1">
                      <img
                        src={
                          item?.type === 1
                            ? "https://cdn1.iconfinder.com/data/icons/ui-colored-2-of-3/100/UI_2__1-512.png"
                            : item?.type === 2
                            ? "https://upload.tanca.io/api/image/news/611bed5f035cef73103a6107?name=2021-08-18-000951-quan-ly-cong-viec.jpg"
                            : item?.type === 3
                            ? "https://freepngimg.com/save/97427-logo-chat-png-file-hd/640x492"
                            : ""
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
                        className={`information-name text-left ${
                          item?.content ? "block" : "hidden"
                        }`}
                      >
                        <span className="font-medium">{item?.content}</span>
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

import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NotificationComponent() {
    return ( 
        <div className="relative notification m-auto px-3 cursor-pointer">
              <div className="notification-icon">
                <FontAwesomeIcon icon={faBell} className="text-gray-500 text-lg" />
              </div>
              <div className="notification-content absolute w-80 h-96 z-30 bg-white shadow-md p-2">
                <div className="title-notification">
                  <span className="font-bold text-sm">Thông báo</span>
                </div>
                <hr />
                <div className="scroll">

                  <div className="scroll-item">

                  </div>
                </div>
              </div>
            </div>
     );
}

export default NotificationComponent;
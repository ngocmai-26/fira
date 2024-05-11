import { Link } from "react-router-dom";
import logo from "../../asset/images/logo.png";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../slices/AuthSlice";
import NotificationComponent from "../component/Notification";
import { useEffect, useState } from "react";
import { getAllNotification } from "../../thunks/NotificationThunk";

function HeaderAdmin() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer);
  const { notifications } = useSelector((state) => state.notificationReducer);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  useEffect(() => {
    if (notifications?.length <= 0) {
      dispatch(getAllNotification());
    }
  }, []);

  const [readNotifications, setReadNotifications] = useState([]);

  const handleNotificationClick = (notificationId) => {
    // Kiểm tra xem notificationId đã được thêm vào danh sách đã đọc chưa
    if (!readNotifications.includes(notificationId)) {
      setReadNotifications([...readNotifications, notificationId]);
    }
  };

  return (
    <header className="relative bg-white">
      <div className="flex items-center justify-between p-2 border-b">
        <a
          href="index.html"
          className="inline-block text-2xl font-bold tracking-wider uppercase text-primary-dark p-2"
        >
          <img src={logo} alt="" className="h-10" />
        </a>

        <div className="inline-block text-2xl font-bold tracking-wider uppercase text-primary-dark"></div>

        <nav
          aria-label="Secondary"
          className="hidden space-x-2 md:flex md:items-center"
        >
          <button className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 -dar focus:outline-none focus:bg-primary-100 focus:ring-primary-darker">
            <span className="sr-only">Open Notification panel</span>

            <NotificationComponent
              styles={"text-2xl"}
              data={notifications}
            />
          </button>

          <div className="relative account ">
            <button
              type="button"
              aria-haspopup="true"
              className="transition-opacity duration-200 rounded-full focus:outline-none focus:ring"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={user?.avatar}
                alt="Ahmed Kamel"
              />
            </button>

            <div className="absolute menu-account right-0 w-48 py-1 bg-white rounded-md shadow-lg top-10 ring-1 ring-black  focus:outline-none">
              <Link
                to="/tai-khoan"
                role="menuitem"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
              >
                Your Profile
              </Link>
              <a
                href="#"
                role="menuitem"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
              >
                Settings
              </a>
              <a
                href="#"
                role="menuitem"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          </div>
        </nav>

        <nav
          className=" flex items-center p-4 bg-white rounded-md top-16 inset-x-4 md:hidden"
          aria-label="Secondary"
        >
          <div className="space-x-2">
            <NotificationComponent
              styles={"text-2xl"}
              data={notifications}
            />
          </div>

          <div className="relative account ">
            <button
              type="button"
              aria-haspopup="true"
              className="transition-opacity duration-200 rounded-full focus:outline-none focus:ring"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={user?.avatar}
                alt={user?.fullName}
              />
            </button>

            <div className="absolute menu-account right-0 w-48 py-1 bg-white rounded-md shadow-lg top-10 ring-1 ring-black  focus:outline-none">
              <Link
                to="/tai-khoan"
                role="menuitem"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
              >
                Your Profile
              </Link>
              <a
                href="#"
                role="menuitem"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
              >
                Settings
              </a>
              <a
                href="#"
                role="menuitem"
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HeaderAdmin;

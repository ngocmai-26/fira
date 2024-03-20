import { Link } from "react-router-dom";
import logo from "../../asset/images/logo.png";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../slices/AuthSlice";

function HeaderAdmin() {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.authReducer);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
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
            <svg
              className="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <button className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 -dar focus:outline-none focus:bg-primary-100 focus:ring-primary-darker">
            <span className="sr-only">Open settings panel</span>
            <svg
              className="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
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
            <button className="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 -dar focus:outline-none focus:bg-primary-100 focus:ring-primary-darker">
              <span className="sr-only">Open notifications panel</span>
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>

          <div className="relative  ml-auto" x-data="{ open: false }">
            <button
              type="button"
              aria-haspopup="true"
              className="block transition-opacity duration-200 rounded-full focus:outline-none focus:ring"
            >
              <span className="sr-only">User menu</span>
              <img
                className="w-10 h-10 rounded-full"
                src="build/images/avatar.jpg"
                alt="Ahmed Kamel"
              />
            </button>

            <div
              className="absolute  right-0 w-48 py-1 origin-top-right bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-"
              role="menu"
              aria-orientation="vertical"
              aria-label="User menu"
            >
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

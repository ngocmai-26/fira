import { faCalendar, faChartPie, faComment, faCommentAlt, faCommentDots, faComments, faListCheck, faMessage, faUserPen, faUsers, faUsersGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function NavBarAdmin() {
  return (
    <aside class="flex-shrink-0 w-12 hover:w-56 bg-white navHome border-r">
      <div class="flex flex-col h-full ">
        <nav aria-label="Main" class="flex-1 px-2 py-4 space-y-2  mt-10">
          <div  className="py-3">

          <div className="navItem ">
            <Link to="/"
              class="flex items-center py-4 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100 "
            >
              <FontAwesomeIcon icon={faChartPie} />
              <span class="ml-2 text-sm nav-item-text"> Dashboards </span>
            
            </Link>
          </div>

          <div className="navItem">
            <Link to=""
              class="flex items-center py-4 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <FontAwesomeIcon icon={faUsers} />
              <span class="ml-2 text-sm nav-item-text single-line"> Quản lý tài khoản </span>
            
            </Link>
          </div>

          <div className="navItem">
            <Link to=""
              class="flex items-center py-4 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <FontAwesomeIcon icon={faListCheck} />
              <span class="ml-2 text-sm nav-item-text single-line"> Quản lý công việc </span>
             
            </Link>
          </div>
          <div className="navItem">
            <Link to=""
              class="flex items-center py-4 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <FontAwesomeIcon icon={faCalendar} />
              <span class="ml-2 text-sm nav-item-text single-line"> Quản lý lịch làm việc </span>
            
            </Link>
          </div>
          <div className="navItem">
            <Link to=""
              class="flex items-center py-4 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <FontAwesomeIcon icon={faUserPen} />
              <span class="ml-2 text-sm nav-item-text single-line"> Quản lý lịch chức vụ </span>
            
            </Link>
          </div>
          <div className="navItem">
            <Link to=""
              class="flex items-center py-4 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <FontAwesomeIcon icon={faUsersGear} />
              <span class="ml-2 text-sm nav-item-text single-line"> Quản lý lịch chức năng </span>
            
            </Link>
          </div>

          <div className="navItem">
            <Link to="/chat"
              class="flex items-center py-4 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100  hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <span aria-hidden="true">
                <FontAwesomeIcon icon={faComments} />
              </span>
              <span class="ml-2 text-sm nav-item-text single-line"> Tin nhắn </span>
             
            </Link>
          </div>
          </div>
        </nav>

        <div class="flex-shrink-0 px-2 py-4 space-y-2">
          <button
            type="button"
            class="flex items-center justify-center w-full px-4 py-2 text-sm text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-dark focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
          >
            <span aria-hidden="true">
              <svg
                class="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </span>
            <span>Customize</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default NavBarAdmin;

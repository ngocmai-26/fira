function NavBarAdmin() {
  return (
    <aside class="flex-shrink-0 hidden w-12 hover:w-56 bg-white navHome border-r  md:block">
      <div class="flex flex-col h-full ">
        <nav aria-label="Main" class="flex-1 px-2 py-4 space-y-2  mt-10">
          <div  className="py-3">

          <div className="py-2 ">
            <a
              href="#"
              class="flex items-center py-3 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100 "
            >
              <span aria-hidden="true">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span class="ml-2 text-sm nav-item-text"> Dashboards </span>
            
            </a>
          </div>

          <div className="">
            <a
              href="#"
              class="flex items-center py-3 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <span aria-hidden="true">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </span>
              <span class="ml-2 text-sm nav-item-text"> Components </span>
            
            </a>
          </div>

          <div className="">
            <a
              href="#"
              class="flex items-center py-3 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <span aria-hidden="true">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span class="ml-2 text-sm nav-item-text"> Pages </span>
             
            </a>
          </div>
          <div className="">
            <a
              href="#"
              class="flex items-center py-3 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <span aria-hidden="true">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span class="ml-2 text-sm nav-item-text"> Authentication </span>
            
            </a>
          </div>

          <div className="">
            <a
              href="#"
              class="flex items-center py-3 px-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100  hover:bg-gray-100"
              role="button"
              aria-haspopup="true"
            >
              <span aria-hidden="true">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </span>
              <span class="ml-2 text-sm nav-item-text"> Layouts </span>
             
            </a>
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

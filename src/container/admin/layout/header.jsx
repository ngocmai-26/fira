function HeaderAdmin() {
    return ( 
     
        <header class="relative bg-white">
            <div class="flex items-center justify-between p-2 border-b">
              <button
                class="p-1 transition-colors duration-200 rounded-md text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 md:hidden focus:outline-none focus:ring"
              >
                <span class="sr-only">Open main manu</span>
                <span aria-hidden="true">
                  <svg
                    class="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </span>
              </button>

              <div
                class="inline-block text-2xl font-bold tracking-wider uppercase text-primary-dark"
              >
              </div>

              <button
                class="p-1 transition-colors duration-200 rounded-md text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 -dar md:hidden focus:outline-none focus:ring"
              >
                <span class="sr-only">Open sub manu</span>
                <span aria-hidden="true">
                  <svg
                    class="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </span>
              </button>

              <nav aria-label="Secondary" class="hidden space-x-2 md:flex md:items-center">
              
                <button
                  class="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 -dar focus:outline-none focus:bg-primary-100 focus:ring-primary-darker"
                >
                  <span class="sr-only">Open Notification panel</span>
                  <svg
                    class="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <button
                  class="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 -dar focus:outline-none focus:bg-primary-100 focus:ring-primary-darker"
                >
                  <span class="sr-only">Open settings panel</span>
                  <svg
                    class="w-7 h-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>


                <div class="relative account">
                  <button
                    type="button"
                    aria-haspopup="true"
                    
                    class="transition-opacity duration-200 rounded-full focus:outline-none focus:ring"
                  >
                    <span class="sr-only">User menu</span>
                    <img class="w-10 h-10 rounded-full" src="build/images/avatar.jpg" alt="Ahmed Kamel" />
                  </button>


                  <div
                    class="absolute menu-account right-0 w-48 py-1 bg-white rounded-md shadow-lg top-10 ring-1 ring-black  focus:outline-none"
           
                  >
                    <a
                      href="#"
                      role="menuitem"
                      class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </nav>


              <nav
                
                class="absolute flex items-center p-4 bg-white rounded-md shadow-lg top-16 inset-x-4 md:hidden"
                aria-label="Secondary"
              >
                <div class="space-x-2">
                    
                  <button aria-hidden="true" class="relative focus:outline-none" x-cloak
                  >
                    <div
                      class="w-12 h-6 transition rounded-full outline-none bg-primary-100"
                    ></div>
                    <div
                      class="absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 transform scale-110 rounded-full shadow-sm"
                     
                    >
                      <svg
                        x-show="!isDark"
                        class="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                      <svg
                        x-show="isDark"
                        class="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                  </button>

                  <button
                
                    class="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 -dar focus:outline-none focus:bg-primary-100 focus:ring-primary-darker"
                  >
                    <span class="sr-only">Open notifications panel</span>
                    <svg
                      class="w-7 h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>

                  <button
                   
                    class="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 -dar focus:outline-none focus:bg-primary-100 focus:ring-primary-darker"
                  >
                    <span class="sr-only">Open search panel</span>
                    <svg
                      class="w-7 h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>

                  <button
                  
                    class="p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 -dar focus:outline-none focus:bg-primary-100 focus:ring-primary-darker"
                  >
                    <span class="sr-only">Open settings panel</span>
                    <svg
                      class="w-7 h-7"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>

                <div class="relative ml-auto" x-data="{ open: false }">
                  <button
                    type="button"
                    aria-haspopup="true"
                    class="block transition-opacity duration-200 rounded-full focus:outline-none focus:ring"
                  >
                    <span class="sr-only">User menu</span>
                    <img class="w-10 h-10 rounded-full" src="build/images/avatar.jpg" alt="Ahmed Kamel" />
                  </button>

                  <div
                    class="absolute right-0 w-48 py-1 origin-top-right bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-"
                    role="menu"
                    aria-orientation="vertical"
                    aria-label="User menu"
                  >
                    <a
                      href="#"
                      role="menuitem"
                      class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 "
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </nav>
            </div>
            <div
              class="border-b md:hidden "
              x-show="isMobileMainMenuOpen"
            >
              <nav aria-label="Main" class="px-2 py-4 space-y-2">
                
                <div x-data="{ isActive: true, open: true}">
                  <a
                    href="#"
                    class="flex items-center p-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 "
             
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
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </span>
                    <span class="ml-2 text-sm"> Dashboards </span>
                    <span class="ml-auto" aria-hidden="true">
                      <svg
                        class="w-4 h-4 transition-transform transform"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </a>
                  <div role="menu" x-show="open" class="mt-2 space-y-2 px-7" aria-label="Dashboards">
                    
                    <a
                      href="index.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Default
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Project Mangement (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      E-Commerce (soon)
                    </a>
                  </div>
                </div>

                <div x-data="{ isActive: false, open: false }">
                  <a
                    href="#"
                    class="flex items-center p-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 "
    
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
                    <span class="ml-2 text-sm"> Components </span>
                    <span aria-hidden="true" class="ml-auto">
                      <svg
                        class="w-4 h-4 transition-transform transform"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </a>
                  <div x-show="open" class="mt-2 space-y-2 px-7" role="menu" arial-label="Components">
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Alerts (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Buttons (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Cards (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Dropdowns (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Forms (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Lists (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Modals (soon)
                    </a>
                  </div>
                </div>

                <div x-data="{ isActive: false, open: false }">
                  <a
                    href="#"
                    class="flex items-center p-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 "
         
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
                    <span class="ml-2 text-sm"> Pages </span>
                    <span aria-hidden="true" class="ml-auto">
                      <svg
                        class="w-4 h-4 transition-transform transform"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </a>
                  <div x-show="open" class="mt-2 space-y-2 px-7" role="menu" arial-label="Pages">
                    <a
                      href="pages/blank.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Blank
                    </a>
                    <a
                      href="pages/404.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      404
                    </a>
                    <a
                      href="pages/500.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      500
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Profile (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Pricing (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Kanban (soon)
                    </a>
                    <a
                      href="#"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Feed (soon)
                    </a>
                  </div>
                </div>

                <div x-data="{ isActive: false, open: false}">
                  <a
                    href="#"
                    class="flex items-center p-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 "

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
                    <span class="ml-2 text-sm"> Authentication </span>
                    <span aria-hidden="true" class="ml-auto">
                      <svg
                        class="w-4 h-4 transition-transform transform"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </a>
                  <div x-show="open" class="mt-2 space-y-2 px-7" role="menu" aria-label="Authentication">
                    <a
                      href="auth/register.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Register
                    </a>
                    <a
                      href="auth/login.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Login
                    </a>
                    <a
                      href="auth/forgot-password.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Forgot Password
                    </a>
                    <a
                      href="auth/reset-password.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Reset Password
                    </a>
                  </div>
                </div>

                <div x-data="{ isActive: false, open: false}">
                  <a
                    href="#"
                    class="flex items-center p-2 text-gray-500 transition-colors rounded-md hover:bg-primary-100 "
               
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
                    <span class="ml-2 text-sm"> Layouts </span>
                    <span aria-hidden="true" class="ml-auto">
                      <svg
                        class="w-4 h-4 transition-transform transform"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </a>
                  <div x-show="open" class="mt-2 space-y-2 px-7" role="menu" aria-label="Layouts">
                    <a
                      href="layouts/two-columns-sidebar.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Two Columns Sidebar
                    </a>
                    <a
                      href="layouts/mini-plus-one-columns-sidebar.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Mini + One Columns Sidebar
                    </a>
                    <a
                      href="layouts/mini-column-sidebar.html"
                      role="menuitem"
                      class="block p-2 text-sm text-gray-400 transition-colors duration-200 rounded-md hover:text-gray-700"
                    >
                      Mini Column Sidebar
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </header>
     );
}

export default HeaderAdmin;
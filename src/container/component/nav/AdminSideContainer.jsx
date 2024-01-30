export const AdminSideContainer = (props) => {
  return (
    <aside className="flex-shrink-0 w-12 hover:w-56 bg-white navHome border-r">
      <div className="flex flex-col h-full">
        <nav aria-label="Main" className="flex-1 px-2 py-4 space-y-2  mt-10">
          <div className="py-3 flex flex-col h-85 overflow-hidden">
            {props.children}
          </div>
        </nav>

        <div className="flex-shrink-0 px-2 py-4 space-y-2">
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 text-sm text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-dark focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
          >
            <span aria-hidden="true">
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
};

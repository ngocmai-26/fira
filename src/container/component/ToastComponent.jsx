function ToastComponent({ isHidden, title, content, buttonContent }) {
  return (
    <div
      id="drawer-delete-product-default"
      className={`fixed top-0  center z-40 h-screen overflow-y-auto  w-full  dark:bg-gray-800 flex justify-center ${
        isHidden ? "block" : "hidden"
      }`}
    >
      <div className="m-auto  max-w-sm bg-white p-8 shadow-lg border rounded-lg">
        <h5
          id="drawer-label"
          className="inline-flex items-center text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          {title}
        </h5>
        <button
          type="button"
          data-drawer-dismiss="drawer-delete-product-default"
          aria-controls="drawer-delete-product-default"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <h3 className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          {content}
        </h3>
        <div className="flex justify-end">
          {buttonContent.map((item) => (
            <a
              href="#"
              className={`text-white  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2.5 text-center mr-2 ${item.buttonStyle}`}
            >
              {item.buttonName}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToastComponent;

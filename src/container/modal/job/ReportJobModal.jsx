function ReportJobModel({handleHiddenReport, report}) {
    return ( 
        <div
        className={`fixed left-0 right-0 z-50 items-center justify-center flex overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="new-task-modal"
      >
        <div className="relative w-full h-full max-w-5xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">
                Báo cáo tiến độ công việc
              </h3>
              <button
                type="button"
                onClick={() => handleHiddenReport()}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="add-user-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <form action="#">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <div className="">
                    <div className="grid grid-cols-1 ">
                      <div className="md:col-span-2 ">
                        <div className="information-plan mt-2">
                          <div className="flex justify-between">
                            <textarea
                              className="input_todo w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                              // value={todo}
                              rows="7"
                              placeholder="Công việc đã hoàn thành"
                              // onChange={(e) => setTodo(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="information-plan mt-2">
                          <div className="">
                            <label htmlFor="mucdo" className="text-xs">
                              Đường dẫn tải liệu báo cáo
                            </label>
                            <input
                              id="mucdo"
                              type="text"
                              className="input_todo shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 w-full block p-2"
                              // value={isLink}
                              // onChange={(e) => setIsLink(e.target.value)}
                            />
                          </div>
                          <div className="">
                            <label htmlFor="mucdo" className="text-xs">
                              Cập nhật mức độ hoàn thành
                            </label>
                            <input
                              id="mucdo"
                              type="number"
                              className="input_todo shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                              // value={target}
                              // onChange={(e) => setTarget(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="items-center py-4 border-gray-200 rounded-b text-right">
                  <button
                    className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                    type="button"
                    // onClick={() => handleSubmit()}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
     );
}

export default ReportJobModel;
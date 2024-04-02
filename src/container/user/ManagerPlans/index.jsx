import { Link } from "react-router-dom";
import Layout from "../../layout";
import { useState } from "react";

function LayoutPlan({ children }) {
  const [isHiddenCreate, setIsHiddenCreate] = useState(true);
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };
  return (
    <Layout>
      <div className="header-kpi p-4">
        <div className="title ">
          <a href="#" className="text-xl font-bold uppercase">
            Kế hoạch công việc
          </a>
        </div>

        <div className="notes">
          <div className="block sm:flex bg-white mt-4 justify-between">
            <ul className="flex  font-medium flex-row my-auto">
              <li className="hover:bg-gray-50 mt-0 px-2">
                <Link
                  to="/note-list"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full"
                >
                  Kế hoạch công việc
                </Link>
              </li>
              <li className="hover:bg-gray-50 mt-0 px-2">
                <Link
                  to="/note-done"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full"
                >
                  Đã hoàn thành
                </Link>
              </li>
            </ul>
            <form className="sm:pr-3 px-4 sm:px-0" action="#" method="GET">
              <label htmlFor="accounts-search" className="sr-only">
                Tìm kiếm
              </label>
              <div className="relative w-full  mt-1 sm:w-64 py-2">
                <input
                  type="text"
                  name="search"
                  id="accounts-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                  placeholder="Tìm kiếm"
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="bg-gray-100 py-4 flex justify-between">
            <div className="">
              <button
                className="bg-gray-800 text-sm rounded-md text-white py-1 px-4"
                onClick={() => handleHiddenCreate()}
              >
                + Thêm mới
              </button>
            </div>
            <div className="pe-2">
              <select
                id="category-create"
                //  onChange={(e) => setFilterType(e.target.value)}
                //  value={filterType? filterType: "0"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
              >
                <option value="0" selected="">
                  Thuộc
                </option>
                <option value="1">Công việc</option>
                <option value="2">KPI</option>
              </select>
            </div>
          </div>
          {children}
        </div>
        <div
          className={`fixed left-0 right-0 z-50 items-center justify-center ${
            isHiddenCreate ? "hidden" : "flex"
          } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
          id="new-task-modal"
        >
          <div className="relative w-full h-full max-w-xl m-auto px-4 md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold">Kế hoạch mới</h3>
                <button
                  type="button"
                  onClick={() => handleHiddenCreate()}
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
                  <div className="grid grid-cols-1 ">
                    <div className="md:col-span-2 ">
                      <div className="due">
                        <div className="grid grid-cols-1 md:grid-cols-5 sm:grid-cols-4 justify-between">
                          <div className="md:col-span-3 sm:col-span-2">
                            <label
                              htmlFor="category-create"
                              className="block mb-2 text-xs font-medium text-gray-900"
                            >
                              Thuộc
                            </label>
                            <select
                              id="category-create"
                              // onChange={(e) =>
                              //   setNewPlanDetail({
                              //     ...newPlanDetail,
                              //     planType: +e.target.value,
                              //   })
                              // }
                              // value={
                              //   newPlanDetail?.planType
                              //     ? newPlanDetail?.planType
                              //     : 0
                              // }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                            >
                              <option value="0" selected=""></option>
                              <option value="1">Công việc</option>
                              <option value="2">KPI</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="category-create"
                              className="block mb-2 text-xs font-medium text-gray-900 "
                            >
                              Tiêu đề kế hoạch
                            </label>
                            <div className="grid grid-cols-2">
                              <input
                                type="date"
                                name=""
                                //   onChange={(e) =>
                                //     setNewPlanDetail({
                                //       ...newPlanDetail,
                                //       timeStart: e.target.value,
                                //     })
                                //   }
                                //   value={
                                //     newPlanDetail?.timeStart
                                //       ? newPlanDetail?.timeStart
                                //       : ""
                                //   }
                                id="timeStart"
                                className="shadow-sm bg-gray-50  border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                                required
                              />
                              <input
                                type="date"
                                name=""
                                //   onChange={(e) =>
                                //     setNewPlanDetail({
                                //       ...newPlanDetail,
                                //       timeEnd: e.target.value,
                                //     })
                                //   }
                                //   value={
                                //     newPlanDetail?.timeEnd
                                //       ? newPlanDetail?.timeEnd
                                //       : ""
                                //   }
                                //   min={currentDate}
                                id="timeEnd"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="information-plan mt-2">
                        <input
                          type="text"
                          name="title"
                          // onChange={(e) =>
                          //   setNewPlan({ ...newPlan, title: e.target.value })
                          // }
                          // value={newPlan?.title ? newPlan?.title : ""}
                          id="title"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                          placeholder="Title"
                          required
                        />
                      </div>
                      <div className="information-plan mt-2">
                        <input
                          type="text"
                          name="description"
                          // onChange={(e) =>
                          //   setNewPlanDetail({
                          //     ...newPlanDetail,
                          //     description: e.target.value,
                          //   })
                          // }
                          // value={
                          //   newPlanDetail?.description
                          //     ? newPlanDetail?.description
                          //     : ""
                          // }
                          id="description"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                          placeholder="Mô tả công việc"
                          required
                        />
                      </div>

                      <div className="information-plan mt-2">
                        <div className="flex justify-between">
                          <input
                            className="input_todo w-10/12 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                            placeholder="Chi tiết kế hoạch"
                            //   onChange={(e) => setTodo(e.target.value)}
                            //   value={todo}
                            required
                          />
                          <button
                            //   onClick={handleSubmit}
                            type="button"
                            className="btn-todo text-sm bg-green-300 text-white font-medium rounded-sm px-3 py-1 text-center"
                          >
                            Thêm
                          </button>
                        </div>

                        <div className="list-todo py-2">
                          <ul>
                            {/* {state.map((item, key) => (
                                <li
                                  key={key}
                                  className="todo-item justify-between flex py-0.5 border-b-gray-100 border-b-2"
                                >
                                  <span className="text-sm">{item}</span>
                                  <span
                                    className="todo-exit cursor-pointer"
                                    onClick={() => deleteJob(item)}
                                  >
                                    &times;
                                  </span>
                                </li>
                              ))} */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="items-center py-4 border-gray-200 rounded-b text-right">
                    <button
                      className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                      type="button"
                      // onClick={handleAddPlan}
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LayoutPlan;

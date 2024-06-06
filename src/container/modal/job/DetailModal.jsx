import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useLayoutEffect } from "react";
import { getAllUsers } from "../../../thunks/UsersThunk";
import { Link } from "react-router-dom";
import moment from "moment";
import { priorities } from "../../../constants/fakeData";

function JobDetailModal({setHiddenJobDetail}) {
  const { singleJob } = useSelector((state) => state.jobsReducer);
  const { allUser } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (allUser?.length <= 0) {
      dispatch(getAllUsers());
    }
  }, []);
  return (
    <div
      className={`fixed left-0 right-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full `}
      id="new-task-modal"
    >
      <div className="relative w-full h-full max-w-xl m-auto px-4 md:h-auto">
        <div className="relative bg-white rounded-lg shadow "  style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)',
          }}>
          <div className="flex  justify-between pt-5 rounded-t ">
            <div className="text-center w-[95%]"> 
            <h3 className="text-xl font-semibold ">
              {singleJob?.title}
            </h3>
            </div>
            <button
              type="button"
              onClick={() =>setHiddenJobDetail(false)}
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
          <div className="content pb-5  border-b">
            <div className="flex justify-center gap-2">
              <div className="text-xs">
                Từ: {" "}
                <span className="text-xs text-red-400">
                  {moment(singleJob?.jobDetail?.timeStart).format("DD-MM-YYYY")}
                </span>
              </div>
              <div className="text-xs">
                Đến: {" "}
                <span className="text-xs text-red-400">
                  {moment(singleJob?.jobDetail?.timeEnd).format("DD-MM-YYYY")}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <form action="#">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4   h-full">
                <div className="md:col-span-4 lg:border-b-2 lg:border-gray-300">
                  <div className="information-plan">
                    <div className="text-sm py-1">
                      <span className=""> Mức độ : {" "}</span>
                      <span className="text-gray-400">
                        {priorities.find(
                          (priority) => priority.id === singleJob?.priority
                        )?.name || "Không xác định"}
                      </span>
                    </div>
                    <div className="text-sm py-1">
                      Tổng điểm:
                      <span className="text-gray-400">
                        {" "}
                        {singleJob?.pointPerJob || "Chưa có trạng thái nào"}
                      </span>
                    </div>
                    <div className="text-sm py-1">
                      Chỉ tiêu công việc
                      <div className="text-gray-400">
                        {" "}
                        {singleJob?.jobDetail?.target || "Công việc chưa có chỉ tiêu đề ra"}
                      </div>
                    </div>
                    <div className="text-sm py-1">
                      Mô tả công việc
                      <div className="text-gray-400">
                        {" "}
                        {singleJob?.jobDetail?.description}
                      </div>
                    </div>
                    <div className="text-sm py-1">
                      Link công việc
                      <div className="text-gray-400">
                        {" "}
                        {singleJob?.jobDetail?.verifyLink || "Hiện chưa có thêm thông tin nào của công việc"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 h-full lg:border-e-2 lg:border-gray-300 px-3 mt-4">
                  <span className="text-sm font-medium">Phân công</span>
                  <hr />

                  <div className="users-selection-list-wrapper py-2 h-64 overscroll-y-none overflow-y-auto overflow-hidden">
                    <div className="h-auto ">
                      {singleJob?.userJobs?.map((item) =>
                        allUser?.some((user) => user?.id === item?.user?.id) ? (
                          <button
                            type="button"
                            className={`users-item flex py-1 px-2 w-full text-left `}
                            // className="users-item flex py-1 px-2 w-full text-left w-100"
                          >
                            <div className="avatar w-2/12 me-2 ">
                              <img
                                src={item?.user?.avatar}
                                alt=""
                                className=" w-8 h-8  rounded-full"
                              />
                            </div>
                            <div className="name w-8/12 my-auto">
                              <span className="text-xs ">{item?.user?.fullName}</span>
                            </div>
                          </button>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 h-full px-3  mt-4">
                  <span className="text-sm font-medium">
                    Người chịu trách nhiệm
                  </span>
                  <hr />

                  <div className="users-selection-list-wrapper py-2 h-64 overscroll-y-none overflow-y-auto overflow-hidden">
                    <div className="h-auto ">
                      {allUser?.some(
                        (user) => user.id === singleJob?.manager?.id
                      ) ? (
                        <button
                          type="button"
                          className={`users-item flex py-1 px-2 w-full text-left `}
                          // className="users-item flex py-1 px-2 w-full text-left w-100"
                        >
                          <div className="avatar w-2/12  me-2 ">
                            <img
                              src={singleJob?.manager?.avatar}
                              alt=""
                              className=" w-8 h-8  rounded-full"
                            />
                          </div>
                          <div className="name w-8/12 my-auto">
                            <span className="text-xs ">
                              {singleJob?.manager?.fullName}
                            </span>
                          </div>
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center p-6 border-gray-200 rounded-b text-right">
                {/* <div className="flex items-center mb-4 justify-end">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
                />
                <label
                  for="default-checkbox"
                  className="ms-2 text-xs font-medium text-gray-900 "
                >
                  Lưu công việc
                </label>
              </div> */}
                <div className="text-xs text-gray-500">
                  Ngày tạo:{" "}
                  <span>
                    {moment(singleJob?.createdAt).format("DD-MM-YYYY")}
                  </span>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailModal;

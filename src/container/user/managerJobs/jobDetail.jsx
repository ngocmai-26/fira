import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../component/FormField";
import { useLayoutEffect } from "react";
import { getAllUsers } from "../../../thunks/UsersThunk";
import { Link } from "react-router-dom";
import moment from "moment";
import { priorities } from "../../../constants/fakeData";

function JobDetail() {
  const { singleJob } = useSelector((state) => state.jobsReducer);
  const { allUser } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (allUser?.length <= 0) {
      dispatch(getAllUsers());
    }
  }, []);
  return (
    <div className="relative w-full h-full max-w-6xl m-auto px-4 md:h-auto">
      <div className="relative bg-white  ">
        <div className=" items-start w-full justify-center p-5 border-b rounded-t text-center">
          <div className="py-2">
            <h3 className="text-2xl font-semibold uppercase ">
              <span className=" font-bold">{singleJob?.title}</span>
            </h3>
          </div>
          <div className="flex justify-center gap-2">
            <div className="text-sm">
              Từ:
              <span className="text-sm text-red-400">
                {moment(singleJob?.jobDetail?.timeStart).format("DD-MM-YYYY")}
              </span>
            </div>
            <div className="text-sm">
              Đến:
              <span className="text-sm text-red-400">
                {moment(singleJob?.jobDetail?.timeEnd).format("DD-MM-YYYY")}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <form action="#">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
              <div className="md:col-span-2 ">
               
               
                <div className="information-plan mt-2">
                 
                  <div className="text-sm py-1">
                    Mức độ:
                    <span className="text-red-400">{priorities.find(priority => priority.id === singleJob?.priority)?.name || "Không xác định"}</span>
                  </div>
                  <div className="text-sm py-1">
                    Trạng thái:
                    <span className="text-red-400">
                      {" "}
                      {singleJob?.status || "Chưa có trạng thái nào"}
                    </span>
                  </div>
                  <div className="text-sm py-1">
                    Tổng điểm:
                    <span className="text-red-400">
                      {" "}
                      {singleJob?.pointPerJob || "Chưa có trạng thái nào"}
                    </span>
                  </div>
                  <div className="text-sm py-1">
                    Tổng KPI:
                    <span className="text-red-400"> {singleJob?.kpiCount}</span>
                  </div>
                  <div className="text-sm py-1">
                    Chi tiết công việc
                    <div className="text-red-400">
                      {" "}
                      {singleJob?.jobDetail?.description}
                    </div>
                  </div>
                  <div className="text-sm py-1">
                    Link công việc
                    <div className="text-red-400">
                      {" "}
                      {singleJob?.jobDetail?.verifyLink}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full">
                <span className="text-xs font-medium">Phân công</span>
                <hr />

                <div className="users-selection-list-wrapper py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                  <div className="h-auto ">
                    {singleJob?.staffs?.map((item) =>
                      allUser.some((user) => user.id === item.id) ? (
                        <button
                          type="button"
                          className={`users-item flex py-1 px-2 w-full text-left `}
                          // className="users-item flex py-1 px-2 w-full text-left w-100"
                        >
                          <div className="avatar w-2/12 ">
                            <img
                              src={item?.avatar}
                              alt=""
                              className=" w-8 h-8  rounded-full"
                            />
                          </div>
                          <div className="name w-8/12 my-auto">
                            <span className="text-xs ">{item.fullName}</span>
                          </div>
                        </button>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="h-full">
                <span className="text-xs font-medium">
                  Người chịu trách nhiệm
                </span>
                <hr />

                <div className="users-selection-list-wrapper py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                  <div className="h-auto ">
                    {allUser.some(
                      (user) => user.id === singleJob?.manager?.id
                    ) ? (
                      <button
                        type="button"
                        className={`users-item flex py-1 px-2 w-full text-left `}
                        // className="users-item flex py-1 px-2 w-full text-left w-100"
                      >
                        <div className="avatar w-2/12 ">
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
              <Link
                className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                type="button"
                onClick={() => {
                  window.history.back();
                }}
              >
                Quay lại
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;

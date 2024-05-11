import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
function DetailPlanModal({ handleGetPlanById }) {
  const { allPlan, singlePlan } = useSelector((state) => state.plansReducer);

  return (
    <div
      className={`fixed left-0 right-0 z-100 items-center justify-center flex overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
      id="new-task-modal"
    >
      <div className="relative w-full h-full max-w-5xl m-auto px-4 md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold">{singlePlan?.title}</h3>
            <button
              type="button"
              onClick={() => handleGetPlanById()}
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
              <div className="grid grid-cols-2 ">
                <div className="">
                  <div className="due">
                    <div className="justify-between">
                      <div className="flex mb-2 gap-2">
                        <span className="block text-sm font-medium text-gray-900">
                          Loại kế hoạch:
                        </span>
                        <span className="block text-sm font-bold text-gray-900">
                          {singlePlan?.planDetail?.planType === "ONCE"
                            ? "1 lần"
                            : "định kì"}
                        </span>
                      </div>
                      <div className="flex mb-2 gap-2">
                        <span className="block text-sm font-medium text-gray-900">
                          Trạng thái:
                        </span>
                        <span className="block text-sm font-bold text-gray-900">
                          {singlePlan?.planDetail?.status === "ACTIVE"
                            ? "Đang hoạt động"
                            : "Đang tạm ngưng"}
                        </span>
                      </div>
                      <div className="col-span-2 mb-2">
                        <span className="block mb-2 text-sm font-medium text-gray-900 ">
                          Thời gian
                        </span>
                        <div className="flex gap-2">
                          <div className="text-xs font-bold">
                            <span>Từ: </span>
                            <span>
                              {moment(singlePlan?.planDetail?.timeStart).format(
                                "DD-MM-YYYY"
                              )}
                            </span>
                          </div>
                          <div className="text-xs font-bold">
                            <span>Đến: </span>
                            <span>
                              {moment(singlePlan?.planDetail?.timeEnd).format(
                                "DD-MM-YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="information-plan mt-2  ">
                    <span>Mô tả: </span>
                    <span className="font-bold">
                      {singlePlan?.planDetail?.description}
                    </span>
                  </div>
                  {singlePlan?.planDetail?.planType === "LOOP" && (
                    <div className="information-plan mt-2  ">
                      <span>Lịch trình lặp lại: </span>
                      <div className="">
                        <div className="scheduleType">
                          <div className="calendar-grid">
                            {singlePlan?.planDetail?.planSchedules.map(
                              (item) => (
                                <div className="calendar-day text-sm">
                                  {item.scheduleType === "DAY"? "Ngày": "Tháng"} {item.timeStart}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="information-plan mt-2 border-l px-2">
                  <span className="block font-bold text-gray-900">
                    Công việc
                  </span>
                  <div className="users-selection-list-wrapper py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                    <div className="h-auto ">
                      {singlePlan?.planJobs?.length > 0 ? (singlePlan?.planJobs?.map((item) => (
                        <div className="border my-2 p-2">
                          <div className=" text-sm">
                            <span>Tên công việc: </span>
                            <span className="text-red-400">{item.title}</span>
                          </div>
                          <div className=" text-sm">
                            <span>Trạng thái công viêc: </span>
                            <span className="text-red-400">{item?.status}</span>
                          </div>
                          <div className=" text-sm">
                            <span>Người quản lý công việc: </span>
                            <span className="text-red-400">
                              {item?.manager?.fullName}
                            </span>
                          </div>
                          <div className=" text-sm">
                            <span>Liên lạc quản lý: </span>
                            <span className="text-red-400">
                              {item?.manager?.phone}
                            </span>
                          </div>
                        </div>
                      ))): <span className="text-sm text-gray-400">Chưa có công việc để hiện thị</span>}
                     
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPlanModal;

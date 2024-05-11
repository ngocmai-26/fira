import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJob } from "../../../thunks/JobsThunk";
import { addNewPlan } from "../../../thunks/PlansThunk";

function CreatePlanModal({ handleHiddenCreate }) {
  const dispatch = useDispatch();
  const { allJob } = useSelector((state) => state.jobsReducer);
  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
    }
  }, []);
  const [dataPlan, setDataPlan] = useState({
    title: "",
    planJob: [],
    planDetailRequest: {
      description: "",
      planType: "ONCE",
      note: "",
      timeStart: "",
      timeEnd: "",
      planSchedules: [],
      scheduleType: "DAY",
    },
  });

  const handleJobIdClick = (item) => {
    const index = dataPlan.planJob.findIndex((jobId) => jobId === item.id);
    if (index !== -1) {
      // Nếu mục đã tồn tại trong mảng planJob, loại bỏ nó
      const newPlanJob = [...dataPlan.planJob];
      newPlanJob.splice(index, 1);
      setDataPlan({
        ...dataPlan,
        planJob: newPlanJob,
      });
    } else {
      // Nếu mục chưa tồn tại trong mảng planJob, thêm id của nó vào
      setDataPlan({
        ...dataPlan,
        planJob: [...dataPlan.planJob, item.id],
      });
    }
  };

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  

  const handleOptionChange = (e) => {
    setDataPlan({
      ...dataPlan,
      planDetailRequest: {
        ...dataPlan.planDetailRequest,
        scheduleType: e.target.value,
      },
    });
    setSelectedDates([]); // Reset selected dates when changing options
    setSelectedMonths([]); // Reset selected months when changing options
  };

  const isSelectedDate = (day) => {
    return selectedDates.includes(day);
  };

  const isSelectedMonth = (month) => {
    return selectedMonths.includes(month);
  };

  const handleDateClick = (value) => {
    if (dataPlan?.planDetailRequest?.scheduleType === "DAY") {
      value = parseInt(value); // Chuyển đổi từ chuỗi sang số nguyên
      if (isSelectedDate(value)) {
        setSelectedDates(selectedDates.filter((day) => day !== value));
      } else {
        setSelectedDates([...selectedDates, value]);
      }
    } else if (dataPlan?.planDetailRequest?.scheduleType === "MONTH") {
      value = parseInt(value); // Chuyển đổi từ chuỗi sang số nguyên
      if (isSelectedMonth(value)) {
        setSelectedMonths(selectedMonths.filter((month) => month !== value));
      } else {
        setSelectedMonths([...selectedMonths, value]);
      }
    }
  };

  const renderOptions = () => {
    switch (dataPlan?.planDetailRequest?.scheduleType) {
      case "DAY":
        return Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`calendar-day text-sm ${isSelectedDate(day) ? "selected" : ""}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ));
      case "MONTH":
        return Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <div
            key={month}
            className={`calendar-month text-sm ${
              isSelectedMonth(month) ? "selected" : ""
            }`}
            onClick={() => handleDateClick(month)}
          >
            {month}
          </div>
        ));
      case "YEAR":
        return <div>Chọn năm</div>;
      default:
        return null;
    }
  };

  const handleType = (e) => {
    setDataPlan({
      ...dataPlan,
      planDetailRequest: {
        ...dataPlan.planDetailRequest,
        planType: e.target.value,
        planSchedules: [],
      },
    })
    setSelectedDates([]); // Reset selected dates when changing options
    setSelectedMonths([]); // Reset selected months when changing options
  }

  useEffect(() => {
    if (dataPlan?.planDetailRequest?.scheduleType === "DAY") {
      setDataPlan({
        ...dataPlan,
        planDetailRequest: {
          ...dataPlan.planDetailRequest,
          planSchedules: selectedDates,
        },
      });
    } else if (dataPlan?.planDetailRequest?.scheduleType === "MONTH") {
      setDataPlan({
        ...dataPlan,
        planDetailRequest: {
          ...dataPlan.planDetailRequest,
          planSchedules: selectedMonths,
        },
      });
    }
  }, [selectedDates, selectedMonths])

  const handleClick = () => {
    console.log("dataPlan", dataPlan)
    dispatch(addNewPlan(dataPlan)).then((reps) => {
      // if (!reps.error) {
      //   handleHiddenCreate()
      // }
    });
  };
  return (
    <div
      className={`fixed left-0 right-0 z-50 items-center justify-center flex overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
      id="new-task-modal"
    >
      <div className="relative w-full h-full max-w-4xl m-auto px-4 md:h-auto">
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

          <div className="lg:p-6 space-y-6">
            <form action="#">
              <div className="grid lg:grid-cols-3 gap-5  grid-cols-1">
                <div className="lg:col-span-2 lg:border-e-slate-300 lg:border-e-2 lg:pe-2">
                  <div className="due">
                    <div className="grid grid-cols-1 md:grid-cols-5 sm:grid-cols-4 justify-between">
                      <div className="md:col-span-3 sm:col-span-2">
                        <label
                          htmlFor="category-create"
                          className="block mb-2 text-xs font-medium text-gray-900"
                        >
                          Loại:
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="category-create"
                          onChange={(e) => handleType(e)
                           
                          }
                          value={
                            dataPlan.planDetailRequest.planType
                              ? dataPlan.planDetailRequest.planType
                              : ""
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                        >
                          <option value="LOOP">Định kì</option>
                          <option value="ONCE">1 lần</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="category-create"
                          className="block mb-2 text-xs font-medium text-gray-900 "
                        >
                          Tiêu đề kế hoạch:
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2">
                          <input
                            type="date"
                            name=""
                            onChange={(e) =>
                              setDataPlan({
                                ...dataPlan,
                                planDetailRequest: {
                                  ...dataPlan.planDetailRequest,
                                  timeStart: e.target.value,
                                },
                              })
                            }
                            value={
                              dataPlan.planDetailRequest.timeStart
                                ? dataPlan.planDetailRequest.timeStart
                                : ""
                            }
                            id="timeStart"
                            className="shadow-sm bg-gray-50  border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                            required
                          />
                          <input
                            type="date"
                            name=""
                            onChange={(e) =>
                              setDataPlan({
                                ...dataPlan,
                                planDetailRequest: {
                                  ...dataPlan.planDetailRequest,
                                  timeEnd: e.target.value,
                                },
                              })
                            }
                            value={
                              dataPlan.planDetailRequest.timeEnd
                                ? dataPlan.planDetailRequest.timeEnd
                                : ""
                            }
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
                      onChange={(e) =>
                        setDataPlan({ ...dataPlan, title: e.target.value })
                      }
                      value={dataPlan?.title ? dataPlan?.title : ""}
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
                      onChange={(e) =>
                        setDataPlan({
                          ...dataPlan,
                          planDetailRequest: {
                            ...dataPlan.planDetailRequest,
                            description: e.target.value,
                          },
                        })
                      }
                      value={
                        dataPlan?.planDetailRequest?.description
                          ? dataPlan?.planDetailRequest?.description
                          : ""
                      }
                      id="description"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      placeholder="Mô tả chi tiết kế hoạch"
                      required
                    />
                  </div>
                  {dataPlan?.planDetailRequest?.planType === "LOOP" && <div className="information-plan mt-2">
                    <div className="scheduleType">
                      <div className="option-selector">
                        <select
                          value={
                            dataPlan.planDetailRequest?.scheduleType ? dataPlan.planDetailRequest?.scheduleType : ""
                          }
                          onChange={handleOptionChange}
                          className="option-select"
                        >
                          <option value="">Chọn loại lịch trình</option>
                          <option value="DAY">Ngày</option>
                          <option value="MONTH">Tháng</option>
                          {/* <option value="YEAR">Năm</option> */}
                        </select>
                      </div>
                      <div className="calendar-grid">{renderOptions()}</div>
                    </div>
                  </div>  }
                  
                </div>

                <div className="information-plan md:col-span-1">
                  <label
                    htmlFor="category-create"
                    className="block mb-2 text-xs font-medium text-gray-900"
                  >
                    Công việc:
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="users-selection-list-wrapper py-2 border-gray-200 rounded-sm border h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                    <div className="h-auto ">
                      {allJob?.map((item) => (
                        <button
                          type="button"
                          onClick={() => handleJobIdClick(item)}
                          className={`users-item flex py-1 px-2 w-full text-left ${
                            dataPlan.planJob.includes(item.id)
                              ? "bg-gray-300"
                              : ""
                          }`}
                        >
                          <div className="name w-8/12 my-auto">
                            <span className="text-xs ">{item.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center py-4 border-gray-200 rounded-b text-right">
                <button
                  className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                  type="button"
                  onClick={handleClick}
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePlanModal;

import { useLayoutEffect, useState } from "react";
import LayoutPlan from ".";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deletePlan,
  getAllPlan,
  getPlanById,
  updateStatus,
} from "../../../thunks/PlansThunk";
import DetailPlanModal from "../../modal/plans/DetailPlanModal";
import EditPlanModal from "../../modal/plans/EditPlanModal";
function ManagerNote() {
  const { allPlan, singlePlan } = useSelector((state) => state.plansReducer);
  const [detailPlan, setDetailPlan] = useState(false);
  const [editPlan, setEditPlan] = useState(false);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (allPlan?.length <= 0) {
      dispatch(getAllPlan());
    }
  }, []);
  const [isHiddenUpdate, setIsHiddenUpdate] = useState(true);
  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
  };
  const handleGetPlanById = (item) => {
    setDetailPlan(!detailPlan);
    dispatch(getPlanById(item));
  };
  const handleHiddenEdit = (item) => {
    setEditPlan(!editPlan);
    dispatch(getPlanById(item));
  };

  return (
    <LayoutPlan>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className=" bg-white p-5 ">
                <div className="bg-neutral-100 flex  pb-4 w-full flex-wrap">
                  {allPlan?.map((item) => (
                    <div className=" my-2 h-fit w-full sm:w-1/4 ">
                      <div>
                        <div
                          className={`${
                            item.planDetail.planType === "ONCE"
                              ? "bg-amber-200 hover:bg-amber-300"
                              : item.planDetail.planType === "LOOP"
                              ? "bg-sky-200 hover:bg-sky-300"
                              : "bg-white hover:bg-gray-50"
                          } px-3 py-4 mx-2 rounded-sm shadow  hover:cursor-pointer`}
                        >
                          <div className="flex justify-between">
                            <p className="text-base font-semibold">
                              {item.title}
                            </p>
                            <div className="Plan">
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                              <div className="planNote">
                                <button
                                  className="text-xs w-full hover:bg-slate-200 py-1.5"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Bạn có muốn xóa kế hoạch này không?"
                                      )
                                    ) {
                                      dispatch(deletePlan(item.id));
                                    }
                                  }}
                                >
                                  Xóa
                                </button>
                                <button className="text-xs w-full hover:bg-slate-200 py-1.5">
                                  Hoàn thành
                                </button>
                                <button
                                  className="text-xs w-full hover:bg-slate-200 py-1.5"
                                  onClick={() => handleHiddenEdit(item)}
                                >
                                  Chỉnh sửa
                                </button>
                                <button
                                  className="text-xs w-full hover:bg-slate-200 py-1.5"
                                  onClick={() => handleGetPlanById(item)}
                                >
                                  Xem chi tiết
                                </button>
                                {item.status === "ACTIVE" ? (
                                  <button
                                    className="text-xs w-full hover:bg-slate-200 py-1.5"
                                    onClick={() => {
                                      dispatch(
                                        updateStatus({
                                          id: item.id,
                                          data: { planStatus: "DISABLE" },
                                        })
                                      );
                                    }}
                                  >
                                    Dừng lại
                                  </button>
                                ) : (
                                  <button
                                    className="text-xs w-full hover:bg-slate-200 py-1.5"
                                    onClick={() => {
                                      dispatch(
                                        updateStatus({
                                          id: item.id,
                                          data: { planStatus: "ACTIVE" },
                                        })
                                      );
                                    }}
                                  >
                                    Bắt đầu
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <span className="text-xs">
                            {item.planDetail.description}
                          </span>
                          <div className="w-full py-3">
                            <div className="items-center mb-4">
                              {item?.planDetail?.note
                                ?.split("'/n'")
                                .map((pre) => (
                                  <div className="w-full flex ">
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                      - {pre}{" "}
                                    </span>
                                  </div>
                                ))}
                            </div>
                            <div className="items-center mb-4 text-sm">
                              <span className="font-bold">
                                Công việc liên quan
                              </span>
                              {item?.planJobs?.length !== 0 ? (
                                item.planJobs.map((pre) => (
                                  <div className="w-full flex" key={pre.title}>
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                      {pre.title}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-xs text-gray-500">Chưa có công việc</div>
                              )}
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Start date:{" "}
                              </span>
                              <span className="text-xs">
                                {" "}
                                {moment(item?.timeStart).format("DD-MM-YYYY")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 right-0 z-50 items-center justify-center ${
          isHiddenUpdate ? "hidden" : "flex"
        } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="new-task-modal"
      >
        <div className="relative w-full h-full max-w-xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">Kế hoạch mới</h3>
              <button
                type="button"
                onClick={() => handleHiddenUpdate()}
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
                              //     setUpdatePlanDetail({
                              //       ...updatePlanDetail,
                              //       timeStart: e.target.value,
                              //     })
                              //   }
                              //   value={moment(updatePlanDetail?.timeStart).format(
                              //     "YYYY-MM-DD"
                              //   )}
                              id="timeStart"
                              className="shadow-sm bg-gray-50  border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                              required
                            />
                            <input
                              type="date"
                              name=""
                              //   onChange={(e) =>
                              //     setUpdatePlanDetail({
                              //       ...updatePlanDetail,
                              //       timeEnd: e.target.value,
                              //     })
                              //   }
                              //   value={moment(updatePlanDetail?.timeEnd).format(
                              //     "YYYY-MM-DD"
                              //   )}
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
                        //   setUpdatePlan({
                        //     ...updatePlan,
                        //     title: e.target.value,
                        //   })
                        // }
                        // defaultValue={updatePlan?.title}
                        id="title"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="information-plan mt-2">
                      <input
                        type="text"
                        name="description"
                        // onChange={(e) =>
                        //   setUpdatePlanDetail({
                        //     ...updatePlanDetail,
                        //     description: e.target.value,
                        //   })
                        // }
                        // defaultValue={updatePlanDetail?.description}
                        id="description"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div className="information-plan mt-2">
                      {/* <div className="flex justify-between">
                          <input
                            className="input_todo w-10/12 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                            onChange={(e) =>
                              setUpdatePlanDetail({
                                ...updatePlanDetail,
                                note: e.target.value,
                              })
                            }
                            defaultValue={updatePlanDetail?.note}
                            required
                          />
                        </div> */}

                      <div className="information-plan mt-2">
                        <div className="flex justify-between">
                          <input
                            className="input_todo w-10/12 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                            placeholder="Chi tiết kế hoạch"
                            // onChange={(e) => setTodo(e.target.value)}
                            // value={todo}
                            required
                          />
                          <button
                            // onClick={handleSubmit}
                            type="button"
                            className="btn-todo text-sm bg-green-300 text-white font-medium rounded-sm px-3 py-1 text-center"
                          >
                            Thêm
                          </button>
                        </div>

                        <div className="list-todo py-2">
                          <ul>
                            {/* {state?.map((item, key) => (
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
                </div>
                <div className="items-center py-4 border-gray-200 rounded-b text-right">
                  <button
                    className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                    type="button"
                    // onClick={handleUpdatePlan}
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {detailPlan && <DetailPlanModal handleGetPlanById={handleGetPlanById} />}
      {editPlan && <EditPlanModal handleHiddenEdit={handleHiddenEdit} />}
    </LayoutPlan>
  );
}

export default ManagerNote;

import { useDispatch, useSelector } from "react-redux";
import KPI from ".";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { GetKPIHistory, getAllKPI, getKpisById } from "../../../thunks/KPIsThunk";
import moment from "moment";

function ListKPI() {
  const { allKPI } = useSelector((state) => state.kpisReducer);
  const { account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const nav = useNavigate();
  useLayoutEffect(() => {
    if (allKPI?.length <= 0) {
      dispatch(getAllKPI());
    }
  }, []);
  const handleDetailKPI = (item) => {
    dispatch(getKpisById(item))
    .then((reps) => {
      if(!reps.error) {

        dispatch(GetKPIHistory(account?.user?.id)).then((reps) => {
          if(!reps.error) {
            nav("/kiem-tra-danh-gia-KPI");
          }
        })
      }
    })
  }

  const handleDetailExpertise = (item) => {
    dispatch(getKpisById(item))
    .then((reps) => {
      if(!reps.error) {

        dispatch(GetKPIHistory(account?.user?.id)).then((reps) => {
          if(!reps.error) {
            nav("/kiem-tra-danh-gia-KPI");
          }
        })
      }
    })

  }

  return (
    <KPI>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className="bg-white pt-5 min-w-[960px]">
                <div className="bg-neutral-100 grid grid-cols-4 gap-0 pb-4">
                  <div className="draft ">
                    <div className="draft-header py-3 border-b-2 px-4">
                      <p className="text-black text-base py-1">Draft</p>
                    </div>
                    <div className="draft-content px-2">
                      {allKPI.map(
                        (item) =>
                          item.description === "DRAFT" &&
                          item.verify === false && (
                            <div className="plan-item bg-white m-2 px-2 py-4 rounded-md shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                              <button
                                type="button"
                                className="draft-content w-full text-start px-2"
                              >
                                <div>
                                  <p className="text-xs font-semibold name ">
                                    {item.name}
                                  </p>
                                  <div className="email">
                                    <span className="text-xs text-slate-400">
                                      {item.user.email}
                                    </span>
                                  </div>
                                  <div className="email">
                                    <span className="text-xs text-slate-400">
                                      {item.user.department}
                                    </span>
                                  </div>
                                  <div className="start-time">
                                    <span className="text-slate-400 text-xs">
                                      Từ{" "}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {moment(item?.detail?.timeStart).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </span>
                                    <span className="text-slate-400 text-xs">
                                      {" "}
                                      đến{" "}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {moment(item?.detail?.timeEnd).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </span>
                                  </div>
                                  <div className="avatar flex justify-end">
                                    <img
                                      src={item?.user?.avatar}
                                      alt=""
                                      className=" w-8 h-8  rounded-full"
                                    />
                                  </div>
                                </div>
                              </button>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  <div className="submitted ">
                    <div className="submitted-header py-3 border-b-2 px-4">
                      <p className="text-black text-base py-1">Submitted</p>
                    </div>
                    <div className="submitted-content px-2">
                      {allKPI.map(
                        (item) =>
                          item.description === "EVALUATE" &&
                          item.verify === false && (
                            <div className="plan-item bg-white m-2 px-2 py-4 rounded-md shadow hover:bg-gray-50 my-2">
                              <button
                                type="button"
                                className="draft-content w-full text-start px-2"
                              >
                                <div>
                                  <p className="text-xs font-semibold name ">
                                    {item.name}
                                  </p>
                                  <div className="email">
                                    <span className="text-xs text-slate-400">
                                      {item.user.email}
                                    </span>
                                  </div>
                                  <div className="email">
                                    <span className="text-xs text-slate-400">
                                      {item.user.department}
                                    </span>
                                  </div>
                                  <div className="start-time">
                                    <span className="text-slate-400 text-xs">
                                      Từ{" "}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {moment(item?.detail?.timeStart).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </span>
                                    <span className="text-slate-400 text-xs">
                                      {" "}
                                      đến{" "}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {moment(item?.detail?.timeEnd).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </span>
                                  </div>
                                  <div className="avatar flex justify-end">
                                    <img
                                      src={item?.user?.avatar}
                                      alt=""
                                      className=" w-8 h-8  rounded-full"
                                    />
                                  </div>
                                </div>
                              </button>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  <div className="confirm">
                    <div className="confirm-header py-3 border-b-2 px-4">
                      <p className="text-black text-base py-1">Confirm</p>
                    </div>
                    <div className="confirm-content px-2">
                      {allKPI.map(
                        (item) =>
                          item.description === "DONE" &&
                          item.verify === false && (
                            <div className="plan-item bg-white m-2 px-2 py-4 rounded-md shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                              <button
                                type="button"
                                className="draft-content w-full text-start px-2"
                                onClick={()=>handleDetailKPI(item.id)}
                              >
                                <div>
                                  <p className="text-xs font-semibold name ">
                                    {item.name}
                                  </p>
                                  <div className="email">
                                    <span className="text-xs text-slate-400">
                                      {item.user.email}
                                    </span>
                                  </div>
                                  <div className="email">
                                    <span className="text-xs text-slate-400">
                                      {item.user.department}
                                    </span>
                                  </div>
                                  <div className="start-time">
                                    <span className="text-slate-400 text-xs">
                                      Từ{" "}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {moment(item?.detail?.timeStart).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </span>
                                    <span className="text-slate-400 text-xs">
                                      {" "}
                                      đến{" "}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {moment(item?.detail?.timeEnd).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </span>
                                  </div>
                                  <div className="avatar flex justify-end">
                                    <img
                                      src={item?.user?.avatar}
                                      alt=""
                                      className=" w-8 h-8  rounded-full"
                                    />
                                  </div>
                                </div>
                              </button>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  <div className="approved">
                    <div className="approved-header py-3 border-b-2 px-4">
                      <p className="text-black text-base py-1">Approved</p>
                    </div>
                    <div className="approved-content px-2">
                      {allKPI.map(
                        (item) =>
                          item.description === "DONE" &&
                          item.verify === true && (
                            <div className="plan-item bg-white m-2 px-2 py-4 rounded-md shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                              <button
                                type="button"
                                className="draft-content w-full text-start px-2"
                              >
                                <div>
                                  <p className="text-xs font-semibold name ">
                                    {item.name}
                                  </p>
                                  <div className="email">
                                    <span className="text-xs text-slate-400">
                                      {item.user.email}
                                    </span>
                                  </div>
                                  <div className="email">
                                    <span className="text-xs text-slate-400">
                                      {item.user.department}
                                    </span>
                                  </div>
                                  <div className="start-time">
                                    <span className="text-slate-400 text-xs">
                                      Từ{" "}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {moment(item?.detail?.timeStart).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </span>
                                    <span className="text-slate-400 text-xs">
                                      {" "}
                                      đến{" "}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      {moment(item?.detail?.timeEnd).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </span>
                                  </div>
                                  <div className="avatar flex justify-end">
                                    <img
                                      src={item?.user?.avatar}
                                      alt=""
                                      className=" w-8 h-8  rounded-full"
                                    />
                                  </div>
                                </div>
                              </button>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </KPI>
  );
}
export default ListKPI;

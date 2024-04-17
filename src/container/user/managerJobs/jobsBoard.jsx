import { useDispatch, useSelector } from "react-redux";
import LayoutJob from ".";
import { useLayoutEffect } from "react";
import { getAllJob } from "../../../thunks/JobsThunk";
import { Link } from "react-router-dom";
import moment from "moment";

function JobsBoard() {
  const { allJob } = useSelector((state) => state.jobsReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
    }
  }, []);

  useLayoutEffect(() => {
    dispatch(getAllJob(0));
  }, []);
  return (
    <LayoutJob>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className=" bg-white p-5 min-w-[960px]">
                <div className="bg-neutral-100 grid grid-cols-4 gap-0 pb-4">
                  <div className="plan ">
                    <div className="plan-header bg-violet-100 px-4 py-3 border-b-violet-300 border-b-2">
                      <p className="text-black text-sm py-1">Kế hoạch</p>
                      <p className="text-black text-xs">
                        {allJob.filter((item) => item.status === "PENDING").length}
                        công việc
                      </p>
                    </div>
                    <div className="plan-content px-2">
                      {allJob.map((item, key) =>
                        item.status === "PENDING" ? (
                          <div
                            className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2"
                            key={key}
                          >
                            <Link to={`/jobs/${item.id}`}>
                              <p className="text-xs font-semibold">
                                {item.title}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                                <div
                                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                                  style={{
                                    width: `${
                                      (item?.progress) * 100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Start date:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeStart).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                            </Link>
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                  </div>
                  <div className="attention">
                    <div className="attention-header bg-red-200 px-4 py-3 border-b-red-300 border-b-2">
                      <p className="text-black text-sm py-1">Đến hạn</p>
                      <p className="text-black text-xs">
                        {allJob.filter((item) => item.status === 3).length}
                        công việc
                      </p>
                    </div>
                    <div className="plan-content px-2">
                      {allJob.map((item, key) =>
                        item.status === 3 ? (
                          <div
                            className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2"
                            key={key}
                          >
                            <Link to={`/jobs/${item.id}`}>
                              <p className="text-xs font-semibold">
                                {item.title}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                                <div
                                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Start date:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeStart).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                            </Link>
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                  </div>
                  <div className="progress">
                    <div className="progress-header bg-green-100 px-4 py-3 border-b-green-300 border-b-2">
                      <p className="text-black text-sm py-1">Đang tiến hành</p>
                      <p className="text-black text-xs">
                        {allJob.filter((item) => item.status === "PROCESSING").length}
                        công việc
                      </p>
                    </div>
                    <div className="plan-content px-2">
                      {allJob.map((item, key) =>
                        item.status === "PROCESSING" ? (
                          <div
                            className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2"
                            key={key}
                          >
                            <Link to={`/jobs/${item.id}`}>
                              <p className="text-xs font-semibold">
                                {item.title}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                                <div
                                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Start date:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeStart).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                            </Link>
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                  </div>
                  <div className="completed">
                    <div className="completed-header bg-emerald-200 px-4 py-3 border-b-emerald-500 border-b-2">
                      <p className="text-black text-sm py-1">Hoàn thành</p>
                      <p className="text-black text-xs">
                        {allJob.filter((item) => item.status === "DONE").length}
                        công việc
                      </p>
                    </div>
                    <div className="plan-content px-2">
                      {allJob.map((item, key) =>
                        item.status === "DONE" ? (
                          <div
                            className={`plan-item ${item?.jobDetail?.jobEvaluate === "GOOD" ? "bg-emerald-200": item?.jobDetail?.jobEvaluate === "MEDIUM" ? "bg-yellow-200": "bg-red-500"} m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2`}
                            key={key}
                          >
                            <Link to={`/jobs/${item.id}`}>
                              <p className="text-xs font-semibold">
                                {item.title}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                                <div
                                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Start date:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeStart).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                            </Link>
                          </div>
                        ) : (
                          <></>
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
    </LayoutJob>
  );
}

export default JobsBoard;

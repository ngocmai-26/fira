import { useDispatch, useSelector } from "react-redux";
import LayoutJob from ".";
import { useEffect, useLayoutEffect, useState } from "react";
import { getAllJob, getJobById } from "../../../thunks/JobsThunk";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Pagination, Stack } from "@mui/material";
import JobDetailModal from "../../modal/job/DetailModal";

function JobsBoard() {
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer);
  const { account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [hiddenJobDetail, setHiddenJobDetail] = useState(false);
  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
    }
  }, []);

  useLayoutEffect(() => {
    dispatch(getAllJob(0));
  }, []);  
  const [currentPage, setCurrentPage] = useState(paginationJob?.number + 1);
  useEffect(() => {
    setCurrentPage(paginationJob?.number + 1);
  }, [allJob]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllJob(pageNumber - 1));
  };

  const filteredJobs = allJob.filter((item) => {
    if (account.role.roleName === "ROLE_ADMIN") {
      return true;
    } else {
      return (
        item.staffs.some((staff) => staff.id === account.user.id) ||
        item.manager.id === account.user.id
      );
    }
  });
  const handJobDetail = (item) => {
    dispatch(getJobById(item)).then((reps) => {
      if (!reps.error) {
        setHiddenJobDetail(!hiddenJobDetail)
      }
    });
  };

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
                        {
                          filteredJobs.filter(
                            (item) => item.status === "PENDING"
                          ).length
                        } {" "}
                        công việc
                      </p>
                    </div>
                    <div className="plan-content px-2">
                      {filteredJobs?.map((item, key) =>
                        item.status === "PENDING" ? (
                          <div
                            className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2"
                            key={key}
                          >
                            <button onClick={() => handJobDetail(item?.id)} className="w-full text-start">
                              <p className="text-sm text-start font-semibold">
                                {item.title}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                                <div
                                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                                  style={{
                                    width: `${item?.progress * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <div className="flex gap-2">
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Bắt đầu:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeStart).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Kết thúc:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeEnd).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                              </div>
                            </button>
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
                        {
                          filteredJobs.filter((item) => item.status === 3)
                            .length
                        }{" "}
                        công việc
                      </p>
                    </div>
                    <div className="plan-content px-2">
                      {filteredJobs?.map((item, key) =>
                        item.status === 3 ? (
                          <div
                            className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2"
                            key={key}
                          >
                            <button onClick={() => handJobDetail(item?.id)}  className="w-full text-start">
                              <p className="text-sm text-start font-semibold">
                                {item.title}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                                <div
                                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                              <div className="flex gap-2">
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Bắt đầu:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeStart).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Kết thúc:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeEnd).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                              </div>
                            </button>
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
                        {
                          filteredJobs.filter(
                            (item) => item.status === "PROCESSING"
                          ).length
                        }{" "}
                        công việc
                      </p>
                    </div>
                    <div className="plan-content px-2">
                      {filteredJobs?.map((item, key) =>
                        item.status === "PROCESSING" ? (
                          <div
                            className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2"
                            key={key}
                          >
                            <button onClick={() => handJobDetail(item?.id)}  className="w-full text-start">
                              <p className="text-sm text-start font-semibold">
                                {item.title}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                                <div
                                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                              <div className="flex gap-2">
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Bắt đầu:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeStart).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Kết thúc:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeEnd).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                              </div>
                            </button>
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
                        {
                          filteredJobs?.filter((item) => item.status === "DONE")
                            .length
                        }{" "}
                        công việc
                      </p>
                    </div>
                    <div className="plan-content px-2">
                      {filteredJobs?.map((item, key) =>
                        item.status === "DONE" ? (
                          <div
                            className={`plan-item ${
                              item?.jobDetail?.jobEvaluate === "GOOD"
                                ? "bg-emerald-200 border-2 border-emerald-200 bg-opacity-50 hover:bg-emerald-200"
                                : item?.jobDetail?.jobEvaluate === "MEDIUM"
                                ? "bg-yellow-200 border-2 border-yellow-200 bg-opacity-50 hover:bg-yellow-200"
                                : "bg-red-500 border-2 border-red-200 bg-opacity-50 hover:bg-red-200"
                            } m-2 px-2 py-4 rounded-sm shadow hover:cursor-pointer my-2`}
                            key={key}
                          >
                            <button onClick={() => handJobDetail(item?.id)}  className="w-full text-start">
                              <p className="text-sm text-start font-semibold">
                                {item.title}
                              </p>
                              <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                                <div
                                  className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                                  style={{ width: "45%" }}
                                ></div>
                              </div>
                              <div className="flex gap-2">
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Bắt đầu:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeStart).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                              <div className="start-time">
                                <span className="text-xs text-slate-400">
                                  Kết thúc:{" "}
                                </span>
                                <span className="text-xs">
                                  {moment(item.jobDetail.timeEnd).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                              </div>
                            </button>
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
      {hiddenJobDetail && <JobDetailModal setHiddenJobDetail={setHiddenJobDetail} />}
      <div className="mt-10">

      {paginationJob?.totalPages > 1 && (
        <Stack
          spacing={2}
          justifyContent="center"
          color="#fff"
          className="pagination"
        >
          <Pagination
            count={paginationJob?.totalPages}
            color="primary"
            className="pagination-item"
            style={{ margin: "auto" }}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      )}
      </div>
    </LayoutJob>
  );
}

export default JobsBoard;


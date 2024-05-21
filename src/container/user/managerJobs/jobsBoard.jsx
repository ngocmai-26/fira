import { useDispatch, useSelector } from "react-redux";
import LayoutJob from ".";
import { useEffect, useLayoutEffect, useState } from "react";
import { getAllJob, getJobById } from "../../../thunks/JobsThunk";
import { Pagination, Stack } from "@mui/material";
import JobDetailModal from "../../modal/job/DetailModal";
import moment from "moment";

function JobsBoard() {
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer);
  const { account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
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
        item.userJobs.some((staff) => staff.user.id === account.user.id) ||
        item.manager.id === account.user.id
      );
    }
  });

  const handJobDetail = (item) => {
    dispatch(getJobById(item)).then((reps) => {
      if (!reps.error) {
        setHiddenJobDetail(!hiddenJobDetail);
      }
    });
  };

  const renderJobsByStatus = (status, bgColor, borderColor, label) => {
    const jobs = filteredJobs.filter((item) =>
      item.userJobs.some((userJob) => userJob.status === status)
    );

    return (
      <div className={`${bgColor} px-4 py-3 border-b-2 ${borderColor}`}>
        <p className="text-black text-sm py-1">{label}</p>
        <p className="text-black text-xs">{jobs.length} công việc</p>
        <div className="plan-content px-2">
          {jobs.map((item, key) =>
            item.userJobs.some((userJob) => userJob.status === status) ? (
              <div
                className={`plan-item m-2 px-2 py-4 rounded-sm shadow  hover:cursor-pointer my-2 ${item.manager.id === account.user.id ? 'bg-yellow-300 hover:bg-yellow-200'  : 'bg-white hover:bg-gray-50'}`}
                key={key}
              >
                <button
                  onClick={() => handJobDetail(item?.id)}
                  className="w-full text-start"
                >
                  <p className="text-sm text-start font-semibold">{item.title}</p>
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
                      <span className="text-xs text-slate-400">Bắt đầu: </span>
                      <span className="text-xs">
                        {moment(item.jobDetail.timeStart).format("DD-MM-YYYY")}
                      </span>
                    </div>
                    <div className="start-time">
                      <span className="text-xs text-slate-400">Kết thúc: </span>
                      <span className="text-xs">
                        {moment(item.jobDetail.timeEnd).format("DD-MM-YYYY")}
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
    );
  };

  return (
    <LayoutJob>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className="bg-white p-5 min-w-[960px]">
                <div className="bg-neutral-100 grid grid-cols-4 gap-0 pb-4">
                  {renderJobsByStatus(
                    "PENDING",
                    "bg-violet-100",
                    "border-b-violet-300",
                    "Kế hoạch"
                  )}
                  {renderJobsByStatus(
                    3, // Assuming 3 is the status for "Đến hạn"
                    "bg-red-200",
                    "border-b-red-300",
                    "Đến hạn"
                  )}
                  {renderJobsByStatus(
                    "PROCESSING",
                    "bg-green-100",
                    "border-b-green-300",
                    "Đang tiến hành"
                  )}
                  {renderJobsByStatus(
                    "DONE",
                    "bg-emerald-200",
                    "border-b-emerald-500",
                    "Hoàn thành"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hiddenJobDetail && (
        <JobDetailModal setHiddenJobDetail={setHiddenJobDetail} />
      )}
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

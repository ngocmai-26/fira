import { Link, useNavigate } from "react-router-dom";
import LayoutJob from ".";
import { useDispatch, useSelector } from "react-redux";
import {
  ReassessJob,
  comFirmJob,
  deleteJob,
  getAllJob,
  getAllJobById,
  getJobById,
  updateEvaluateJob,
  updateJob,
  verifyProgress,
} from "../../../thunks/JobsThunk";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import ReportJobModel from "../../modal/job/ReportJobModal";
import EValueJobModal from "../../modal/job/EValueModal";
import DetailJobModal from "../../modal/job/DetailJobModal";
import moment from "moment";
import JobDetailModal from "../../modal/job/DetailModal";

function JobsReport() {
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer);
  const { account } = useSelector((state) => state.authReducer);
  const [currentPage, setCurrentPage] = useState(paginationJob?.number + 1);
  const [evaluateData, setEvaluateData] = useState({});
  const [evaluateDetailData, setEvaluateDetailData] = useState({});
  const [hiddenJobDetail, setHiddenJobDetail] = useState(false);
  const [evaluateReport, setEvaluateReport] = useState({});
  const [hiddenEValue, setHiddenEValue] = useState(false);
  
  const [hidden, isHidden] = useState(true);

  const dispatch = useDispatch();
  const nav = useNavigate();

  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
    }
  }, []);

  useEffect(() => {
    setCurrentPage(paginationJob?.number + 1);
  }, [allJob]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllJob(pageNumber - 1));
  };

  const handJobDetail = (item) => {
    dispatch(getJobById(item)).then((reps) => {
      if (!reps.error) {
        setHiddenJobDetail(!hiddenJobDetail);
      }
    });
  };

  useLayoutEffect(() => {
    dispatch(getAllJob(0));
  }, []);

  const filteredJobs = useMemo(() => {
    const filteredList = [];
    allJob.forEach((job) => {
      job.userJobs.forEach((userJob) => {
        if (account.role.roleName === "ROLE_ADMIN" || account.user.id === userJob.user.id) {
          const shouldRender = userJob.status === "DONE" ||
            (userJob.status === "PROCESSING" &&
              userJob.cachedProgress !== 0 &&
              userJob.jobEvaluate === null);
          if (shouldRender) {
            filteredList.push({
              ...job,
              userJobs: [userJob],
            });
          }
        }
      });
    });
    return filteredList;
  }, [allJob, account]);

  const handleEvaluate = () => {
    evaluateData.status = "DONE";
    dispatch(verifyProgress(evaluateData?.id)).then((reps) => {
      if (!reps?.error) {
        dispatch(updateJob({ id: evaluateData?.id, data: evaluateData })).then(
          (resp) => {
            if (!resp?.error) {
              dispatch(
                updateEvaluateJob({
                  id: evaluateData?.id,
                  data: evaluateDetailData,
                })
              ).then((resp) => {
                if (!resp?.error) {
                  isHidden(true);
                }
              });
            }
          }
        );
      }
    });
  };

  const handleReassess = () => {
    const updatedStatus = {
      ...evaluateData,
      progress: 0,
      status: "PROCESSING",
    };
    const updatedDetailStatus = {
      ...evaluateDetailData,
      note: "",
      verifyLink: "",
    };
    dispatch(
      updateEvaluateJob({
        id: evaluateData?.id,
        data: updatedDetailStatus,
      })
    ).then((resp) => {
      if (!resp?.error) {
        dispatch(
          ReassessJob({ id: evaluateData?.id, data: updatedStatus })
        ).then((resp) => {
          if (!resp?.error) {
            isHidden(true);
          }
        });
      }
    });
  };

  const handleHiddenEValue = (item) => {
    setHiddenEValue(!hiddenEValue);
    setEvaluateReport(item);
  };

  return (
    <LayoutJob>
      <div className="flex flex-col mt-5">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-[#f3f4f6] border-b rounded-tl-md ">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-sm font-bold text-left text-gray-500 uppercase"
                    >
                      STT
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-sm font-bold text-left text-gray-500 uppercase"
                    >
                      Công việc
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-sm font-bold text-left text-gray-500 uppercase"
                    >
                      Người quản lý
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-sm font-bold text-left text-gray-500 uppercase"
                    >
                      Người thực hiện
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-sm font-bold text-left text-gray-500 uppercase"
                    >
                      Tiến độ tự đánh giá
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-sm font-bold text-left text-gray-500 uppercase"
                    >
                      Tg bắt đầu
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-sm font-bold text-left text-gray-500 uppercase"
                    >
                      Tg Kết thúc
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-left text-gray-500 uppercase"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs?.map((item, key) => (
                    <tr className="" key={key}>
                      <td className="w-4 p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        <div className="flex items-center">{key + 1}</div>
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                        <button
                          className="underline"
                          onClick={() => handJobDetail(item?.id)}
                        >
                          {item?.title}
                        </button>
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        {item?.manager?.fullName}
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        {item?.userJobs[0]?.user?.fullName}
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        {item?.userJobs[0]?.cachedProgress} %
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                        {moment(item?.jobDetail?.timeStart).format(
                          "DD-MM-YYYY"
                        )}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                        {moment(item?.jobDetail?.timeEnd).format(
                          "DD-MM-YYYY"
                        )}
                      </td>
                      <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {item.userJobs[0]?.status === "PROCESSING" &&
                        item.userJobs[0]?.cachedProgress !== 0 &&
                        item.userJobs[0]?.jobEvaluate === null ? (
                          <button
                            className="border-[#17103a] border text-[#17103a] rounded-md hover:bg-[#17103a] hover:text-white  text-xs p-1"
                            onClick={() => handleHiddenEValue(item)}
                          >
                            Đánh giá
                          </button>
                        ) : item.userJobs[0]?.status === "DONE" ? (
                          <>Đã đánh giá</>
                        ) : (
                          <>Chưa đánh giá</>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
        {hiddenJobDetail && (
          <JobDetailModal setHiddenJobDetail={setHiddenJobDetail} />
        )}

        {hiddenEValue && (
          <EValueJobModal
            handleHiddenEValue={handleHiddenEValue}
            evaluateData={evaluateReport}
          />
        )}
      </div>
    </LayoutJob>
  );
}

export default JobsReport;

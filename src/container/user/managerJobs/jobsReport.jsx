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
import { useEffect, useLayoutEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import ReportJobModel from "../../modal/job/ReportJobModal";
import EValueJobModal from "../../modal/job/EValueModal";
import DetailJobModel from "../../modal/job/DetailJobModal";
import moment from "moment";

function JobsReport() {
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer);
  const { account } = useSelector((state) => state.authReducer);
  const [currentPage, setCurrentPage] = useState(paginationJob?.number + 1);
  const [evaluateData, setEvaluateData] = useState({});
  const [evaluateDetailData, setEvaluateDetailData] = useState({});
  const [evaluate, setEvaluate] = useState(false);

  const [hidden, isHidden] = useState(true);
  const handleHidden = (item) => {
    isHidden(!hidden);
    setEvaluateData({
      id: item?.id,
      title: item?.title,
      kpiCount: item?.kpiCount,
      progress: item?.progress,
      priority: item?.priority,
      status: item?.status,
      pointPerJob: item?.pointPerJob,
      task: true,
    });
    setEvaluateDetailData({
      description: item.description,
      verifyLink: item.verifyLink,
      note: item.note,
      instructionLink: item.instructionLink,
      denyReason: item.denyReason,
      target: item.target,
      timeStart: item.timeStart,
      timeEnd: item.timeEnd,
      additionInfo: item.additionInfo,
      jobEvaluate: item.jobEvaluate,
    });
  };

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
        nav("/chi-tiet-cong-viec");
      }
    });
  };

  useLayoutEffect(() => {
    dispatch(getAllJob(0));
  }, []);

  const filteredJobs = allJob.filter((item) => {
    if (account.role.roleName === "ROLE_ADMIN") {
      return true;
    } else {
      return item?.manager?.id === account?.user?.id;
    }
  });

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

  return (
    <LayoutJob>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Công việc
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Người quản lý
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Người thực hiện
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Tiến độ tự đánh giá
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Link
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Tg bắt đầu
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Tg Kết thúc
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs?.map(
                    (item) =>
                      item?.jobDetail?.note?.length !== 0 &&
                      item?.jobDetail?.verifyLink?.length !== 0 && (
                        <tr className="">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-{{ .id }}"
                                aria-describedby="checkbox-1"
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                              />
                              <label
                                htmlFor="checkbox-{{ .id }}"
                                className="sr-only"
                              >
                                checkbox
                              </label>
                            </div>
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
                            {item?.staffs?.map((item) => (
                              <p>{item?.fullName}</p>
                            ))}
                          </td>
                          <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                            {item?.progress} %
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                            <Link
                              to="/detail-task"
                              target="_blank"
                              className="underline"
                            >
                              {item?.jobDetail?.verifyLink}
                            </Link>
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
                            {item.jobDetail.note !== "" &&
                            item.cachedProgress !== 0 &&
                            item.jobDetail.instructionLink !== "" &&
                            item.jobDetail.jobEvaluate === null &&
                            item.status === "DONE" ? (
                              <button
                                className="bg-blue-500 text-white text-xs p-1"
                                onClick={() => handleHidden(item)}
                              >
                                Đánh giá
                              </button>
                            ) : (
                              <>Đã đánh giá</>
                            )}
                          </td>

                          <td className=" text-sm font-medium text-gray-900 whitespace-nowrap"></td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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

      <div
        className={`fixed left-0 right-0 z-50 ${
          hidden ? "hidden" : "flex"
        } items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full `}
        id="new-task-modal"
      >
        <div className="relative w-full h-full max-w-3xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">
                Chi tiết tiến độ công việc
              </h3>
              <button
                type="button"
                onClick={() => handleHidden()}
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
            <div className="content p-5  border-b">
              <div className="border-b">
                <h5 className="font-semibold te">
                  Mô tả công việc đã hoàn thành
                </h5>
                <ul>{evaluateData?.jobDetail?.note}</ul>
              </div>
              <div className="border-b py-3">
                <h5 className="font-semibold">Tiến độ hoàn thành</h5>
                <div className="font-bold text-blue-500">
                  {evaluateData?.progress} %
                </div>
              </div>
              <div className="py-3">
                <h5 className="font-semibold">Đường link tài liệu báo cáo</h5>
                <a
                  href={evaluateData?.jobDetail?.verifyLink}
                  _blank
                  className="text-xs underline"
                >
                  {evaluateData?.jobDetail?.verifyLink}
                </a>
              </div>
              {evaluate && (
                <div className="py-3">
                  <select
                    id="category-create"
                    // value={job?.priority ? job?.priority : "0"}
                    value={evaluateDetailData?.jobEvaluate}
                    onChange={(e) =>
                      setEvaluateDetailData({
                        ...evaluateDetailData,
                        jobEvaluate: e.target.value,
                      })
                    }
                    className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                  >
                    <option value="BAD">Yếu</option>
                    <option value="MEDIUM">Trung bình</option>
                    <option value="GOOD">Tốt</option>
                  </select>
                </div>
              )}
            </div>
            {evaluate ? (
              <div className="text-right p-4">
                <button
                  className="bg-red-500 text-white text-xs p-1 mx-1"
                  onClick={() => setEvaluate(!evaluate)}
                >
                  Hủy
                </button>
                <button
                  className="bg-blue-500 text-white text-xs p-1 mx-1"
                  onClick={handleEvaluate}
                >
                  Lưu
                </button>
              </div>
            ) : (
              <div className="text-right p-4">
                <button
                  className="bg-red-500 text-white text-xs p-1 mx-1"
                  onClick={handleReassess}
                >
                  Đánh giá lại
                </button>
                <button
                  className="bg-blue-500 text-white text-xs p-1 mx-1"
                  onClick={() => setEvaluate(!evaluate)}
                >
                  Đánh giá
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutJob>
  );
}

export default JobsReport;

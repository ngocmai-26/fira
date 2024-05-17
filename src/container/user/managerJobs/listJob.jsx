import { Link, useNavigate } from "react-router-dom";
import LayoutJob from ".";
import { useDispatch, useSelector } from "react-redux";
import {
  comFirmJob,
  deleteJob,
  getAllJob,
  getAllJobById,
  getJobById,
} from "../../../thunks/JobsThunk";
import { useEffect, useLayoutEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import ReportJobModel from "../../modal/job/ReportJobModal";
import EValueJobModal from "../../modal/job/EValueModal";
import DetailJobModel from "../../modal/job/DetailJobModal";
import moment from "moment";

function ManagerJobs() {
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer);
  const { account } = useSelector((state) => state.authReducer);
  const [currentPage, setCurrentPage] = useState(paginationJob?.number + 1);
  const { user } = useSelector((state) => state.authReducer);
  const [evaluateData, setEvaluateData] = useState({});
  const [hiddenEValue, isHiddenEValue] = useState(false);

  const [isHiddenReport, setIsHiddenReport] = useState(false);

  const [report, setReport] = useState({});

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

  const handleHiddenEValue = (item) => {
    isHiddenEValue(!hiddenEValue);
    setEvaluateData(item);
  };

  const handleConfirm = (item) => {
    dispatch(comFirmJob({ id: item, data: { status: "PROCESSING" } }));
  };

  const handleHiddenReport = (item) => {
    setReport(item);
    setIsHiddenReport(!isHiddenReport);
  };

  const filteredJobs = allJob.filter((item) => {
    if (account.role.roleName === "ROLE_ADMIN") {
      return true;
    } else {
      return item.manager.id === account.user.id;
    }
  });

  //search

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
                  {filteredJobs?.map((item) => (
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
                        {moment(item?.jobDetail?.timeEnd).format("DD-MM-YYYY")}
                      </td>

                      {account?.role?.id === 3 || account?.role?.id === 1 ? (
                        item.status === "DONE" &&
                        item?.jobDetail?.jobEvaluate !== null ? (
                          <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap gap-2 flex">
                            <button className="bg-blue-500 text-white text-xs p-1">
                              Chi tiết
                            </button>
                          </td>
                        ) : item.manager.id === account.user.id &&
                          item.jobDetail.jobEvaluate === null &&
                          item.status === "DONE" ? (
                            <button
                            className="bg-blue-500 text-white text-xs p-1"
                            onClick={() => handleHiddenEValue(item)}
                          >
                            Đánh giá
                          </button>
                        ) : (
                          <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap gap-2 flex">
                            {item?.cachedProgress !== 0 &&
                            item?.jobDetail?.note &&
                            item?.jobDetail?.instructionLink ? (
                              <button
                                className="bg-blue-500 text-white text-xs p-1"
                                onClick={() => handleHiddenEValue(item)}
                              >
                                Đánh giá
                              </button>
                            ) : (
                              <></>
                            )}

                            <button className="bg-blue-500 text-white text-xs p-1">
                              Chỉnh sửa
                            </button>
                            <button
                              className="bg-red-500 text-white text-xs p-1"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Bạn có muốn xóa công việc này không?"
                                  )
                                ) {
                                  dispatch(deleteJob(item?.id));
                                }
                              }}
                            >
                              Xóa
                            </button>
                            {item?.status === null ? (
                              <button
                                className="bg-blue-500 text-white text-xs p-1 mr-2 px"
                                onClick={() =>
                                  dispatch(
                                    comFirmJob({
                                      id: item.id,
                                      data: { status: "PENDING" },
                                    })
                                  )
                                }
                              >
                                PENDING
                              </button>
                            ) : (
                              <></>
                            )}
                          </td>
                        )
                      ) : (
                        <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {item?.jobDetail?.denyReason?.length > 0 ? (
                            <button
                              className="bg-blue-500 text-white text-xs p-1 mr-2"
                              type="button"
                              // onClick={() => handleShowReason(item)}
                            >
                              Xem ly do
                            </button>
                          ) : item?.status === "PENDING" ? (
                            <>
                              <button
                                className="bg-blue-500 text-white text-xs p-1 mr-2"
                                onClick={() => handleConfirm(item.id)}
                              >
                                Xác nhận
                              </button>
                            </>
                          ) : (

                            <></>
                          )}
                          {item?.status === "PROCESSING"&& item.cachedProgress ===0 &&
                            item?.staffs?.map((staff) => (
                              <div key={staff.id}>
                                {staff.id === account?.user?.id ? (
                                  <button
                                    className="bg-blue-500 text-white text-xs p-1 mr-2"
                                    onClick={() => handleHiddenReport(item)}
                                  >
                                    Báo cáo
                                  </button>
                                ) : null}
                              </div>
                            ))}
                        </td>
                      )}

                      <td className=" text-sm font-medium text-gray-900 whitespace-nowrap"></td>
                    </tr>
                  ))}
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

      {/* Chi tiết công việc đã hoàn thành */}
      {/* <DetailJobModel /> */}
      {/* Đánh giá công việc */}
      {hiddenEValue && (
        <EValueJobModal
          handleHiddenEValue={handleHiddenEValue}
          evaluateData={evaluateData}
        />
      )}
      {/* Báo cáo công việc */}
      {isHiddenReport && (
        <ReportJobModel
          handleHiddenReport={handleHiddenReport}
          report={report}
        />
      )}
    </LayoutJob>
  );
}

export default ManagerJobs;

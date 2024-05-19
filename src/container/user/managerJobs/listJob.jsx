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
import JobDetailModal from "../../modal/job/DetailModal";

function ManagerJobs() {
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer);
  const { account } = useSelector((state) => state.authReducer);
  const [currentPage, setCurrentPage] = useState(paginationJob?.number + 1);
  const { user } = useSelector((state) => state.authReducer);
  const [evaluateData, setEvaluateData] = useState({});
  const [hiddenEValue, isHiddenEValue] = useState(false);
  const [hiddenJobDetail, setHiddenJobDetail] = useState(false);

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
        setHiddenJobDetail(!hiddenJobDetail)
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
      return (
        item.staffs.some((staff) => staff.id === account.user.id) ||
        item.manager.id === account.user.id
      )
    }
  });

  console.log('filteredJobs', filteredJobs)

  return (
    <LayoutJob>
      <div className="flex flex-col mt-5">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-[#f3f4f6] border-b rounded-tl-md ">
                  <tr>
                    <th scope="col" className="p-4 text-sm font-bold text-left text-gray-500 uppercase">
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
                        <div className="flex items-center">
                          {key+1}
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
                            <button className="border-[#58AD69] border text-[#58AD69] rounded-md hover:bg-[#58AD69] hover:text-white  text-xs p-1">
                              Chi tiết
                            </button>
                          </td>
                        ) : item.manager.id === account.user.id &&
                          item.jobDetail.jobEvaluate === null &&
                          item.status === "DONE" ? (
                            <button
                            className="border-[#17103a] border text-[#17103a] rounded-md hover:bg-[#17103a] hover:text-white  text-xs p-1 "
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
                                className="border-[#17103a] border text-[#17103a] rounded-md hover:bg-[#17103a] hover:text-white  text-xs p-1"
                                onClick={() => handleHiddenEValue(item)}
                              >
                                Đánh giá
                              </button>
                            ) : (
                              <></>
                            )}

                            <button className="border-blue-500 border text-blue-500 rounded-md hover:bg-blue-500 hover:text-white  text-xs p-1">
                              Chỉnh sửa
                            </button>
                            <button
                              className="border-red-500 border text-red-500 rounded-md hover:bg-red-500 hover:text-white  text-xs p-1"
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
                                className="border-[#ffd273] border text-[#ffd273] rounded-md hover:bg-[#ffd273] hover:text-white  text-xs p-1"
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
                              className="bg-blue-500 text-white text-xs p-1 mr-2 border-blue-500 border rounded-md hover:bg-blue-500 hover:text-white"
                              type="button"
                              // onClick={() => handleShowReason(item)}
                            >
                              Xem ly do
                            </button>
                          ) : item?.status === "PENDING" ? (
                            <>
                              <button
                                className="border-[#faa2ff] border text-[#faa2ff] rounded-md hover:bg-[#faa2ff] hover:text-white  text-xs p-1"
                                onClick={() => handleConfirm(item.id)}
                              >
                                Xác nhận
                              </button>
                            </>
                          ) : (

                            <></>
                          )}
                          {item?.status === "PROCESSING"&& item.cachedProgress === 0 &&
                            item?.staffs?.map((staff) => (
                              <div key={staff.id}>
                                {staff.id === account?.user?.id ? (
                                  <button
                                    className="border-[#e97254] border text-[#e97254] rounded-md hover:bg-[#e97254] hover:text-white  text-xs p-1"
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
      {hiddenJobDetail && <JobDetailModal setHiddenJobDetail={setHiddenJobDetail} />}

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

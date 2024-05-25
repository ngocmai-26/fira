import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Stack, Pagination } from "@mui/material";
import moment from "moment";
import LayoutJob from ".";
import ReportJobModel from "../../modal/job/ReportJobModal";
import EValueJobModal from "../../modal/job/EValueModal";
import DetailJobModal from "../../modal/job/DetailJobModal";
import JobDetailModal from "../../modal/job/DetailModal";
import {
  comFirmJob,
  deleteJob,
  getAllJob,
  getJobById,
} from "../../../thunks/JobsThunk";

function ManagerJobs() {
  const dispatch = useDispatch();
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer);
  const { account } = useSelector((state) => state.authReducer);
  const [currentPage, setCurrentPage] = useState(paginationJob?.number + 1);
  const [hiddenJobDetail, setHiddenJobDetail] = useState(false);
  const [isHiddenReport, setIsHiddenReport] = useState(false);
  const [report, setReport] = useState({});

  useEffect(() => {
    if (!allJob || allJob.length === 0) {
      dispatch(getAllJob());
    }
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(paginationJob?.number + 1);
  }, [paginationJob]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllJob(pageNumber - 1));
  };

  const handJobDetail = (itemId) => {
    dispatch(getJobById(itemId)).then((response) => {
      if (!response.error) {
        setHiddenJobDetail(!hiddenJobDetail);
      }
    });
  };

  const handleConfirm = (itemId) => {
    dispatch(comFirmJob({ id: itemId, data: { status: "PROCESSING" } }));
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
        item?.userJobs?.some((staff) => staff?.user.id === account?.user?.id) ||
        item?.manager?.id === account?.user?.id
      );
    }
  });


  return (
    <LayoutJob>
      <div className="flex flex-col mt-5">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-[#f3f4f6] border-b rounded-tl-md ">
                  <tr>
                    <th className="p-4 text-sm font-bold text-left text-gray-500 uppercase">
                      STT
                    </th>
                    <th className="p-4 text-sm font-bold text-left text-gray-500 uppercase">
                      Công việc
                    </th>
                    <th className="p-4 text-sm font-bold text-left text-gray-500 uppercase">
                      Người quản lý
                    </th>
                    <th className="p-4 text-sm font-bold text-left text-gray-500 uppercase">
                      Người thực hiện
                    </th>
                    <th className="p-4 text-sm font-bold text-left text-gray-500 uppercase">
                      Tg bắt đầu
                    </th>
                    <th className="p-4 text-sm font-bold text-left text-gray-500 uppercase">
                      Tg Kết thúc
                    </th>
                    <th className="text-sm font-bold text-left text-gray-500 uppercase">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs?.map((item, index) => (
                    <tr className="" key={index}>
                      <td className="w-4 p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        <div className="flex items-center">{index + 1}</div>
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                        <button
                          className=""
                        >
                          {item?.title}
                        </button>
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        {item?.manager?.fullName}
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        {item?.userJobs?.map((userJob) => (
                          <p key={userJob.id}>{userJob?.user?.fullName}</p>
                        ))}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                        {moment(item?.jobDetail?.timeStart).format(
                          "DD-MM-YYYY"
                        )}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                        {moment(item?.jobDetail?.timeEnd).format("DD-MM-YYYY")}
                      </td>
                      <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap gap-2 flex">
                      <button className="border-[#58AD69] border text-[#58AD69] rounded-md hover:bg-[#58AD69] hover:text-white  text-xs p-1" 
                              onClick={() => handJobDetail(item?.id)}>
                                Chi tiết
                              </button>
                        {account?.role?.roleName === "ROLE_ADMIN" || account?.role?.roleName === "ROLE_MANAGER" ? (
                          <>
                          
                          <React.Fragment>
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
                              ) : null}
                            </React.Fragment></>
                        ) : (
                          <React.Fragment>
                            { item?.status === "PENDING" ? (
                              <button
                                className="border-[#faa2ff] border text-[#faa2ff] rounded-md hover:bg-[#faa2ff] hover:text-white  text-xs p-1"
                                onClick={() => handleConfirm(item.id)}
                              >
                                Xác nhận
                              </button>
                            ) : null}
                            {item?.status === "PROCESSING" &&
                            item.cachedProgress === 0 &&
                            item?.staffs?.some(
                              (staff) => staff.id === account?.user?.id
                            ) ? (
                              <button
                                className="border-[#e97254] border text-[#e97254] rounded-md hover:bg-[#e97254] hover:text-white  text-xs p-1"
                                onClick={() => handleHiddenReport(item)}
                              >
                                Báo cáo
                              </button>
                            ) : null}
                          </React.Fragment>
                        )}
                      </td>
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
      {hiddenJobDetail && (
        <JobDetailModal setHiddenJobDetail={setHiddenJobDetail} />
      )}
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

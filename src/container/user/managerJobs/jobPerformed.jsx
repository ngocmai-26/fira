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
import JobDetailModal from "../../modal/job/DetailModal";

function JobPerformed() {
  const { allJob, paginationJob } = useSelector((state) => state.jobsReducer);
  const { account } = useSelector((state) => state.authReducer);
  const [currentPage, setCurrentPage] = useState(paginationJob?.number + 1);
  const { user } = useSelector((state) => state.authReducer);
  const [evaluateData, setEvaluateData] = useState({});
  const [hiddenEValue, isHiddenEValue] = useState(false);

  const [isHiddenReport, setIsHiddenReport] = useState(false);
  const [hiddenJobDetail, setHiddenJobDetail] = useState(false);

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

  // const handJobDetail = (item) => {
  //   dispatch(getJobById(item)).then((reps) => {
  //     if (!reps.error) {
  //       nav("/chi-tiet-cong-viec");
  //     }
  //   });
  // };

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

  const filteredJobs = allJob.filter((item) =>
    item.userJobs.some(
      (staff) =>
        staff.user.id === account.user.id && staff.status === "PROCESSING"
    )
  );

  console.log("filteredJobs", filteredJobs);
  const handJobDetail = (itemId) => {
    dispatch(getJobById(itemId)).then((response) => {
      if (!response.error) {
        setHiddenJobDetail(!hiddenJobDetail);
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
                    <tr key={key}>
                      <td className="w-4 p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        <div className="flex items-center">{key + 1}</div>
                      </td>

                      <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      {item?.title}
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        {item?.manager?.fullName}
                      </td>
                      <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                        {item?.userJobs?.map((userJob) => (
                          <p key={userJob.user.id}>{userJob.user.fullName}</p>
                        ))}
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                        {
                          new Date(item?.jobDetail?.timeStart)
                            .toISOString()
                            .split("T")[0]
                        }
                      </td>
                      <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                        {
                          new Date(item?.jobDetail?.timeEnd)
                            .toISOString()
                            .split("T")[0]
                        }
                      </td>

                      <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap gap-2 flex">
                        <button
                          className="border-[#58AD69] border text-[#58AD69] rounded-md hover:bg-[#58AD69] hover:text-white  text-xs p-1"
                          onClick={() => handJobDetail(item?.id)}
                        >
                          Chi tiết
                        </button>
                        {item.userJobs.some(
                          (userJob) =>
                            userJob.status === "PROCESSING" &&
                            userJob.cachedProgress === 0 &&
                            userJob.user.id === account.user.id
                        ) ? (
                          <button
                            className="border-[#e97254] border text-[#e97254] rounded-md hover:bg-[#e97254] hover:text-white text-xs p-1"
                            onClick={() => handleHiddenReport(item)}
                          >
                            Báo cáo
                          </button>
                        ) : item.userJobs[0]?.verifyLink === "reassess" ? (
                          <button
                            className="border-[#e97254] border text-[#e97254] rounded-md hover:bg-[#e97254] hover:text-white text-xs p-1"
                            onClick={() => handleHiddenReport(item)}
                          >
                            Báo cáo
                          </button>
                        ) : (
                          <div className=" border-[#657D81] border  rounded-md bg-[#657D81] text-white text-xs p-1">
                            Đã báo cáo
                          </div>
                        )}
                      </td>

                      <td className="text-sm font-medium text-gray-900 whitespace-nowrap"></td>
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
      {hiddenJobDetail && (
        <JobDetailModal setHiddenJobDetail={setHiddenJobDetail} />
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

export default JobPerformed;

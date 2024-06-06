import { Link, useNavigate } from "react-router-dom";
import LayoutJob from ".";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllJob,
  getJobById,
} from "../../../thunks/JobsThunk";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import moment from "moment";
import JobDetailModal from "../../modal/job/DetailModal";

function JobEvaluated() {
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
            if (userJob.user.id === account.user.id && userJob.status === "DONE") {
              filteredList.push({
                ...job,
                userJobs: [userJob],
              });
            }
          });
        });
        return filteredList;
      }, [allJob, account]);
  
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
                        className="p-4 text-sm font-bold text-left text-gray-500 uppercase"
                      >
                        Kết quả đánh giá
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
                        {item?.title}
                        </td>
                        <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                          {item?.manager?.fullName}
                        </td>
                        <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                          {item?.userJobs[0]?.user?.fullName}
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
                        <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                          {moment(item?.jobDetail?.timeEnd).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap flex gap-2">
                        <button
                            className="border-[#58AD69] border text-[#58AD69] rounded-md hover:bg-[#58AD69] hover:text-white  text-xs p-1"
                            onClick={() => handJobDetail(item?.id)}
                          >
                            Chi tiết
                          </button>
                          {item.userJobs[0]?.status === "PROCESSING" &&
                          item.userJobs[0]?.cachedProgress !== 0 &&
                          item.userJobs[0]?.jobEvaluate === null ? (
                            <button
                              className="border-[#17103a] border text-[#17103a] rounded-md hover:bg-[#17103a] hover:text-white  text-xs p-1"
                              onClick={() => handleHiddenEValue(item)}
                            >
                              Đánh giá
                            </button>
                          ) : item.userJobs[0]?.status === "DONE" && item.userJobs[0]?.jobEvaluate !== null ? (
                            <div className="border-[#657D81] border rounded-md bg-[#657D81] text-white text-xs p-1">Đã đánh giá</div>
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
  
        </div>
      </LayoutJob>
    );
  }
  
export default JobEvaluated;

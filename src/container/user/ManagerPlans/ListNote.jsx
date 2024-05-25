import { useEffect, useLayoutEffect, useState } from "react";
import LayoutPlan from ".";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deletePlan,
  getAllPlan,
  getPlanById,
  updateStatus,
} from "../../../thunks/PlansThunk";
import DetailPlanModal from "../../modal/plans/DetailPlanModal";
import EditPlanModal from "../../modal/plans/EditPlanModal";
import { Pagination, Stack } from "@mui/material";

function ManagerNote() {
  const { allPlan, singlePlan, paginationPlan } = useSelector(
    (state) => state.plansReducer
  );
  const [detailPlan, setDetailPlan] = useState(false);
  const [editPlan, setEditPlan] = useState(false);
  const { account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (allPlan?.length <= 0) {
      dispatch(getAllPlan());
    }
  }, []);

  const [isHiddenUpdate, setIsHiddenUpdate] = useState(true);
  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
  };
  const handleGetPlanById = (item) => {
    setDetailPlan(!detailPlan);
    dispatch(getPlanById(item));
  };
  const handleHiddenEdit = (item) => {
    setEditPlan(!editPlan);
    dispatch(getPlanById(item));
  };
  const handleActive = (item) => {
    console.log("item", item);
  };

  const [currentPage, setCurrentPage] = useState(paginationPlan?.number + 1);
  useEffect(() => {
    setCurrentPage(paginationPlan?.number + 1);
  }, [allPlan]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllPlan(pageNumber - 1));
  };

  const filteredPlans = allPlan.filter((item) => {
    if (account.role.roleName === "ROLE_ADMIN") {
      return true;
    }
    const isCreator = item.creator.id === account.user.id;
    const isUserJob = item.planJobs.some((job) =>
      job.userJobs.some((userJob) => userJob.user.id === account.user.id)
    );
    const isManager = item.planJobs.some(
      (job) => job.manager.id === account.user.id
    );
    return isCreator || isUserJob || isManager;
  });

  return (
    <LayoutPlan>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className="bg-white pt-5">
                <div className="bg-neutral-100 flex pb-4 w-full flex-wrap">
                  {filteredPlans.map((item) => (
                    <div className="my-2 h-fit w-full sm:w-1/4" key={item.id}>
                      <div>
                        <div
                          className={`${
                            item.planDetail.planType === "ONCE"
                              ? "bg-[#b0d4b8] hover:bg-[#a4c3a2] border-2 border-[#a4c3a2] bg-opacity-70"
                              : item.planDetail.planType === "LOOP"
                              ? "bg-[#d7f9fa] hover:bg-[#B8E7EA] border-2 border-sky-300"
                              : "bg-white hover:bg-gray-50"
                          } px-3 py-4 mx-2 rounded-md shadow hover:cursor-pointer`}
                        >
                          <div className="flex justify-between">
                            <p className="text-base font-semibold truncate">
                              {item.title}
                            </p>
                            <div className="Plan">
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                              <div className="planNote">
                                <button
                                  className="text-xs w-full hover:bg-slate-200 py-1.5"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Bạn có muốn xóa kế hoạch này không?"
                                      )
                                    ) {
                                      dispatch(deletePlan(item.id));
                                    }
                                  }}
                                >
                                  Xóa
                                </button>
                                <button className="text-xs w-full hover:bg-slate-200 py-1.5">
                                  Hoàn thành
                                </button>
                                <button
                                  className="text-xs w-full hover:bg-slate-200 py-1.5"
                                  onClick={() => handleHiddenEdit(item)}
                                >
                                  Chỉnh sửa
                                </button>
                                <button
                                  className="text-xs w-full hover:bg-slate-200 py-1.5"
                                  onClick={() => handleGetPlanById(item)}
                                >
                                  Xem chi tiết
                                </button>
                                {item.status === "ACTIVE" ? (
                                  <button
                                    className="text-xs w-full hover:bg-slate-200 py-1.5"
                                    onClick={() => {
                                      dispatch(
                                        updateStatus({
                                          id: item.id,
                                          data: {
                                            planStatus: "DISABLE",
                                            planJob: item.planJobs.map(
                                              (job) => job.id
                                            ),
                                          },
                                        })
                                      );
                                    }}
                                  >
                                    Dừng lại
                                  </button>
                                ) : (
                                  <button
                                    className="text-xs w-full hover:bg-slate-200 py-1.5"
                                    onClick={() => {
                                      dispatch(
                                        updateStatus({
                                          id: item.id,
                                          data: {
                                            planStatus: "ACTIVE",
                                            planJob: item.planJobs.map(
                                              (job) => job.id
                                            ),
                                          },
                                        })
                                      );
                                    }}
                                  >
                                    Bắt đầu
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs">
                            {item.planDetail.description}
                          </span>
                          <div className="w-full py-3">
                            <div className="items-center mb-4 flex gap-2">
                              <span className="text-sm text-slate-700">
                                Người lập kế hoạch:
                              </span>
                              <span className="text-sm">
                                {item.creator?.fullName}
                              </span>
                            </div>
                            <div className="flex gap-4">
                              <div className="start-time">
                                <span className="text-xs text-slate-700">
                                  Start date:
                                </span>
                                <span className="text-xs">
                                  {moment(item?.planDetail?.timeStart).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                              <div className="start-time">
                                <span className="text-xs text-slate-700">
                                  End date:
                                </span>
                                <span className="text-xs">
                                  {moment(item?.planDetail?.timeEnd).format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {detailPlan && <DetailPlanModal handleGetPlanById={handleGetPlanById} />}
      {editPlan && <EditPlanModal handleHiddenEdit={handleHiddenEdit} />}
      <div className="mt-10">
        {paginationPlan?.totalPages > 1 && (
          <Stack
            spacing={2}
            justifyContent="center"
            color="#fff"
            className="pagination"
          >
            <Pagination
              count={paginationPlan?.totalPages}
              color="primary"
              className="pagination-item"
              style={{ margin: "auto" }}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        )}
      </div>
    </LayoutPlan>
  );
}

export default ManagerNote;

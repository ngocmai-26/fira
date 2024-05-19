import { useEffect, useLayoutEffect, useState } from "react";
import LayoutPlan from ".";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllPlan } from "../../../thunks/PlansThunk";
import { Pagination, Stack } from "@mui/material";

function ListActivePlan() {
  const { allPlan, singlePlan, paginationPlan } = useSelector((state) => state.plansReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (allPlan?.length <= 0) {
      dispatch(getAllPlan());
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(paginationPlan?.number + 1);
  useEffect(() => {
    setCurrentPage(paginationPlan?.number + 1);
  }, [allPlan]);

  const handlePageChange = (event, pageNumber) => {
    dispatch(getAllPlan(pageNumber - 1));
  };

  return (
    <LayoutPlan>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className=" bg-white pt-5 ">
                <div className="bg-neutral-100 flex  pb-4 w-full flex-wrap">
                  {allPlan
                    ?.filter((item) => item.status === "ACTIVE")
                    .map((item) => (
                      <div className="my-2 h-fit w-full sm:w-1/4">
                        <div
                          className={`${
                            item.planDetail.planType === "ONCE"
                              ? "bg-[#b0d4b8] hover:bg-[#a4c3a2] border-2 border-[#a4c3a2] bg-opacity-70"
                              : item.planDetail.planType === "LOOP"
                              ? " bg-[#d7f9fa] hover:bg-[#B8E7EA] border-2 border-sky-300"
                              : "bg-white hover:bg-gray-50"
                          } px-3 py-4 mx-2 rounded-sm shadow hover:cursor-pointer`}
                        >
                          <div className="flex justify-between">
                            <p className="text-base font-semibold">
                              {item.title}
                            </p>
                          </div>

                          <span className="text-xs">
                            {item.planDetail.description}
                          </span>
                          <div className="w-full py-3">
                            <div className="items-center mb-4 flex gap-2">
                              <span className="text-sm text-slate-700">
                                Người lập kế hoạch:
                              </span>
                              <span className="text-sm ">
                              {item.creator?.fullName}
                              </span>
                                                   
                            </div>
                            <div className="flex gap-4">
                            <div className="start-time">
                              <span className="text-xs text-slate-700">
                                Start date:
                              </span>
                              <span className="text-xs">
                                {moment(item?.planDetail?.timeStart).format("DD-MM-YYYY")}
                              </span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-700">
                                End date:
                              </span>
                              <span className="text-xs">
                                {moment(item?.planDetail?.timeEnd).format("DD-MM-YYYY")}
                              </span>
                            </div> </div>
                            
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

export default ListActivePlan;

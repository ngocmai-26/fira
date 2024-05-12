import { useLayoutEffect, useState } from "react";
import LayoutPlan from ".";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllPlan } from "../../../thunks/PlansThunk";

function ListActivePlan() {
  const { allPlan, singlePlan } = useSelector((state) => state.plansReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (allPlan?.length <= 0) {
      dispatch(getAllPlan());
    }
  }, []);
  return (
    <LayoutPlan>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className=" bg-white p-5 ">
                <div className="bg-neutral-100 flex  pb-4 w-full flex-wrap">
                  {allPlan
                    ?.filter((item) => item.status === "ACTIVE")
                    .map((item) => (
                      <div className="my-2 h-fit w-full sm:w-1/4">
                        <div
                          className={`${
                            item.planDetail.planType === "ONCE"
                              ? "bg-amber-200 hover:bg-amber-300"
                              : item.planDetail.planType === "LOOP"
                              ? "bg-sky-200 hover:bg-sky-300"
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
                            <div className="items-center mb-4">
                              {item?.planDetail?.note
                                ?.split("'/n'")
                                .map((pre) => (
                                  <div className="w-full flex " key={pre}>
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                      - {pre}{" "}
                                    </span>
                                  </div>
                                ))}
                            </div>
                            <div className="items-center mb-4 text-sm">
                              <span className="font-bold">
                                Công việc liên quan
                              </span>
                              {item?.planJobs?.length !== 0 ? (
                                item.planJobs.map((pre) => (
                                  <div className="w-full flex" key={pre.title}>
                                    <span className="ml-2 text-sm font-medium text-gray-700">
                                      {pre.title}
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-xs text-gray-500">
                                  Chưa có công việc
                                </div>
                              )}
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Start date:{" "}
                              </span>
                              <span className="text-xs">
                                {moment(item?.timeStart).format("DD-MM-YYYY")}
                              </span>
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
    </LayoutPlan>
  );
}

export default ListActivePlan;

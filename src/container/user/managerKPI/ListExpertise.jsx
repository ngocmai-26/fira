import { useLayoutEffect, useState } from "react";
import KPI from ".";
import { GetKPIHistory, getAllKPI, getKpisById } from "../../../thunks/KPIsThunk";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ListExpertise() {
  const { allKPI } = useSelector((state) => state.kpisReducer);
  const { account } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const nav = useNavigate();
  useLayoutEffect(() => {
    if (allKPI?.length <= 0) {
      dispatch(getAllKPI());
    }
  }, []);

  const handleDetailExpertise = (item) => {
    dispatch(getKpisById(item))
    .then((reps) => {
      if(!reps.error) {

        dispatch(GetKPIHistory(account?.user?.id)).then((reps) => {
          if(!reps.error) {
            nav("/tham-dinh-danh-gia-KPI");
          }
        })
      }
    })

  }
  return (
    <KPI>
      <div className="flex flex-col">
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className="bg-white pt-5 min-w-[960px]">
                <div className="bg-neutral-100 grid grid-cols-4 gap-0 pb-4">
                {allKPI.filter(item => item.description === "EVALUATE").length === 0 ? (
                <div className="text-center py-4 col-span-4">
                  Không có KPI nào cần đánh giá
                </div>
              ) : (
                allKPI.map(
                  (item) =>
                    item.description === "EVALUATE" && (
                      <button
                        type="button"
                        onClick={() => handleDetailExpertise(item.id)}
                        className="draft-content text-start px-2"
                      >
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <div>
                            <p className="text-xs font-semibold name">
                              {item.name}
                            </p>
                            <div className="email">
                              <span className="text-xs text-slate-400">
                                {item.user.email}
                              </span>
                            </div>
                            <div className="email">
                              <span className="text-xs text-slate-400">
                                {item.user.department}
                              </span>
                            </div>
                            <div className="start-time">
                              <span className="text-slate-400 text-xs">Từ {" "}</span>
                              <span className="text-xs text-slate-400">
                                {moment(item?.detail?.timeStart).format("DD-MM-YYYY")}
                              </span>
                              <span className="text-slate-400 text-xs"> {" "}đến {" "}</span>
                              <span className="text-xs text-slate-400">
                                {moment(item?.detail?.timeEnd).format("DD-MM-YYYY")}
                              </span>
                            </div>
                            <div className="avatar flex justify-end">
                              <img
                                src={item.user.avatar}
                                alt=""
                                className=" w-8 h-8 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                )
              )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </KPI>
  );
}
export default ListExpertise;

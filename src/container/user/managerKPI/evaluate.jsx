import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout";
import { useEffect, useLayoutEffect, useState } from "react";
import { GetKPIHistory, addNewKpi } from "../../../thunks/KPIsThunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import KPIMore from "../../modal/kpi/kpis/kpiMore";
import { useNavigate } from "react-router-dom";

function EvaluateKPI() {
  const { account } = useSelector((state) => state.authReducer);
  const [sumPoint, setSumPoint] = useState(
    account.user.checkInPoint + account?.user?.jobPoint
  );
  const { listKPIHistory } = useSelector((state) => state.kpisReducer);
  // const { listKPIHistory } = useSelector((state) => state.kpiCategoriesReducer);
  const [kpiMore, setKPIMore] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [kpiData, setKPIData] = useState({
    name: "KPI - " + account?.user?.fullName,
    description: "EVALUATE",
    target: +sumPoint.toFixed(0),
    kpiTypeId: "81b7281f-0c09-4ae6-a008-9876517acf8f",
    note: "",
    comment: 'none',
    timeStart: "",
    timeEnd: "",
  });

  const handleMore = (item) => {
    setKPIMore(!kpiMore);
    dispatch(GetKPIHistory(item));
  };

  useEffect(() => {
    dispatch(GetKPIHistory(account?.user?.id));

  }, [kpiData.timeStart])

  const handleSubmit = () => {
    // console.log(kpiData)
    dispatch(addNewKpi(kpiData))
    .then((reps) => {
      if(!reps.error) {
        nav("/quan-ly-phieu-danh-gia");
      }
    })
  };

  return (
    <Layout>
      <div className="header-task  p-4">
        <div className="title">
          <a href="#" className="text-xl font-medium text-slate-500">
            Đánh giá KPI
          </a>
        </div>
        <div className="content bg-white py-5">
          <div className="information">
            <div className="flex">
              <p className="uppercase text-lg font-medium">
                KPI - {account?.user?.fullName}
              </p>
            </div>
            <div className="grid grid-cols-2 py-5">
              <div className="grid grid-cols-3">
                <div className="border-e-2">
                  <p className="text-xs leading-6 font-medium my-1">
                    Phòng ban:
                  </p>
                  <p className="text-xs leading-6 font-medium my-1">Chức vụ:</p>
                  <p className="text-xs leading-6 font-medium my-1">
                    Nhân viên:
                  </p>
                </div>
                <div className="col-span-2 px-3">
                  <p className="text-xs leading-6 font-medium my-1">
                    {account?.user?.department}
                  </p>
                  <p className="text-xs leading-6 font-medium my-1">
                    {account?.role?.roleName === "ROLE_ADMIN"
                      ? "Quản trị viên"
                      : account?.role?.roleName === "ROLE_MANAGE"
                      ? "Quản Lý"
                      : account?.role?.roleName === "ROLE_STAFF"
                      ? "Nhân viên"
                      : "Vô danh"}
                  </p>
                  <p className="text-xs leading-6 font-medium  my-1">
                    {account?.user?.fullName} &#60;{account?.user?.email}&#62;
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="border-e-2">
                  <p className="text-xs leading-6 font-medium my-1">
                    Start Date
                  </p>
                  <p className="text-xs leading-6 font-medium my-2">End Date</p>
                  <p className="text-xs leading-6 font-medium my-1">Quản lý</p>
                </div>
                <div className="col-span-2 px-3">
                  <div className="my-1">
                    <input
                      type="date"
                      className="text-xs leading-6 font-medium border border-gray-400 px-2 rounded-md"
                      defaultValue={kpiData.timeStart}
                      onChange={(e) =>
                        setKPIData({ ...kpiData, timeStart: e.target.value })
                      }
                    />
                  </div>
                  <div className="my-1">
                    <input
                      type="date"
                      className="text-xs leading-6 font-medium border border-gray-400 px-2 rounded-md"
                      defaultValue={kpiData.timeEnd}
                      onChange={(e) =>
                        setKPIData({ ...kpiData, timeEnd: e.target.value })
                      }
                    />
                  </div>
                  <p className="text-xs leading-6 font-medium my-1">
                    Nguyễn Thanh Sơn
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form action="">
            <div className="group-item py-3">
              <div className="flex justify-between">
                <p>Danh sách tiêu chí đánh giá KPI nhân viên</p>
                <div className="my-auto p-2 text-xs font-medium text-center text-white">
                  <button
                    type="button"
                    onClick={() => handleMore(account?.user?.id)}
                  >
                    Chi tiết
                  </button>
                </div>
              </div>
              <div className="table">
                <div className="thead">
                  <div className="grid grid-cols-12 gap-2 bg-red-500">
                    <div className="stt my-auto p-2 text-xs font-medium text-left text-white uppercase">
                      STT
                    </div>
                    <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-white uppercase">
                      Nội dung tiêu chí đánh giá
                    </div>
                    <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                      Điểm tối đa
                    </div>
                    <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                      Điểm tự đánh giá
                    </div>
                    <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                      Tỉ lệ hoàn thành
                    </div>
                    <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                      Thẩm định
                    </div>
                  </div>
                </div>
                <div className="tbody">
                  <div className="">
                    <div className="grid grid-cols-12 gap-2 kpi-main bg-red-300">
                      <div className="stt my-auto p-2 text-xs font-medium text-left text-white">
                        1
                      </div>
                      <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-white">
                        Tuân thủ giờ giấc làm việc
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-white">
                        5
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-white">
                        {account?.user?.checkInPoint}
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-white">
                        0
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-white">
                        0
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                      <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                        2
                      </div>
                      <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                        Công việc hoàn thành
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black">
                        95
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black">
                        {account?.user?.jobPoint}
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black">
                        0
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black">
                        0
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                      <div className="col-span-9 my-auto p-2 text-sm font-semibold text-center text-red-700">
                        <p className="text-right">Tổng điểm:</p>
                      </div>
                      <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                        {sumPoint.toFixed(0)}
                      </div>
                      <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                        0
                      </div>
                      <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                        0
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group-item py-3">
              <div className="note">
                <label htmlFor="">Ghi chú <span className="text-red-500">*</span></label>
                <textarea
                  id="biography"
                  rows="3"
                  defaultValue={kpiData.note}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ghi chú cho người đánh giá lưu ý"
                  onChange={(e) =>
                    setKPIData({ ...kpiData, note: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            <div className="btn text-right py-3">
              <button
                type="button"
                className="text-sm bg-blue-500 text-white px-5 py-1.5"
                onClick={handleSubmit}
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
      {kpiMore && <KPIMore handleMore={handleMore} />}
    </Layout>
  );
}

export default EvaluateKPI;

import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  cancelKPI,
  getKpiVerifyById,
  updateKPI,
  updateKPIDetail,
} from "../../../thunks/KPIsThunk";

function KPICheck() {
  const { singleKPI } = useSelector((state) => state.kpisReducer);
  const { listKPIHistory } = useSelector((state) => state.kpisReducer);
  const [sumPoint, setSumPoint] = useState(
    (singleKPI?.user?.checkInPoint + singleKPI?.user?.jobPoint).toFixed(0)
  );

  const [opinion, setOpinion] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [dataUpdate, setDataUpdate] = useState({
    name: singleKPI?.name,
    description: singleKPI?.description,
    target: 0,
    kpiTypeId: singleKPI?.kpiType?.id,
  });
  const [changeNote, setChangeNote] = useState("");

  const [dataUpdateDetail, setDataUpdateDetail] = useState({
    note: singleKPI?.detail?.note,
    comment: singleKPI?.detail?.comment,
    timeStart: moment(singleKPI?.detail?.timeStart).format("YYYY-MM-DD"),
    timeEnd: moment(singleKPI?.detail?.timeEnd).format("YYYY-MM-DD"),
  });

  const handleSubmit = () => {
    dispatch(getKpiVerifyById(singleKPI.id)).then((reps) => {
      if (!reps.error) {
        nav("/quan-ly-phieu-danh-gia");
      }
    });
  };

  const handleCancel = () => {
    console.log({ ...dataUpdateDetail, note: changeNote });
    dispatch(
      cancelKPI({
        id: singleKPI.id,
        data: { ...dataUpdate, description: "EVALUATE" },
      })
    ).then((reps) => {
      if (!reps.error) {
        dispatch(
          updateKPIDetail(
            {id: singleKPI.id,
              data: { ...dataUpdateDetail, note: changeNote }})
        ).then((reps) => {
          if (!reps.error) {
            nav("/quan-ly-phieu-danh-gia");
          }
        });
      }
    });
  };

  const handleOpenOpinion = () => {
    setChangeNote("");
    setOpinion(!opinion);
  };

  return (
    <Layout>
      <div className="header-task ">
        <div className="title py-3">
          <a href="#" className="text-xl font-medium text-slate-500">
            Kết quả thẩm định
          </a>
        </div>
        <div className="content bg-white py-5 px-3">
          <div className="information">
            <div className="flex">
              <p className="uppercase text-lg font-medium">{singleKPI.name}</p>
            </div>
            <div className="grid grid-cols-2 py-5">
              <div className="grid grid-cols-3">
                <div className="border-e-2">
                  <p className="text-xs leading-6 font-medium">Phòng ban:</p>
                  <p className="text-xs leading-6 font-medium">Email:</p>
                </div>
                <div className="col-span-2 px-3">
                  <p className="text-xs leading-6 font-medium">
                    {" "}
                    {singleKPI?.user?.department}
                  </p>
                  <p className="text-xs leading-6 font-medium">
                    {singleKPI?.user?.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="border-e-2">
                  <p className="text-xs leading-6 font-medium">Start Date</p>
                  <p className="text-xs leading-6 font-medium">End Date</p>
                </div>
                <div className="col-span-2 px-3">
                  <p className="text-xs leading-6 font-medium">
                    {moment(singleKPI?.detail?.timeStart).format("DD-MM-YYYY")}
                  </p>
                  <p className="text-xs leading-6 font-medium">
                    {moment(singleKPI?.detail?.timeEnd).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form action="">
            <div className="group-item py-3">
              <p>Danh sách tiêu chí đánh giá KPI nhân viên</p>
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
                    <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                      <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                        1
                      </div>
                      <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                        Tuân thủ giờ giấc làm việc
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black">
                        5
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black">
                        {singleKPI?.user?.checkInPoint.toFixed(2)}
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black">
                        {((singleKPI?.user?.checkInPoint / 5) * 100).toFixed(2)}{" "}
                        %
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black"></div>
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
                        {singleKPI?.user?.jobPoint}
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black">
                        {((singleKPI?.user?.jobPoint / 95) * 100).toFixed(2)} %
                      </div>
                      <div className="my-auto p-2 text-xs font-medium text-center text-black"></div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                      <div className="col-span-9 my-auto p-2 text-sm font-semibold text-center text-red-700">
                        <p className="text-right">Tổng điểm:</p>
                      </div>
                      <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                        {sumPoint}
                      </div>
                      <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                        {(
                          ((singleKPI?.user?.checkInPoint +
                            singleKPI?.user?.jobPoint) /
                            100) *
                          100
                        ).toFixed(2)}{" "}
                        %
                      </div>
                      <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                        {singleKPI?.target}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group-item py-3">
              <div className="note border-b-2 py-3 my-3">
                <label htmlFor="">Ghi chú</label>
                <p className="text-sm">Không có gì</p>
              </div>
              <div className="">
                <label htmlFor="">Nhận xét</label>
                <textarea
                  id="biography"
                  rows="3"
                  disabled={true}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                  placeholder={singleKPI?.detail?.comment}
                ></textarea>
              </div>
            </div>
            <div className="group-item py-3">
              <div className="flex justify-between py-2">
                <p>Danh sách minh chứng</p>
              </div>

              <div className="table w-full">
                <div className="thead">
                  <div className="grid grid-cols-12 gap-2 bg-red-500">
                    <div className="stt my-auto p-2 text-xs font-medium text-left text-white uppercase">
                      STT
                    </div>
                    <div className="text-center col-span-10 my-auto p-2 text-xs font-medium text-white uppercase">
                      Đường link minh chứng
                    </div>
                    <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                      Ngày tải
                    </div>
                  </div>
                </div>
                <div className="tbody">
                  <div className="">
                    {listKPIHistory.map((item) => (
                      <div className="grid grid-cols-12 gap-2 kpi-main ">
                        <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                          1
                        </div>
                        <div className="col-span-10 my-auto p-2 text-xs font-medium text-center text-black">
                          <p>{item.content}</p>
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          {moment(item?.createdAt).format("DD-MM-YYYY")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="btn text-right py-3">
              <button
                type="button"
                onClick={handleOpenOpinion}
                className="text-sm bg-gray-500 text-white px-5 py-1.5 mx-3"
              >
                Ý kiến
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="text-sm bg-blue-500 text-white px-5 py-1.5"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
      {opinion && (
        <div
          className={`fixed left-0 right-0 z-50 items-center justify-center flex overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
          id="new-task-modal"
        >
          <div className="relative w-full h-full max-w-xl m-auto px-4 md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <div className=" items-start justify-between p-5 ">
                <h3 className="text-xl font-semibold border-b rounded-t">
                  Ý kiến của bạn
                </h3>
                <div className="py-5">
                  <textarea
                    id="biography"
                    rows="3"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Hãy nếu ý kiến của bạn"
                    defaultValue={changeNote}
                    onChange={(e) => setChangeNote(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="btn text-right py-3">
                <button
                  type="button"
                  onClick={handleOpenOpinion}
                  className="text-sm bg-gray-500 text-white px-5 py-1.5 mx-3"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-sm bg-blue-500 text-white px-5 py-1.5"
                >
                  Phản hồi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default KPICheck;

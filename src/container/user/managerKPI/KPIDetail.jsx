import { useDispatch, useSelector } from "react-redux";
import Layout from "../../layout";
import moment from "moment";
import { useEffect, useState } from "react";

function KPIDetail() {
  const { singleKPI } = useSelector((state) => state.kpisReducer);
  const { listKPIHistory } = useSelector((state) => state.kpisReducer);
  const [sumPoint, setSumPoint] = useState(
    (singleKPI?.user?.checkInPoint + singleKPI?.user?.jobPoint).toFixed(0)
  );

  return (
    <Layout>
      <div className="header-task px-10 ">
        <div className="title py-3">
          <a href="#" className="text-xl font-medium text-slate-500">
            Kết quả thẩm định
          </a>
        </div>
        <div className="content bg-white py-5">
          <div className="information">
            <div className="flex">
              <p className="uppercase text-lg font-medium">{singleKPI.name}</p>
            </div>
            <div className="grid grid-cols-2 py-5">
              <div className="grid grid-cols-3">
                <div className="border-e-2">
                  <p className="text-sm leading-6 font-medium">Phòng ban:</p>
                  <p className="text-sm leading-6 font-medium">Email:</p>
                  <p className="text-sm leading-6 font-medium">Trạng thái phiếu đánh giá:</p>
                </div>
                <div className="col-span-2 px-3">
                  <p className="text-sm leading-6 font-medium">
                    {" "}
                    {singleKPI?.user?.department}
                  </p>
                  <p className="text-sm leading-6 font-medium">
                    {singleKPI?.user?.email}
                  </p>
                  <p className="text-sm leading-6 font-medium text-red-500">
                    {singleKPI?.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="border-e-2">
                  <p className="text-sm leading-6 font-medium">Start Date</p>
                  <p className="text-sm leading-6 font-medium">End Date</p>
                </div>
                <div className="col-span-2 px-3">
                  <p className="text-sm leading-6 font-medium">
                    {moment(singleKPI?.detail?.timeStart).format("DD-MM-YYYY")}
                  </p>
                  <p className="text-sm leading-6 font-medium">
                    {moment(singleKPI?.detail?.timeEnd).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form action="">
            <div className="group-item py-3 border-t border-gray-300">
              <p className="text-lg ">Danh sách tiêu chí đánh giá KPI nhân viên</p>
              <div className="table mt-3">
                <div className="thead">
                  <div className="grid grid-cols-12 gap-2 bg-[#6a9cfd]">
                    <div className="stt my-auto p-2 text-sm font-medium text-left text-white uppercase">
                      STT
                    </div>
                    <div className="col-span-7 my-auto p-2 text-sm font-medium text-left text-white uppercase">
                      Nội dung tiêu chí đánh giá
                    </div>
                    <div className="my-auto p-2 text-sm font-medium text-left text-white uppercase">
                      Điểm tối đa
                    </div>
                    <div className="my-auto p-2 text-sm font-medium text-left text-white uppercase">
                      Điểm tự đánh giá
                    </div>
                    <div className="my-auto p-2 text-sm font-medium text-left text-white uppercase">
                      Tỉ lệ hoàn thành
                    </div>
                    <div className="my-auto p-2 text-sm font-medium text-left text-white uppercase">
                      Thẩm định
                    </div>
                  </div>
                </div>
                <div className="tbody">
                  <div className="">
                    <div className="grid grid-cols-12 gap-2 kpi-main border-b border-gray-300">
                      <div className="stt my-auto p-2 text-sm font-medium text-left text-black">
                        1
                      </div>
                      <div className="col-span-7 my-auto p-2 text-sm font-medium text-left text-black">
                        Tuân thủ giờ giấc làm việc
                      </div>
                      <div className="my-auto p-2 text-sm font-medium text-center text-black">
                        5
                      </div>
                      <div className="my-auto p-2 text-sm font-medium text-center text-black">
                        {singleKPI?.user?.checkInPoint.toFixed(2)}
                      </div>
                      <div className="my-auto p-2 text-sm font-medium text-center text-black">
                        {((singleKPI?.user?.checkInPoint / 5) * 100).toFixed(2)}{" "}
                        %
                      </div>
                      <div className="my-auto p-2 text-sm font-medium text-center text-black"></div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 kpi-main border-b border-gray-300">
                      <div className="stt my-auto p-2 text-sm font-medium text-left text-black">
                        2
                      </div>
                      <div className="col-span-7 my-auto p-2 text-sm font-medium text-left text-black">
                        Công việc hoàn thành
                      </div>
                      <div className="my-auto p-2 text-sm font-medium text-center text-black">
                        95
                      </div>
                      <div className="my-auto p-2 text-sm font-medium text-center text-black">
                        {singleKPI?.user?.jobPoint}
                      </div>
                      <div className="my-auto p-2 text-sm font-medium text-center text-black">
                        {((singleKPI?.user?.jobPoint / 95) * 100).toFixed(2)} %
                      </div>
                      <div className="my-auto p-2 text-sm font-medium text-center text-black"></div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                      <div className="col-span-9 my-auto p-2 text-sm font-semibold text-center text-[#6a9cfd]">
                        <p className="text-right">Tổng điểm:</p>
                      </div>
                      <div className="my-auto p-2 text-sm font-semibold text-[#6a9cfd] text-center">
                        {sumPoint}
                      </div>
                      <div className="my-auto p-2 text-sm font-semibold text-[#6a9cfd] text-center">
                        {(
                          ((singleKPI?.user?.checkInPoint +
                            singleKPI?.user?.jobPoint) /
                            100) *
                          100
                        ).toFixed(2)}{" "}
                        %
                      </div>
                      <div className="my-auto p-2 text-sm font-semibold text-[#6a9cfd] text-center">
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
                  placeholder={singleKPI?.detail?.comment === "none"? "Chưa có nhận xét": singleKPI?.detail?.comment}
                ></textarea>
              </div>
            </div>
            <div className="group-item py-3">
              <div className="flex justify-between py-2 text-lg">
                <p>Danh sách minh chứng</p>
              </div>

              <div className="table w-full">
                <div className="thead">
                  <div className="grid grid-cols-12 gap-2 bg-[#6a9cfd]">
                    <div className="stt my-auto p-2 text-sm font-medium text-left text-white uppercase">
                      STT
                    </div>
                    <div className="text-center col-span-10 my-auto p-2 text-sm font-medium text-white uppercase">
                      Đường link minh chứng
                    </div>
                    <div className="my-auto p-2 text-sm font-medium text-left text-white uppercase">
                      Ngày tải
                    </div>
                  </div>
                </div>
                <div className="tbody">
                  <div className="">
                    {listKPIHistory.map((item, key) => (
                      <div className="grid grid-cols-12 gap-2 kpi-main border-b border-gray-300 " key={key}>
                        <div className="stt my-auto p-2 text-sm font-medium text-left text-black">
                          {key+1}
                        </div>
                        <div className="col-span-10 my-auto p-2 text-sm font-medium text-center text-black">
                          <p>{item.content}</p>
                        </div>
                        <div className="my-auto p-2 text-sm font-medium text-center text-black">
                          {moment(item?.createdAt).format("DD-MM-YYYY")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
}

export default KPIDetail;

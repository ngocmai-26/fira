import Layout from "../../layout";

function Expertise() {
    return (
      <Layout>
        <div className="header-task ">
          <div className="title py-3">
            <a href="#" className="text-xl font-medium text-slate-500">
              Thẩm định KPI
            </a>
          </div>
          <div className="content bg-white py-5 px-3">
            <div className="information">
              <div className="flex">
                <p className="uppercase text-lg font-medium">
                  KPI - Nguyễn Thị Ngọc Mai [TE611] 01/11/2023 - 30/11/2023
                </p>
              </div>
              <div className="grid grid-cols-2 py-5">
                <div className="grid grid-cols-3">
                  <div className="border-e-2">
                    <p className="text-xs leading-6 font-medium">Phòng ban:</p>
                    <p className="text-xs leading-6 font-medium">Chức vụ:</p>
                    <p className="text-xs leading-6 font-medium">Nhân viên:</p>
                    <p className="text-xs leading-6 font-medium">Kết quả KPI:</p>
                  </div>
                  <div className="col-span-2 px-3">
                    <p className="text-xs leading-6 font-medium">Khoa CNTT</p>
                    <p className="text-xs leading-6 font-medium">Nhân viên</p>
                    <p className="text-xs leading-6 font-medium">
                      Nguyễn Thị Ngọc Mai &#60;ngocmai@gmail.com&#62;
                    </p>
                    <p className="text-xs leading-6 font-medium">0%</p>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="border-e-2">
                    <p className="text-xs leading-6 font-medium">Start Date</p>
                    <p className="text-xs leading-6 font-medium">End Date</p>
                    <p className="text-xs leading-6 font-medium">
                      Người đánh giá
                    </p>
                    <p className="text-xs leading-6 font-medium">Quản lý</p>
                  </div>
                  <div className="col-span-2 px-3">
                    <p className="text-xs leading-6 font-medium">01/11/2023</p>
                    <p className="text-xs leading-6 font-medium">30/11/2023</p>
                    <p className="text-xs leading-6 font-medium">
                      Nguyễn Thị Ngọc Mai &#60;ngocmai@gmail.com&#62;
                    </p>
                    <p className="text-xs leading-6 font-medium">
                      Nguyễn Thanh Sơn
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
                          Hoạt động chung
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          6
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          <input
                            type="text"
                            name="score"
                            defaultValue="4"
                            className="border w-2/4 text-center py-1.5 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                        <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                          1
                        </div>
                        <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                          Hoạt động chung
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          6
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          <input
                            type="text"
                            name="score"
                            defaultValue="4"
                            className="border w-2/4 text-center py-1.5 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                        <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                          1
                        </div>
                        <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                          Hoạt động chung
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          6
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          <input
                            type="text"
                            name="score"
                            defaultValue="4"
                            className="border w-2/4 text-center py-1.5 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                        <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                          1
                        </div>
                        <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                          Hoạt động chung
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          6
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          <input
                            type="text"
                            name="score"
                            defaultValue="4"
                            className="border w-2/4 text-center py-1.5 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                        <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                          1
                        </div>
                        <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                          Hoạt động chung
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          6
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          20
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          <input
                            type="text"
                            name="score"
                            defaultValue="4"
                            className="border w-2/4 text-center py-1.5 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                        <div className="col-span-9 my-auto p-2 text-sm font-semibold text-center text-red-700">
                          <p className="text-right">Tổng điểm:</p>
                        </div>
                        <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                          100
                        </div>
                        <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                          100
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
                <div className="note border-b-2 py-3 my-3">
                  <label htmlFor="">Ghi chú</label>
                  <p className="text-sm">Không có gì</p>
                </div>
                <div className="">
                  <label htmlFor="">Nhận xét</label>
                  <textarea
                    id="biography"
                    rows="3"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Ghi ý kiến"
                  ></textarea>
                </div>
              </div>
              <div className="group-item py-3">
                <div className="flex justify-between py-2">
                  <p>Danh sách đường link minh chứng</p>
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
                      <div className="grid grid-cols-12 gap-2 kpi-main bg-red-300">
                        <div className="stt my-auto p-2 text-xs font-medium text-left text-white">
                          1
                        </div>
                        <div className="col-span-10 my-auto p-2 text-xs font-medium text-center text-white">
                          <a href="" className="underline">
                            Hoạt động chung
                          </a>
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-white">
                          23/01/2023
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="btn text-right py-3">
                <button
                  type="btn"
                  className="text-sm bg-blue-500 text-white px-5 py-1.5"
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
  
  export default Expertise;
  
import Layout from "../../layout";

function EvaluateKPI() {
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
                      <div className="grid grid-cols-12 gap-2 kpi-main bg-red-300">
                        <div className="stt my-auto p-2 text-xs font-medium text-left text-white">
                          1
                        </div>
                        <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-white">
                          Hoạt động chung
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-white">
                          21
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-white">
                          0
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
                          1
                        </div>
                        <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                          Hoạt động chung
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          5
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          <input
                            type="text"
                            name="score"
                            defaultValue="4"
                            className="border w-2/4 text-center py-1.5 bg-transparent"
                          />
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          0
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          0
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
                          4
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          <input
                            type="text"
                            name="score"
                            defaultValue="4"
                            className="border w-2/4 text-center py-1.5 bg-transparent"
                          />
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          0
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          0
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
                          5
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          <input
                            type="text"
                            name="score"
                            defaultValue="4"
                            className="border w-2/4 text-center py-1.5 bg-transparent"
                          />
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          0
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          0
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
                          <input
                            type="text"
                            name="score"
                            defaultValue="4"
                            className="border w-2/4 text-center py-1.5 bg-transparent"
                          />
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
                          8
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
                  <label htmlFor="">Ghi chú</label>
                  <textarea
                    id="biography"
                    rows="3"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Full-stack web developer. Open-source contributor."
                  ></textarea>
                </div>
              </div>
              <div className="group-item py-3">
                <div className="flex justify-between py-2">
                  <p>Danh sách file minh chứng</p>
                  <div className="flex items-center justify-center border border-black px-3 py-1.5">
                    <button
                      className="flex flex-col items-center justify-center text-xs "
                      type="button"
                    >
                      Thêm mới
                    </button>
                  </div>
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
                    </div>
                  </div>
                  <div className="tbody">
                    <div className="">
                      <div className="grid grid-cols-12 gap-2 kpi-main bg-gray-100">
                        <div className="stt my-auto p-2 text-xs font-medium text-left ">
                          1
                        </div>
                        <div className="col-span-10 my-auto p-2 text-xs font-medium text-center">
                          <input
                            type="text"
                            name="email"
                            id="accounts-search"
                            className="border-2 bg-transparent text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                          />
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
  
  export default EvaluateKPI;
  
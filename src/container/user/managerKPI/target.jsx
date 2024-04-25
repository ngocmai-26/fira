import Layout from "../../layout";

function Target() {
    return (
      <Layout>
        <div className="header-task ">
          <div className="title py-3">
            <a href="#" className="text-xl font-medium text-slate-500">
              KPI Target
            </a>
          </div>
          <div className="content bg-white py-5 px-3">
            <div className="information">
              <div className="flex">
                <p className="uppercase text-lg font-medium">
                  Nguyễn Thị Ngọc Mai [TE611] 01/11/2023 - 30/11/2023
                </p>
              </div>
              <div className="grid grid-cols-2 py-5">
                <div className="grid grid-cols-3">
                  <div className="border-e-2">
                    <p className="text-xs leading-6 font-medium">Phòng ban:</p>
                    <p className="text-xs leading-6 font-medium">Chức vụ:</p>
                    <p className="text-xs leading-6 font-medium">Nhân viên:</p>
                    <p className="text-xs leading-6 font-medium">
                      Bộ chỉ tiêu KPI:
                    </p>
                    <p className="text-xs leading-6 font-medium">Quản lý:</p>
                  </div>
                  <div className="col-span-2 px-3">
                    <p className="text-xs leading-6 font-medium">Khoa CNTT</p>
                    <select
                      id="category-create"
                      className="w-2/4 py-0.5 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block"
                    >
                      <option selected=""></option>
                      <option defaultValue="1">Nhân viên</option>
                      <option defaultValue="2">Giảng viên</option>
                    </select>
                    <p className="text-xs leading-6 font-medium">
                      Nguyễn Thị Ngọc Mai &#60;ngocmai@gmail.com&#62;
                    </p>
                    <p className="text-xs leading-6 font-medium">Nhân viên</p>
                    <select
                      id="category-create"
                      className="w-2/4 py-0.5 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block"
                    >
                      <option selected=""></option>
                      <option defaultValue="1"> Nguyễn Thị Ngọc Mai &#60;ngocmai@gmail.com&#62;</option>
                      <option defaultValue="2"> Nguyễn Thị Ngọc Mai &#60;ngocmai@gmail.com&#62;</option>
                    </select>
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
                          0
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
                          0
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
                          0
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
                          0
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          0
                        </div>
                        <div className="my-auto p-2 text-xs font-medium text-center text-black">
                          0
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
  
  export default Target;
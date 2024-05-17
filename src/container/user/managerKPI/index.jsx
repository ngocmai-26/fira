import { Link } from "react-router-dom";
import Layout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import { searchJobAsync } from "../../../thunks/JobsThunk";

function KPI({ children }) {
  const { account } = useSelector((state) => state.authReducer);
  return (
    <Layout>
      <div className="header-kpi p-4">
        <div className="title">
          <a href="#" className="text-xl font-medium">
            KPIs
          </a>
        </div>

        <div className="kpis">
          <div className="block sm:flex bg-white mt-4 justify-between">
            <ul className="flex  font-medium flex-row my-auto">
              <li className="hover:bg-gray-50 mt-0 pr-2">
                <Link
                  to="/quan-ly-phieu-danh-gia"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full "
                >
                  Phiếu đánh giá KPI
                </Link>
              </li>
              {account?.role?.roleName === "ROLE_ADMIN" || account?.role?.roleName === "ROLE_MANAGER" ? (
                <li className="hover:bg-gray-50 mt-0 px-2">
                  <Link
                    to="/danh-sach-kpi-danh-gia"
                    className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full "
                  >
                    Đánh giá KPI
                  </Link>
                </li>
              ) : (
                <></>
              )}

              <li className="hover:bg-gray-50 mt-0 px-2">
                <Link
                  to="/request-kpi"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full "
                >
                  Kết quả đánh giá
                </Link>
              </li>
            </ul>
            <form className="sm:pr-3 px-4 sm:px-0" action="#" method="GET">
              <label htmlFor="accounts-search" className="sr-only">
                Tìm kiếm
              </label>
              <div className="relative w-full  mt-1 sm:w-64 py-2">
                <input
                  type="text"
                  name="search"
                  id="accounts-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                  placeholder="Tìm kiếm"
                />
              </div>
            </form>
          </div>

          <div className="bg-gray-100 py-4 block sm:flex justify-between">
            <div className="flex pb-2 sm:py-0">
              <Link
                to="/danh-gia-KPI"
                className="bg-gray-800 mx-2 text-sm rounded-md text-white py-1.5 px-4"
              >
                + Tạo phiếu KPI
              </Link>
            </div>
            <div className="flex">
              <select
                id="category-create"
                className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
              >
                <option selected="">Người dùng</option>
                <option defaultValue="1">Kế hoạch</option>
                <option defaultValue="2">Đang tiến hành</option>
                <option defaultValue="3">Đến hạn</option>
                <option defaultValue="4">Hoàn thành</option>
              </select>
            </div>
          </div>
          {children}
        </div>
      </div>
    </Layout>
  );
}

export default KPI;

import { Link, useLocation } from "react-router-dom";
import Layout from "../../layout";
import { useSelector } from "react-redux";

function KPI({ children }) {
  const { account } = useSelector((state) => state.authReducer);
  const location = useLocation();
  const { pathname } = location;

  return (
    <Layout>
      <div className="header-kpi p-4 px-10">
        <div className="title">
          <a href="#" className="text-xl font-medium">
            KPIs
          </a>
        </div>

        <div className="kpis">
          <div className="block sm:flex bg-white mt-4 justify-between">
            <ul className="flex font-medium flex-row my-auto">
              <li className="mt-0">
                <Link
                  to="/quan-ly-phieu-danh-gia"
                  className={`block py-1 text-sm font-medium leading-8 w-full px-3 ${
                    pathname === "/quan-ly-phieu-danh-gia" ? "bg-gray-200" : "hover:bg-gray-50"
                  }`}
                >
                  Phiếu đánh giá KPI
                </Link>
              </li>
              {(account?.role?.roleName === "ROLE_ADMIN" ||
                account?.role?.roleName === "ROLE_MANAGER") && (
                <li className="mt-0">
                  <Link
                    to="/danh-sach-kpi-danh-gia"
                    className={`block py-1 text-sm font-medium leading-8 w-full px-3 ${
                      pathname === "/danh-sach-kpi-danh-gia" ? "bg-gray-200" : "hover:bg-gray-50"
                    }`}
                  >
                    Đánh giá KPI
                  </Link>
                </li>
              )}
              <li className="mt-0">
                <Link
                  to="/request-kpi"
                  className={`block py-1 text-sm font-medium leading-8 w-full px-3 ${
                    pathname === "/request-kpi" ? "bg-gray-200" : "hover:bg-gray-50"
                  }`}
                >
                  Kết quả đánh giá
                </Link>
              </li>
            </ul>
            <div>
              <Link
                to="/danh-gia-KPI"
                className="text-sky-500 bg-white border border-sky-500 hover:bg-[#B0E2FF] focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2"
              >
                + Tạo phiếu KPI
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
    </Layout>
  );
}

export default KPI;

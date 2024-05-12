import { Link } from "react-router-dom";
import Layout from "../../layout";
import { useState } from "react";
import CreatePlanModal from "../../modal/plans/createPlanModal";

function LayoutPlan({ children }) {
  const [isHiddenCreate, setIsHiddenCreate] = useState(false);
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };
  
  return (
    <Layout>
      <div className="header-kpi p-4">
        <div className="title ">
          <a href="#" className="text-xl font-bold uppercase">
            Kế hoạch công việc
          </a>
        </div>

        <div className="notes">
          <div className="block sm:flex bg-white mt-4 justify-between">
            <ul className="flex  font-medium flex-row my-auto">
              <li className="hover:bg-gray-50 mt-0 px-2">
                <Link
                  to="/quan-ly-ke-hoach"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full"
                >
                  Kế hoạch công việc
                </Link>
              </li>
              <li className="hover:bg-gray-50 mt-0 px-2">
                <Link
                  to="/ke-hoach-dang-thuc-hien"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full"
                >
                  Đang chạy
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
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="bg-gray-100 py-4 flex justify-between">
            <div className="">
              <button
                className="bg-gray-800 text-sm rounded-md text-white py-1 px-4"
                onClick={() => handleHiddenCreate()}
              >
                + Thêm mới
              </button>
            </div>
            <div className="pe-2">
              <select
                id="category-create"
                //  onChange={(e) => setFilterType(e.target.value)}
                //  value={filterType? filterType: "0"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
              >
                <option value="0" selected="">
                  Thuộc
                </option>
                <option value="1">Công việc</option>
                <option value="2">KPI</option>
              </select>
            </div>
          </div>
          {children}
        </div>
        {isHiddenCreate && <CreatePlanModal handleHiddenCreate={handleHiddenCreate} />}
      </div>
    </Layout>
  );
}

export default LayoutPlan;

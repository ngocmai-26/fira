import { Link, useLocation } from "react-router-dom";
import Layout from "../../layout";
import { useState } from "react";
import CreatePlanModal from "../../modal/plans/createPlanModal";
import ButtonComponent from "../../component/ButtonComponent";

function LayoutPlan({ children }) {
  const [isHiddenCreate, setIsHiddenCreate] = useState(false);
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };

  const location = useLocation();
  const { pathname } = location;

  return (
    <Layout>
      <div className="header-kpi p-4 px-10">
        <div className="title">
          <a href="#" className="text-xl font-bold uppercase">
            Kế hoạch công việc
          </a>
        </div>

        <div className="notes">
          <div className="block sm:flex bg-white justify-between border-b py-7">
            <ul className="flex font-medium flex-row my-auto">
              <li className={`mt-0 px-2 ${pathname === "/quan-ly-ke-hoach" ? "bg-gray-200" : "hover:bg-gray-50"}`}>
                <Link
                  to="/quan-ly-ke-hoach"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full"
                >
                  Kế hoạch công việc
                </Link>
              </li>
              <li className={`mt-0 px-2 ${pathname === "/ke-hoach-dang-thuc-hien" ? "bg-gray-200" : "hover:bg-gray-50"}`}>
                <Link
                  to="/ke-hoach-dang-thuc-hien"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full"
                >
                  Công việc đang thực hiện
                </Link>
              </li>
            </ul>
            {/* <form className="sm:pr-3 px-4 sm:px-0" action="#" method="GET">
              <label htmlFor="accounts-search" className="sr-only">
                Tìm kiếm
              </label>
              <div className="relative w-full mt-1 sm:w-64 py-2">
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
            </form> */}
            <ButtonComponent
              type={"button"}
              textButton={"Thêm kế hoạch"}
              handleClick={handleHiddenCreate}
              style={
                "text-sky-500 bg-white border border-sky-500 hover:bg-[#B0E2FF] focus:ring-4 focus:ring-blue-300 px-5 "
              }
            />
          </div>

          {/* <div className="bg-gray-100 py-4 flex justify-between">
            <div className="mx-2 sm:mx-4">
              <button
                className="bg-gray-800 text-sm rounded-md text-white py-1 px-4"
                onClick={() => handleHiddenCreate()}
              >
                + Thêm mới
              </button>
            </div>
          </div> */}
          {children}
        </div>
        {isHiddenCreate && <CreatePlanModal handleHiddenCreate={handleHiddenCreate} />}
      </div>
    </Layout>
  );
}

export default LayoutPlan;

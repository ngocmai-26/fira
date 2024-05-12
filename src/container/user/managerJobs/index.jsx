import { Link } from "react-router-dom";
import Layout from "../../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  faAlignLeft,
  faColumns,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewJob,
  getAllJob,
  getAllJobById,
  searchJobAsync,
} from "../../../thunks/JobsThunk";
import { getAllUsers } from "../../../thunks/UsersThunk";
import { getAllRole } from "../../../thunks/RolesThunk";
import { priorities, statusList } from "../../../constants/fakeData";
import { FormField } from "../../component/FormField";
import { ErrorField } from "../../component/ErrorField";
import CreateJobModel from "../../modal/job/CreateJobModal";
import { debounce } from "../../../app/debounce";
import SearchComponent from "../../component/SearchComponent";
import { Spinner } from "../../component/Spinner";

function LayoutJob({ children }) {
  const { allRole } = useSelector((state) => state.rolesReducer);
  const { allJob, searchJobs, actionStatusCode, listJobRaz } = useSelector(
    (state) => state.jobsReducer
  );
  const { account } = useSelector((state) => state.authReducer);

  const { allUser } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (account?.role?.id === 1) {
      if (allJob?.length <= 0) {
        dispatch(getAllJob());
      }
    } else {
      if (allJob?.length <= 0) {
        dispatch(getAllJobById({ id: account?.user?.id, pagination: 0 }));
      }
    }

    if (allUser?.length <= 0) {
      dispatch(getAllUsers());
    }
    if (allRole?.length <= 0) {
      dispatch(getAllRole());
    }
  }, []);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState(0);
  const [filterPriority, setFilterPriority] = useState(0);
  const [changeReason, setChangeReason] = useState(0);
  const [state, setState] = useState([]);

  const [jobs, setJobs] = useState(allJob);

  const [isHiddenCreate, setIsHiddenCreate] = useState(false);
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
    setNewJobData({
      title: "",
      kpiCount: 0,
      priority: 0,
      progress: 0,
      userCreateJobId: account?.user?.id,
      staffsGotJobId: [],
      userCreateJobId: "",
      description: "",
      note: "dđ",
      target: "",
      timeStart: "",
      timeEnd: "",
      additionInfo: "",
      task: true,
      jobStatus: "PENDING",
    });
  };

  const [newJobData, setNewJobData] = useState({
    title: "",
    kpiCount: 0,
    priority: 0,
    progress: 0,
    jobStatus: "PENDING",
    userCreateJobId: account?.user?.id,
    staffsGotJobId: [],
    userCreateJobId: "",
    description: "",
    note: "dđ",
    target: "",
    timeStart: "",
    timeEnd: "",
    additionInfo: "",
    task: true,
  });

  const handleSearchJob = (e) => {
    dispatch(searchJobAsync(e.target.value));
  };

  const handleFilterPriority = (item) => {
    const filteredItems = allJob.filter((element) => {
      return element.priority === +item;
    });
    if (item ==='' || item === '0') {
      setJobs(allJob);
    } else {
      setJobs(filteredItems)
    }
  };


  return (
    <>
      <Layout>
        <div className="header-task p-4 ">
          <div className="title">
            <a href="#" className="text-xl font-bold uppercase">
              Quản lý Công việc
            </a>
          </div>

          <div className="tasks">
            <div className="block sm:flex bg-white mt-4 justify-between">
              <ul className="flex my-auto font-medium flex-row bg-white ">
                <li className="hover:bg-gray-50 mt-0 px-2">
                  <Link
                    to="/quan-ly-cong-viec"
                    className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                  >
                    <FontAwesomeIcon icon={faListCheck} className="me-1" />
                    Danh sách công việc
                  </Link>
                </li>
                {account?.role?.roleName !== "ROLE_ADMIN" && (<li className="hover:bg-gray-50 mt-0 px-2">
                  <Link
                    to="/cong-viec-dang-thuc-hien"
                    className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                  >
                    <FontAwesomeIcon icon={faListCheck} className="me-1" />
                    Danh sách công việc đang thực hiện
                  </Link>
                </li>)}
                
                <li className="hover:bg-gray-50 mt-0 px-2">
                  <Link
                    to="/quan-ly-cong-viec-dang-bang"
                    className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                  >
                    <FontAwesomeIcon icon={faColumns} className="me-1" />
                    Bảng công việc
                  </Link>
                </li>
                {account?.role?.id !== 1 || account?.role?.id !== 3 ? (
                  <li className="hover:bg-gray-50 mt-0 px-2">
                    <Link
                      to="/bao-cao-cong-viec"
                      className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                    >
                      <FontAwesomeIcon icon={faAlignLeft} className="me-1" />
                      Báo cáo công việc
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
              <form className="sm:pr-3 px-4 sm:px-0" action="#" method="GET">
                <div className="relative w-full  mt-1 sm:w-64 py-2">
                  <SearchComponent
                    placeholder="Nhập tên chức vụ"
                    handleSearch={debounce(handleSearchJob, 1000)}
                    style={"w-full"}
                    SearchingAnimate={
                      <Spinner
                        width={"w-20"}
                        height={"h-5"}
                        color={"fill-gray-400"}
                      />
                    }
                  />
                </div>
              </form>
            </div>

            <div className="bg-gray-100 my-2 p-2 block sm:flex justify-between">
              <div className="flex sm:pb-0 pb-2">
                {account?.role?.id === 3 || account?.role?.id === 1 ? (
                  <div className="mx-2 sm:mx-4">
                    <button
                      className="bg-gray-800 text-sm rounded-md text-white py-1 px-4"
                      onClick={() => handleHiddenCreate()}
                    >
                      + Thêm mới
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex">
                <select
                  id="category-create"
                  // onChange={(e) => setFilterStatus(e.target.value)}
                  className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                >
                  <option selected="" value="0">
                    Trạng thái
                  </option>
                  {statusList?.map((item, key) => (
                    <option value={item?.id} key={key}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  id="category-create"
                  onChange={(e) => handleFilterPriority(e.target.value)}
                  className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                >
                  <option selected="" value="">
                    Mức độ
                  </option>
                  <option value="0">Tất cả</option>
                  {priorities?.map((item, key) => (
                    <option value={item?.id} key={key}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  id="category-create"
                  // onChange={(e) => setChangeReason(e.target.value)}
                  className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                >
                  <option selected="" value="0">
                    Tất cả công việc
                  </option>

                  <option selected="" value="1">
                    Công việc bị từ chối
                  </option>
                </select>
              </div>
            </div>
            {children}
          </div>
          {/* Tạo công việc mới */}
          {isHiddenCreate && (
            <CreateJobModel handleHiddenCreate={handleHiddenCreate} />
          )}
        </div>
      </Layout>
    </>
  );
}

export default LayoutJob;

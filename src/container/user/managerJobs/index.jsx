import { Link, useLocation } from "react-router-dom";
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
import ButtonComponent from "../../component/ButtonComponent";

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
    if (item === "" || item === "0") {
      setJobs(allJob);
    } else {
      setJobs(filteredItems);
    }
  };

  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <Layout>
        <div className="header-task p-4 px-10 ">
          <div className="title">
            <a href="#" className="text-xl font-bold uppercase">
              Quản lý Công việc
            </a>
          </div>

          <div className="tasks">
            <div className="block sm:flex bg-white mt-4 justify-between">
              <ul className="flex my-auto font-medium flex-row bg-white ">
                <li
                  className={`mt-0 px-2 ${
                    pathname === "/quan-ly-cong-viec"
                      ? "bg-gray-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Link
                    to="/quan-ly-cong-viec"
                    className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                  >
                    <FontAwesomeIcon icon={faListCheck} className="me-1" />
                    Danh sách công việc
                  </Link>
                </li>
                {account?.role?.roleName !== "ROLE_ADMIN" && (
                  <li
                    className={`mt-0 px-2 ${
                      pathname === "/cong-viec-dang-thuc-hien"
                        ? "bg-gray-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Link
                      to="/cong-viec-dang-thuc-hien"
                      className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                    >
                      <FontAwesomeIcon icon={faListCheck} className="me-1" />
                      Danh sách công việc đang thực hiện
                    </Link>
                  </li>
                )}
                <li
                  className={`mt-0 px-2 ${
                    pathname === "/quan-ly-cong-viec-dang-bang"
                      ? "bg-gray-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Link
                    to="/quan-ly-cong-viec-dang-bang"
                    className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                  >
                    <FontAwesomeIcon icon={faColumns} className="me-1" />
                    Bảng công việc
                  </Link>
                </li>
                {account?.role?.roleName === "ROLE_ADMIN" || account?.role?.roleName === "ROLE_MANAGER" ? (
                  <li
                    className={`mt-0 px-2 ${
                      pathname === "/bao-cao-cong-viec"
                        ? "bg-gray-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Link
                      to="/bao-cao-cong-viec"
                      className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2  "
                    >
                      <FontAwesomeIcon icon={faAlignLeft} className="me-1" />
                      Đánh giá công việc
                    </Link>
                  </li>
                ) : (
                  <li
                    className={`mt-0 px-2 ${
                      pathname === "/quan-ly-cong-viec-da-thuc-hien"
                        ? "bg-gray-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Link
                      to="/quan-ly-cong-viec-da-thuc-hien"
                      className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2  "
                    >
                      <FontAwesomeIcon icon={faAlignLeft} className="me-1" />
                      Công việc đã hoàn thành
                    </Link>
                  </li>
                )}
              </ul>
              <div>
                {account?.role?.roleName === "ROLE_ADMIN" || account?.role?.roleName === "ROLE_MANAGER" ? (
                  <ButtonComponent
                    type={"button"}
                    textButton={"Thêm công việc"}
                    handleClick={handleHiddenCreate}
                    style={
                      "text-sky-500 bg-white border border-sky-500 hover:bg-[#B0E2FF] focus:ring-4 focus:ring-blue-300 px-5 "
                    }
                  />
                ) : (
                  <></>
                )}
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

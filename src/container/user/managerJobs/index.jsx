import { Link } from "react-router-dom";
import Layout from "../../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState } from "react";
import {
  faAlignLeft,
  faColumns,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addNewJob, getAllJob } from "../../../thunks/JobsThunk";
import { getAllUsers } from "../../../thunks/UsersThunk";
import { getAllRole } from "../../../thunks/RolesThunk";
import { priorities, statusList } from "../../../constants/fakeData";
import { FormField } from "../../component/FormField";
import { ErrorField } from "../../component/ErrorField";

function LayoutJob({ children }) {
  const { allRole } = useSelector((state) => state.rolesReducer);
  const { allJob, searchJobs, actionStatusCode, listJobRaz } = useSelector(
    (state) => state.jobsReducer
  );
  const { account } = useSelector((state) => state.authReducer);

  const { allUser } = useSelector((state) => state.usersReducer);

  console.log("account", account);

  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
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
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const [job, setJob] = useState({});

  const [isHiddenCreate, setIsHiddenCreate] = useState(true);
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
    setNewJobData({
      title: "",
      kpiCount: 0,
      priority: 0,
      userCreateJobId: account?.user?.id,
      staffsGotJobId: [],
      userCreateJobId: "",
      description: "",
      note: "",
      target: "",
      timeStart: "",
      timeEnd: "",
      additionInfo: "",
      task: true,
      status: 1,
    });
    setStaffs([]);
  };
  const [newJobData, setNewJobData] = useState({
    title: "",
    kpiCount: 0,
    priority: 0,
    userCreateJobId: account?.user?.id,
    staffsGotJobId: [],
    userCreateJobId: "",
    description: "",
    note: "",
    target: "",
    timeStart: "",
    timeEnd: "",
    additionInfo: "",
    task: true,
  });

  const handleSubmit = () => {
    setNewJobData({ ...newJobData, staffsGotJobId: staffs });
    dispatch(addNewJob(newJobData)).then((resp) => {
      if (!resp?.error) {
        setIsHiddenCreate(true);
      }
    });
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
                      to="/"
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
                    //   onChange={(e) => setSearch(e.target.value)}
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
                  {statusList.map((item, key) => (
                    <option value={item?.id} key={key}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  id="category-create"
                  // onChange={(e) => setFilterPriority(e.target.value)}
                  className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                >
                  <option selected="" value="0">
                    Mức độ
                  </option>
                  {priorities.map((item, key) => (
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
          <div
            className={`fixed left-0 right-0 z-50 items-center justify-center 
          ${isHiddenCreate ? "hidden" : "flex"}
           overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
            id="new-task-modal"
          >
            <div className="relative w-full h-full max-w-6xl m-auto px-4 md:h-auto">
              <div className="relative bg-white rounded-lg shadow ">
                <div className="flex items-start justify-between p-5 border-b rounded-t ">
                  <h3 className="text-xl font-semibold">Thêm công việc</h3>
                  <button
                    type="button"
                    onClick={() => handleHiddenCreate()}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                    data-modal-toggle="add-user-modal"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <form action="#">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
                      <div className="md:col-span-2 ">
                        <div className="due">
                          <div className="grid grid-cols-1 md:grid-cols-5 sm:grid-cols-4 justify-between">
                            <div className="col-span-2">
                              <label
                                htmlFor="category-create"
                                className="block mb-2 text-xs font-medium text-gray-900 "
                              >
                                Khung thời gian
                              </label>
                              <div className="grid grid-cols-2">
                                <FormField
                                  name={"timeStart"}
                                  values={newJobData}
                                  id={"timeStart"}
                                  setValue={setNewJobData}
                                  required={"required"}
                                  type={"date"}
                                />
                                {/* <ErrorField
                                  errors={errors}
                                  field={"description"}
                                /> */}
                                <FormField
                                  name={"timeEnd"}
                                  values={newJobData}
                                  id={"timeEnd"}
                                  setValue={setNewJobData}
                                  required={"required"}
                                  type={"date"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="information-plan mt-2 flex">
                          <FormField
                            name={"title"}
                            values={newJobData}
                            id={"title"}
                            setValue={setNewJobData}
                            required={"required"}
                            placeholder={"Tên công việc"}
                          />
                          <select
                            id="category-create"
                            // value={job?.priority ? job?.priority : "0"}
                            value={""}
                            onChange={(e) =>
                              setNewJobData({
                                ...newJobData,
                                priority: +e.target.value,
                              })
                            }
                            className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                          >
                            <option value="0" selected="">
                              Mức độ
                            </option>
                            <option value="1">Cần gấp</option>
                            <option value="2">Quan trọng</option>
                            <option value="3">Bình thường</option>
                            <option value="4">Ưu tiên sau</option>
                          </select>
                        </div>
                        <div className="information-plan mt-2">
                          <div className="flex justify-between">
                            <textarea
                              className="input_todo w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                              defaultValue={newJobData?.description}
                              rows="5"
                              placeholder="Mô tả công việc"
                              onChange={(e) =>
                                setNewJobData({
                                  ...newJobData,
                                  description: e.target.value,
                                })
                              }
                            />

                            <FormField
                              name={"target"}
                              values={newJobData}
                              id={"target"}
                              setValue={setNewJobData}
                              required={"required"}
                              placeholder={"Chỉ tiêu"}
                              styles={
                                "shadow-sm ms-2 w-2/12 h-8 bg-gray-50 rounded-md border border-slate-200 outline-slate-200 p-2 text-sm text-slate-500 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                              }
                            />
                            <FormField
                              name={"kpiCount"}
                              values={newJobData}
                              id={"kpiCount"}
                              setValue={setNewJobData}
                              required={"required"}
                              placeholder={"KPI"}
                              styles={
                                "shadow-sm ms-2 w-2/12 h-8 bg-gray-50 rounded-md border border-slate-200 outline-slate-200 p-2 text-sm text-slate-500 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <form action="#" method="GET" className="">
                            <span className="text-xs font-medium">
                              Đường dẫn File
                            </span>
                            <hr />
                            <div className="relative mt-1">
                              <input
                                type="text"
                                name="file"
                                id="top-bar-search"
                                value={newJobData.additionInfo}
                                onChange={(e) =>
                                  setNewJobData({
                                    ...newJobData,
                                    additionInfo: e.target.value,
                                  })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                              />
                            </div>

                            {/* <span className="text-xs font-medium">
                          Người chịu trách nhiệm
                        </span>
                        <hr />
                        <div className="select-responsible">
                          <select
                            id="category-create"
                            onChange={(e) =>
                              setJob({
                                ...job,
                                receiver: e.target.value,
                              })
                            }
                            value={job?.receiver ? job?.receiver : "0"}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 w-full mt-2"
                          >
                            <option value="0" selected=""></option>
                            {allUser.map((item) =>
                              item.status === 1 ? (
                                <option value={item?.user?.id}>
                                  {item.user.fullName}
                                </option>
                              ) : (
                                <></>
                              )
                            )}
                          </select>
                        </div> */}
                          </form>
                        </div>
                      </div>
                      <div className="h-full">
                        <span className="text-xs font-medium">Phân công</span>
                        <hr />
                        <form action="#" method="GET" className="">
                          <label htmlFor="top-bar-search" className="sr-only">
                            Tìm kiếm
                          </label>
                          <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-gray-500 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <input
                              type="text"
                              name="email"
                              id="top-bar-search"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-1.5"
                              placeholder="Tìm kiếm"
                            />
                          </div>
                        </form>
                        <div className="users-selection-list-wrapper py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                          <div className="h-auto ">
                            {allUser.map((item) => (
                              <button
                                type="button"
                                onClick={() =>
                                  setStaffs((prevStaffs) => {
                                    if (prevStaffs.includes(item.id)) {
                                      return prevStaffs.filter(
                                        (id) => id !== item.id
                                      ); // Loại bỏ item.id nếu đã tồn tại trong staffs
                                    } else {
                                      return [...prevStaffs, item.id]; // Thêm item.id vào staffs nếu chưa tồn tại
                                    }
                                  })
                                }
                                className={`users-item flex py-1 px-2 w-full text-left ${
                                  staffs.includes(item.id) ? "bg-gray-300" : ""
                                }`}
                                // className="users-item flex py-1 px-2 w-full text-left w-100"
                              >
                                <div className="avatar w-2/12 ">
                                  <img
                                    src="https://batterydown.vn/wp-content/uploads/2022/05/hinh-anh-avatar-de-thuong-cute-nhat.jpg"
                                    alt=""
                                    className=" w-8 h-8  rounded-full"
                                  />
                                </div>
                                <div className="name w-8/12 my-auto">
                                  <span className="text-xs ">
                                    {item.fullName}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="h-full">
                        <span className="text-xs font-medium">
                          Người chịu trách nhiệm
                        </span>
                        <hr />
                        <form action="#" method="GET" className="">
                          <label htmlFor="top-bar-search" className="sr-only">
                            Tìm kiếm
                          </label>
                          <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg
                                className="w-5 h-5 text-gray-500 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <input
                              type="text"
                              name="email"
                              id="top-bar-search"
                              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-1.5"
                              placeholder="Tìm kiếm"
                            />
                          </div>
                        </form>
                        <div className="users-selection-list-wrapper py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                          <div className="h-auto ">
                            {allUser.map((item) => (
                              <button
                                type="button"
                                onClick={() =>
                                  setNewJobData({
                                    userCreateJobId: item?.id,
                                  })
                                }
                                className={`users-item flex py-1 px-2 w-full text-left ${
                                  item?.id === newJobData?.userCreateJobId
                                    ? "bg-gray-300"
                                    : ""
                                }`}
                                // className="users-item flex py-1 px-2 w-full text-left w-100"
                              >
                                <div className="avatar w-2/12 ">
                                  <img
                                    src="https://batterydown.vn/wp-content/uploads/2022/05/hinh-anh-avatar-de-thuong-cute-nhat.jpg"
                                    alt=""
                                    className=" w-8 h-8  rounded-full"
                                  />
                                </div>
                                <div className="name w-8/12 my-auto">
                                  <span className="text-xs ">
                                    {item.fullName}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="items-center p-6 border-gray-200 rounded-b text-right">
                      {/* <div className="flex items-center mb-4 justify-end">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
                      />
                      <label
                        for="default-checkbox"
                        className="ms-2 text-xs font-medium text-gray-900 "
                      >
                        Lưu công việc
                      </label>
                    </div> */}
                      <button
                        className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Lưu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default LayoutJob;

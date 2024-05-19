import { useDispatch, useSelector } from "react-redux";
import {
  addNewJob,
  comFirmJob,
  deleteJob,
  getAllJob,
  getAllJobById,
  getJobById,
} from "../../../thunks/JobsThunk";
import { useEffect, useLayoutEffect, useState } from "react";
import { FormField } from "../../component/FormField";
import { getAllRole } from "../../../thunks/RolesThunk";
import { getAllUsers } from "../../../thunks/UsersThunk";
import { priorities } from "../../../constants/fakeData";
import ButtonComponent from "../../component/ButtonComponent";

function CreateJobModel({ handleHiddenCreate }) {
  const { allRole } = useSelector((state) => state.rolesReducer);
  const { allJob, searchJobs, actionStatusCode, listJobRaz } = useSelector(
    (state) => state.jobsReducer
  );
  const { account } = useSelector((state) => state.authReducer);

  const { allUser } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

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

  const [staffs, setStaffs] = useState([]);

  const [job, setJob] = useState({});

  const [newJobData, setNewJobData] = useState({
    title: "",
    kpiCount: 0,
    priority: 3,
    progress: 0,
    jobStatus: "PENDING",
    pointPerJob: 0,
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

  useEffect(() => {
    setNewJobData({ ...newJobData, staffsGotJobId: staffs });
  }, [staffs]);

  const handleSubmit = () => {
    dispatch(addNewJob(newJobData)).then((resp) => {
      if (!resp?.error) {
        handleHiddenCreate();
      }
    });
  };
  return (
    <div
      className={`fixed left-0 right-0 z-50 items-center justify-center 
        flex
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
                <div className="md:col-span-2 lg:border-e pe-3 ">
                  <div className="due">
                    <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-4 justify-between">
                      <div className="col-span-2">
                        <label
                          htmlFor="category-create"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Khung thời gian:
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-3">
                          <FormField
                            name={"timeStart"}
                            values={newJobData}
                            id={"timeStart"}
                            setValue={setNewJobData}
                            required={"required"}
                            type={"date"}
                            style={'text-sm'}
                          />
                          <FormField
                            name={"timeEnd"}
                            values={newJobData}
                            id={"timeEnd"}
                            setValue={setNewJobData}
                            required={"required"}
                            type={"date"}
                            style={'text-sm'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="information-plan mt-2 border-t py-2">
                    <div className="title">
                      <label
                        htmlFor="category-create"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Chi tiết công việc:
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="flex gap-3">
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
                        defaultValue={job?.priority ? job?.priority : "0"}
                        onChange={(e) =>
                          setNewJobData({
                            ...newJobData,
                            priority: +e.target.value,
                          })
                        }
                        className="rounded-md border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                      >
                        <option selected="" value="0">
                          Mức độ
                        </option>
                        {priorities?.map((item, key) => (
                          <option value={item?.id} key={key}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="information-plan mt-2">
                    <div className="flex justify-between gap-2">
                      <textarea
                        className="rounded-md border text-sm border-slate-200 outline-slate-200 input_todo w-full shadow-sm  text-gray-900 focus:ring-primary-500 focus:border-primary-500 block p-2"
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
                      <div className="w-2/12 grid justify-between">
                        <FormField
                          name={"target"}
                          values={newJobData}
                          id={"target"}
                          setValue={setNewJobData}
                          required={"required"}
                          placeholder={"Chỉ tiêu"}
                          styles={
                            "shadow-sm w-full text-sm rounded-md border border-slate-200 outline-slate-200 text-sm text-slate-500 text-gray-900 focus:ring-primary-500 focus:border-primary-500 block px-2 h-9"
                          }
                        />
                        <FormField
                          name={"kpiCount"}
                          values={newJobData}
                          id={"kpiCount"}
                          setValue={setNewJobData}
                          required={"required"}
                          type={"number"}
                          placeholder={"KPI"}
                          styles={
                            "shadow-sm w-full text-sm rounded-md border border-slate-200 outline-slate-200 text-sm text-slate-500 text-gray-900 focus:ring-primary-500 focus:border-primary-500 block px-2 h-9"
                          }
                        />
                        <FormField
                          name={"pointPerJob"}
                          values={newJobData}
                          id={"pointPerJob"}
                          setValue={setNewJobData}
                          required={"required"}
                          type={"number"}
                          placeholder={"Điểm"}
                          styles={
                            "shadow-sm w-full text-sm rounded-md border border-slate-200 outline-slate-200 text-sm text-slate-500 text-gray-900 focus:ring-primary-500 focus:border-primary-500 block px-2 h-9"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-t mt-3">
                    <form action="#" method="GET" className="">
                     
                      <div className="relative mt-3">
                   
                         <FormField
                          name={"additionInfo"}
                          values={newJobData}
                          id={"additionInfo"}
                          setValue={setNewJobData}
                          required={"required"}
                          placeholder={"Đường link hướng dẫn"}
                          styles={
                            "shadow-sm w-full text-sm  rounded-md border border-slate-200 outline-slate-200 p-2 text-sm text-slate-500 text-gray-900 focus:ring-primary-500 focus:border-primary-500 block"
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="h-full  lg:border-e pe-3">
                  <span className="text-sm font-medium">Phân công</span>
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
                        name="search"
                        id="top-bar-search"
                        className=" rounded-md border outline-slate-200 border-gray-300 text-gray-900 sm:text-xs focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-1.5"
                        placeholder="Tìm kiếm"
                      />
                      
                    </div>
                  </form>
                  <div className="users-selection-list-wrapper py-3 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                    <div className="h-auto ">
                      {allUser?.map((item) => (
                        <button
                          type="button"
                          onClick={() =>
                            setStaffs((prevStaffs) => {
                              if (prevStaffs.includes(item.id)) {
                                return prevStaffs.filter(
                                  (id) => id !== item.id
                                );
                              } else {
                                return [...prevStaffs, item.id];
                              }
                            })
                          }
                          className={`users-item flex py-1 px-2 w-full text-left ${
                            staffs.includes(item.id) ? "bg-gray-300" : ""
                          }`}
                        >
                          <div className="avatar w-2/12 ">
                            <img
                              src={item?.avatar}
                              alt=""
                              className=" w-8 h-8  rounded-full"
                            />
                          </div>
                          <div className="name w-8/12 my-auto">
                            <span className="text-xs ">{item.fullName}</span>
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
                        className="rounded-md border outline-slate-200 border-gray-300 text-gray-900 sm:text-xs focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-1.5"
                        placeholder="Tìm kiếm"
                      />
                    </div>
                  </form>
                  <div className="users-selection-list-wrapper py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                    <div className="h-auto ">
                      {allUser?.map((item) => (
                        <button
                          type="button"
                          onClick={() =>
                            setNewJobData({
                              ...newJobData,
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
                              src={item?.avatar}
                              alt=""
                              className=" w-8 h-8  rounded-full"
                            />
                          </div>
                          <div className="name w-8/12 my-auto">
                            <span className="text-xs ">{item.fullName}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center p-6 border-gray-200 rounded-b text-right">
                <ButtonComponent
                  type={"button"}
                  textButton={"Lưu"}
                  handleClick={handleSubmit}
                  style={
                    "text-white bg-sky-500 border border-sky-500 hover:bg-sky-500 focus:ring-4 focus:ring-blue-300 px-5 bg-opacity-80 "
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJobModel;

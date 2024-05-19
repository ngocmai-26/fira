import moment from "moment";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJob } from "../../../thunks/JobsThunk";
import { updatePlan } from "../../../thunks/PlansThunk";
import ButtonComponent from "../../component/ButtonComponent";
import { FormField } from "../../component/FormField";

function EditPlanModal({ handleHiddenEdit }) {
  const { singlePlan } = useSelector((state) => state.plansReducer);
  const { allJob } = useSelector((state) => state.jobsReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
    }
  }, []);


  const [dataPlan, setDataPlan] = useState({
    title: singlePlan?.title,
    planStatus: singlePlan?.status,
    planJob: singlePlan?.planJobs?.map((job) => job.id),
    planDetailRequest: {
      description: singlePlan?.planDetail?.description,
      planType: singlePlan?.planDetail?.planType,
      note: singlePlan?.planDetail?.note,
      timeStart: singlePlan?.planDetail?.timeStart,
      timeEnd: singlePlan?.planDetail?.timeEnd,
      planSchedules: [],
    },
  });
  const handleButtonClick = (jobId) => {
    let newPlanJob;
    if (Array.isArray(dataPlan.planJob)) {
      if (dataPlan.planJob.includes(jobId)) {
        // If the job exists in planJob, remove it
        newPlanJob = dataPlan.planJob.filter((id) => id !== jobId);
      } else {
        // If the job doesn't exist in planJob, add it
        newPlanJob = [...dataPlan.planJob, jobId];
      }
    } else {
      // If planJob is not an array, initialize it as an array containing jobId
      newPlanJob = [jobId];
    }
    setDataPlan({
      ...dataPlan,
      planJob: newPlanJob,
    });
  };


  const handleSubmit =() => {
    dispatch(updatePlan({id: singlePlan.id, data: dataPlan})).then((reps) => {
        if (!reps.error) {
          handleHiddenEdit()
        }
      });
  }
  return (
    <div
      className={`fixed left-0 right-0 z-50 items-center justify-center flex overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
      id="new-task-modal"
    >
      <div className="relative w-full h-full max-w-4xl m-auto px-4 md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold">Chỉnh sửa kế hoạch</h3>
            <button
              type="button"
              onClick={() => handleHiddenEdit()}
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
            <div className="grid lg:grid-cols-4 gap-5  grid-cols-1">
                <div className="lg:col-span-3 lg:border-e-slate-300 lg:border-e-2 lg:pe-2">
                  <div className="due">
                    <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-4 justify-between">
                      <div className="md:col-span-2 sm:col-span-2">
                        <label
                          htmlFor="category-create"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Loại:
                      <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="category-create"
                          onChange={(e) =>
                            setDataPlan({
                              ...dataPlan,
                              planDetailRequest: {
                                ...dataPlan.planDetailRequest,
                                planType: e.target.value,
                              },
                            })
                          }
                          defaultValue={
                            singlePlan?.planDetail?.planType
                              ? singlePlan?.planDetail?.planType
                              : ""
                          }
                          className="rounded-md border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                        >
                          <option value="0" selected=""></option>
                          <option value="LOOP">Định kì</option>
                          <option value="ONCE">1 lần</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="category-create"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Tiêu đề kế hoạch:
                      <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="date"
                            name=""
                            onChange={(e) =>
                              setDataPlan({
                                ...dataPlan,
                                planDetailRequest: {
                                  ...dataPlan.planDetailRequest,
                                  timeStart: e.target.value,
                                },
                              })
                            }
                            defaultValue={
                              moment(singlePlan?.planDetail?.timeStart).format(
                                "YYYY-MM-DD"
                              )
                                ? moment(
                                    singlePlan?.planDetail?.timeStart
                                  ).format("YYYY-MM-DD")
                                : ""
                            }
                            id="timeStart"
                            className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                            required
                          />
                          <input
                            type="date"
                            name=""
                            onChange={(e) =>
                              setDataPlan({
                                ...dataPlan,
                                planDetailRequest: {
                                  ...dataPlan.planDetailRequest,
                                  timeEnd: e.target.value,
                                },
                              })
                            }
                            defaultValue={
                              moment(singlePlan?.planDetail?.timeEnd).format(
                                "YYYY-MM-DD"
                              )
                                ? moment(
                                    singlePlan?.planDetail?.timeEnd
                                  ).format("YYYY-MM-DD")
                                : ""
                            }
                            id="timeEnd"
                            className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="information-plan mt-2">
                  
                     <FormField
                        name={"title"}
                        values={dataPlan}
                        id={"title"}
                        setValue={setDataPlan}
                        required={"required"}
                        placeholder={"Tên công việc"}
                      />
                  </div>
                  <div className="information-plan mt-2">
                            
                    <textarea
                      className="rounded-md border  text-sm border-slate-200 outline-slate-200 input_todo w-full shadow-sm  text-slate-500 focus:ring-primary-500 focus:border-primary-500 block p-2"
                      defaultValue={
                        dataPlan?.planDetailRequest?.description
                          ? dataPlan?.planDetailRequest?.description
                          : ""
                      }
                      rows="5"
                      placeholder="Mô tả chi tiết kế hoạch"
                      onChange={(e) =>
                        setDataPlan({
                          ...dataPlan,
                          planDetailRequest: {
                            ...dataPlan.planDetailRequest,
                            description: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                </div>

                <div className="information-plan mt-2">
                    <label
                      htmlFor="category-create"
                      className="block mb-2 text-xs font-medium text-gray-900"
                    >
                      Công việc:
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="users-selection-list-wrapper border-gray-200 rounded-sm border  py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                      <div className="h-auto ">
                      {allJob?.map((job) => (
                          <button
                            key={job.id}
                            type="button"
                            className={`users-item flex py-1 px-2 w-full text-left ${
                              dataPlan.planJob?.includes(job.id)
                                ? "bg-gray-300"
                                : ""
                            }`}
                            onClick={() => handleButtonClick(job.id)}
                          >
                            <div className="name w-8/12 my-auto">
                              <span className="text-xs">{job.title}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div> 
              </div>
              <div className="items-center py-4 border-gray-200 rounded-b text-right">
           
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

export default EditPlanModal;

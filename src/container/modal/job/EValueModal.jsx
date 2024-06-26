import React, { useState } from "react";
import moment from "moment";
import ButtonComponent from "../../component/ButtonComponent";
import { useDispatch } from "react-redux";
import { comFirmJob, evaluate_Job, userJob } from "../../../thunks/JobsThunk";

function EValueJobModal({ handleHiddenEValue, evaluateData }) {
  const dispatch = useDispatch();

  const eValueList = [
    {
      id: 1,
      value: "BAD",
      eValuate: "Xấu",
      bg: "bg-white border-[#e68a8c] border text-[#e68a8c] rounded-md hover:bg-[#e68a8c] hover:text-white  text-xs p-1",
      bgActive:
        "bg-[#e68a8c] border-[#e68a8c] border  rounded-md text-white text-xs p-1",
    },
    {
      id: 2,
      value: "MEDIUM",
      eValuate: "Trung Bình",
      bg: " bg-white border-amber-500 border text-amber-500 rounded-md hover:bg-amber-500 hover:text-white  text-xs p-1",
      bgActive:
        "bg-amber-500 border-amber-500 border rounded-md text-white text-xs p-1",
    },
    {
      id: 3,
      value: "GOOD",
      eValuate: "Tốt",
      bg: "bg-white border-green-500 border text-green-500 rounded-md hover:bg-green-500 hover:text-white  text-xs p-1",
      bgActive:
        "bg-green-500 border-green-500 border rounded-md text-white  text-xs p-1",
    },
  ];

  const [eValuate, setEValuate] = useState(
    evaluateData?.userJobs && evaluateData.userJobs.length > 0
      ? evaluateData.userJobs[0].jobEvaluate || ""
      : ""
  );

  const handleEValuate = (item) => {
    setEValuate(item);
  };

  const handleSubmitEvaluate = () => {
    dispatch(
      evaluate_Job({
        id: evaluateData.id,
        data: {
          jobEvaluate: eValuate,
          userId: evaluateData.userJobs[0]?.user.id,
        },
      })
    ).then((reps) => {
      if (!reps.error) {
        dispatch(
          userJob({
            id: evaluateData.id,
            data: {
              userId: evaluateData.userJobs[0]?.user.id,
              progress: +evaluateData?.userJobs[0]?.progress,
              status: "DONE",
              instructionLink: evaluateData?.userJobs[0]?.instructionLink,
              verifyLink: "",
              denyReason: evaluateData?.userJobs[0]?.denyReason || "", // Sử dụng denyReason từ userJobs[0]
            },
          })
        ).then((reps) => {
          if (!reps.error) {
            handleHiddenEValue();
          }
        });
      }
    });
  };

  return (
    <div className="fixed left-0 right-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full ">
      <div className="relative w-full h-full max-w-xl m-auto px-4 md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold">
              Chi tiết tiến độ công việc
            </h3>
            <button
              type="button"
              onClick={handleHiddenEValue}
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
          <div className="content p-5  border-b">
            <div className="border-b">
              <h5 className="font-semibold">Mô tả công việc đã hoàn thành</h5>
              <ul>
                {evaluateData?.userJobs[0]?.denyReason ||
                  "Chưa có lý do từ chối"}
              </ul>
            </div>
            <div className="border-b py-3">
              <h5 className="font-semibold">Tiến độ hoàn thành</h5>
              <div className="font-bold text-blue-500">
                {evaluateData?.userJobs[0]?.cachedProgress}%
              </div>
            </div>
            <div className="py-3">
              <h5 className="font-semibold">Đường link tài liệu báo cáo</h5>
              {evaluateData?.jobDetail?.instructionLink ? (
                <a
                  href={evaluateData.jobDetail.instructionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline"
                >
                  {evaluateData.jobDetail.instructionLink}
                </a>
              ) : (
                <span>Chưa có báo cáo</span>
              )}
            </div>
            <div className="justify-end flex">
              {eValueList.map((item, key) => (
                <button
                  key={key}
                  className={`${
                    eValuate === item.value ? item.bgActive : item.bg
                  }  text-sm px-2 mx-1 py-1 rounded-xs `}
                  onClick={() => handleEValuate(item.value)}
                >
                  {item.eValuate}
                </button>
              ))}
            </div>
          </div>
          <div className="text-right p-4 flex gap-3 justify-end">
            <ButtonComponent
              type="button"
              textButton="Đánh giá lại"
              handleClick={() =>
                dispatch(
                  userJob({
                    id: evaluateData.id,
                    data: {
                      userId: evaluateData.userJobs[0]?.user.id,
                      progress: +evaluateData?.userJobs[0]?.progress,
                      status: "PROCESSING",
                      instructionLink:
                        evaluateData?.userJobs[0]?.instructionLink,
                      verifyLink: "reassess",
                      denyReason: evaluateData?.userJobs[0]?.denyReason || "", // Sử dụng denyReason từ userJobs[0]
                    },
                  })
                ).then((reps) => {
                  if (!reps.error) {
                    handleHiddenEValue();
                  }
                })
              }
              style="bg-red-500  border border-red-500 hover:bg-red-500 text-white focus:ring-4 focus:ring-blue-300 px-5 bg-opacity-80 "
            />
            <ButtonComponent
              type="button"
              textButton="Xác nhận"
              handleClick={handleSubmitEvaluate}
              style="text-white bg-sky-500 border border-sky-500 hover:bg-sky-500 focus:ring-4 focus:ring-blue-300 px-5 bg-opacity-80 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EValueJobModal;

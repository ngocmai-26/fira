import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bytesToReadable } from "../../app/static";

function MsgItem({ data, type }) {
  console.log("data", data)
  return (
    <div
      className={`flex p-1 justify-between hover:bg-gray-100 rounded-md cursor-pointer`}
    >
      <div className="flex">
        {type == 1 ? (
          <div className="flex justify-between items-start gap-2 w-full">
            <div
              className=" w-12 px-1.5 h-12 flex rounded-lg"
              style={{ background: "#C6F6D5" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ margin: "auto" }}
              >
                <path
                  d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
                  stroke="#38A169"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-xs font-semibold">
                {data?.mediaName
                  ?.replace("-", "_")
                  .replace(/\.(jpg|jpeg|png|gif)$/gm, "")
                  .slice(0, 20)}
                .{data?.mediaType?.split("/")[1]}
              </p>
              <p className="text-xs">{bytesToReadable(data.mediaSize)}</p>
              <p className="text-xs">
                {data.mediaType.split("/")[1].toUpperCase()}
              </p>
            </div>
          </div>
        ) : (
          <div className="m-1">
            <img
              src={data?.avatar? data?.avatar: "https://upload.tanca.io/api/image/news/611bed5f035cef73103a6107?name=2021-08-18-000951-quan-ly-cong-viec.jpg"}
              alt=""
              className="rounded-lg object-cover w-12 h-12 "
            />
          </div>
        )}
        <div
          className={`information px-1.5 md:max-w-36 lg:max-w-72  ${
            data?.typeNotify === 1 ? "text-gray-400" : ""
          }`}
        >
          <div
            className={`information-name ${
              data?.fullName ? "block" : "hidden"
            }`}
          >
            <span className="font-bold text-sm">{data?.fullName}</span>
          </div>
          <div
            className={`information-name ${
              data?.email ? "block" : "hidden"
            }`}
          >
            <span className="text-xs text-gray-400">{data?.email}</span>
          </div>
          {/* <div
            className={`information-chat overflow-hidden text-ellipsis max-w-64 text-start`}
          >
            <span className="text-xs font-medium single-line ">
              Bạn đã được giao việc từ {data?.from?.fullName}
            </span>
          </div> */}
        </div>
      </div>

      <div className="time">
        <span className="text-xs text-gray-400">{data?.time}</span>
        <div className={`${data?.typeNotify ? "block" : "hidden"}`}>
          <FontAwesomeIcon
            icon={faCircle}
            className={`${
              data?.typeNotify !== 1 ? "block" : "hidden"
            } text-xs text-blue-500`}
          />
        </div>
      </div>
      <div className="download">
        {type == 1 ? (
          <a href={data.mediaLink} download target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 11V17L11 15"
                stroke="#FF7607"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 17L7 15"
                stroke="#FF7607"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                stroke="#FF7607"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                stroke="#FF7607"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MsgItem;

import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MsgItem({ data }) {
  return (
    <div className={`flex py-1 justify-between hover:bg-gray-100`}>
      <div className="flex">
        {data?.type ? (
          <div className="image">
            {data?.type === "PNG" ? (
              <div className=" w-12 px-1.5 h-12 flex rounded-lg" style={{background: "#C6F6D5"}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{margin: "auto"}}
                >
                  <path
                    d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
                    stroke="#38A169"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
            ) : data?.type === "JPG" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <rect width="48" height="48" rx="8" fill="#FFE1A9" />
                <path
                  d="M21 34H27C32 34 34 32 34 27V21C34 16 32 14 27 14H21C16 14 14 16 14 21V27C14 32 16 34 21 34Z"
                  stroke="#FF7607"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 22C22.1046 22 23 21.1046 23 20C23 18.8954 22.1046 18 21 18C19.8954 18 19 18.8954 19 20C19 21.1046 19.8954 22 21 22Z"
                  stroke="#FF7607"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.67 30.9501L19.6 27.6401C20.39 27.1101 21.53 27.1701 22.24 27.7801L22.57 28.0701C23.35 28.7401 24.61 28.7401 25.39 28.0701L29.55 24.5001C30.33 23.8301 31.59 23.8301 32.37 24.5001L34 25.9001"
                  stroke="#FF7607"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : data?.type === "PDF" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <rect width="48" height="48" rx="8" fill="#CFE6FF" />
                <path
                  d="M34 22V27C34 32 32 34 27 34H21C16 34 14 32 14 27V21C14 16 16 14 21 14H26"
                  stroke="#2E90FA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34 22H30C27 22 26 21 26 18V14L34 22Z"
                  stroke="#2E90FA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 25H25"
                  stroke="#2E90FA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 29H23"
                  stroke="#2E90FA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : data?.type === "MP4" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <rect width="48" height="48" rx="8" fill="#FFB9B5" />
                <path
                  d="M33.08 20.58V27.42C33.08 28.54 32.48 29.58 31.51 30.15L25.57 33.58C24.6 34.14 23.4 34.14 22.42 33.58L16.48 30.15C15.51 29.59 14.91 28.55 14.91 27.42V20.58C14.91 19.46 15.51 18.42 16.48 17.85L22.42 14.42C23.39 13.86 24.59 13.86 25.57 14.42L31.51 17.85C32.48 18.42 33.08 19.45 33.08 20.58Z"
                  stroke="#F04438"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.75 23.9999V22.7999C21.75 21.2599 22.84 20.6299 24.17 21.3999L25.21 21.9999L26.25 22.5999C27.58 23.3699 27.58 24.6299 26.25 25.3999L25.21 25.9999L24.17 26.5999C22.84 27.3699 21.75 26.7399 21.75 25.1999V23.9999Z"
                  stroke="#F04438"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="image w-14 px-1.5">
            <img src={data?.img} alt="" className="rounded-lg my-1" />
          </div>
        )}
        <div className={`information px-1.5 md:max-w-36 lg:max-w-72  ${data?.typeNotify ===1? "text-gray-400": ""}`}>
          <div className={`information-name ${data?.name? "block": "hidden"}`}>
            <span className="font-medium">{data?.name}</span>
          </div>
          <div className={`information-chat overflow-hidden text-ellipsis max-w-64 ${data?.content? "block": "hidden"}`}>
            <span className="text-xs font-medium single-line ">{data?.content}</span>
          </div>
          <div className={`information-file ${data?.type? "block": "hidden"}`}>
            <span className="text-xs">{data?.type}</span>
            <span className="text-xs ml-2">{data?.capacity}</span>
          </div>
        </div>
      </div>

      <div className="time">
        <span className="text-xs text-gray-400">{data?.time}</span>
        <div className={`${data?.typeNotify? "block": "hidden"}`}>
          <FontAwesomeIcon icon={faCircle} className={`${data?.typeNotify !==1? "block": "hidden"} text-xs text-blue-500`} />
        </div>
      </div>
      <div className="download">
        {data?.capacity ? (
          <a href="" download>
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

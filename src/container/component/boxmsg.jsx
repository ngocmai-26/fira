import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

function BoxMsg({ data }) {
  const { user } = useSelector((state) => state.authReducer);
  const [imageData, setImageData] = useState({ width: "100%", height: "100%" });
  useLayoutEffect(() => {
    setImageData({
      width:
        data.media.length > 0
          ? Math.round(100 / data.media.length) > 4
            ? "24%"
            : Math.round(100 / data.media.length) + "%"
          : "100%",
      height: "100%",
    });
  }, []);
  return (
    <div
      className={`${
        data?.sender?.id === user.id ? "flex-row-reverse" : ""
      } flex gap-2 py-3 items-end`}
    >
      {data?.messageTypeInRoom == 2 ? (
        <div className="w-full text-center">
          <b className="text-xs">{data?.content}</b>
        </div>
      ) : (
        <>
          <div className="rounded-lg ">
            <img
              src={data?.sender.avatar || data.avatar}
              alt=""
              className="rounded-lg w-10 h-10"
            />
          </div>
          <div
            className={`flex ${
              data.media.length > 0 ? "flex-col" : ""
            } relative boxMsg-chat ${
              data?.sender?.id === user.id ? "items-end" : "items-start"
            } `}
          >
            {data?.media.length > 0 && (
              <div
                className={`w-fit max-w-80 pb-1 flex ${
                  data?.sender?.id === user.id ? "flex-row-reverse" : ""
                } justify-start items-center gap-1 flex-wrap`}
              >
                {data?.media.map((m, index) => (
                  <img
                    style={{
                      width: m.mediaLink ? imageData.width : "75px",
                      height: imageData.height,
                      minHeight: "70px",
                    }}
                    title="show detail image"
                    key={index.toString()}
                    src={m?.mediaLink || null}
                    alt=""
                    className={`cursor-pointer bg-gray-300 rounded-md object-cover`}
                  />
                ))}
              </div>
            )}
            <div
              className={`${
                data?.sender?.id === user.id ? " bg-blue-200" : " bg-slate-200"
              } flex max-w-80 w-fit content-msg p-2 w-auto rounded-md`}
            >
              <span>{data?.content}</span>
            </div>
            <span className="absolute z-50 time text-xs bottom-[-25px] bg-gray-200 py-1 h-auto px-3 rounded-sm shadow-md">
              17:55
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default BoxMsg;

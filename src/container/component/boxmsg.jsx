function BoxMsg({ data }) {
  return (
    <div
      className={`${
        data.isSender === 2 ? "flex-row-reverse " : ""
      } flex gap-2 py-3 `}
    >
      <div className="image w-10 rounded-lg ">
        <img
          src="https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg"
          alt=""
          className="rounded-lg"
        />
      </div>
      <div className="flex relative boxMsg-chat">
        <div
          className={`${
            data.isSender === 2 ? " bg-blue-200" : " bg-slate-200"
          } flex content-msg p-2 w-auto max-w-80 rounded-md`}
        >
          <span>
            Hôm nay trời đẹp quá trời ạ ahihih đồ ngố Hôm nay trời đẹp quá trời
            ạ ahihih đồ ngốc Hôm nay trời đẹp quá trời ạ ahihih đồ ngốcc
          </span>
        </div>
        <span className="absolute z-50 time text-xs bottom-[-25px] bg-gray-200 py-1 h-auto px-3 rounded-sm shadow-md">
          17:55
        </span>
      </div>
    </div>
  );
}

export default BoxMsg;

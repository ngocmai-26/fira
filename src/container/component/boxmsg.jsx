function BoxMsg({data}) {
    return ( 
        <div className={`${data.isSender === 2? "flex-row-reverse ": "" } flex gap-2 py-2`}>
            <div className="image w-10 rounded-lg">
                <img src="https://imgt.taimienphi.vn/cf/Images/np/2022/9/7/hinh-anh-cute-dep-de-thuong-nhat-7.jpg" alt="" className="rounded-lg" />
            </div>
            <div className={`${data.isSender === 2? " bg-blue-200": " bg-slate-200" } text-sm content-msg p-2 w-auto max-w-80 rounded-md` }>
                <span>Hôm nay trời đẹp quá trời ạ ahihih đồ ngố Hôm nay trời đẹp quá trời ạ ahihih đồ ngốc Hôm nay trời đẹp quá trời ạ ahihih đồ ngốcc</span>
            </div>
        </div>
     );
}

export default BoxMsg;
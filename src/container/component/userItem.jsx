function UserItem({img, name, widthContent}) {
    return ( 
        <div className="flex">
        <div className="w-10 h-10 rounded-full overflow-hidden mx-1.5">
          <img
            src={img}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className={`my-auto overflow-hidden text-ellipsis ${widthContent}`}>
          <span className="single-line text-sm ">
            {name}
          </span>
        </div>
      </div>
     );
}

export default UserItem;
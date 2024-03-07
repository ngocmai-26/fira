function UserItem({ img, name, email, widthContent }) {
  return (
    <div className="flex">
      <div className="w-10 h-10 rounded-full overflow-hidden mx-1.5">
        <img src={img} alt="" className="w-full h-full" />
      </div>
      <div
        className={`mx-2 ${
          !email && "flex justify-center items-center"
        } overflow-hidden text-left text-ellipsis ${widthContent}`}
      >
        <span className="my-auto single-line text-sm ">{name}</span>
        {email && (
          <div
            className={`my-0 overflow-hidden text-ellipsis text-xs text-gray-400`}
          >
            {email}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserItem;

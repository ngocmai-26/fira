import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser, register } from "../../thunks/AuthThunk";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../component/spinner";
import { ErrorField } from "../component/ErrorField";

function CreateNewUser() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [newUserData, setNewUserData] = useState({});

  const { isFetching, errors } = useSelector((state) => state.authReducer);
  const handleCreateNewUser = () => {
    dispatch(createNewUser(newUserData));
  };

  const handleInputChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };
  return (
    <article className="bg-cyan-50 h-full w-full my-auto flex items-center py-5">
      <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md">
        <div className="logo pb-5">
          <img src="" alt="logo" />
        </div>
        <hr />
        <h3 className="font-bold text-xl leading-10 pt-5">
          Nhập thông tin người dùng
        </h3>
        <p className="subtitle-login text-sm text-neutral-500 leading-7">
          Vui lòng nhập đầy đủ thông tin thông tin:
        </p>
        <form action="" className="py-0 sm:py-4">
          <div className="Email py-5">
            <div className="">
              <div className="">
                <label htmlFor="Email" className="font-medium text-sm">
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={newUserData?.firstName}
                  onChange={handleInputChange}
                  className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                  required
                />
                {<ErrorField errors={errors} field={"firstName"} />}
              </div>
            </div>
          </div>
          <div className="password py-5">
            <div className=" ">
              <div className="relative">
                <label htmlFor="Phone" className="font-medium text-sm">
                  Lastname
                </label>
                <input
                  name="lastName"
                  value={newUserData?.lastName}
                  id="password"
                  onChange={handleInputChange}
                  className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                  required
                />
                {<ErrorField errors={errors} field={"lastName"} />}
              </div>
            </div>
          </div>
          <div className="confirmPassword py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="Phone" className="font-medium text-sm">
                  Address
                </label>
                <input
                  name="address"
                  value={newUserData?.address}
                  id="confirmPassword"
                  onChange={handleInputChange}
                  className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                  required
                />
                {<ErrorField errors={errors} field={"address"} />}
              </div>
            </div>
          </div>

          <div className="confirmPassword py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="Phone" className="font-medium text-sm">
                  Birthday
                </label>
                <input
                  max={new Date()}
                  type="date"
                  name="birthday"
                  value={newUserData?.birthday}
                  id="confirmPassword"
                  onChange={handleInputChange}
                  className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                  required
                />
                {<ErrorField errors={errors} field={"birthday"} />}
              </div>
            </div>
          </div>

          <div className="confirmPassword py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="Phone" className="font-medium text-sm">
                  Department
                </label>
                <input
                  name="department"
                  value={newUserData?.department}
                  id="confirmPassword"
                  onChange={handleInputChange}
                  className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                  required
                />
                {<ErrorField errors={errors} field={"department"} />}
              </div>
            </div>
          </div>

          <div className="confirmPassword py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="Phone" className="font-medium text-sm">
                  Phone
                </label>
                <input
                  maxLength={10}
                  name="phone"
                  value={newUserData?.phone}
                  id="confirmPassword"
                  onChange={handleInputChange}
                  className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                  required
                />
                {<ErrorField errors={errors} field={"phone"} />}
              </div>
            </div>
          </div>
          <div className="text-center py-3 flex">
            <Link
              to="/login"
              className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 min-w-full sm:min-w-[50%] "
            >
              Quay lại
            </Link>
            <button
              type="button"
              onClick={handleCreateNewUser}
              className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 min-w-full sm:min-w-[50%] "
            >
              {isFetching ? <Spinner /> : "Tiếp tục"}
            </button>
          </div>
        </form>
      </div>
    </article>
  );
}

export default CreateNewUser;

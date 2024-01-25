import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser, register } from "../../thunks/AuthThunk";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../component/Spinner";
import { ErrorField } from "../component/ErrorField";
import { FormField } from "../component/FormField";
import ButtonComponent from "../component/ButtonComponent";

function CreateNewUser() {
  const dispatch = useDispatch();
  const [newUserData, setNewUserData] = useState({});

  const { isFetching, errors } = useSelector((state) => state.authReducer);
  const handleCreateNewUser = () => {
    dispatch(createNewUser(newUserData));
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
          <div className="firstName py-5">
            <div className="">
              <div className="">
                <label htmlFor="firstName" className="font-medium text-sm">
                  Firstname
                </label>
                <FormField
                  name={"firstName"}
                  values={newUserData}
                  id={"firstName"}
                  setValue={setNewUserData}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"firstName"} />}
              </div>
            </div>
          </div>
          <div className="lastName py-5">
            <div className=" ">
              <div className="relative">
                <label htmlFor="lastName" className="font-medium text-sm">
                  Lastname
                </label>
                <FormField
                  name={"lastName"}
                  values={newUserData}
                  id={"lastName"}
                  setValue={setNewUserData}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"lastName"} />}
              </div>
            </div>
          </div>
          <div className="address py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="address" className="font-medium text-sm">
                  Address
                </label>
                <FormField
                  name={"address"}
                  values={newUserData}
                  id={"address"}
                  setValue={setNewUserData}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"address"} />}
              </div>
            </div>
          </div>

          <div className="birthday py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="birthday" className="font-medium text-sm">
                  Birthday
                </label>
                <FormField
                  name={"birthday"}
                  values={newUserData}
                  id={"birthday"}
                  setValue={setNewUserData}
                  type={"date"}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"birthday"} />}
              </div>
            </div>
          </div>

          <div className="department py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="department" className="font-medium text-sm">
                  Department
                </label>
                <FormField
                  name={"department"}
                  values={newUserData}
                  id={"department"}
                  setValue={setNewUserData}
                  required={"required"}
                />
                {<ErrorField errors={errors} field={"department"} />}
              </div>
            </div>
          </div>

          <div className="phone py-5">
            <div className="">
              <div className="relative">
                <label htmlFor="phone" className="font-medium text-sm">
                  Phone
                </label>
                <FormField
                  name={"phone"}
                  values={newUserData}
                  id={"phone"}
                  setValue={setNewUserData}
                  required={"required"}
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

            <ButtonComponent
              handleClick={handleCreateNewUser}
              type={"button"}
              textButton={isFetching ? <Spinner /> : "Tiếp tục"}
              style={
                "bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 mr-2 mb-2 min-w-[50%] sm:min-w-[50%]  text-white"
              }
            />
          </div>
        </form>
      </div>
    </article>
  );
}

export default CreateNewUser;

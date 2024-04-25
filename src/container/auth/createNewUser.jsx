import { useState } from "react";
import { Link } from "react-router-dom";
import { createNewUser } from "../../thunks/AuthThunk";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../component/Spinner";
import { ErrorField } from "../component/ErrorField";
import { FormField } from "../component/FormField";
import ButtonComponent from "../component/ButtonComponent";
import logo from "../../asset/images/logo.png";
import { ImagePicker } from "../component/ImageBox";
import { FBStorageService } from "../../services/firebase/StorageService";
import { logout } from "../../slices/AuthSlice";
function CreateNewUser() {
  const dispatch = useDispatch();
  const [newUserData, setNewUserData] = useState({});
  const [images, setImages] = useState([]);
  const { isFetching, errors } = useSelector((state) => state.authReducer);


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleCreateNewUser = () => {
    const today = new Date();
    const birthDate = new Date(newUserData.birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (age < 18 || (age === 18 && monthDiff < 0)) {
      alert("Bạn chưa đủ 18 tuổi để đăng ký.");
      return;
    }

    dispatch(createNewUser({ ...newUserData, avatar: images[0] }));
  };
  return (
    <article className="bg-cyan-50 h-full w-full my-auto flex items-center py-5">
      <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md">
        <div className="logo pb-5">
          <img src={logo} className="w-36 object-cover h-20" alt="logo" />
        </div>
        <hr />
        <h3 className="font-bold text-xl leading-10 pt-5">
          Nhập thông tin người dùng
        </h3>
        <p className="subtitle-login text-sm text-neutral-500 leading-7">
          Vui lòng nhập đầy đủ thông tin thông tin:
        </p>
        <form action="" className="py-0 sm:py-4">
          <ImagePicker
            folder={`uploads/users`}
            images={images}
            setImages={setImages}
          />
          <div className="firstName py-5">
            <div className="">
              <div className="">
                <label htmlFor="firstName" className="font-medium text-sm">
                  FirstName: 
                      <span className="text-red-500">*</span>
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
                  LastName: 
                      <span className="text-red-500">*</span>
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
                  Address:
                      <span className="text-red-500">*</span>
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
                  Birthday:
                      <span className="text-red-500">*</span>
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
                  Department:
                      <span className="text-red-500">*</span>
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
                  Phone:
                      <span className="text-red-500">*</span>
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
          <div className="text-center py-3 flex flex-col md:flex-row">
            <ButtonComponent
              handleClick={handleLogout}
              style={
                "bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 mr-2 mb-2 min-w-[50%] sm:min-w-[50%]  text-white"
              }
              textButton={"Quay lại"}
            ></ButtonComponent>

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

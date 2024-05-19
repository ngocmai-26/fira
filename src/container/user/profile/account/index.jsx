import { useState } from "react";
import Layout from "../../../layout";
import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../../../component/FormField";
import { ErrorField } from "../../../component/ErrorField";
import ButtonComponent from "../../../component/ButtonComponent";
import { updateUser } from "../../../../thunks/UsersThunk";
import { changePasswordAuth } from "../../../../thunks/AuthThunk";

function Account() {
  const [changePassword, setChangePassword] = useState(false);
  const dispatch = useDispatch();
  const { errors, user } = useSelector((state) => state.authReducer);

  const [newUserData, setNewUserData] = useState(user);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newDataPassword, setNewDataPassword] = useState({
    email: newUserData?.email,
    oldPassword: "",
    newPassword: "",
  });

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = () => {
    console.log(newDataPassword.newPassword, 'và ', confirmPassword)
    if (newDataPassword.newPassword !== confirmPassword.confirmPassword) {
      alert("Mật khẩu mới và mật khẩu xác nhận không khớp.");
      return;
    }

    if (!validatePassword(newDataPassword.newPassword)) {
      alert("Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ in hoa và 1 số.");
      return;
    }

    dispatch(changePasswordAuth(newDataPassword));
  };

  const handleUpdate = () => {
    dispatch(updateUser(newUserData));
  };

  return (
    <>
      <Layout>
        <div className="flex">
          <div className="xl:max-w-[200px] mx-9 mt-3">
            <img
              src={newUserData.avatar}
              alt={newUserData.fullName}
              className="w-40 h-40 rounded-full "
            />
          </div>
          <form action="" className=" xl:max-w-[900px]  m-auto my-5">
            <div className="profile-content p-5">
              <p className="text-base font-medium">Thông tin cá nhân</p>
              <div className="general py-4">
                <p className="text-sky-500 border-b-2 border-b-stone-100">
                  Thông tin chung
                </p>
                <div className="name border-b-2 border-b-stone-100 py-5">
                  <div className="flex gap-2">
                    <div className="grid grid-cols-5 gap-5">
                      <div className="my-auto">
                        <span className="font-medium text-sm">
                          FirstName:
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="col-span-4">
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
                    <div className="grid grid-cols-5 gap-5">
                      <div className="my-auto">
                        <span className="font-medium text-sm">
                          LastName:
                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                      <div className="lastName col-span-4">
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
                </div>

                <div className="password border-b-2 border-b-stone-100 py-5">
                  <div className="grid grid-cols-5 gap-5">
                    <div className="my-auto">
                      <span className="font-medium text-sm">
                        Mật khẩu:
                        <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <div className="col-span-2">
                      <div
                        type="button"
                        onClick={() => setChangePassword(true)}
                        className="text-red-500 text-xs hover:text-red-700 cursor-pointer"
                      >
                        Thay đổi mật khẩu
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contacts py-4">
                <p className="text-sky-500 border-b-2 border-b-stone-100">
                  Liên hệ
                </p>

                <div className="email border-b-2 border-b-stone-100 py-5">
                  <div className="grid grid-cols-5 gap-5">
                    <div className="my-auto">
                      <span className="font-medium text-sm">
                        Email:
                        <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <div className="col-span-2">
                      <FormField
                        name={"email"}
                        values={newUserData}
                        id={"email"}
                        setValue={setNewUserData}
                        required={"required"}
                      />
                      {<ErrorField errors={errors} field={"email"} />}
                    </div>
                  </div>
                </div>
                <div className="phone border-b-2 border-b-stone-100 py-5">
                  <div className="grid grid-cols-5 gap-5">
                    <div className="my-auto">
                      <span className="font-medium text-sm">
                        Số điện thoại:
                        <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <div className="col-span-2">
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
                <div className="address border-b-2 border-b-stone-100 py-5">
                  <div className="grid grid-cols-5 gap-5">
                    <div className="my-auto">
                      <span className="font-medium text-sm">
                        Ngày sinh:
                        <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <div className="col-span-2">
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
                <div className="phongban border-b-2 border-b-stone-100 py-5">
                  <div className="grid grid-cols-5 gap-5">
                    <div className="my-auto">
                      <span className="font-medium text-sm">
                        Phòng ban:
                        <span className="text-red-500">*</span>
                      </span>
                    </div>
                    <div className="col-span-2">
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
              </div>

              <div className="button text-right">
             
                 <ButtonComponent
              type={"button"}
              textButton={"Lưu thông tin"}
              handleClick={handleUpdate}
              style={
                "text-sky-500 bg-white border border-sky-500 hover:bg-sky-500 hover:text-white focus:ring-4 focus:ring-blue-300 px-5 bg-opacity-80 "
              }
            />
              </div>
            </div>
          </form>
        </div>
      </Layout>
      <div
        className={`fixed left-0 right-0  ${
          changePassword ? "block" : "hidden"
        } z-50 items-center justify-center  bg-[#e3e3e387] overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="delete-user-modal"
      >
        <div className="relative w-full h-full max-w-xl px-4 md:h-auto m-auto ">
          <div className="relative bg-white rounded-lg shadow mt-20 ">
            <div className="flex justify-end p-2">
              <div
                onClick={() => setChangePassword(false)}
                type="button"
                className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="delete-user-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div
                id="toast-warning"
                className={`flex items-center w-full py-4 px-3 text-gray-500 rounded-lg bg-sky-100 my-2`}
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg text-sky-600">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                  </svg>
                  <span className="sr-only">Warning icon</span>
                </div>
                <div className="ml-3 text-sm font-normal">
                  <p className="leading-6">
                    Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ in hoa và 1
                    số.
                  </p>
                </div>
              </div>
              <form action="" className="py-0  ">
                <div className="border-b-2 py-3">
                  <div className="currentPassword grid grid-cols-3 gap-5 py-2">
                    <label htmlFor="" className="text-sm my-auto">
                      Mật khẩu hiện tại:
                    </label>
                    <div className="col-span-2">
                      <FormField
                        name={"oldPassword"}
                        values={newDataPassword}
                        id={"oldPassword"}
                        setValue={setNewDataPassword}
                        required={"required"}
                        type={"password"}
                      />
                      {<ErrorField errors={errors} field={"oldPassword"} />}
                    </div>
                  </div>

                  <div className="newPassword grid grid-cols-3 gap-5 py-2">
                    <label htmlFor="" className="text-sm my-auto">
                      Mật khẩu mới:
                    </label>
                    <div className="col-span-2">
                      <FormField
                        name={"newPassword"}
                        values={newDataPassword}
                        id={"newPassword"}
                        setValue={setNewDataPassword}
                        type={"password"}
                      />
                      {<ErrorField errors={errors} field={"newPassword"} />}
                    </div>
                  </div>

                  <div className="confirmNewPassword grid grid-cols-3 gap-5 py-2">
                    <label htmlFor="" className="text-sm my-auto">
                      Nhập lại mật khẩu mới:
                    </label>
                    <div className="col-span-2">
                      <FormField
                        name={"confirmPassword"}
                        values={confirmPassword}
                        id={"confirmPassword"}
                        setValue={setConfirmPassword}
                        required={"required"}
                      />
                      {<ErrorField errors={errors} field={"confirmPassword"} />}
                    </div>
                  </div>
                </div>
                <div className="button text-right pt-5">
                  
                  <ButtonComponent
                  type={"button"}
                  textButton={"Lưu"}
                  handleClick={handleSubmit}
                  style={
                    "text-white bg-sky-500 border border-sky-500 hover:bg-sky-500 focus:ring-4 focus:ring-blue-300 px-5 bg-opacity-80 "
                  }
                />

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;

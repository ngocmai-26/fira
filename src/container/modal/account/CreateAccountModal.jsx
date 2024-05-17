import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../../component/ButtonComponent";
import { ErrorField } from "../../component/ErrorField";
import { useLayoutEffect, useState } from "react";
import { FormField } from "../../component/FormField";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { addNewAccount } from "../../../thunks/AccountsThunk";
import validator from "validator";
import { getAllRole } from "../../../thunks/RolesThunk";
import { TOAST_ERROR } from "../../../constants/toast";
import { setAlert } from "../../../slices/AlertSlice";

function CreateAccountModal({ setShowCreateAccount }) {
  const { allRole } = useSelector((state) => state.rolesReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [accountData, setAccountData] = useState({
    username: "",
    password: "",
    roleId: "",
  });
  const dispatch = useDispatch();
  const nav = useNavigate();

  useLayoutEffect(() => {
    if (allRole.length <= 0) {
      dispatch(getAllRole());
    }
  }, []);

  const { errors } = useSelector((state) => state.accountsReducer);
  const newFormErrors = { ...errors };
  const [formErrors, setFormErrors] = useState(newFormErrors);

  const checkPasswordStrength = (password) => {
    // Đặt các yêu cầu mật khẩu của bạn ở đây
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    // Kiểm tra tất cả các điều kiện
    const isStrongPassword =
      password?.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasDigits &&
      hasSpecialChars;
    return isStrongPassword;
  };

  const handleAddAccount = () => {
    const isStrong = checkPasswordStrength(accountData?.password);

    const newFormErrors = { ...errors };
    if (
      !accountData?.username ||
      !accountData.password ||
      !accountData.roleId
    ) {
      dispatch(
        setAlert({
          type: TOAST_ERROR,
          content: "Vui lòng nhập đầy đủ thông tin",
        })
      );
      return;
    }

    if (accountData?.username) {
      if (!validator.isEmail(accountData?.username)) {
        newFormErrors.username = "Format is incorrect";
      }
    }

    if (accountData?.password) {
      if (!isStrong) {
        newFormErrors.password = "Password is not strong enough";
      }
    }

    setFormErrors(newFormErrors);

    // Nếu không có lỗi, thực hiện đăng ký
    if (Object.keys(newFormErrors).length === 0) {
      dispatch(addNewAccount(accountData)).then((resp) => {
        if (!resp?.error) {
          nav("/quan-ly-tai-khoan");
        }
      });
    }
  };
  const handleRoleChange = (e) => {
    const selectedRoleId = e.target.value;
    setAccountData({ ...accountData, roleId: selectedRoleId });
  };

  return (
    <div
      className={`fixed mx-auto left-0 right-0 z-50 items-center justify-center  overflow-x-hidden overflow-y-auto mt-20 md:inset-0 h-modal sm:h-full`}
      id="edit-user-modal"
    >
      <div className="relative w-full h-full max-w-xl px-4 md:h-auto m-auto">
        <div
          className="relative bg-white rounded-lg shadow "
          style={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-start justify-between p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold ">Thêm tài khoản</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="edit-user-modal"
              onClick={() => setShowCreateAccount(false)}
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
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form action="" className="py-0 sm:py-4">
              <div className="">
                <div className="Email py-2">
                  <div className="">
                    <div className="">
                      <label htmlFor="Email" className="font-medium text-sm">
                        Email:
                        <span className="text-red-500">*</span>
                      </label>
                      <FormField
                        name={"username"}
                        values={accountData}
                        id={"username"}
                        setValue={setAccountData}
                        type={"email"}
                        required={"required"}
                      />
                    </div>
                    <ErrorField errors={formErrors} field={"username"} />
                  </div>
                </div>
                <div className="password py-2">
                  <div className=" ">
                    <div className="relative">
                      <label htmlFor="Phone" className="font-medium text-sm">
                        Mật khẩu
                        <span className="text-red-500">*</span>
                      </label>
                      <FormField
                        name={"password"}
                        values={accountData}
                        id={"password"}
                        setValue={setAccountData}
                        type={showPassword ? "text" : "password"}
                        required={"required"}
                      />
                      <div
                        className="absolute top-8 right-2 cursor-pointer text-sm text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </div>
                      <ErrorField errors={formErrors} field={"password"} />
                    </div>
                  </div>
                </div>
                <div className="password py-2">
                  <div className=" ">
                    <div className="relative">
                      <label htmlFor="roles" className="font-medium text-sm">
                        Chức vụ
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                        value={accountData.roleId}
                        onChange={handleRoleChange}
                      >
                        <option value="">---------</option>
                        {allRole?.map((item) => (
                          <option value={item.id}>{item.roleName}</option>
                        ))}
                      </select>

                      <ErrorField errors={formErrors} field={"roleId"} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center py-3 flex justify-end">
                <ButtonComponent
                  type={"button"}
                  textButton={"Hoàn thành"}
                  handleClick={handleAddAccount}
                  style={
                    "text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 px-5  mr-3"
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountModal;

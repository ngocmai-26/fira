import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../thunks/AuthThunk";
import { useDispatch, useSelector } from "react-redux";
import { FormField } from "../component/FormField";
import { ErrorField } from "../component/ErrorField";
import ButtonComponent from "../component/ButtonComponent";

function Register() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({})
  
  const [user, setUser] = useState({});
  const { errors } = useSelector((state) => state.authReducer);

  const handleRegister = () => {
    dispatch(register(registerData)).then((reps) => {
      if(!reps.error) {
        localStorage.setItem('email', JSON.stringify(registerData?.username))
        nav("/confirm-account")
      }
    })
    console.log(registerData)
 
  }

  const toggleVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <article className="bg-cyan-50 h-screen w-full my-auto flex items-center ">
      <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md">
        <div className="logo pb-5">
          <img src="" alt="logo" />
        </div>
        <hr />
        <h3 className="font-bold text-xl leading-10 pt-5">Đăng ký tài khoản</h3>
        <p className="subtitle-login text-sm text-neutral-500 leading-7">
          Vui lòng nhập đầy đủ thông tin thông tin:
        </p>
        <form action="" className="py-0 sm:py-4">
            <div className="Email py-5">
              <div className="">
                <div className="">
                  <label htmlFor="Email" className="font-medium text-sm">
                  Email:
                  </label>
                  <FormField
                    name={"username"}
                    values={registerData}
                    id={"username"}
                    setValue={setRegisterData}
                    type={"email"}
                    required={"required"}
                  />
                </div>
                {<ErrorField errors={errors} field={"username"} />}
              </div>
            </div>
          <div className="password py-5">
              <div className=" ">
                <div className="relative">
                  <label htmlFor="Phone" className="font-medium text-sm">
                    Mật khẩu
                  </label>
                  <FormField
                    name={"password"}
                    values={registerData}
                    id={"password"}
                    setValue={setRegisterData}
                    type={showPassword? "text": "password"}
                    required={"required"}
                  />
                  <div
                    className="absolute top-8 right-2 cursor-pointer text-sm text-gray-300"
                    onClick={toggleVisibility}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </div>
                {<ErrorField errors={errors} field={"password"} />}
                </div>
              </div>
            </div>
            <div className="confirmPassword py-5">
              <div className="">
                <div className="relative">
                  <label htmlFor="confirmPassword" className="font-medium text-sm">
                    Nhập lại mật khẩu
                  </label>
                  <FormField
                    name={"confirmPassword"}
                    values={registerData}
                    id={"confirmPassword"}
                    setValue={setRegisterData}
                    type={showPassword? "text": "password"}
                    required={"required"}
                  />
                  <div
                    className="absolute top-8 right-2 cursor-pointer text-sm text-gray-300"
                    onClick={toggleVisibility}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash}  />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </div>
                </div>
                {<ErrorField errors={errors} field={"confirmPassword"} />}
              </div>
            </div>
          <div className="text-center py-3 flex">
            <Link to="/login"
              className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 min-w-full sm:min-w-[50%] "
            >
              Đăng Nhập
            </Link>
            {/* <button
              type="submit"
              onClick={handleRegister}
              className=" font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 min-w-full sm:min-w-[50%] "
            >
              Đăng Ký
            </button> */}
            <ButtonComponent textButton={"Đăng Ký"} handleSubmit={handleRegister} type={"button"} style={"bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 mr-2 mb-2 min-w-full sm:min-w-[50%]" }/>
          </div>
        </form>
      </div>
    </article>
  );
}

export default Register;

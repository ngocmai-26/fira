import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, loginWithAuthToken } from "../../thunks/AuthThunk";
import { Spinner } from "../component/spinner";
import { ErrorField } from "../component/ErrorField";
import { FormField } from "../component/FormField";
import { loadTokenFromStorage } from "../../services/AuthService";
import ButtonComponent from "../component/ButtonComponent";

function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({});
  const { isFetching } = useSelector((state) => state.authReducer);
  const { errors } = useSelector((state) => state.authReducer);
  const authToken = loadTokenFromStorage();

  useLayoutEffect(() => {
    if (authToken) {
      dispatch(loginWithAuthToken({ token: authToken }));
    }
  }, []);
  const handleLogin = () => {
    if (!isFetching) {
      dispatch(login(user));
    }
  };

  useLayoutEffect(() => {
    window.history.pushState({}, null, "/login");
  }, []);

  const toggleVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <article className="bg-cyan-50 h-screen w-full my-auto flex items-center justify-center">
      {authToken ? (
        <Spinner width={"w-10"} height={"h-10"} color={"fill-gray-500"} />
      ) : (
        <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md">
          <div className="logo pb-5">
            <img src="" alt="logo" />
          </div>
          <hr />
          <h3 className="font-bold text-xl leading-10 pt-5">Chào mừng</h3>
          <p className="subtitle-login text-sm text-neutral-500 leading-7">
            Vui lòng nhập username và mật khẩu của bạn để đăng nhập:
          </p>
          <form action="" className="py-0 sm:py-4">
            <div className="username border-b-2 border-b-stone-100 py-5">
              <div className="grid grid-cols-3 ">
                <div className="my-auto ">
                  <span className="font-medium text-sm">username:</span>
                </div>
                <div className="col-span-2">
                  <FormField
                    name={"username"}
                    values={user}
                    id={"username"}
                    setValue={setUser}
                    required={"required"}
                  />
                </div>
                {<ErrorField errors={errors} field={"username"} />}
              </div>
            </div>
            <div className="password border-b-2 border-b-stone-100 py-5">
              <div className="grid grid-cols-3 ">
                <div className="my-auto ">
                  <span className="font-medium text-sm">Password:</span>
                </div>
                <div className="col-span-2 relative">
                  <FormField
                    name={"password"}
                    values={user}
                    id={"password"}
                    setValue={setUser}
                    type={showPassword ? "text" : "password"}
                    required={"required"}
                  />
                  <div
                    className="absolute top-2 right-2 cursor-pointer text-sm text-gray-300"
                    onClick={toggleVisibility}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </div>
                </div>
                {<ErrorField errors={errors} field={"password"} />}
              </div>
            </div>
            <div className="forgot-password text-end">
              <Link
                to="/forgot-password"
                className="text-xs font-medium underline text-neutral-500 "
              >
                forgot password?
              </Link>
            </div>
            <div className="text-center py-3 flex">
              <Link
                to="/register"
                className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 min-w-full sm:min-w-[50%] "
              >
                Đăng Ký
              </Link>
          
              <ButtonComponent
                textButton={isFetching ? <Spinner /> : "Đăng nhập"}
                style={
                  "min-w-full sm:min-w-[50%] mr-2 mb-2 bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300"
                }
                handleSubmit={handleLogin}
                type={"button"}
              />
            </div>
            <div className="text-center">
              <span className="text-sm">
                chưa xác thực tài khoản ?{" "}
                <Link
                  to="/verify-email"
                  className="text-sky-600 hover:text-blue-300"
                >
                  Xác thực ngay
                </Link>
              </span>
            </div>
          </form>
        </div>
      )}
    </article>
  );
}

export default Login;

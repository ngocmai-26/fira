import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirmForgotPassword } from "../../thunks/AuthThunk";

function ConfirmForgotPassword() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const email = localStorage.getItem("email");
    const [code, setCode] = useState("");
    const handleSubmit = () => {
      const verify = {
        email: email,
        code: code,
      };
      dispatch(confirmForgotPassword(verify)).then((reps) => {
        if (!reps.error) {
          localStorage.removeItem("email");
          nav("/login");
        }
      });
   
    };
    const handleSendAgain = () => {
     
    };
    return ( 
        <article className="bg-cyan-50 h-screen w-full my-auto flex items-center ">
        <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md">
          <div className="logo pb-5">
            <h3 className="font-bold text-xl leading-4">Xác thực tài khoản</h3>
          </div>
          <hr />
          <div
            id="toast-warning"
            className="flex items-center w-full py-4 px-3 text-gray-500 rounded-lg bg-sky-100 border-s-4 border-s-cyan-500 my-2"
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
              Mã code đã được gửi về email của bạn. Hãy check email và nhập mã code để xác thực tài khoản
            </div>
          </div>
          <form action="" className="py-0">
            <div className="code flex flex-col sm:flex-row py-5 relative">
              <input
                type="text"
                id="code1"
                onChange={(e) => setCode(e.target.value)}
                className="rounded-md w-full border border-slate-200 outline-slate-200 text-sm leading-3 p-2 me-4"
                placeholder="Nhập mã code "
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSendAgain}
                className="text-white bg-red-300 hover:bg-red-400 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2 me-2"
              >
                Gửi lại mã code
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 "
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </article>
     );
}

export default ConfirmForgotPassword;
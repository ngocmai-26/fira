import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirmForgotPassword } from "../../thunks/AuthThunk";
import { FormField } from "../component/FormField";
import ButtonComponent from "../component/ButtonComponent";

function ConfirmForgotPassword() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const email = JSON.parse(localStorage.getItem("email"));
    const [code, setCode] = useState({email});
    const handleSubmit = () => {
   
      dispatch(confirmForgotPassword(code)).then((reps) => {
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
          
              <FormField
              name={"code"}
              values={code}
              id={"code"}
              setValue={setCode}
              placeholder={"Nhập mã code"}
            />
            </div>
            <div className="flex justify-end">
       
              <ButtonComponent handleSubmit={handleSendAgain} type={"button"} textButton={"Gửi lại mã code"} style={"text-white bg-red-300 hover:bg-red-400 focus:ring-4 focus:ring-red-300 mx-1.5"} />
          
              <ButtonComponent handleSubmit={handleSubmit} type={"button"} textButton={"Gửi"} />
            </div>
          </form>
        </div>
      </article>
     );
}

export default ConfirmForgotPassword;
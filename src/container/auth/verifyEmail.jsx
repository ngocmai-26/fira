import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { requestNewCode } from "../../thunks/AuthThunk";

function VerifyEmail() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        dispatch(requestNewCode(email)).then((reps) => {
            
        localStorage.setItem('email', email)
        nav("/confirm-account")
        }) 
    }
    return ( 
        <article className="bg-cyan-50 h-screen w-full my-auto flex items-center ">
        <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md relative">
          <div className="logo pb-5">
            <h3 className="font-bold text-xl leading-4">Nhập email để xác thực tài khoản</h3>
          </div>

          <Link to="/login" className="absolute top-2 right-4 text-sm font-bold">X</Link>
          <hr />
          <form action="" className="py-0">
            <div className="email flex flex-col sm:flex-row py-2 ">
              <input
                type="email"
                id="email"
                className="rounded-md w-full border border-slate-200 outline-slate-200 text-sm leading-3 p-2 me-4"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
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

export default VerifyEmail;
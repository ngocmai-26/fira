import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../thunks/AuthThunk";
import { FormField } from "../component/FormField";
import ButtonComponent from "../component/ButtonComponent";

function ForgotPassword() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    dispatch(forgotPassword(email?.email))
    .then((reps) => {
      if (!reps?.error) {
        localStorage.setItem("email", JSON.stringify(email));
        nav("/confirm-forgot-password");
      }
    });
  };
  return (
    <article className="bg-cyan-50 h-screen w-full my-auto flex items-center ">
      <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md relative">
        <div className="logo pb-5">
          <h3 className="font-bold text-xl leading-4">Nhập email tài khoản</h3>
        </div>

        <Link to="/login" className="absolute top-2 right-4 text-sm font-bold">
          X
        </Link>
        <hr />
        <form action="" className="py-0">
          <div className="email flex flex-col sm:flex-row py-2 ">
            <FormField
              name={"email"}
              values={email}
              id={"email"}
              setValue={setEmail}
              type={"email"}
              placeholder={"Email address"}
            />
      
            <ButtonComponent handleClick={handleSubmit} type={"button"} textButton={"Gửi"} />
          </div>
        </form>
      </div>
    </article>
  );
}

export default ForgotPassword;

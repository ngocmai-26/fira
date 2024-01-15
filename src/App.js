import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import Login from "./container/auth/login";
import Register from "./container/auth/register";
import Router from "./routes";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, setRefresh } from "./slices/AuthSlice";
import "../src/asset/css/tailwind.css";
import "@fontsource/be-vietnam-pro";
import { ToastContainer, toast } from "react-toastify";
import { TOAST_ERROR, TOAST_SUCCESS } from "./constants/toast";
import { setAlert } from "./slices/AlertSlice";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { refresh } = useSelector((state) => state.authReducer);
  const { msg } = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (Object.keys(msg).length > 0) {
      switch (msg.type) {
        case TOAST_SUCCESS:
          toast.success(msg.content);
          break;
        case TOAST_ERROR:
          toast.error(msg.content);
          break;
      }
      dispatch(setAlert({}));
    }
  }, [msg]);
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;

import { useNavigate } from "react-router-dom";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
export const AppMiddleware = (props) => {
  const { logged, user, refresh } = useSelector((state) => state.authReducer);
  const nav = useNavigate();

  useLayoutEffect(() => {
    if (logged) {
      if (!user) {
        nav("/create-new-user");
      }
    }
    if (user && refresh && refresh.uri) {
      nav(refresh.uri);
    }
  }, [refresh]);
  // process middleware there
  return <>{props.children}</>;
};

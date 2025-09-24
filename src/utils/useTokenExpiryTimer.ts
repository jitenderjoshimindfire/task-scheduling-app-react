import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showRefreshModal, selectAccessToken  } from "../redux-toolkit/authSlice";

export function useTokenExpiryTimer() {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  React.useEffect(() => {
    if (!accessToken) return;

  const refreshModalTimeout = 55 * 60 * 1000;


    const timer = setTimeout(() => {
      dispatch(showRefreshModal());
    }, refreshModalTimeout);

    return () => clearTimeout(timer);
  }, [accessToken, dispatch]);
}

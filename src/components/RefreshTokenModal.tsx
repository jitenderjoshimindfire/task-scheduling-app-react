import React from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  hideRefreshModal,
  logout,
  setCredentials,
} from "../redux-toolkit/authSlice";
import { refreshToken } from "../services/userService";
import type { RootState, AppDispatch } from "../redux-toolkit/store";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const RefreshTokenModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) => state.auth.showRefreshTokenModal);
  const currentUser = useAppSelector((state) => state.auth.user);

  if (!visible) return null;

  const handleYes = async () => {
    try {
      const response = await refreshToken(); // refresh token call
      const newAccessToken = response.accessToken;
      // Preserve the current user!
      dispatch(
        setCredentials({ user: currentUser, accessToken: newAccessToken }),
      );
      dispatch(hideRefreshModal()); // hide modal after success
    } catch (error) {
      dispatch(hideRefreshModal());
      dispatch(logout());
    }
  };

  const handleNo = () => {
    dispatch(hideRefreshModal());
    dispatch(logout());
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded p-6 max-w-sm w-full text-center">
        <p className="text-lg mb-4">
          Do you want to continue the current session?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleYes}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefreshTokenModal;

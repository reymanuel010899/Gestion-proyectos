import { FAILED_LOGIN, SUCCEES_LOGIN } from "../../../interfaces/auth";
import apiClient from "../../apiClient/apiClient";
import ENPOINTS from "../../../interfaces/endpoint";
import { AppDispatch } from "../../../store";
 
export interface FetchWithAuthProps {
  email: string;
  password: string;
}

export const login = (formData: FetchWithAuthProps) => async (dispatch: AppDispatch) => {
  try {
    const response = await apiClient.post(
      ENPOINTS.AUTH.LOGIN,
      formData,
    );

    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(response.data.user));

      dispatch({
        type: SUCCEES_LOGIN,
        payload: response.data,
      });
    } else {
      clearAuthData();
      dispatch({ type: FAILED_LOGIN, payload: null });
    }
  } catch (error: unknown) {
    clearAuthData();
    dispatch({ type: FAILED_LOGIN, payload: null });
  }
};


const clearAuthData = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
};

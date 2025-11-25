import { FAILED_REGISTER, IDataSignUp, SUCCEES_REGISTER } from '../../../interfaces/auth';
import ENPOINTS from '../../../interfaces/endpoint';
import apiClient from '../../apiClient/apiClient';

export const register = (formData: IDataSignUp ) => async (dispatch: any) => {
    try {
      const response = await apiClient.post(ENPOINTS.AUTH.REGISTER, formData);
      if (response.status == 201) {
        localStorage.setItem('refreshToken', response.data.refresh)
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(response.data.user))
        dispatch({
          type: SUCCEES_REGISTER,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FAILED_REGISTER,
        payload: error
      });
    }
  };


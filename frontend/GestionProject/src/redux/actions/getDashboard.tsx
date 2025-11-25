import ENPOINTS from '@/interfaces/endpoint';
import apiClient from '../apiClient/apiClient';
import { FAILED_GET_DASHBOARD, SUCCEES_GET_DASHBOARD } from '@/interfaces/dashboard';

export const getDashboard = () => async (dispatch: any) => {
    try {
      const response = await apiClient.get(ENPOINTS.DASHBOARD.DETAILS);
      if (response.status === 200) {
        dispatch({
          type: SUCCEES_GET_DASHBOARD,
          payload: response.data,
        });
        return response.data
      }
  
    } catch (error) {
      dispatch({
        type: FAILED_GET_DASHBOARD,
        payload: ''
      });
    }
  };


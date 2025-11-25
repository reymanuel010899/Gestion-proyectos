import { FAILED_GET_PROFILES, SUCCEES_GET_PROFILES } from '@/interfaces/auth';
import ENPOINTS from '../../../interfaces/endpoint';
import apiClient from '../../apiClient/apiClient';

export const getProfiles = () => async (dispatch: any) => {
    try {
      const response = await apiClient.get(ENPOINTS.AUTH.PROFILES);
      if (response.status === 200) {
        dispatch({
          type: SUCCEES_GET_PROFILES,
          payload: response.data,
        });
    }
    return response.data;
  
    } catch (error) {
      dispatch({
        type: FAILED_GET_PROFILES,
        payload: ''
      });
    }
  };


import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_GET_TASKS, SUCCEES_GET_TASKS } from '../../../interfaces/task';
import apiClient from '../../apiClient/apiClient';


export const getTaks = ({pages = 1}: {pages: number}) => async (dispatch: any) => {
    try {
      const response = await apiClient.get(ENPOINTS.TASKS.LIST, {
        params: {
            page: pages,
            limit: 10,
        }
    });
      if (response.status === 200) {
        dispatch({
          type: SUCCEES_GET_TASKS,
          payload: response.data,
        });
         return response.data
      }
  
    } catch (error) {
      dispatch({
        type: FAILED_GET_TASKS,
        payload: ''
      });
    }
  };


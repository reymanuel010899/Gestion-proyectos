import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_CREATE_TASK, SUCCEES_CREATE_TASK } from '../../../interfaces/task';
import apiClient from '../../apiClient/apiClient';


export const createTask = (taskData: any) => async (dispatch: any) => {
  try {
    const response = await apiClient.post(ENPOINTS.TASKS.CREATE, taskData);

    if (response.status === 201 || response.status === 200) {
      dispatch({
        type: SUCCEES_CREATE_TASK,
        payload: response.data,
      });
      return response.data
    }

  } catch (error) {
    dispatch({
      type: FAILED_CREATE_TASK,
      payload: null,
    });
    return error.response.data.error
  }
};


import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_GET_TASK, SUCCEES_GET_TASK } from '../../../interfaces/task';
import apiClient from '../../apiClient/apiClient';

export const getTaskById = (taskId: string) => async (dispatch: any) => {
  try {
    const response = await apiClient.get(ENPOINTS.TASKS.DETAIL(taskId));

    if (response.status === 200) {
      dispatch({
        type: SUCCEES_GET_TASK,
        payload: response.data,
      });
    }

  } catch (error) {
    dispatch({
      type: FAILED_GET_TASK,
      payload: error,
    });
  }
};


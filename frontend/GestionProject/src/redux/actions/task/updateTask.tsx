
import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_UPDATE_TASK, SUCCEES_UPDATE_TASK } from '../../../interfaces/task';
import apiClient from '../../apiClient/apiClient';
export const updateTask = (taskId: string, taskData: any) => async (dispatch: any) => {
  try {
    const response = await apiClient.put(ENPOINTS.TASKS.UPDATE(taskId), taskData);

    if (response.status === 200) {
      dispatch({
        type: SUCCEES_UPDATE_TASK,
        payload: response.data,
      });
    }

  } catch (error) {
    dispatch({
      type: FAILED_UPDATE_TASK,
      payload: error,
    });
  }
};

import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_DELETE_TASK, SUCCEES_DELETE_TASK } from '../../../interfaces/task';
import apiClient from '../../apiClient/apiClient';

export const deleteTask = (taskId: string) => async (dispatch: any) => {
  try {
    const response = await apiClient.delete(ENPOINTS.TASKS.DELETE(taskId));

    if (response.status === 200) {
      dispatch({
        type: SUCCEES_DELETE_TASK,
        payload: taskId,
      });
    }

  } catch (error) {
    dispatch({
      type: FAILED_DELETE_TASK,
      payload: error,
    });
  }
};
import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_DELETE_PROJECT, SUCCEES_DELETE_PROJECT } from '../../../interfaces/project';
import apiClient from '../../apiClient/apiClient';

export const deleteProject = (projectId: string) => async (dispatch: any) => {
  try {
    const response = await apiClient.delete(ENPOINTS.PROJECTS.DELETE(projectId));

    if (response.status === 200) {
      dispatch({
        type: SUCCEES_DELETE_PROJECT,
        payload: projectId,
      });
    }

  } catch (error) {
    dispatch({
      type: FAILED_DELETE_PROJECT,
      payload: error,
    });
  }
};

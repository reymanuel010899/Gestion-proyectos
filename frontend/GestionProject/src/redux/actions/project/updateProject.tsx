import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_UPDATE_PROJECT, SUCCEES_UPDATE_PROJECT } from '../../../interfaces/project';
import apiClient from '../../apiClient/apiClient';

export const updateProject = (projectId: string, projectData: any) => async (dispatch: any) => {
  try {
    const response = await apiClient.put(ENPOINTS.PROJECTS.UPDATE(projectId), projectData);

    if (response.status === 200) {
      dispatch({
        type: SUCCEES_UPDATE_PROJECT,
        payload: response.data,
      });
    }

  } catch (error) {
    dispatch({
      type: FAILED_UPDATE_PROJECT,
      payload: error,
    });
  }
};

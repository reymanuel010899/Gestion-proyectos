import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_GET_PROJECT, SUCCEES_GET_PROJECT } from '../../../interfaces/project';
import apiClient from '../../apiClient/apiClient';

export const getProjectById = (projectId: string) => async (dispatch: any) => {
  try {
    const response = await apiClient.get(ENPOINTS.PROJECTS.DETAIL(projectId));

    if (response.status === 200) {
      dispatch({
        type: SUCCEES_GET_PROJECT,
        payload: response.data,
      });
    }

  } catch (error) {
    dispatch({
      type: FAILED_GET_PROJECT,
      payload: error,
    });
  }
};

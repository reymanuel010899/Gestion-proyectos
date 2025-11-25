import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_CREATE_PROJECT, SUCCEES_CREATE_PROJECT } from '../../../interfaces/project';
import apiClient from '../../apiClient/apiClient';

type projectPayload = {
  name: string,
  description: string,
  status: string,
  priority: string
};
export const createProject = (projectData: projectPayload) => async (dispatch: any) => {
  try {
    const response = await apiClient.post(ENPOINTS.PROJECTS.CREATE, projectData);

    if (response.status === 201 || response.status === 200) {
      dispatch({
        type: SUCCEES_CREATE_PROJECT,
        payload: response.data,
      });
    }

  } catch (error) {
    dispatch({
      type: FAILED_CREATE_PROJECT,
      payload: error,
    });
  }
};

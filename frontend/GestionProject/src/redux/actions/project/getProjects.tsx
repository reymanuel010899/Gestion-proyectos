import ENPOINTS from '../../../interfaces/endpoint';
import { FAILED_GET_PROJECTS, SUCCEES_GET_PROJECTS } from '../../../interfaces/project';
import apiClient from '../../apiClient/apiClient';

export const getProjects = ({pages = 1}: {pages: number}) => async (dispatch: any) => {
  try {
    const response = await apiClient.get(ENPOINTS.PROJECTS.LIST, {
        params: {
            page: pages,
            limit: 10,
        }
    });

    if (response.status === 200) {
      dispatch({
        type: SUCCEES_GET_PROJECTS,
        payload: response.data,
      });
      return response.data
    }

  } catch (error) {
    dispatch({
      type: FAILED_GET_PROJECTS,
      payload: error,
    });
  }
};

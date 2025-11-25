import { FAILED_GET_PROJECTS, SUCCEES_GET_PROJECTS } from "../../../interfaces/project";

const initialState = {
  projects: [],
  error: null,
};

const GetProjectsReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        error: null,
      };

    case FAILED_GET_PROJECTS:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default GetProjectsReducer;

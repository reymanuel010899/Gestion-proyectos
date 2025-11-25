import { FAILED_UPDATE_PROJECT, SUCCEES_UPDATE_PROJECT } from "../../../interfaces/project";

const initialState = {
  updatedProject: null,
  error: null,
};

const UpdateProjectReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_UPDATE_PROJECT:
      return {
        ...state,
        updatedProject: payload,
        error: null,
      };

    case FAILED_UPDATE_PROJECT:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default UpdateProjectReducer;

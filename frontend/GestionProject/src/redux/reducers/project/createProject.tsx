import { FAILED_CREATE_PROJECT, SUCCEES_CREATE_PROJECT } from "../../../interfaces/project";

const initialState = {
  newProject: null,
  error: null,
};

const CreateProjectReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_CREATE_PROJECT:
      return {
        ...state,
        newProject: payload,
        error: null,
      };

    case FAILED_CREATE_PROJECT:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default CreateProjectReducer;

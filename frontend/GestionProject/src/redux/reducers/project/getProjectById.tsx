
import { FAILED_GET_PROJECT, SUCCEES_GET_PROJECT } from "../../../interfaces/project";

const initialState = {
  project: null,
  error: null,
};

const GetProjectReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_GET_PROJECT:
      return {
        ...state,
        project: payload,
        error: null,
      };

    case FAILED_GET_PROJECT:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default GetProjectReducer;

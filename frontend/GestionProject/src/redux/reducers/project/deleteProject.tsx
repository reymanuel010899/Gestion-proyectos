import { FAILED_DELETE_PROJECT, SUCCEES_DELETE_PROJECT } from "../../../interfaces/project";


const initialState = {
  deletedId: null,
  error: null,
};

const DeleteProjectReducer = (state = initialState, action: { type: string; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_DELETE_PROJECT:
      return {
        ...state,
        deletedId: payload,
        error: null,
      };

    case FAILED_DELETE_PROJECT:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default DeleteProjectReducer;

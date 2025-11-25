import { FAILED_DELETE_TASK, SUCCEES_DELETE_TASK } from "../../../interfaces/task";

const initialState = {
  deleted: false,
  error: null,
};

const deleteTaskReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_DELETE_TASK:
      return {
        ...state,
        deleted: true,
        error: null,
      };

    case FAILED_DELETE_TASK:
      return {
        ...state,
        deleted: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default deleteTaskReducer;

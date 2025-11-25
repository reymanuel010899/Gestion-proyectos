import { FAILED_UPDATE_TASK, SUCCEES_UPDATE_TASK } from "../../../interfaces/task";

const initialState = {
  updatedTask: null,
  error: null,
};

const updateTaskReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_UPDATE_TASK:
      return {
        ...state,
        updatedTask: payload,
        error: null,
      };

    case FAILED_UPDATE_TASK:
      return {
        ...state,
        updatedTask: null,
        error: payload,
      };

    default:
      return state;
  }
};

export default updateTaskReducer;

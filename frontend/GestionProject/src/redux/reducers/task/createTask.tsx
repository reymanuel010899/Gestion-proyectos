import { FAILED_CREATE_TASK, SUCCEES_CREATE_TASK } from "../../../interfaces/task";

const initialState = {
  createdTask: null,
  error: null,
};

const createTaskReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_CREATE_TASK:
      return {
        ...state,
        createdTask: payload,
        error: null,
      };

    case FAILED_CREATE_TASK:
      return {
        ...state,
        createdTask: null,
        error: payload,
      };

    default:
      return state;
  }
};

export default createTaskReducer;

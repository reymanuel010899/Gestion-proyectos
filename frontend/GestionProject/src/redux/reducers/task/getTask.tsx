import { FAILED_GET_TASK, SUCCEES_GET_TASK } from "../../../interfaces/task";

const initialState = {
  task: null,
  error: null,
};

const getTaskByIdReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_GET_TASK:
      return {
        ...state,
        task: payload,
        error: null,
      };

    case FAILED_GET_TASK:
      return {
        ...state,
        task: null,
        error: payload,
      };

    default:
      return state;
  }
};

export default getTaskByIdReducer;

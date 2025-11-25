import { FAILED_GET_TASKS, SUCCEES_GET_TASKS } from "../../../interfaces/task";

const initialState = {
  tasks: [],
  error: null,
};

const getTasksReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_GET_TASKS:
      return {
        ...state,
        tasks: payload,
        error: null,
      };

    case FAILED_GET_TASKS:
      return {
        ...state,
        tasks: [],
        error: payload,
      };

    default:
      return state;
  }
};

export default getTasksReducer;


import { FAILED_GET_DASHBOARD, SUCCEES_GET_DASHBOARD } from '@/interfaces/dashboard';

const initialState = {
  dashboard: [],
  error: null,
};

const getDashboardReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_GET_DASHBOARD:
      return {
        ...state,
        dashboard: payload,
        error: null,
      };

    case FAILED_GET_DASHBOARD:
      return {
        ...state,
        dashboard: [],
        error: payload,
      };

    default:
      return state;
  }
};

export default getDashboardReducer;

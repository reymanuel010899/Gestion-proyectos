import { FAILED_GET_PROFILES, SUCCEES_GET_PROFILES } from '@/interfaces/auth';

const initialState = {
  profiles: [],
  error: null,
};

const getProfilesReducer = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SUCCEES_GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        error: null,
      };

    case FAILED_GET_PROFILES:
      return {
        ...state,
        profiles: [],
        error: payload,
      };

    default:
      return state;
  }
};

export default getProfilesReducer;

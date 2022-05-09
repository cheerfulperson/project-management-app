import { ESessionActions, SessionActions } from '../actions/session.actions';
import { initialSessionState, SessionState } from '../states/session.state';

export const sessionReducers = (
  state: SessionState = initialSessionState,
  action: SessionActions
): SessionState => {
  switch (action.type) {
    case ESessionActions.AddUserSession:
      return {
        ...state,
        session: action.payload,
        isUserAuthorized: true,
      };
    case ESessionActions.LoadUserSessionSuccess:
      return {
        ...state,
        session: action.payload,
        isUserAuthorized: action.payload ? true : false,
      };
    case ESessionActions.DeleteUserSessionSuccess:
      return {
        ...state,
        isUserAuthorized: false,
        session: null,
      };
    default:
      return state;
  }
};

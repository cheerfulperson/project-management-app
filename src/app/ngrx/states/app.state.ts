import { initialSessionState, SessionState } from './session.state';

export interface IAppState {
  userSession: SessionState;
}

export const initialAppState = {
  userSession: initialSessionState,
};

export function getInitialAppState(): IAppState {
  return initialAppState;
}

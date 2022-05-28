import { UserSessionData } from 'src/app/shared/models/user-session.model';

export interface SessionState {
  session: UserSessionData | null;
  isUserAuthorized: boolean;
}

export const initialSessionState: SessionState = {
  session: null,
  isUserAuthorized: false,
};

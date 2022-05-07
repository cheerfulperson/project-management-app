import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { SessionState } from '../states/session.state';

const selectUsers = (state: IAppState): SessionState => state.userSession;

export const selectSession = createSelector(
  selectUsers,
  (state: SessionState) => state.session
);

export const selectIsUserAuthorized = createSelector(
  selectUsers,
  (state: SessionState) => state.isUserAuthorized
);

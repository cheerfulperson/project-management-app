import {
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
} from '@ngrx/store';
import { UserSessionData } from 'src/app/shared/models/user-session.model';
import { IAppState } from '../states/app.state';
import { SessionState } from '../states/session.state';

const selectUsers = (state: IAppState): SessionState => state.userSession;

export const selectSession: MemoizedSelector<
  IAppState,
  UserSessionData | null,
  DefaultProjectorFn<UserSessionData | null>
> = createSelector(selectUsers, (state: SessionState) => state.session);

export const selectIsUserAuthorized: MemoizedSelector<
  IAppState,
  boolean,
  DefaultProjectorFn<boolean>
> = createSelector(
  selectUsers,
  (state: SessionState) => state.isUserAuthorized
);

import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { sessionReducers } from './session.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  userSession: sessionReducers
};

import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import {
  AddUserSession,
  AddUserSessionSuccess,
  DeleteUserSession,
  DeleteUserSessionSuccess,
  ESessionActions,
  LoadUserSession,
  LoadUserSessionSuccess,
} from '../actions/session.actions';

@Injectable()
export class SessionEffects {
  public loadUserSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<LoadUserSession>(ESessionActions.LoadUserSession),
      switchMap(() => {
        return this.sessionService.getUserSessionData().pipe(
          map((data) => {
            return new LoadUserSessionSuccess(data);
          })
        );
      })
    );
  });

  public addUserSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<AddUserSession>(ESessionActions.AddUserSession),
      switchMap((action: AddUserSession) => {
        if (action.payload) {
          this.sessionService.addDataToStore(action.payload);
        }
        return of(new AddUserSessionSuccess(action.payload));
      })
    );
  });

  public deleteUserSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<DeleteUserSession>(ESessionActions.DeleteUserSession),
      switchMap(() => {
        this.sessionService.deleteDataFromStore();
        return of(new DeleteUserSessionSuccess());
      })
    );
  });

  public constructor(
    private actions$: Actions,
    private sessionService: SessionService
  ) {}
}

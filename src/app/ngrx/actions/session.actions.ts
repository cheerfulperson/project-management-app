import { UserSessionData } from 'src/app/shared/models/user-session.model';

export enum ESessionActions {
  LoadUserSession = '[User session] LoadUserSession',
  LoadUserSessionSuccess = '[User session] LoadUserSessionSuccess',
  GetUserSession = '[User session] GetUserSession',
  DeleteUserSession = '[User session] DeleteUserSession',
  DeleteUserSessionSuccess = '[User session] DeleteUserSessionSuccess',
  AddUserSession = '[User session] AddUserSession',
  AddUserSessionSuccess = '[User session] AddUserSessionSuccess',
}

export class LoadUserSession {
  public readonly type = ESessionActions.LoadUserSession;
}

export class LoadUserSessionSuccess {
  public readonly type = ESessionActions.LoadUserSessionSuccess;

  constructor(public payload: UserSessionData | null) {}
}

export class GetUserSession {
  public readonly type = ESessionActions.GetUserSession;
}

export class DeleteUserSession {
  public readonly type = ESessionActions.DeleteUserSession;
}

export class DeleteUserSessionSuccess {
  public readonly type = ESessionActions.DeleteUserSessionSuccess;
}

export class AddUserSession {
  public readonly type = ESessionActions.AddUserSession;

  constructor(public payload: UserSessionData) {}
}

export class AddUserSessionSuccess {
  public readonly type = ESessionActions.AddUserSessionSuccess;

  constructor(public payload: UserSessionData) {}
}
export type SessionActions =
  | LoadUserSession
  | LoadUserSessionSuccess
  | GetUserSession
  | DeleteUserSession
  | DeleteUserSessionSuccess
  | AddUserSession;

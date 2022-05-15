/* eslint-disable no-magic-numbers */

interface RegExpInterface {
  PasswordRegExp: RegExp;
}
export const regexp: RegExpInterface = {
  PasswordRegExp:
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[:;<>,./~_=-]).{8,}/,
};

export enum numbers {
  MinNameLength = 3,
  MinLoginLength = 4,
}

export enum StatusCodes {
  Unauthorized = 401,
  Forbiden = 403,
  Conflict = 409,
  PageNotFound = 404,
}

export enum ErrorMessages {
  Forbiden = 'errors.403',
  Conflict = 'errors.409',
  OtherErrors = 'errors.server',
}

export enum Timer {
  MessageErrorView = 5000,
  CloseSearchModal = 200,
}

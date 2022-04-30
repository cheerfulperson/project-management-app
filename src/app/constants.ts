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

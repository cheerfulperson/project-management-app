export interface LoginUserModel {
  login: string;
  password: string;
}

export interface LoginResponseModel {
  token: string;
}

export interface SignUpUserModel {
  name: string;
  login: string;
  password: string;
}

export interface SignUpResponseModel {
  id: string;
  name: string;
  login: string;
}

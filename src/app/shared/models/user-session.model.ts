import { LoginResponseModel } from 'src/app/auth/models/user.model';

export interface UserSessionData extends LoginResponseModel {
  id: string;
  name: string;
}

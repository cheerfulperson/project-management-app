import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import {
  LoginResponseModel,
  LoginUserModel,
  SignUpResponseModel,
  SignUpUserModel,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private apiService: ApiService) {}

  public login(userData: LoginUserModel): Observable<LoginResponseModel> {
    return this.apiService.login(userData);
  }

  public signUp(userData: SignUpUserModel): Observable<SignUpResponseModel> {
    return this.apiService.signUp(userData);
  }
}

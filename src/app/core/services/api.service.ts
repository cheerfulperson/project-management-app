import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginResponseModel,
  LoginUserModel,
  SignUpResponseModel,
  SignUpUserModel,
} from 'src/app/auth/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(private httpClient: HttpClient) {}

  public login(userData: LoginUserModel): Observable<{
    token: string;
  }> {
    return this.httpClient.post<LoginResponseModel>('/api/signin', userData);
  }

  public signUp(userData: SignUpUserModel): Observable<SignUpResponseModel> {
    return this.httpClient.post<SignUpResponseModel>('/api/signup', userData);
  }
}

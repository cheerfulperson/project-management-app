import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUserModel } from 'src/app/auth/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(private httpClient: HttpClient) {}

  public login(userData: LoginUserModel): Observable<{
    token: string;
  }> {
    return this.httpClient.post<{ token: string }>('/api/signin', userData);
  }
}

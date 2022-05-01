import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { LoginUserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private apiService: ApiService) {}

  public login(userData: LoginUserModel): Observable<{
    token: string;
  }> {
    return this.apiService.login(userData);
  }
}

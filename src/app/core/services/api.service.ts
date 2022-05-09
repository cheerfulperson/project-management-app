import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginResponseModel,
  LoginUserModel,
  SignUpResponseModel,
  SignUpUserModel,
} from 'src/app/auth/models/user.model';
import { Observable } from 'rxjs';
import {
  CreateBoardResponseModel,
  GetAllBoardsResponseModel,
  UpdateBoardResponseModel,
} from 'src/app/project-management-app/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(private httpClient: HttpClient) {}

  public login(userData: LoginUserModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>('/signin', userData);
  }

  public signUp(userData: SignUpUserModel): Observable<SignUpResponseModel> {
    return this.httpClient.post<SignUpResponseModel>('/signup', userData);
  }

  public deleteBoard(id: string): void {
    this.httpClient.delete(`/boards/${id}`).subscribe();
  }

  public createBoard(title: string): Observable<CreateBoardResponseModel> {
    return this.httpClient.post<CreateBoardResponseModel>('/boards', { title });
  }

  public updateBoard(
    title: string,
    boardId: string
  ): Observable<UpdateBoardResponseModel> {
    return this.httpClient.put<UpdateBoardResponseModel>(`/boards/${boardId}`, {
      title,
    });
  }

  public getAllBoards(): Observable<GetAllBoardsResponseModel[]> {
    return this.httpClient.get<GetAllBoardsResponseModel[]>('/boards');
  }

  public getUsersWithToken(token: string): Observable<SignUpResponseModel[]> {
    return this.httpClient.get<SignUpResponseModel[]>('users', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

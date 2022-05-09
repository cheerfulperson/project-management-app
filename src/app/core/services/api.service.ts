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
  Board,
  CreateBoardDto,
  GetAllBoardsResponseModel,
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

  public createBoard(board: CreateBoardDto): Observable<Board> {
    return this.httpClient.post<Board>('boards', board);
  }

  public deleteBoard(id: string): void {
    this.httpClient.delete(`/boards/${id}`).subscribe();
  }

  public getAllBoards(): Observable<GetAllBoardsResponseModel[]> {
    return this.httpClient.get<GetAllBoardsResponseModel[]>('/boards');
  }
}

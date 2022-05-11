import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  LoginResponseModel,
  LoginUserModel,
  SignUpResponseModel,
  SignUpUserModel,
} from 'src/app/auth/models/user.model';
import { catchError, Observable } from 'rxjs';
import {
  Board,
  CreateBoardResponseModel,
  GetAllBoardsResponseModel,
  UpdateBoardResponseModel,
} from 'src/app/project-management-app/models/board.model';
import { Router } from '@angular/router';
import {
  Column,
  CreateColumnDto,
} from 'src/app/project-management-app/models/column.models';
import {
  CreateTaskDto,
  Task,
  UpdateTaskDto,
} from 'src/app/project-management-app/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(private httpClient: HttpClient, private router: Router) {}

  public login(userData: LoginUserModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>('/signin', userData);
  }

  public signUp(userData: SignUpUserModel): Observable<SignUpResponseModel> {
    return this.httpClient.post<SignUpResponseModel>('/signup', userData);
  }

  public getAllUsers(): Observable<SignUpResponseModel[]> {
    return this.httpClient.get<SignUpResponseModel[]>('/users');
  }

  public editProfile(
    userData: SignUpResponseModel
  ): Observable<SignUpResponseModel[]> {
    return this.httpClient.post<SignUpResponseModel[]>('/users', userData);
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

  public getBoards(): Observable<Board[]> {
    return this.httpClient.get<Board[]>('boards');
  }

  public getBoard(id: string): Observable<Board> {
    return this.httpClient.get<Board>(`boards/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!err.ok) {
          this.router.navigateByUrl('/404');
        }
        return [];
      })
    );
  }

  public createColumn(
    boardId: string,
    column: CreateColumnDto
  ): Observable<Column> {
    return this.httpClient.post<Column>(`boards/${boardId}/columns`, column);
  }

  public deleteColumn(boardId: string, columnId: string): Observable<unknown> {
    return this.httpClient.delete(`boards/${boardId}/columns/${columnId}`);
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    column: CreateColumnDto
  ): Observable<Column> {
    return this.httpClient.put<Column>(
      `boards/${boardId}/columns/${columnId}`,
      column
    );
  }

  public createTask(
    boardId: string,
    columnId: string,
    task: CreateTaskDto
  ): Observable<Task> {
    return this.httpClient.post<Task>(
      `boards/${boardId}/columns/${columnId}/tasks`,
      task
    );
  }

  public deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<unknown> {
    return this.httpClient.delete(
      `boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
  }

  public updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    task: UpdateTaskDto
  ): Observable<Task> {
    return this.httpClient.put<Task>(
      `boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      task
    );
  }

  public getUsersWithToken(token: string): Observable<SignUpResponseModel[]> {
    return this.httpClient.get<SignUpResponseModel[]>('users', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

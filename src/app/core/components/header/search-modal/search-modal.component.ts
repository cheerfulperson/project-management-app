import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { GetAllBoardsResponseModel } from 'src/app/project-management-app/models/board.model';
import { Task } from 'src/app/project-management-app/models/task.model';
import { Board } from 'src/app/project-management-app/models/board.model';
import { Column } from 'src/app/project-management-app/models/column.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  @Input() public searchTerm$: Observable<string> = this.session.searchTerm$;

  @Output() public closeSearchModal: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public searchTerm: string = '';

  public tasks: Task[] = [];

  public isTasksLoaded: boolean = false;

  public constructor(
    private session: SessionService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.apiService
      .getAllBoards()
      .subscribe((boards: GetAllBoardsResponseModel[]) => {
        boards.forEach((board: Board) => {
          this.apiService
            .getAllColumns(board.id)
            .subscribe((columns: Column[]) => {
              columns.forEach((column: Column) => {
                this.apiService
                  .getAllTasks(board.id, column.id)
                  .subscribe((tasks: Task[]) => {
                    tasks.forEach((task: Task) => {
                      this.tasks.push(task);
                    });
                  });
                this.isTasksLoaded = true;
              });
            });
        });
      });
  }

  public ngOnInit(): void {
    this.session.searchTerm$.subscribe(
      (searchTerm: string) => (this.searchTerm = searchTerm)
    );
  }

  public changeTask(task: Task): void {
    this.closeSearchModal.emit(false);
    this.router.navigate(['boards/', task.boardId]);
  }
}

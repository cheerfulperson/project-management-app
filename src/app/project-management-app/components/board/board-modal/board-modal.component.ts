import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/core/services/api.service';
import { selectSession } from 'src/app/ngrx/selectors/session.selectors';
import { IAppState } from 'src/app/ngrx/states/app.state';
import { Board } from 'src/app/project-management-app/models/board.model';
import { Column } from 'src/app/project-management-app/models/column.models';
import { MyErrorStateMatcher } from 'src/app/project-management-app/models/state-matcher.model';
import {
  Task,
  TaskFormData,
} from 'src/app/project-management-app/models/task.model';
import { UserSessionData } from 'src/app/shared/models/user-session.model';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent {
  @Input() public board?: Board;
  @Input() public column?: Column;
  @Input() public task?: Task;
  @Output() public valueChange: EventEmitter<Column | Task> = new EventEmitter<
    Column | Task
  >();
  @Output() public modalClose: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public title: string = 'board.boardModal.title.create';
  public buttonText: string = 'board.boardModal.buttons.create';
  public isEditTask: boolean = false;
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(Number('3')),
    ]),
    description: new FormControl(''),
  });
  public matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  public constructor(private apiService: ApiService, private store: Store) {}

  private get formValue(): TaskFormData {
    return {
      title: this.formGroup.controls['title'].value || '',
      description: this.formGroup.controls['description'].value || '',
    };
  }

  @Input() public set isEditTaskModal(value: boolean) {
    this.isEditTask = value;

    this.title = value
      ? 'board.boardModal.title.edit'
      : 'board.boardModal.title.create';

    this.buttonText = value
      ? 'board.boardModal.buttons.edit'
      : 'board.boardModal.buttons.create';
  }

  public apiTrigger(): void {
    if (this.isEditTask && this.task) {
      this.editTask();
    } else if (this.isEditTask) {
      this.createTask();
    } else {
      this.createColumn();
    }
  }

  public closeModal(): void {
    this.modalClose.emit(true);
  }

  private editTask(): void {
    if (this.board && this.column && this.task) {
      this.apiService
        .updateTask(this.board.id, this.column.id, {
          ...this.task,
          title: this.formValue.title,
          description: this.formValue.description,
        })
        .subscribe((data: Task) => {
          this.valueChange.emit(data);
        });
    }
  }

  private createTask(): void {
    (this.store as Store<IAppState>)
      .select(selectSession)
      .subscribe((data: UserSessionData | null) => {
        if (this.board && this.column && data) {
          this.apiService
            .createTask(this.board.id, this.column.id, {
              title: this.formValue.title,
              description: this.formValue.description,
              order: this.column.tasks?.length || 1,
              userId: data.id,
            })
            .subscribe((task: Task) => {
              this.valueChange.emit(task);
            });
        }
      });
  }

  private createColumn(): void {
    if (this.board) {
      this.apiService
        .createColumn(this.board.id, {
          title: this.formValue.title,
          order: this.getColumnOrder(),
        })
        .subscribe((column: Column) => this.valueChange.emit(column));
    }
  }

  private getColumnOrder(order: number = 0): number {
    if (this.board && this.board.columns) {
      order += 1;
      return this.board.columns.find((value: Column) => value.order === order)
        ? this.getColumnOrder(order)
        : order;
    }
    return 1;
  }
}

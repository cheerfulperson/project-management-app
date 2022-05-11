import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class BoardModalComponent implements OnInit {
  @Input() public board?: Board;
  @Input() public column?: Column;
  @Input() public task?: Task;
  @Output() public valueChange: EventEmitter<Column | Task> = new EventEmitter<
    Column | Task
  >();
  @Output() public taskEdit: EventEmitter<Task> = new EventEmitter<Task>();
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
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(Number('3')),
    ]),
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
  }

  public ngOnInit(): void {
    this.title = this.isEditTask
      ? `board.boardModal.title.${this.task ? 'edit' : 'createTask'}`
      : 'board.boardModal.title.create';

    this.buttonText =
      this.isEditTask && this.task
        ? 'board.boardModal.buttons.save'
        : 'board.boardModal.buttons.create';

    if (this.task) {
      this.setFormGroupValue();
    }
  }

  public apiTrigger(): void {
    if (this.isEditTask && this.task && this.formGroup.valid) {
      this.editTask();
    } else if (this.isEditTask && this.formGroup.valid) {
      this.createTask();
    } else if (this.formGroup.get('title')?.valid) {
      this.createColumn();
    }
  }

  public closeModal(): void {
    this.modalClose.emit(true);
  }

  private setFormGroupValue(): void {
    this.formGroup.setValue({
      title: this.task?.title || '',
      description: this.task?.description || '',
    });
  }

  private editTask(): void {
    if (this.board && this.column && this.task) {
      this.apiService
        .updateTask(this.board.id, this.column.id, this.task.id, {
          order: this.task.order,
          title: this.formValue.title,
          description: this.formValue.description || ' ',
          userId: this.task.userId,
          columnId: this.column.id,
          boardId: this.board.id,
        })
        .subscribe((data: Task) => {
          this.taskEdit.emit(data);
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
              order: this.getColumnTaskOrder(),
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

  private getColumnTaskOrder(order: number = 0): number {
    if (this.board && this.column) {
      order += 1;
      return this.column.tasks?.find((value: Column) => value.order === order)
        ? this.getColumnTaskOrder(order)
        : order;
    }
    return 1;
  }
}

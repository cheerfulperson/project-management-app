import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import {
  GetAllBoardsResponseModel,
  UpdateBoardResponseModel,
} from 'src/app/project-management-app/models/board.model';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements AfterViewInit {
  @Input() public board: GetAllBoardsResponseModel = { id: '', title: '' };

  @Output() public delete: EventEmitter<string> = new EventEmitter();

  @ViewChild('boardWrap', { read: ElementRef })
  public boardBg?: ElementRef<HTMLDivElement>;

  public isConfModalActive: boolean = false;

  public isUpdateBoardFormActive: boolean = false;

  public isChangeBgActive: boolean = false;

  public updateBoardForm: FormGroup = new FormGroup({
    newBoardTitleInput: new FormControl('', Validators.required),
  });

  public currBgNum: number = 0;

  public constructor(
    private apiService: ApiService,
    private renderer: Renderer2
  ) {}

  public ngAfterViewInit(): void {
    const config: string | null = localStorage.getItem('boardBgConfig');
    if (config) {
      const item: { boardId: string; bgNum: number } = JSON.parse(
        config
      ).filter(
        (el: { boardId: string; bgNum: number }) => el.boardId === this.board.id
      )[0];
      this.currBgNum = item ? item.bgNum : 0;
    }
    this.setBoardBg();
  }

  public updateBoard(): void {
    if (this.updateBoardForm.valid) {
      const newTitle: string =
        this.updateBoardForm.controls['newBoardTitleInput'].value;

      this.apiService
        .updateBoard(newTitle, this.board.id)
        .subscribe((res: UpdateBoardResponseModel) => {
          this.board.title = res.title;
          this.toggleUpdateBoardForm();
        });
    }
  }

  public toggleUpdateBoardForm(): void {
    this.isUpdateBoardFormActive = !this.isUpdateBoardFormActive;
  }

  public toggleConfModal(): void {
    this.isConfModalActive = !this.isConfModalActive;
  }

  public toggleChangeBg(): void {
    this.isChangeBgActive = !this.isChangeBgActive;
  }

  public deleteBoard(userChoise: boolean): void {
    if (!userChoise) {
      this.toggleConfModal();
      return;
    }
    this.apiService.deleteBoard(this.board.id);
    this.delete.emit(this.board.id);
    this.changeBoardBg(0);
    this.toggleConfModal();
  }

  public setBoardBg(): void {
    this.renderer.setStyle(
      this.boardBg?.nativeElement,
      'background-image',
      `${
        this.currBgNum
          ? `url(../../../../../assets/images/boardsBg-medium/${this.currBgNum}.jpg)`
          : 'none'
      }`
    );
  }

  public changeBoardBg(bgNum: number): void {
    const boardsBgConfig: string | null = localStorage.getItem('boardBgConfig');

    if (boardsBgConfig) {
      this.updateConfig(boardsBgConfig, bgNum);
    } else {
      this.createConfig(bgNum);
    }
  }

  private updateConfig(boardsBgConfig: string, bgNum: number): void {
    const config: Array<{ boardId: string; bgNum: number }> = JSON.parse(
      boardsBgConfig
    ).filter(
      (el: { boardId: string; bgNum: number }) => el.boardId !== this.board.id
    );
    if (bgNum) {
      config.push({ boardId: this.board.id, bgNum });
    }
    localStorage.setItem('boardBgConfig', JSON.stringify(config));

    this.currBgNum = bgNum;
    this.setBoardBg();
    this.toggleChangeBg();
  }

  private createConfig(bgNum: number): void {
    const config: [{ boardId: string; bgNum: number }] = [
      { boardId: this.board.id, bgNum },
    ];
    if (bgNum) {
      localStorage.setItem('boardBgConfig', JSON.stringify(config));
      this.currBgNum = bgNum;
      this.setBoardBg();
    }
    this.toggleChangeBg();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board?: Board;

  public constructor(private routeInfo: ActivatedRoute) {}

  public ngOnInit(): void {
    this.routeInfo.params.subscribe((params: Params) => {
      this.getBoardInfo(params['id']);
    });
    this.board = {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
      title: 'Homework tasks',
      columns: [
        {
          id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
          title: 'Done',
          order: 1,
          tasks: [
            {
              id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
              title: 'Task: pet the cat',
              order: 1,
              description: 'Domestic cat needs to be stroked gently',
              userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
              boardId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
              columnId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
            },
          ],
        },
      ],
    };
  }

  private getBoardInfo(id: string): void {
    console.log(id);
  }
}

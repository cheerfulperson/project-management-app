import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  Developer,
  selectedDevelopers,
} from 'src/app/project-management-app/models/developers.model';

@Component({
  selector: 'app-section-team',
  templateUrl: './section-team.component.html',
  styleUrls: ['./section-team.component.scss'],
})
export class SectionTeamComponent implements AfterViewInit {
  @Output() public changeInfo: EventEmitter<HTMLElement> =
    new EventEmitter<HTMLElement>();

  public developers: Developer[] = selectedDevelopers;

  public constructor(private host: ElementRef<HTMLElement>) {}

  public ngAfterViewInit(): void {
    this.changeInfo.emit(this.host.nativeElement);
  }
}

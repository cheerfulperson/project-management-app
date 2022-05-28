import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-section-info',
  templateUrl: './section-info.component.html',
  styleUrls: ['./section-info.component.scss'],
})
export class SectionInfoComponent implements AfterViewInit {
  @Output() public changeInfo: EventEmitter<HTMLElement> =
    new EventEmitter<HTMLElement>();

  public constructor(private host: ElementRef<HTMLElement>) {}

  public ngAfterViewInit(): void {
    this.changeInfo.emit(this.host.nativeElement);
  }
}

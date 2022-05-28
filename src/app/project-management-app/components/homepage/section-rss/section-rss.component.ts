import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-section-rss',
  templateUrl: './section-rss.component.html',
  styleUrls: ['./section-rss.component.scss'],
})
export class SectionRssComponent implements AfterViewInit {
  @Output() public changeInfo: EventEmitter<HTMLElement> =
    new EventEmitter<HTMLElement>();

  public rssBenefits: string[] = ['free', 'peaple', 'sertificate', 'period'];
  public constructor(private host: ElementRef<HTMLElement>) {}

  public ngAfterViewInit(): void {
    this.changeInfo.emit(this.host.nativeElement);
  }
}

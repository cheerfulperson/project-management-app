import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-section-benefits',
  templateUrl: './section-benefits.component.html',
  styleUrls: ['./section-benefits.component.scss'],
})
export class SectionBenefitsComponent implements AfterViewInit {
  @Output() public changeInfo: EventEmitter<HTMLElement> =
    new EventEmitter<HTMLElement>();

  public benefits: string[] = Array.from<undefined, string>(
    { length: 7 },
    (el: undefined, i: number) => `homePage.benefits.aboutItems.${i + 1}`
  );

  public constructor(private host: ElementRef<HTMLElement>) {}

  public ngAfterViewInit(): void {
    this.changeInfo.emit(this.host.nativeElement);
  }
}

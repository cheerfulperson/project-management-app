import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-nav',
  templateUrl: './section-nav.component.html',
  styleUrls: ['./section-nav.component.scss'],
})
export class SectionNavComponent {
  @Input() public about?: HTMLElement;
  @Input() public benefits?: HTMLElement;
  @Input() public rss?: HTMLElement;
  @Input() public team?: HTMLElement;

  public scrollTo(elem?: HTMLElement): void {
    if (!elem) return;
    const headerHeight: number =
      document.querySelector('header')?.clientHeight || 0;
    window.scrollTo(0, elem.offsetTop - headerHeight);
  }
}

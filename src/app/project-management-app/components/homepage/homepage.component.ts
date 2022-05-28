import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
  public about?: HTMLElement;
  public benefits?: HTMLElement;
  public rss?: HTMLElement;
  public team?: HTMLElement;
}

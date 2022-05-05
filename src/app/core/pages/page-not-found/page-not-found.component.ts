import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  @ViewChild('pageNotFound', { read: ElementRef }) public header?: ElementRef;

  public defaultLanguage: string = 'en';

  public constructor(private translator: TranslateService) {
    this.defaultLanguage = this.translator.getBrowserLang() || 'en';
  }
}

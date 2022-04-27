import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('header', { read: ElementRef }) public header?: ElementRef;

  public defaultLanguage: string = 'en';

  public constructor(private translator: TranslateService) {
    this.defaultLanguage = this.translator.getBrowserLang() || 'en';
  }

  @HostListener('window:scroll', ['$event']) public setSticky(): void {
    if (window.scrollY <= Number('50')) {
      (this.header?.nativeElement as HTMLElement).style.height = '65px';
    }
    if (window.scrollY > Number('65')) {
      (this.header?.nativeElement as HTMLElement).style.height = '50px';
    }
  }

  public setLenguage(e: MatSelectChange): void {
    this.translator.use(e.value);
  }
}

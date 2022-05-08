import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('expandedPanel', [
      state('initial', style({ width: 0 })),
      state('expanded', style({ width: '300px' })),
      transition('initial <=> expanded', animate('0.2s')),
    ]),
  ],
})
export class HeaderComponent {
  @ViewChild('header', { read: ElementRef }) public header?: ElementRef;

  public defaultLanguage: string = 'en';
  public isExpanded: boolean = false;
  public state: string = 'initial';

  public constructor(private translator: TranslateService) {
    this.defaultLanguage = this.translator.getBrowserLang() || 'en';
  }

  @HostListener('window:scroll', ['$event']) public setSticky(): void {
    if (window.scrollY === 0) {
      (this.header?.nativeElement as HTMLElement).style.height = '65px';
    }
    if (window.scrollY > 0) {
      (this.header?.nativeElement as HTMLElement).style.height = '50px';
    }
  }

  @HostListener('window:click', ['$event']) public setPanelVisability(
    e: Event
  ): void {
    if (!this.isExpanded) return;

    const elem: HTMLElement = <HTMLElement>e.target;

    if (
      !elem.classList.contains('header__panel') &&
      !elem.closest('.mat-option') &&
      !elem.closest('.header__menu-icon') &&
      !elem.closest('.header__lang-selection')
    ) {
      this.openPanel();
    }
  }

  public setLenguage(e: MatSelectChange): void {
    this.translator.use(e.value);
  }

  public openPanel(): void {
    this.isExpanded = !this.isExpanded;
    this.state = this.isExpanded ? 'expanded' : 'initial';
  }
}

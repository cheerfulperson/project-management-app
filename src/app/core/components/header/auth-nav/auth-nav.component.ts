import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss'],
})
export class AuthNavComponent implements AfterViewInit {
  @ViewChild('name', { read: ElementRef })
  public name?: ElementRef<HTMLElement>;

  public isAuthorized: boolean = false;

  public ngAfterViewInit(): void {
    this.checkName();
  }

  private checkName(): void {
    if (!this.name) return;
    const name: string | null = this.name.nativeElement.textContent;
    const maxlength: number = 6;

    if (name && name.length > maxlength) {
      this.name.nativeElement.textContent = `${name.slice(0, maxlength)}...`;
    }
  }
}

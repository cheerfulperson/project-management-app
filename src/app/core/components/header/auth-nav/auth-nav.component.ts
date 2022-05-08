import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteUserSession } from 'src/app/ngrx/actions/session.actions';
import { selectIsUserAuthorized } from 'src/app/ngrx/selectors/session.selectors';
import { IAppState } from 'src/app/ngrx/states/app.state';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss'],
})
export class AuthNavComponent implements AfterViewInit {
  @ViewChild('name', { read: ElementRef })
  public name?: ElementRef<HTMLElement>;

  public isAuthorized: boolean = false;

  public constructor(private store: Store) {
    (this.store as Store<IAppState>)
      .select(selectIsUserAuthorized)
      .subscribe((data: boolean) => {
        this.isAuthorized = data;
      });
  }

  public ngAfterViewInit(): void {
    this.checkName();
  }

  public logout(): void {
    const action: DeleteUserSession = new DeleteUserSession();
    this.store.dispatch(action);
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

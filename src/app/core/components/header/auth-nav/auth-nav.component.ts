import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DeleteUserSession } from 'src/app/ngrx/actions/session.actions';
import { selectSession } from 'src/app/ngrx/selectors/session.selectors';
import { IAppState } from 'src/app/ngrx/states/app.state';
import { UserSessionData } from 'src/app/shared/models/user-session.model';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.scss'],
})
export class AuthNavComponent implements AfterViewInit {
  @ViewChild('name', { read: ElementRef })
  public name?: ElementRef<HTMLElement>;

  public isAuthorized: boolean = false;
  public userName: string = '';

  public constructor(private store: Store, private router: Router) {
    (this.store as Store<IAppState>)
      .select(selectSession)
      .subscribe((data: UserSessionData | null) => {
        this.isAuthorized = Boolean(data);
        this.userName = data?.name || '';
      });
  }

  public ngAfterViewInit(): void {
    this.checkName();
  }

  public logout(): void {
    const action: DeleteUserSession = new DeleteUserSession();
    this.store.dispatch(action);
    this.router.navigateByUrl('/');
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

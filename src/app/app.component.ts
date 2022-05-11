import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LoadUserSession } from './ngrx/actions/session.actions';
import { selectIsUserAuthorized } from './ngrx/selectors/session.selectors';
import { IAppState } from './ngrx/states/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(
    public translate: TranslateService,
    public store: Store,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const action: LoadUserSession = new LoadUserSession();
    this.setLenguage();

    this.store.dispatch(action);

    (this.store as Store<IAppState>)
      .select(selectIsUserAuthorized)
      .subscribe((session: boolean) => {
        if (session) {
          this.router.navigateByUrl('/boards');
        }
      });
  }

  private setLenguage(): void {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');

    const browserLang: string | undefined = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|ru/) ? browserLang : 'ru');
  }
}

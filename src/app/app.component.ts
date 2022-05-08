import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  AddUserSession,
  DeleteUserSession,
  GetUserSession,
  LoadUserSession,
} from './ngrx/actions/session.actions';
import { selectSession } from './ngrx/selectors/session.selectors';
import { IAppState } from './ngrx/states/app.state';
import { UserSessionData } from './shared/models/user-session.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(public translate: TranslateService, public store: Store) {}

  public ngOnInit(): void {
    this.setLenguage();

    this.store.dispatch(new LoadUserSession());
  }

  private setLenguage(): void {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');

    const browserLang: string | undefined = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|ru/) ? browserLang : 'ru');
  }
}

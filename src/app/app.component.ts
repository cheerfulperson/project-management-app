import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LoadUserSession } from './ngrx/actions/session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(public translate: TranslateService, public store: Store) {}

  public ngOnInit(): void {
    const action: LoadUserSession = new LoadUserSession();
    this.setLenguage();

    this.store.dispatch(action);
  }

  private setLenguage(): void {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');

    const browserLang: string | undefined = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|ru/) ? browserLang : 'ru');
  }
}

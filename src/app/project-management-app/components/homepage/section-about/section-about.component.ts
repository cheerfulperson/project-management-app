import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsUserAuthorized } from 'src/app/ngrx/selectors/session.selectors';
import { IAppState } from 'src/app/ngrx/states/app.state';

@Component({
  selector: 'app-section-about',
  templateUrl: './section-about.component.html',
  styleUrls: ['./section-about.component.scss'],
})
export class SectionAboutComponent implements OnInit {
  public routerLink: string = '';
  public constructor(private store: Store) {}

  public ngOnInit(): void {
    (this.store as Store<IAppState>)
      .select(selectIsUserAuthorized)
      .subscribe((isAuth: boolean) => {
        this.routerLink = isAuth ? '/boards' : '/auth/login';
      });
  }
}

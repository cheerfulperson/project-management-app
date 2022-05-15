import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsUserAuthorized } from 'src/app/ngrx/selectors/session.selectors';
import { IAppState } from 'src/app/ngrx/states/app.state';
import { Developer, selectedDevelopers } from '../../models/developers.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  public routerLink: string = '';
  public benefits: string[] = Array.from<undefined, string>(
    { length: 7 },
    (el: undefined, i: number) => `homePage.benefits.aboutItems.${i + 1}`
  );
  public rssBenefits: string[] = ['free', 'peaple', 'sertificate', 'period'];
  public developers: Developer[] = selectedDevelopers;

  public constructor(private store: Store) {}

  public ngOnInit(): void {
    (this.store as Store<IAppState>)
      .select(selectIsUserAuthorized)
      .subscribe((isAuth: boolean) => {
        this.routerLink = isAuth ? '/boards' : '/auth/login';
      });
  }

  public scrollTo(elem: HTMLElement): void {
    const headerHeight: number =
      document.querySelector('header')?.clientHeight || 0;
    window.scrollTo(0, elem.offsetTop - headerHeight);
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Timer } from 'src/app/constants';
import { SessionService } from 'src/app/core/services/session.service';
import { selectIsUserAuthorized } from 'src/app/ngrx/selectors/session.selectors';
import { IAppState } from 'src/app/ngrx/states/app.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public isFocused: boolean = false;

  public isSearchModal: boolean = false;

  public isAuthorized: Observable<boolean> = (
    this.store as Store<IAppState>
  ).select(selectIsUserAuthorized);

  public constructor(private store: Store, private session: SessionService) {}

  public search(searchTerm: string): void {
    this.session.searchTerm$?.next(searchTerm);
  }

  public searchFocused(input?: HTMLInputElement | undefined): void {
    if (input) {
      input.value = '';
    }
    this.isFocused = !this.isFocused;
    this.isSearchModal = !this.isSearchModal;
  }

  public searchUnfocused(): void {
    this.isFocused = false;
    setTimeout(() => {
      this.isSearchModal = false;
    }, Timer.CloseSearchModal);
  }

  public closeSearchModal(): void {
    this.isFocused = false;
    this.isSearchModal = false;
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { UserSessionData } from 'src/app/shared/models/user-session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public searchTerm$: Subject<string> = new Subject<string>();

  public constructor(private router: Router) {}

  public getUserSessionData(): Observable<UserSessionData | null> {
    const data: string | null = localStorage.getItem('session');
    return of(data ? JSON.parse(data) : null);
  }

  public addDataToStore(data: UserSessionData): void {
    localStorage.setItem('session', JSON.stringify(data));
    setTimeout(() => {
      this.router.navigateByUrl('boards');
    });
  }

  public deleteDataFromStore(): void {
    localStorage.removeItem('session');
  }
}

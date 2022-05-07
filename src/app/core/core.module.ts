import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthNavComponent } from './components/header/auth-nav/auth-nav.component';
import { SharedModule } from '../shared/shared.module';
import { NavListComponent } from './components/header/nav-list/nav-list.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../ngrx/reducers/app.reducers';
import { SessionService } from './services/session.service';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from '../ngrx/effects/session.effects';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthNavComponent,
    NavListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([SessionEffects]),
  ],
  exports: [TranslateModule, HeaderComponent, FooterComponent, SharedModule],
  providers: [SessionService],
})
export class CoreModule {}

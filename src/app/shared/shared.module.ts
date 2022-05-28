import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [LogoComponent, ConfirmationModalComponent, SpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    TranslateModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    FormsModule,
    LogoComponent,
    ConfirmationModalComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatSlideToggleModule,
    MatSelectModule,
    TranslateModule,
    MatTooltipModule,
  ],
})
export class SharedModule {}

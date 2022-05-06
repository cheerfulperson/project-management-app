import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  @Input() public deleteTypeName: string = '';

  @Output() public userChoice: EventEmitter<boolean> = new EventEmitter();

  public cancel(): void {
    this.userChoice.emit(false);
  }

  public remove(): void {
    this.userChoice.emit(true);
  }
}

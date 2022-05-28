import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  @Output() public userChoice: EventEmitter<boolean> = new EventEmitter();
  public name: string = '';

  @Input() public set deleteTypeName(value: string) {
    const maxlength: number = 12;
    this.name = value;
    if (value.length > maxlength) {
      this.name = value
        .slice(0, maxlength)
        .padEnd(maxlength + Number('3'), '.');
    }
  }
  public cancel(): void {
    this.userChoice.emit(false);
  }

  public remove(): void {
    this.userChoice.emit(true);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public githubs: Array<{ [key: string]: string }> = [
    { link: 'https://github.com/Serhii1108', name: 'Sergey' },
    { link: 'https://github.com/VVK1978', name: 'Victor' },
    { link: 'https://github.com/cheerfulperson', name: 'Egor' },
  ];
}

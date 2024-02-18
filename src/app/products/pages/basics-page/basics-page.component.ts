import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {

  public nameLower: string = 'facundo';
  public nameUpper: string = 'FACUNDO';
  public fullName: string = 'fAcUnDo';

  public customDate: Date = new Date();

}

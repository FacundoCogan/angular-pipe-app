import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  // i18n Select
  public name: string = 'Facundo';
  public gender: 'male' | 'female' = 'male';
  public invitationMap = {
    'male': 'invitarlo',
    'female': 'invitarla'
  }

  changeClient(): void {
    this.name = 'Natalia';
    this.gender = 'female';
  }

  // i18nPlural
  public clients: string[] = ['Facundo', 'Pedro', 'Fernando', 'Eduardo', 'Natalia', 'Ignacio', 'Santiago'];
  public clientsMap = {
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    'other': 'tenemos # clientes esperando.'
  }


  deleteClient(): void {
    this.clients.shift();
  }

  // KeyValue Pipe
  public person = {
    name: 'Facundo',
    age: 22,
    address: 'Buenos Aires, Argentina'
  }

  // Async Pipe
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap( value => console.log('tap:', value) ),
  );

  public promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa.');
    }, 3500);
  })
}

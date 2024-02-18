import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'sortBy'
})

export class SortByPipe implements PipeTransform {
  transform( heroes: Hero[], sortBy?: keyof Hero | '' ): Hero[] {

    switch( sortBy ) {

      case 'name':
        return heroes.sort( ( a, b ) => ( a.name > b.name ) ? 1 : -1 ); // lo ordena por nombre

      case 'canFly':
        return heroes.sort( ( a, b ) => ( a.canFly > b.canFly ) ? 1 : -1 ); // lo ordena por canFly

      case 'color':
        return heroes.sort( ( a, b ) => ( a.color > b.color ) ? 1 : -1 ); // lo ordena por color

      default:
        return heroes;
    }

  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText || searchText.length == 0) return items;

    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText) || it.lastname.toLowerCase().includes(searchText) || it.email.toLowerCase().includes(searchText) || (it.name + ' ' + it.lastname).toLowerCase().includes(searchText);
    })
  }

}

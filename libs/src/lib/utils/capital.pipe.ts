import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'capitalPipe',
})
export class CapitalPipe implements PipeTransform {
  transform(value: string): string {
    const words = value.split(" ");
    
    return words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
    
  }
}
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient) { }
  // http = inject(HttpClient);

  getPokemon(pokemon:string): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/'+ pokemon);
  }
}

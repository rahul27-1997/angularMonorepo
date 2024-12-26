import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';
import {CapitalPipe } from 'libs/src/lib/utils/capital.pipe'

@Component({
  selector: 'app-app2-home',
  imports: [CommonModule,FontAwesomeModule,FormsModule,CapitalPipe],
  templateUrl: './app2-home.component.html',
  styleUrl: './app2-home.component.scss',
})
export class App2HomeComponent {
  faSearch = faSearch;
  pokemonName :string = '';
  abilitiesArray: string[] = [];
  pokemonData:any = {};
  height!: number;
  weight!: number;
  imageUrl!: string;

  constructor(private pokemonService : PokemonService){}

  searchPokemon(){
    this.pokemonService.getPokemon(this.pokemonName).subscribe(data=>{
      this.pokemonData = data;
      if(this.pokemonData.abilities){
        this.abilitiesArray = this.pokemonData.abilities.map((el:any)=> el.ability.name);
        this.height = this.pokemonData.height;
        this.weight = this.pokemonData.weight;
        this.imageUrl = this.pokemonData.sprites.front_default;
      }else{
        this.pokemonData = {};
        this.abilitiesArray = [];
        this.height = 0;
        this.weight = 0;
        this.imageUrl = '';
      }
    },
  error=>{
    this.pokemonData = {};
    this.abilitiesArray = [];
  });
  }
}

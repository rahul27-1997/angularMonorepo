import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App2HomeComponent } from './app2-home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PokemonService } from '../services/pokemon.service';
import { of } from 'rxjs';
import exp = require('constants');

describe('App2HomeComponent', () => {
  let component: App2HomeComponent;
  let fixture: ComponentFixture<App2HomeComponent>;
  let mockPokemonService: any;

  beforeEach(async () => {
    mockPokemonService = {
      getPokemon: jest.fn()
    }

    await TestBed.configureTestingModule({
      imports: [App2HomeComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(),
        {provide: PokemonService,useValue: mockPokemonService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App2HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch pokemondata when searchpokemon is called',()=>{
    const mockData = {name:'pikachu',id:25};
    mockPokemonService.getPokemon.mockReturnValue(of(mockData));

    component.pokemonName = 'pikachu';
    component.searchPokemon();

    expect(mockPokemonService.getPokemon).toHaveBeenCalledWith('pikachu');
    // expect(component.pokemonData).toEqual(mockData);
  })

  it('should handle error when pokemonservice fails',()=>{

    mockPokemonService.getPokemon.mockReturnValue(of(new Error('Failed to fetch')));

    component.pokemonName = 'invalid';
    component.searchPokemon();

    expect(mockPokemonService.getPokemon).toHaveBeenCalledWith('invalid');
    expect(component.pokemonData).toEqual({});
  })

  it('should assign empty data wehn response is unsuccessfull',()=>{

    const mockData = {abilities: undefined,height:10}
    mockPokemonService.getPokemon.mockReturnValue(of(mockData));

    component.searchPokemon();

    expect(component.pokemonData.height).toBeUndefined()
  })

  it('should assign data wehn response is successfull',done =>{

    const mockData = {abilities: ['ability1','ability2'],height:10}
    mockPokemonService.getPokemon.mockReturnValue(of(mockData));

    component.searchPokemon();

    expect(component.pokemonData.height).toBe(10);
    done();
  })
});

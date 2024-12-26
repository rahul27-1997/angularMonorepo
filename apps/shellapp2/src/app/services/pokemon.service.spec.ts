import { of } from "rxjs";
import exp = require("constants");
import { PokemonService } from "./pokemon.service";


describe(('PokemonService'),()=>{
    let service : PokemonService;
    let httpClientSpy: any;

    beforeEach(()=>{
        httpClientSpy = {
            get: jest.fn()
        }
     service = new PokemonService(httpClientSpy)
    })



    it(('should be created'),()=>{
        expect(service).toBeTruthy();
    })

    it('should test getPokemon',()=>{
        const res = 'test';
        const url = 'https://pokeapi.co/api/v2/pokemon/';
        jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
        service.getPokemon('snorlax');
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url+'snorlax');
    })

});
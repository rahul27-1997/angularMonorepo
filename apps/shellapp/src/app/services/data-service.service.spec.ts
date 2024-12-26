import { of } from "rxjs";
import { DataServiceService } from "./data-service.service";
import exp = require("constants");


describe(('DataServiceService'),()=>{
    let service : DataServiceService;
    let httpClientSpy: any;

    beforeEach(()=>{
        httpClientSpy = {
            get: jest.fn()
        }
     service = new DataServiceService(httpClientSpy)
    })



    it(('should be created'),()=>{
        expect(service).toBeTruthy();
    })

    it('should test getproducts',()=>{
        const res = 'test';
        const url = 'https://fakestoreapi.com/products';
        jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
        service.getProducts();
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    })

});
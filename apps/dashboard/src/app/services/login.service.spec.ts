import { of } from "rxjs";

import exp = require("constants");
import { LoginService } from "./login.service";


describe(('LoginService'),()=>{
    let service : LoginService;
    let httpClientSpy: any;

    beforeEach(()=>{
     service = new LoginService(httpClientSpy)
    })



    it(('should be created'),()=>{
        expect(service).toBeTruthy();
    })

    it('should test hasAccess Method',()=>{
      const isLoggedIn = false;
      service.hasAccess();
      expect(service.hasAccess()).toBe(isLoggedIn);
    })

});
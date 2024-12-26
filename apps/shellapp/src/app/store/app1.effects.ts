import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadProducts, loadProductsSuccess } from "./app1.actions";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";
import { DataServiceService } from "../services/data-service.service";

@Injectable()
export class App1Effects{

    constructor(private actions$:Actions,private dataService:DataServiceService) {}

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(loadProducts),
        exhaustMap(() => this.dataService.getProducts()
          .pipe(
            map(products => loadProductsSuccess({products})),
            catchError(() => EMPTY)
          ))
        )
      );

}
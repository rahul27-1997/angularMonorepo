import { createAction, props } from "@ngrx/store"


export const loadProducts = createAction('[products] load products');

export const loadProductsSuccess = createAction(
    '[products] load products success',
    props<{ products: any[] }>());

export const loadProductsFailure = createAction(
    '[products] load products failure',
    props<{ error: string }>());

export const addProduct = createAction('[products] Add product', props<{ product: any }>())

export const deleteProduct = createAction('[products] Delete product', props<{ id: number }>());
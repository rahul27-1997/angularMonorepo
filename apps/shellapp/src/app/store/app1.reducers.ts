import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app1.state";
import { addProduct, deleteProduct, loadProductsSuccess } from "./app1.actions";


export const initialState: AppState = {
        products:[],
        documents: []
}

export const App1Reducer = createReducer(
    initialState,
    on(loadProductsSuccess, (state:AppState,{products})=>{
        return {...state.products,products}
    }), 
   on(addProduct, (state:AppState,{product})=>{
    return { ...state, products: [...state.products, product] }
}), 
on(deleteProduct, (state:AppState,{id})=>{
    return { ...state, products: state.products.filter((t:any) => t.id !== id) }
})
)
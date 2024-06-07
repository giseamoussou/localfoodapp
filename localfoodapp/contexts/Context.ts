import { createContext } from "react";

export interface ILocalFoodAppContextData {
    isSignedIn: boolean,
    user: {
        id: any,
        fullname: string | undefined,
        email: string | undefined,
        phone: string | undefined,
    }
}

export const appContextDefaultValues: ILocalFoodAppContextData = {
    isSignedIn: false,
    user: {
        id: '',
        fullname: '',
        email: '',
        phone: '',
    }
}

export const LocalFoodAppContext = createContext({
    appContext: appContextDefaultValues,
    setAppContext: (state: ILocalFoodAppContextData) => { }
})



// Shopping Cart
export interface ICartContextData {
    cart: Array<{ id: any, name: string, price: number, quantity: number }>
}

export interface IComdContextData {
    comd: Array<{ id: any, name: string, price: number, quantity: number }>
}

export const cartContextDefaultValues: ICartContextData = {
    cart: []
}

export const ShoppingCartContext = createContext({
    cartContext: cartContextDefaultValues,
    setCartContext: (state: ICartContextData) => { }
})
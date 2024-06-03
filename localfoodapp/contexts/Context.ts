import { createContext } from "react";

export interface ILocalFoodAppContextData {
    isSignedIn: boolean
    
}

 export const appContextDefaultValues: ILocalFoodAppContextData = {
    isSignedIn: false
}

export const localFoodAppContext = createContext({
    appContext: appContextDefaultValues,
    setAppContext: (state:ILocalFoodAppContextData) => { }
})
import { createContext } from "react";

export interface ILocalFoodAppContextData {
    isSignedIn: boolean,
    user: {
        fullname: string | undefined,
        email: string | undefined,
        phone: string | undefined,
    }
    
}

 export const appContextDefaultValues: ILocalFoodAppContextData = {
    isSignedIn: false,
    user: {
        fullname: '',
        email: '',
        phone: '',
    }
}

export const localFoodAppContext = createContext({
    appContext: appContextDefaultValues,
    setAppContext: (state:ILocalFoodAppContextData) => { }
})
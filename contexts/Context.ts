import { createContext } from "react";

export interface ILocalFoodAppContextData {
    darkMode: boolean
    
}

const appContextDefaultValues: ILocalFoodAppContextData = {
    darkMode: false,
}

export const localFoodAppContext = createContext({
    appContext: appContextDefaultValues,
    setAppContext: () => { }
})
import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'

const drawerContext = createContext( {
    expectedBalance: 0,
    balance: 0,
    variance: 0,
    money: {
        Pennies: {
            count: 0,
            value: 0,
        },
        Nickles: {
            count: 0,
            value: 0,
        },
        Dimes: {
            count: 0,
            value: 0,
        },
        Quarters: {
            count: 0,
            value: 0,
        },
        Ones: {
            count: 0,
            value: 0,
        },
        Twos: {
            count: 0,
            value: 0,
        },
        Fives: {
            count: 0,
            value: 0,
        },
        Tens: {
            count: 0,
            value: 0,
        },
        Twenties: {
            count: 0,
            value: 0,
        },
        Fifties: {
            count: 0,
            value: 0,
        },
        Hundreds: {
            count: 0,
            value: 0,
        },
    },
} )

export const DrawerProvider = drawerContext.Provider
export const DrawerConsumer = drawerContext.Consumer

export const DrawerContext = ({ children }) => {
    <DrawerProvider value={}>
        { children }
    </DrawerProvider>
}
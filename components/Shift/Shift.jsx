import { useReducer } from 'react'
import styles from './Shift.module.css'
import moment from 'moment'

import { Breakdown, CornerData, Employees, PaidOut } from '..'


const initialEmployeeData = {
    name: '',
    cashSales: 0,
    ccTips: 0,
}

const initialDrawerCountData = {
    balance: 0,
    variance: 0,
    counts: {
        pennies: [ 0, 0.00 ],
        nickles: [ 0, 0.00 ],
        dimes: [ 0, 0.00 ],
        quarters: [ 0, 0.00 ],
        ones: [ 0, 0.00 ],
        twos: [ 0, 0.00 ],
        fives: [ 0, 0.00 ],
        tens: [ 0, 0.00 ],
        twenties: [ 0, 0.00 ],
        fifties: [ 0, 0.00 ],
        hundreds: [ 0, 0.00 ],
    }
}

const initialPaidOutsData = {
    total: 0.0,
    amounts: [ '' ]
}

const initialShiftData = {
    date: moment().format( 'dddd MMMM Do, YYYY' ),
    type: 'Open',

    employees: {
        totalCashSales: 0,
        totalTips: 0,
        employees: [
            { ...initialEmployeeData },
            { ...initialEmployeeData },
            { ...initialEmployeeData },
            { ...initialEmployeeData }
        ],
    },
    paidOuts: { ...initialPaidOutsData },
    cuts: [],
    startDrawerCount: { ...initialDrawerCountData },
    endDrawerCount: { ...initialDrawerCountData },

    totalCash: 0,   //? the sum of the starting balance and the total cash sales from all employees
    totalDeficit: 0,    //? the sum of all employees tips and all paid outs
    expectedEndingBalance: 0,   //? the result of total cash - total deficit
    endingBalance: 0,   //? the balance of the end of shift drawer count
    startingBalance: 0,    //? from user input, is also the expected balance of the start of shift drawer count
}

const cornerDataData = ( {
    date, type, startingBalance
} ) => ( {
    date, type, startingBalance
} )

const breakdownData = ( {
    totalCash,
    totalDeficit,
    expectedEndingBalance,
    endingBalance,
    startingBalance,
} ) => ( {
    totalCash,
    totalDeficit,
    expectedEndingBalance,
    endingBalance,
    startingBalance,
} )

function employeeData( { employees: { totalTips, totalCashSales, employees } } ) {
    return { totalTips, totalCashSales, employees }
}

const paidOutsData = ( {
    paidOuts: { total, amounts }
} ) => ( {
    total, amounts
} )

function initialState() {
    return { ...initialShiftData }
}

function reducer( state, action ) {
    switch ( action.type ) {
        case 'updateCornerData': {
            const newState = { ...state, ...action.data }
            return newState
        }

        case 'updatePaidOuts': {
            const newState = { ...state, paidOuts: { amounts: [ ...action.data.amounts ] } }

            const numberArray = newState.paidOuts.amounts
                .filter( amount => amount !== '' )
                .filter( amount => !isNaN( amount ) )
                .map( amount => parseFloat( amount ) )

            let newTotal = 0
            numberArray.forEach( amount => newTotal += amount )

            newState.paidOuts.total = parseFloat( newTotal ).toFixed( 2 )

            return newState
        }

        case 'updateEmployees': {
            const newState = { ...state }
            newState.employees.employees = [ ...action.data ]

            newState.employees.totalCashSales = parseFloat( newState.employees.employees
                .reduce( ( total, employee ) => total += parseFloat( employee.cashSales ), 0 )
            ).toFixed( 2 )

            newState.employees.totalTips = parseFloat( newState.employees.employees
                .reduce( ( total, employee ) => total += parseFloat( employee.ccTips ), 0 )
            ).toFixed( 2 )
            console.log( newState )
            return newState
        }

        default:
            return state;
    }
}



export default function Shift() {

    const [ state, dispatch ] = useReducer( reducer, initialState() )

    return (
        <div className={ styles.grid }>

            <div className={ styles.dataone } >
                <CornerData
                    { ...cornerDataData( state ) }
                    updateDataFn={ data => dispatch( { type: 'updateCornerData', data } ) }
                />
            </div>
            <div className={ styles.employees } >
                <Employees
                    { ...employeeData( state ) }
                    updateDataFn={ data => dispatch( { type: 'updateEmployees', data } ) }
                />
            </div>
            <div className={ styles.paidouts } >
                <PaidOut
                    { ...paidOutsData( state ) }
                    updateDataFn={ data => dispatch( { type: 'updatePaidOuts', data } ) }
                />
            </div>
            <div className={ styles.cuts } ></div>
            <div className={ styles.startdrawer } ></div>
            <div className={ styles.enddrawer } ></div>
            <div className={ styles.breakdown } >
                <Breakdown { ...breakdownData( state ) } />
            </div>
        </div>
    )
}
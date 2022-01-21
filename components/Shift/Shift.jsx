import { useReducer } from 'react'
import styles from './Shift.module.css'
import { _initialState } from '../../util'

import { Breakdown, CornerData, DrawerCount, Employees, PaidOut } from '..'

const endDrawerCountData = ( { endDrawerCount, expectedEndingBalance } ) => ( {
    ...endDrawerCount, expectedBalance: expectedEndingBalance
} )
const startDrawerCountData = ( { startDrawerCount, startingBalance } ) => ( {
    ...startDrawerCount, expectedBalance: startingBalance
} )

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


function reducer( state, action ) {
    console.log( action )
    switch ( action.type ) {
        case 'updateCornerData': {
            const newState = { ...state, ...action.data }
            return newState
        }

        case 'updatePaidOuts': {
            const newState = { ...state, paidOuts: { amounts: [ ...action.data.amounts ] } }

            const newTotal = _total( newState.paidOuts.amounts )
            newState.paidOuts.total = newTotal

            return newState
        }

        case 'updateEmployees': {
            const newState = { ...state }
            newState.employees.employees = [ ...action.data ]

            const cashSalesArray = newState.employees.employees.map( e => e.cashSales )
            const ccTipsArray = newState.employees.employees.map( e => e.ccTips )

            newState.employees.totalCashSales = _total( cashSalesArray )
            newState.employees.totalTips = _total( ccTipsArray )

            return newState
        }

        case 'updateDrawerCount': {
            const newState = { ...state }
            const { denomination, value } = action.data
            const whichone = action.start ? 'startDrawerCount' : 'endDrawerCount'

            const focus = newState[ whichone ].counts[ denomination ]

            focus[ 0 ] = value
            focus[ 1 ] = parseFloat( value * focus[ 2 ] ).toFixed( 2 )

            const sums = Object.keys( newState[ whichone ].counts )
                .map( key => newState[ whichone ].counts[ key ][ 1 ] )

            newState[ whichone ].balance = _total( sums )

            return newState
        }

        case 'updateStartDrawerCount': {
            const newState = { ...state }
            const { denomination, value } = action.data

            if ( isNaN(value) ) {
                return state
            }

            const focus = newState.startDrawerCount.counts[ denomination ]

            focus[ 0 ] = value
            focus[ 1 ] = parseFloat( value * focus[ 2 ] ).toFixed( 2 )

            const sums = Object.keys( newState.startDrawerCount.counts )
                .map( key => newState.startDrawerCount.counts[ key ][ 1 ] )

            newState.startDrawerCount.balance = _total( sums )

            return newState
        }

        default:
            return state;
    }
}

function _total( arrayOfValues ) {
    const numberArray = arrayOfValues
        .filter( value => value !== '' )
        .filter( value => !isNaN( value ) )
        .map( value => parseFloat( value ) )

    const total = parseFloat( numberArray
        .reduce( ( total, value ) => total += value, 0 ) ).toFixed( 2 )

    return total
}



export default function Shift() {

    const [ state, dispatch ] = useReducer( reducer, _initialState() )

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
            <div className={ styles.startdrawer } >
                <DrawerCount
                    { ...startDrawerCountData( state ) }
                    updateDataFn={ data => dispatch( { type: 'updateDrawerCount', start: true, data } ) }
                />
            </div>
            <div className={ styles.enddrawer } >
                <DrawerCount
                    { ...endDrawerCountData( state ) }
                    end={true}
                    updateDataFn={ data => dispatch( { type: 'updateDrawerCount', data } ) }
                />
            </div>
            <div className={ styles.breakdown } >
                <Breakdown { ...breakdownData( state ) } />
            </div>
        </div>
    )
}
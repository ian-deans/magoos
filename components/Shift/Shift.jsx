import { useReducer } from 'react'
import styles from './Shift.module.css'
import { _initialState, reducer } from '../../util'

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
    employees: { totalCashSales, totalTips },
    paidOuts: { total: totalPaidOuts }
} ) => ( {
    totalCash,
    totalDeficit,
    expectedEndingBalance,
    endingBalance,
    startingBalance,
    totalCashSales,
    totalTips,
    totalPaidOuts
} )

function employeeData( { employees: { totalTips, totalCashSales, employees } } ) {
    return { totalTips, totalCashSales, employees }
}

const paidOutsData = ( {
    paidOuts: { total, amounts }
} ) => ( {
    total, amounts
} )

const cx = (...classNames) => classNames.join(' ')


export default function Shift() {

    const [ state, dispatch ] = useReducer( reducer, _initialState() )

    return (
        <div className={ styles.grid }>

            <div className={ cx(styles.dataone, styles.area ) } >
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
                {/* <DrawerCount
                    { ...startDrawerCountData( state ) }
                    updateDataFn={ data => dispatch( { type: 'updateDrawerCount', start: true, data } ) }
                /> */}
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
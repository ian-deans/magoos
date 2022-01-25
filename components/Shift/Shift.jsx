import { useReducer } from 'react'
import styles from './Shift.module.css'
import { _initialState, reducer, cx, dataSelector, getState } from '../../util'

import { Breakdown, CornerData, DrawerCount, Employees, PaidOut } from '..'

export default function Shift() {

    const [ state, dispatch ] = useReducer( reducer, getState() )

    return (
        <div className={ styles.grid }>

            <div className={ cx(styles.dataone, styles.area ) } >
                <CornerData
                    { ...dataSelector.cornerData( state ) }
                    updateDataFn={ data => dispatch( { type: 'updateCornerData', data } ) }
                />
            </div>
            <div className={ styles.employees } >
                <Employees
                    { ...dataSelector.employees( state ) }
                    updateDataFn={ data => dispatch( { type: 'updateEmployees', data } ) }
                />
            </div>
            <div className={ styles.paidouts } >
                <PaidOut
                    { ...dataSelector.paidOuts( state ) }
                    updateDataFn={ data => dispatch( { type: 'updatePaidOuts', data } ) }
                />
            </div>
            <div className={ styles.cuts } ></div>
            <div className={ styles.startdrawer } >
                {/* <DrawerCount
                    { ...dataSelector.startDrawer( state ) }
                    updateDataFn={ data => dispatch( { type: 'updateDrawerCount', start: true, data } ) }
                /> */}
            </div>
            <div className={ styles.enddrawer } >
                <DrawerCount
                    { ...dataSelector.endDrawer( state ) }
                    end={true}
                    updateDataFn={ data => dispatch( { type: 'updateDrawerCount', data } ) }
                />
            </div>
            <div className={ styles.breakdown } >
                <Breakdown { ...dataSelector.breakdown( state ) } />
            </div>
        </div>
    )
}
import moment from 'moment'


const _initialEmployeeData = () => {
    return {
        name: '',
        cashSales: 0,
        ccTips: 0,
    }
}

const _initialDrawerCountData = () => {
    return {
        Pennies: [ 0, 0.00, .01 ],
        Nickles: [ 0, 0.00, .05 ],
        Dimes: [ 0, 0.00, .1 ],
        Quarters: [ 0, 0.00, .25 ],
        Ones: [ 0, 0.00, 1 ],
        Twos: [ 0, 0.00, 2 ],
        Fives: [ 0, 0.00, 5 ],
        Tens: [ 0, 0.00, 10 ],
        Twenties: [ 0, 0.00, 20 ],
        Fifties: [ 0, 0.00, 50 ],
        Hundreds: [ 0, 0.00, 100 ],
    }
}


export function _initialState() {

    return {
        date: moment().format( 'dddd MMMM Do, YYYY' ),
        type: 'Open',

        employees: {
            totalCashSales: 0,
            totalTips: 0,
            employees: [
                _initialEmployeeData(),
                _initialEmployeeData(),
                _initialEmployeeData(),
                _initialEmployeeData()
            ],
        },
        paidOuts: {
            total: 0.0,
            amounts: [ '', '', '', '' ]
        },
        cuts: [],
        startDrawerCount: {
            balance: 0,
            variance: 0,
            counts: _initialDrawerCountData()
        },
        endDrawerCount: {
            balance: 0,
            variance: 0,
            counts: _initialDrawerCountData()
        },

        totalCash: 0,   //? the sum of the starting balance and the total cash sales from all employees
        totalDeficit: 0,    //? the sum of all employees tips and all paid outs
        expectedEndingBalance: 0,   //? the result of total cash - total deficit
        endingBalance: 0,   //? the balance of the end of shift drawer count
        startingBalance: 0,    //? from user input, is also the expected balance of the start of shift drawer count
    }
}

export function reducer( state, action ) {
    console.log( action )
    switch ( action.type ) {
        case 'updateCornerData': {
            const newState = { ...state, ...action.data }
            newState.totalCash = _calcTotalCash( _getCashValues( newState ) )
            newState.expectedEndingBalance = _calcExpectedEndingBalance( _getExpectedEndingBalanceValues( newState ) )

            return newState
        }

        case 'updatePaidOuts': {
            const newState = { ...state, paidOuts: { amounts: [ ...action.data.amounts ] } }

            newState.paidOuts.total = _total( newState.paidOuts.amounts )
            newState.totalDeficit = _calcTotalDeficit( _getDeficitValues( newState ) )
            newState.expectedEndingBalance = _calcExpectedEndingBalance( _getExpectedEndingBalanceValues( newState ) )


            return newState
        }

        case 'updateEmployees': {
            const newState = _updateEmployeeData( { ...state }, action )
            _saveState( newState )
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

            if ( !action.start ) {
                newState.endingBalance = newState[ whichone ].balance
            }

            return newState
        }

        default:
            return state;
    }
}

function _updateEmployeeData( newState, action ) {
    newState.employees.employees = [ ...action.data ]

    const cashSalesArray = newState.employees.employees.map( e => e.cashSales )
    const ccTipsArray = newState.employees.employees.map( e => e.ccTips )

    newState.employees.totalCashSales = _total( cashSalesArray )
    newState.employees.totalTips = _total( ccTipsArray )

    newState.totalDeficit = _calcTotalDeficit( _getDeficitValues( newState ) )
    newState.totalCash = _calcTotalCash( _getCashValues( newState ) )
    newState.expectedEndingBalance = _calcExpectedEndingBalance( _getExpectedEndingBalanceValues( newState ) )

    return newState
}

function _getExpectedEndingBalanceValues( { totalCash, totalDeficit } ) {
    return { totalCash, totalDeficit }
}

function _calcExpectedEndingBalance( { totalCash, totalDeficit } ) {
    const newExpectedEndingBalance = parseFloat( totalCash ) - parseFloat( totalDeficit )
    return parseFloat( newExpectedEndingBalance ).toFixed( 2 )

}

function _getDeficitValues( { paidOuts: { total: totalPaidOuts }, employees: { totalTips } } ) {
    return { totalPaidOuts, totalTips }
}

function _calcTotalDeficit( { totalPaidOuts, totalTips } ) {
    const newDeficit = parseFloat( totalPaidOuts ) + parseFloat( totalTips )
    return parseFloat( newDeficit ).toFixed( 2 )
}

function _getCashValues( { startingBalance, employees: { totalCashSales } } ) {
    return { startingBalance, totalCashSales }
}

function _calcTotalCash( { totalCashSales, startingBalance } ) {
    const newTotalCash = parseFloat( totalCashSales ) + parseFloat( startingBalance )
    return parseFloat( newTotalCash ).toFixed( 2 )
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

export const cx = ( ...classNames ) => classNames.join( ' ' )


export const dataSelector = {
    startDrawer: function ( { startDrawerCount, startingBalance } ) {
        return { ...startDrawerCount, expectedBalance: startingBalance }
    },
    endDrawer: function ( { endDrawerCount, expectedEndingBalance } ) {
        return { ...endDrawerCount, expectedBalance: expectedEndingBalance }
    },
    cornerData: function ( { date, type, startingBalance } ) {
        return { date, type, startingBalance }
    },
    breakdown: function ( {
        totalCash,
        totalDeficit,
        expectedEndingBalance,
        endingBalance,
        startingBalance,
        employees: { totalCashSales, totalTips },
        paidOuts: { total: totalPaidOuts }
    } ) {
        return {
            totalCash,
            totalDeficit,
            expectedEndingBalance,
            endingBalance,
            startingBalance,
            totalCashSales,
            totalTips,
            totalPaidOuts
        }
    },
    employees: function ( { employees: { totalTips, totalCashSales, employees } } ) {
        return { totalTips, totalCashSales, employees }
    },
    paidOuts: function ( { paidOuts: { total, amounts } } ) {
        return { total, amounts }
    },
}

function _saveState( data ) {
    localStorage.setItem( 'checkout', JSON.stringify( data ) )
}

export function getState() {

    if ( typeof window === 'undefined' ) {
        return _initialState()
    } else {

        const state = localStorage.getItem( 'checkout' )

        if ( state ) {
            return JSON.parse( state )
        }

        return _initialState()

    }



}
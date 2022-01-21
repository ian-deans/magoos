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
        pennies: [ 0, 0.00, .01 ],
        nickles: [ 0, 0.00, .05 ],
        dimes: [ 0, 0.00, .1 ],
        quarters: [ 0, 0.00, .25 ],
        ones: [ 0, 0.00, 1 ],
        twos: [ 0, 0.00, 2 ],
        fives: [ 0, 0.00, 5 ],
        tens: [ 0, 0.00, 10 ],
        twenties: [ 0, 0.00, 20 ],
        fifties: [ 0, 0.00, 50 ],
        hundreds: [ 0, 0.00, 100 ],
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


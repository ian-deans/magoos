import mongoose from 'mongoose'
import moment from 'moment'


const employeeSchema = new mongoose.Schema( {
    name: { type: String, default: '' },
    cashSales: { type: Number, default: 0 },
    tips: { type: Number, default: 0 },
} )

const employeesSchema = new mongoose.Schema( {
    totalCashSales: { type: Number, default: 0 },
    totalTips: { type: Number, default: 0 },
    employees: {
        type: [ employeeSchema ], default: [
            employeeSchema,
            employeeSchema,
            employeeSchema,
            employeeSchema,
        ]
    }
} )

const paidOutsSchema = new mongoose.Schema( {
    total: { type: Number, default: 0 },
    amounts: {
        type: [ Number ],
        default: [ 0, 0, 0, 0 ]
    },
} )

const drawerCountSchema = new mongoose.Schema( {
    balance: { type: Number, default: 0 },
    counts: {
        Pennies: { type: [ Number ], default: [ 0, 0.00, .01 ] },
        Nickles: { type: [ Number ], default: [ 0, 0.00, .05 ] },
        Dimes: { type: [ Number ], default: [ 0, 0.00, .1 ] },
        Quarters: { type: [ Number ], default: [ 0, 0.00, .25 ] },
        Ones: { type: [ Number ], default: [ 0, 0.00, 1 ] },
        Twos: { type: [ Number ], default: [ 0, 0.00, 2 ] },
        Fives: { type: [ Number ], default: [ 0, 0.00, 5 ] },
        Tens: { type: [ Number ], default: [ 0, 0.00, 10 ] },
        Twenties: { type: [ Number ], default: [ 0, 0.00, 20 ] },
        Fifties: { type: [ Number ], default: [ 0, 0.00, 50 ] },
        Hundreds: { type: [ Number ], default: [ 0, 0.00, 100 ] },
    }
} )

const ShiftCheckoutSchema = new mongoose.Schema( {
    date: { type: String, default: moment().format( 'dddd MMMM Do, YYYY' ) },
    type: { type: String, default: 'open' },
    totalCash: { type: Number, default: 0 },
    totalDeficit: { type: Number, default: 0 },
    expectedEndingBalance: { type: Number, default: 0 },
    endingBalance: { type: Number, default: 0 },
    drawerVariance: { type: Number, default: 0 }, //* would rather do this than keep the variance in the drawer count
    startingBalance: { type: Number, default: 0 },
    employees: employeesSchema,
    paidOuts: paidOutsSchema,
    drawerCount: drawerCountSchema
} )

ShiftCheckoutSchema.index( { date: 1, type: 1 }, { unique: true } )

// module.exports = mongoose.models.ShiftCheckout || mongoose.model('ShiftCheckout', ShiftCheckoutSchema)
export default mongoose.models.ShiftCheckout
    || mongoose.model( 'ShiftCheckout', ShiftCheckoutSchema )
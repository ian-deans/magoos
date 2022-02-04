import mongoose from 'mongoose'

const ShiftCheckoutSchema = new mongoose.Schema( {
    date: String,
    type: String,
    totalCash: Number,
    totalDeficit: Number,
    expectedEndingBalance: Number,
    endingBalance: Number,
    drawerVariance: Number, //* would rather do this than keep the variance in the drawer count
    startingBalance: Number,
    employees: {
        totalCashSales: Number,
        totalTips: Number,
        employees: [
            {
                name: String,
                cashSales: Number,
                tips: Number,
            }
        ]
    },
    paidOuts: {
        total: Number,
        amounts: [ Number ],
    },
    drawerCount: {
        balance: Number,
        variance: Number, //* probably gonna remove this
        counts: {
            Pennies: [ Number ],
            Nickles: [ Number ],
            Dimes: [ Number ],
            Quarters: [ Number ],
            Ones: [ Number ],
            Twos: [ Number ],
            Fives: [ Number ],
            Tens: [ Number ],
            Twenties: [ Number ],
            Fifties: [ Number ],
            Hundreds: [ Number ],
        }
    }
} )

// module.exports = mongoose.models.ShiftCheckout || mongoose.model('ShiftCheckout', ShiftCheckoutSchema)
export default mongoose.models.ShiftCheckout
    || mongoose.model( 'ShiftCheckout', ShiftCheckoutSchema )
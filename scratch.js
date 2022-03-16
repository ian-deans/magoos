
//! this is for the IHSS stuff

// function calcValue( multiplier, amount ) {
//     // console.log(`${amount} is a number? `, parseInt(amount) )
//     const a = parseInt( amount )

//     if ( !a ) {
//         console.log(`not a number ${a}`)
//         return
//     }

//     console.log( `is a number ${a}`)

//     const val = multiplier * a

//     console.log( `product is ${val}`)


// }





const multipliers = {
    pennies: 0.01,
    nickles: 0.05,
    dimes: 0.1,
    quarters: 0.25,
    ones: 1,
    twos: 2,
    fives: 5,
    tens: 10,
    twenties: 20,
    fifties: 50,
    hundreds: 100,
}

function calcValue( denomination, amount ) {
    const a = parseInt( amount )

    if ( !a ) {
        return 0
    }

    const val = a * multipliers[ denomination ]
    return val
    // if ( amount !== '' ) {
    //     return parseFloat( parseInt( amount ) * multipliers[ denomination ] ).toFixed( 2 )
    // }
    // return 0
}


function calcTotalValue( values ) {
    const v = values
        .map( v => parseFloat( v ))
        .filter( v => v )
        .reduce( (t, v ) => {
            return t += v
        }, 0 )

    return v
}


const values = [ '.52', 13.45, 50.30, 10, 150, 220, '' ]

console.log( calcTotalValue( values ) )
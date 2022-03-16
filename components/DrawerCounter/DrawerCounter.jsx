import { useRef, useState, createContext, useContext } from 'react'
import { Input, Table, TableBody, TableFooter, TableRow, TableCell, Typography } from '@mui/material'



const initialState = {
    denominations: {
        pennies: { amount: '', value: 0.0 },
        nickles: { amount: '', value: 0.0 },
        dimes: { amount: '', value: 0.0 },
        quarters: { amount: '', value: 0.0 },
        ones: { amount: '', value: 0.0 },
        twos: { amount: '', value: 0.0 },
        fives: { amount: '', value: 0.0 },
        tens: { amount: '', value: 0.0 },
        twenties: { amount: '', value: 0.0 },
        fifties: { amount: '', value: 0.0 },
        hundreds: { amount: '', value: 0.0 },
    },
    total: 0.0,
}

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

function calcValue(multiplier, amount) {
    const a = parseInt(amount)

    if (!a) {
        return 0
    }

    const val = a * multiplier
    return val
}

function calcTotalValue( values ) {
    const v = values
        .map( v => parseFloat( v ))
        .filter( v => v )
        .reduce( (t, v ) => {
            return t += v
        }, 0 )

    return parseFloat(v).toFixed(2)
}


function DrawerCounter() {

    const refs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    const [state, setState] = useState(initialState)

    function updateAmount({ denomination, amount }) {
        const d = state.denominations[denomination]
        d.amount = amount

        setState( { ...state,
                    denominations: {
                        ...state.denominations,
                        ...d,
                    }
            } )

        updateValues( state )
        updateTotalValue( state )
    }

    function updateTotalValue(state) {
        const values = _denominationValues( state )
        const total = calcTotalValue( values )

        setState({ ...state, total })
    }

    function _denominationValues({ denominations }) {
        return Object.keys( denominations )
            .map( d => denominations[d].value )
    }

    function updateValues({ denominations }) {
        const keys = Object.keys( denominations )

        keys.map( d => {
            const {amount} = state.denominations[d]
            const multiplier = multipliers[d]

            state.denominations[d].value = calcValue( multiplier, amount )
        })

        setState({
            ...state
        })
    }

    function handleChange(event) {
        const { name, value } = event.target
        console.log(name)
        console.log(value)

        updateAmount({ denomination: name, amount: value })

    }

    
    function handleEnter( key, i ) {
        if ( key.toLowerCase() === 'enter' ) {
            if ( i < refs.length - 1 ) {
                refs[ i + 1 ].current.focus()
            }
        }
    }

    function renderRows({ denominations }) {
        if (!denominations) {
            return
        }

        return Object.keys(denominations)
            .map((d, i) => {
                return <AmountRow
                    key={d}
                    denomination={d}
                    amount={denominations[d].amount}
                    value={denominations[d].value}
                    inputRef={refs[i]}
                    handleChange={handleChange}
                    handleEnter={({key}) => handleEnter( key, i) }
                />
            })
    }

    return (
        <>
            <button onClick={() => console.log(state)}>LOG</button>

            {/* <DrawerCount updateAmount={ updateAmount } denominations={ state.denominations } /> */}
            <Table>
                <TableBody>
                    {renderRows(state)}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h3">
                                { state.total }
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}


function AmountRow({ denomination, amount, value, handleChange, handleEnter, inputRef }) {

    return (
        <TableRow key={denomination}>

            <TableCell>
                <Typography>
                    {denomination}
                </Typography>
            </TableCell>
            <TableCell>
                <AmountInput
                    denomination={denomination}
                    amount={amount}
                    inputRef={inputRef}
                    handleChange={handleChange}
                    handleEnter={handleEnter}
                />

            </TableCell>
            <TableCell>
                <Typography>
                    ${value}
                </Typography>

            </TableCell>
        </TableRow>
    )
}




function AmountInput({ denomination, amount, inputRef, handleChange, handleEnter }) {
    return <Input
        name={denomination}
        variant="outlined"
        type="number"
        step="1"
        min="0"

        inputRef={inputRef}
        value={amount}

        onChange={handleChange}
        onKeyUp={handleEnter}

    />
}



export default DrawerCounter
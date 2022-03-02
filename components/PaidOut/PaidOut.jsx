import { useRef } from 'react'
import { Card, Input, InputAdornment } from "@mui/material"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import styles from './PaidOut.module.css'

export default function PaidOut( { total, amounts, updateDataFn } ) {

    function handleChange( value, index ) {
        let newAmounts = [ ...amounts ]
        newAmounts[ index ] = value

        updateDataFn( { amounts: newAmounts } )
    }

    function handleClick() {
        let newAmounts = [ ...amounts ]
        newAmounts.push( "" )
        updateDataFn( { amounts: newAmounts } )
    }

    const refs = []

    function handleEnter(e, i) {
        if (e.key.toLowerCase() === 'enter' ) {
            if ( i < 3 ) {
                refs[i+1].current.focus()
            }
        }
    }

    return (
        <Card variant="outlined">
            <span>Paid Outs</span>
            <div className={ styles.inputContainer }>

                { amounts.map( ( amount, i ) => {
                    refs[i] = useRef(null)
                    return (
                    <div key={ i }>
                        <Input
                            className={ styles.inputStyle }
                            type="number"
                            step="0.01"
                            min="0"
                            value={ amount }
                            onChange={ ( { target: { value } } ) => handleChange( value, i ) }
                            inputRef={refs[i]}
                            onKeyUp={ e => handleEnter(e, i )}
                            startAdornment={
                                <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            }
                        />
                    </div>
                ) } ) }
            </div>
        </Card>
    )
}


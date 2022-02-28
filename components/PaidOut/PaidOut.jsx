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
    }s

    return (
        <Card variant="outlined">
            <span>Paid Outs</span>
            <div className={ styles.inputContainer }>

                { amounts.map( ( amount, i ) => (
                    <div key={ i }>
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            onChange={ ( { target: { value } } ) => handleChange( value, i ) }
                            value={ amount }
                            className={ styles.inputStyle }
                            startAdornment={
                                <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            }
                        />
                    </div>
                ) ) }
            </div>

            <div>
                <span>
                    Total: { total }
                </span>
            </div>
        </Card>
    )
}


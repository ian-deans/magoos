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

    //! I fucking hate the line below
    const refs = [ useRef(null), useRef(null), useRef(null), useRef(null)]

    
    function handleEnter(e, i) {
        console.log( refs )
        if (e.key.toLowerCase() === 'enter' ) {
            if ( i < refs.length - 1 ) {
                refs[i+1].current.focus()
            }
        }
    }

    return (
        <Card variant="outlined">
            <span>Paid Outs</span>
            <div className={ styles.inputContainer }>

                { amounts.map( ( amount, i ) => {
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

                { console.log( 'in render after mapping mounts', refs )}
            </div>
        </Card>
    )
}


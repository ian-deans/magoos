import { useRef } from 'react'
import { Input, Table, TableBody, TableFooter, TableRow, TableCell } from '@mui/material'
import styles from './DrawerCount.module.css'


export default function DrawerCount( {
    balance,
    counts,
    updateDataFn,
    end,
    denominations,
    updateAmount,
} ) {

    const refs = [
        useRef( null ),
        useRef( null ),
        useRef( null ),
        useRef( null ),
        useRef( null ),
        useRef( null ),
        useRef( null ),
        useRef( null ),
        useRef( null ),
        useRef( null ),
        useRef( null )
    ]

    // function handleChange( event, denomination ) {
    //     const value = event.target.value
    //     updateDataFn( { value, denomination } )
    // }
   
    function handleChange( event, denomination ) {
        const amount = event.target.value
        updateAmount( { denomination, amount } )
    }

    function handleEnter( key, i ) {
        if ( key.toLowerCase() === 'enter' ) {
            if ( i < refs.length - 1 ) {
                refs[ i + 1 ].current.focus()
            }
        }
    }

    function renderCounts( counts ) {
        if ( !counts ) {
            return
        }
        const denominations = Object.keys( counts )
        return denominations.map( ( denomination, i ) => {
            const [ count, sum, ] = counts[ denomination ]
            const whichone = end ? 'end' : 'start'
            return (
                <TableRow key={ denomination + whichone }>

                    <TableCell>{ denomination }</TableCell>
                    <TableCell>

                        <Input
                            name={ denomination }
                            variant="outlined"
                            className={ styles.input }
                            type="number"
                            step="1"
                            min="0"
                            value={ count }
                            onChange={ event => handleChange( event, denomination ) }
                            inputRef={ refs[ i ] }
                            onKeyUp={ ( { key } ) => handleEnter( key, i ) }
                        />

                    </TableCell>
                    <TableCell>
                        <Input disabled={ true } value={ sum } />
                    </TableCell>

                </TableRow>
            )
        } )
    }

    function renderRows( denominations ) {
        if ( !denominations ) {
            return
        }

        return Object.keys( denominations ).map( ( d, i ) => {
            const props = {
                denomination: d,
                amount: denominations[ d ].amount, 
                value: denominations[ d ].value, 
                ref: refs[i],
                handleEnter: handleEnter,
                handleChange: handleChange,
                i,
            }
            return <DenominatonRow { ...props } />
        } )
    }

    const rows = renderRows( denominations )


    return (
        <Table size="medium" padding="none">
            <TableBody>

                {/* { renderCounts( counts ) } */}

                { rows }

            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>
                        Balance:
                    </TableCell>

                    <TableCell>
                        ${ balance }
                    </TableCell>
                </TableRow>

            </TableFooter>
        </Table>
    )
}

function DenominatonRow( { denomination, amount, value, ref, handleEnter, handleChange, i } ) {

    return (
        <TableRow key={ denomination }>
            <TableCell>{ denomination }</TableCell>
            <TableCell>

                <Input
                    name={ denomination }
                    variant="outlined"
                    className={ styles.input }
                    type="number"
                    step="1"
                    min="0"
                    value={ amount }
                    onChange={ event => handleChange( event, denomination ) }
                    inputRef={ ref }
                    onKeyUp={ ( { key } ) => handleEnter( key, i ) }
                />

            </TableCell>
            <TableCell>
                <Input disabled={ true } value={ value } />
            </TableCell>

        </TableRow>
    )
}
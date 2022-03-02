import { useRef } from 'react'
import { Input, Table, TableBody, TableFooter, TableRow, TableCell } from '@mui/material'
import styles from './DrawerCount.module.css'


export default function DrawerCount( {
    expectedBalance,
    balance,
    variance,
    counts,
    updateDataFn,
    end
} ) {

    const refs = Object.keys(counts).map(() => useRef(null))

    function handleChange( event, denomination ) {
        const value = event.target.value
        updateDataFn( { value, denomination } )
    }

    function handleEnter( key, i ) {
        if ( key.toLowerCase() === 'enter' ) {
            if ( i < refs.length - 1 ) {
                refs[ i + 1 ].current.focus()
            }
        }
    }

    function renderCounts( counts ) {
        const denominations = Object.keys( counts )
        return denominations.map( ( denomination, i ) => {
            const [ count, sum, ] = counts[ denomination ]
            const whichone = end ? 'end' : 'start'
            // refs[ i ] = useRef( null )
            return (
                // <div key={ denomination + whichone } className={ styles.currencyCount }>
                <TableRow key={denomination + whichone}>

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
                            // disableUnderline={ true }
                        />
                    </TableCell>
                    <TableCell>${ sum }</TableCell>

                </TableRow>
                // </div>
            )
        } )
    }


    return (
        // <div className={ styles.container }>
        <Table size="small" padding="none">
            <TableBody>

                { renderCounts( counts ) }

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
        // </div>
    )
}
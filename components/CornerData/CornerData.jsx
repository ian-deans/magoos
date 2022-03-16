import styles from './CornerData.module.css'
import { Input, Select, MenuItem, InputAdornment } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function CornerData( { date, type, startingBalance, updateDataFn } ) {

    function handleChange( { target: { value } } ) {
        updateDataFn( { type, startingBalance: value } )
    }

    function handleSelect( { target: { value } } ) {
        updateDataFn( { type: value, startingBalance } )
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.row1 }>

                <Input
                    value={ date }
                    disabled={ true }
                />

            </div>

            <div className={ styles.row2 }>
                <Select
                    value={ type }
                    onChange={ handleSelect }
                    className={ styles.select }
                >
                    <MenuItem value={ 'Open' }>Open</MenuItem>
                    <MenuItem value={ 'Mid' }>Mid</MenuItem>
                    <MenuItem value={ 'Close' }>Close</MenuItem>
                </Select>
                    <Input
                        placeholder="Starting Balance"
                        type="number"
                        step="0.01"
                        min="0"
                        value={ startingBalance }
                        onChange={ handleChange }
                        className={ styles.input }
                        startAdornment={
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        }
                        sx={ { minWidth: "100%" } }
                        disableUnderline={ true }
                    />
            </div>
        </div>
    )
}
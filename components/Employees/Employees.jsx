import styles from './Employees.module.css'
import {
    Input,
    InputAdornment,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from "@mui/material"

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import { cx } from '../../util'

export default function Employees( { totalCashSales, totalTips, employees, updateDataFn } ) {

    function renderEmployeeRows( employees ) {
        return employees.map( ( employee, index ) => {
            const { name, totalSales, ccTips } = employee
            return (
                <EmployeeRow
                    key={ index }
                    { ...employee }
                    index={ index }
                    updateDataFn={ updateDataFn }
                    handleChange={ handleChange }
                />
            )
        } )
    }

    function handleChange( { value, field, index } ) {
        let newEmployeesData = [ ...employees ]
        newEmployeesData[ index ][ field ] = value

        updateDataFn( newEmployeesData )
    }


    return (
        <>
            <Table size="small" padding="none" sx={ { maxWidth: '100%' } }>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Employee Name</TableCell>
                        <TableCell align="center">Cash Sales</TableCell>
                        <TableCell align="center">CC Tips</TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                    { renderEmployeeRows( employees ) }
                </TableBody>
            </Table>

        </>
    )
}

function EmployeeRow( { name, cashSales, ccTips, index, handleChange } ) {

    return (

        <TableRow>
            <TableCell align="center">
                <Input
                    disableUnderline={ true }
                    value={ name }
                    onChange={ ( { target: { value } } ) => handleChange( { value, field: 'name', index } ) }
                />
            </TableCell>
            <TableCell align="center">
                <EmployeeNumberInput
                    value={ cashSales }
                    handleChange={ handleChange }
                    index={ index }
                    field="cashSales"
                />

            </TableCell>
            <TableCell align="center">
                <EmployeeNumberInput
                    value={ccTips}
                    handleChange={handleChange}
                    index={index}                
                    field="ccTips"
                />
            </TableCell>
        </TableRow>
    )
}

function EmployeeNumberInput( { value, handleChange, index, field } ) {
    return (
        <Input
            type="number"
            step="0.01"
            min="0"
            disableUnderline={ true }
            value={ value }
            onChange={ ( { target: { value } } ) => handleChange( { value, field, index } ) }
            startAdornment={
                <InputAdornment position="start">
                    <AttachMoneyIcon />
                </InputAdornment>
            }
        />
    )
}
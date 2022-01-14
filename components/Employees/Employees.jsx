import styles from './Employees.module.css'

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
            <div className={ styles.table }>
                <div className={ styles.row }>
                    <span>Name</span>
                    <span>Cash Sales</span>
                    <span>CC Tips</span>
                </div>
                { renderEmployeeRows( employees ) }
            </div>
            <div className={ styles.footer }>
                <div>
                    <div>Total Cash Sales</div>
                    <div>{totalCashSales}</div>
                </div>
                <div>
                    <div>Total Credit Card Tips</div>
                    <div>{totalTips}</div>
                    </div>
            </div>
        </>
    )
}

function EmployeeRow( { name, cashSales, ccTips, index, handleChange } ) {

    return (
        <div className={ styles.row }>
            <input
                className={ styles.input }
                onChange={ ( { target: { value } } ) => handleChange( { value, field: 'name', index } ) }
                value={ name }
            />
            <input
                className={ styles.input }
                // onChange={ ( { taget: { value } } ) => handleChange( { value, field: 'cashSales', index } ) }
                onChange={({target: {value}}) => handleChange({value, field:'cashSales', index})}
                value={ cashSales }
                />
            <input
                className={ styles.input }
                onChange={({target: {value}}) => handleChange({value, field:'ccTips', index})}
                value={ ccTips }
            />
        </div>
    )
}
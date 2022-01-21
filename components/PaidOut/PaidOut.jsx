import styles from './PaidOut.module.css'

export default function PaidOut ( props ) {

    const { total, amounts, updateDataFn } = props

    function handleChange ( value, index ) {
        let newAmounts = [ ...amounts ]
        newAmounts[ index ] = value

        updateDataFn( { amounts: newAmounts } )
    }

    function handleClick() {
        let newAmounts = [...amounts]
        newAmounts.push("")
        updateDataFn({ amounts: newAmounts })
    }

    function del(){

        let newAmounts = [...amounts]
        newAmounts.pop()
        updateDataFn({ amounts: newAmounts })
    } 

    function showList () {
        return (
            <div className={ styles.rectangle } >
                <div className={styles.inputContainer}>

                { amounts.map( ( amount, i ) => (
                    <div key={ i }>
                        <input
                            onChange={ ( { target: { value } } ) => handleChange( value, i ) }
                            value={ amount }
                            className={ styles.inputStyle } />
                    </div>
                ) ) }
                </div>


                <div className={styles.btnContainer} >
                    <span onClick={handleClick } className={styles.btn}> Add </span>
                
                    <span onClick={ del } className={styles.btn}> Delete </span>
                </div>

                <div>
                    <span>
                        Total: { total }
                    </span>
                </div>
            </div>

        )


    }

    return showList()

}


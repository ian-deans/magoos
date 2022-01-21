import styles from './DrawerCount.module.css'


export default function DrawerCount( {
    expectedBalance,
    balance,
    variance,
    counts,
    updateDataFn,
    end
} ) {

    console.log( counts )

    function handleChange(event, denomination) {
        const value = event.target.value
        // console.log( 'handle change ', value, denomination)
        updateDataFn({value, denomination})
    }

    function renderCounts( counts ) {
        const denominations = Object.keys( counts )
        return denominations.map( ( denomination, i ) => {
            const [ count, sum, ] = counts[ denomination ]
            const whichone = end ? 'end' : 'start'
            return (
                <div key={ denomination + whichone } className={ styles.currencyCount }>
                    <span>{ denomination }</span>
                    <input 
                        onChange={ (event) => handleChange( event, denomination ) }
                        className={ styles.input } 
                        value={ count } 
                    />
                    <span>${ sum }</span>
                </div>
            )
        } )
    }


    return (
        <div className={ styles.container }>
            { renderCounts( counts ) }

        <div>
            Balance: $<span>{ balance }</span>

        </div>
        </div>
    )
}
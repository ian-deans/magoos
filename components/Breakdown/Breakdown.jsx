import styles from './Breakdown.module.css'


const props = {
    tCash: 200,
    tDeficit: 345,
    exBalance: 545
}

export default function Breakdown ( props ) {

    // const { tCash, tDeficit, exBalance, stBalance, endBalance, tStBalance, tCSales, tCcTips, tPo } = props
    const {  
        totalCash,
        totalDeficit,
        expectedEndingBalance,
        endingBalance,
        startingBalance,
        totalCashSales,
        totalTips,
        totalPaidOuts,
     } = props



    return (
        <div className={ styles.container }>
            <div className={ styles.group } >

                <div className={ styles.topGroup }>

                    <div className={ styles.box }>
                        Starting Balance: { startingBalance}
                    </div>

                    <div className={ styles.box }>
                        Total Cash Sales: {totalCashSales}
                    </div>

                </div>
                <div className={ styles.box }>
                    Total Cash: { totalCash }

                </div>
            </div>
           
           
            <div className={ styles.group } >

                <div className={ styles.topGroup }>

                    <div className={ styles.box }>
                        Total CC Tips: { totalTips }
                    </div>

                    <div className={ styles.box }>
                        Total Paidouts: { totalPaidOuts }
                    </div>

                </div>
           
                <div className={ styles.box } >
                    Total Deficit: { totalDeficit}
                </div>
            </div>
           
           
            <div className={ styles.group } >

                <div className={ styles.topGroup }>

                    <div className={ styles.box }>
                        
                    </div>

                    <div className={ styles.box }>
                        Expected Ending Balance: { expectedEndingBalance }
                    </div>

                </div>
           
                <div className={ styles.box } >
                    Ending Balance: { endingBalance }

                </div>

            </div>
        </div>

    )
}
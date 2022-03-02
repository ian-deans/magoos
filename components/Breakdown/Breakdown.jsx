import styles from './Breakdown.module.css'
import { Table, TableBody, TableRow, TableCell } from '@mui/material'


export default function Breakdown( {
    totalCash,
    totalDeficit,
    expectedEndingBalance,
    endingBalance,
    startingBalance,
    totalCashSales,
    totalTips,
    totalPaidOuts,
} ) {


    return (
        <Table size="large">
            <TableBody>
                <TableRow>
                    <TableCell>Starting Balance</TableCell>
                    <TableCell>${ startingBalance }</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Total Credit Tips</TableCell>
                    <TableCell>${ totalTips }</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Total Cash Sales</TableCell>
                    <TableCell>${ totalCashSales }</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Total Paid Outs</TableCell>
                    <TableCell>${ totalPaidOuts }</TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Total Cash </TableCell>
                    <TableCell>${ totalCash }</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Total Deficit</TableCell>
                    <TableCell>${ totalDeficit }</TableCell>
                </TableRow>

                <TableRow>
                </TableRow>
                <TableRow>
                    <TableCell>Expected Balance </TableCell>
                    <TableCell>${ expectedEndingBalance }</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Actual Ending Balance</TableCell>
                    <TableCell>${ endingBalance }</TableCell>

                </TableRow>
            </TableBody>

        </Table>
        // <div className={ styles.container }>
        //     <div className={ styles.group } >

        //         <div className={ styles.box }>
        //             <div>
        //                 Starting Balance:
        //             </div>
        //             <div>
        //                 ${ startingBalance }
        //             </div>
        //         </div>

        //         <div className={ styles.box }>
        //             <span>
        //                 Total Cash Sales
        //             </span>
        //             <span>
        //                 ${ totalCashSales }
        //             </span>
        //         </div>


        //         <div className={ styles.box }>
        //             <span>
        //                 Total Cash:
        //             </span>
        //             <span>
        //                 ${ totalCash }
        //             </span>

        //         </div>


        //         <div className={ styles.box }>
        //             <span>
        //                 Total Tips:
        //             </span>
        //             <span>
        //                 ${ totalTips }
        //             </span>
        //         </div>

        //         <div className={ styles.box }>
        //             <span>
        //                 Total Paid Outs:
        //             </span>
        //             <span>
        //                 ${ totalPaidOuts }
        //             </span>
        //         </div>

        //         {/* </div> */ }

        //         <div className={ styles.box } >
        //             <span>
        //                 Total Deficit:
        //             </span>
        //             <span>
        //                 ${ totalDeficit }
        //             </span>
        //         </div>
        //     </div>


        //     <div className={ styles.group } >

        //         <div className={ styles.topGroup }>

        //             <div className={ styles.box }>

        //             </div>

        //             <div className={ styles.box }>
        //                 Expected Ending Balance: ${ expectedEndingBalance }
        //             </div>

        //         </div>

        //         <div className={ styles.box } >
        //             Ending Balance: ${ endingBalance }

        //         </div>

        //     </div>
        // </div>

    )
}
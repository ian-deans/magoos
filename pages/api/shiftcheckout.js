import dbConnect from '../../lib/dbConnect'
import ShiftCheckout from '../../models/shiftCheckout'


export default async function handler( req, res ) {

    await dbConnect()

    let { method } = req

    switch ( method ) {
        case 'GET': {
            try {
                const shiftCheckouts = await ShiftCheckout.find()
                res.status( 200 ).json( shiftCheckouts )
            } catch ( error ) {
                res.status( 500 ).json( { error: 'failed to load data' } )
            }
        }
        case 'POST': {
            try {
                const newDoc = new ShiftCheckout()
                await newDoc.save()
                res.status( 200 ).json( { message: 'success' } )
            } catch ( err ) {
                res.status( 500 ).json( { error: 'failed to create new document' } )
            }
        }
    }
}
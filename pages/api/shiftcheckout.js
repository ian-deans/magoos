import dbConnect from '../../lib/dbConnect'
import ShiftCheckout from '../../models/shiftCheckout'


const MESSAGES = {
    success: {
        createNew: "Successfully created a new document",
        getAll: "Successfully retrieved all documents",
        getOne: id =>  `Successfully retrieved document with id ${id}`,
        update: id => `Successfully updated document with id ${id}`
    }
}


export default async function handler( req, res ) {

    await dbConnect()

    let { method } = req


    switch ( method ) {
        case 'GET': {
            try {
                const shiftCheckouts = await ShiftCheckout.find()
                return res
                    .status( 200 )
                    .json( shiftCheckouts )
            } catch ( error ) {
                return res
                    .status( 500 )
                    .json( { error: 'failed to load data' } )
            }
        }

        case 'POST': {
            const jsonData = {}
            let newDoc;

            try {
                const shiftType = req.body.type

                if ( shiftType ) {
                    newDoc = new ShiftCheckout( { type: shiftType } )

                } else {
                    newDoc = new ShiftCheckout()
                }

                await newDoc.save( ( err, doc ) => {

                    if ( err ) {

                        console.error( err )
                        jsonData.message = 'Error occured while attempting to save new document'
                        return res
                            .status( 500 )
                            .json( jsonData )

                    } else {
                        jsonData.id = doc.id
                        jsonData.message = 'Success,'
                        return res
                            .status( 200 )
                            .json( jsonData )
                    }
                } )

            } catch ( err ) {
                jsonData.message = 'Failed to create new document'
                return res
                    .status( 500 )
                    .json( jsonData )
            }
        }

        case 'PUT': {
            const { id, ...updates } = req.body
            console.log( id, updates )

            ShiftCheckout.findOneAndUpdate( { _id: id }, { ...updates }, function ( err, doc ) {
                if ( err ) {
                    return res
                        .status( 500 )
                        .json( { message: `Encountered and error while attempting to update document with id ${id}`, err } )
                }

                console.log( doc )

                return res
                    .status( 200 )
                    .json( { message: `Successfully updated document with id ${id} ` } )
            } )


        }

        case 'DELETE': {

        }
    }
}

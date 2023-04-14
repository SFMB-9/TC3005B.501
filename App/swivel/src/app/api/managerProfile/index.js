import {getSession} from 'next-auth/client'
//import of function that does db connection

export default async (req, res) => {
    //lets assume that I have a function that does db connection
    //and returns the user data
    const session = await getSession({ req })

  


    const profile = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@ex',
        phone: '123456789'
    }
    if (session) {
        // Signed in
        res.status(200).json({profile})
    } else {
        // Not Signed in
        res.status(400).json({message: 'Invalid Request body'})

    }
    }
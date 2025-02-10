const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{}, (error, client) => {
    if (error) {
        return console.log("unable to connect")
    }



    const db = client.db(databaseName)

//     db.collection('users').insertOne({
//         name: 'bob',
//         age: 21
//     }, (error, result) => {
//         if (error) {
//             return console.log('unable to insert user')
//         }

//         console.log(result.ops)
//     })


    db.collection('users').insertMany([
        {
            name: 'bobby',
            age: 41
        },
        {
            name: 'joe',
            age:1
        }
    ],(error, result) => {
        if (error) {
            return console.log('unable to insert user')
        }

        console.log(result.ops)


    })
})

//! vid 7


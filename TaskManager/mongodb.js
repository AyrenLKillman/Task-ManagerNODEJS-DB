
const {MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


const client = new MongoClient(connectionURL);

async function Serverz() {
    try {
      await client.connect();
        //operation stuff

        const database = client.db(databaseName)
        const collection = database.collection('namesIguess');

        const docs =  await collection.insertMany([
          { name: "Jen", age: 21 },
          { name: "Jod", age: 56 },
          { name: "Glen", age: 103 }
        ])
  

        console.log("if you see dis it worked :3")





    } finally {
      await client.close();
    }
  }
  Serverz().catch(console.dir);
//! 10.8
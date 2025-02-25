
const {MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'



const client = new MongoClient(connectionURL);

async function Serverz() {
    try {
      await client.connect();
        //operation stuff

        const database = client.db(databaseName)

      const finding = database.collection('tasks').find({task: 'clean'})

      

      result = await finding.toArray()
      

      console.log(result)



    } finally {
      await client.close();
    }
  }
  Serverz().catch(console.dir);
//!

const {MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'



const client = new MongoClient(connectionURL);

async function Serverz() {
    try {
      await client.connect();
        //operation stuff

        const db = client.db(databaseName)

      db.collection('users').deleteOne({
        task: "clean"
      }).then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error)
      })


    } finally {
      await client.close();
    }
  }
  Serverz().catch(console.dir);
//!

//"67bcca73325006112a19849b"



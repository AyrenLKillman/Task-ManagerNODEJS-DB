
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const client = new MongoClient(connectionURL);

async function run() {
    try {
      await client.connect();
        //operation stuff

        const db = client.db(databaseName)

        db.collection('tasks').insertMany([
          {
            description: "chez",
            comp: true
          },
          {
            description: "cbdsaf",
            comp: true
          },
          {
            description: "chokolat",
            comp: true
          }
        ])


    } catch (error){
        if(error) {
            return console.log('failed to connect :(')
        }
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
//! 10.8
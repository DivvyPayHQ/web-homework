/* mySeedScript.js */

// require the necessary libraries
const MongoClient = require('mongodb').MongoClient

function randomIntFromInterval (min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function seedDB () {
  // Connection URL
  const uri = 'mongodb://localhost:27017'

  const client = new MongoClient(uri, {
    useNewUrlParser: true
    // useUnifiedTopology: true,
  })

  try {
    await client.connect()
    console.log('Connected correctly to server')

    const collection = client.db('graphql').collection('transactions')

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    await collection.drop()

    // make a bunch of time series data
    let timeSeriesData = [
      {
        user_id: 'Leeroy',
        description: '4 Burgers and 1 Drink',
        merchant_id: 'Burger King',
        debit: true,
        credit: false,
        amount: 36.65
      },
      {
        user_id: 'Jenkins',
        description: '14 Fries',
        merchant_id: 'McDonalds',
        debit: false,
        credit: true,
        amount: 974.34
      },
      {
        user_id: 'Ted',
        description: '3 Ipods',
        merchant_id: 'Apple',
        debit: false,
        credit: true,
        amount: 4326.43
      },
      {
        user_id: 'Jacob',
        description: '6 Board Games',
        merchant_id: 'Local Store',
        debit: true,
        credit: false,
        amount: 63.93
      }
    ]

    collection.insertMany(timeSeriesData)

    console.log('Database seeded! :)')
    client.close()
  } catch (err) {
    console.log(err.stack)
  }
}

seedDB()

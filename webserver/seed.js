/* eslint-disable handle-callback-err */
const { TransactionModel } = require('./data-models/Transaction')
const { UserModel } = require('./data-models/User')
const { MerchantModel } = require('./data-models/Merchant')
const mongoose = require('mongoose')

const MONGO_URI = 'mongodb://localhost:27017/graphql'

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true
})

let users = [
  new UserModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
    firstName: 'Donovan',
    lastName: 'Mitchell'
  }),
  new UserModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000004'),
    firstName: 'Rudy',
    lastName: 'Gobert'
  }),
  new UserModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000005'),
    firstName: 'Joseph',
    lastName: 'Ingles'
  }),
  new UserModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000006'),
    firstName: 'Mike',
    lastName: 'Conley'
  }),
  new UserModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000007'),
    firstName: 'Russell',
    lastName: 'Westbrook'
  })
]

let merchants = [
  new MerchantModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000013'),
    merchantName: 'Nike'
  }),
  new MerchantModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000014'),
    merchantName: 'Adidas'
  }),
  new MerchantModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000015'),
    merchantName: 'New Balance'
  }),
  new MerchantModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000016'),
    merchantName: 'Spalding'
  }),
  new MerchantModel({
    _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000017'),
    merchantName: 'True Religion'
  })
]

let transactions = [
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000003',
    amount: 100,
    credit: false,
    debit: true,
    description: 'D.O.N Issue #3',
    merchant_id: '4edd40c86762e0fb12000014',
    category: 'Equipment'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000004',
    amount: 200,
    credit: false,
    debit: true,
    description: 'Shoes',
    merchant_id: '4edd40c86762e0fb12000013',
    category: 'Equipment'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000005',
    amount: 35,
    credit: true,
    debit: false,
    description: 'Icy-Hot',
    merchant_id: '4edd40c86762e0fb12000013',
    category: 'Supplies'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000006',
    amount: 450,
    credit: true,
    debit: false,
    description: 'Headbands',
    merchant_id: '4edd40c86762e0fb12000014',
    category: 'Equipment'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000007',
    amount: 45,
    credit: true,
    debit: false,
    description: 'Ankle braces',
    merchant_id: '4edd40c86762e0fb12000015',
    category: 'Equipment'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000007',
    amount: 700,
    credit: true,
    debit: false,
    description: 'Jeans',
    merchant_id: '4edd40c86762e0fb12000017',
    category: 'Misc'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000007',
    amount: 450,
    credit: true,
    debit: false,
    description: 'Shirts',
    merchant_id: '4edd40c86762e0fb12000017',
    category: 'Misc'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000007',
    amount: 450,
    credit: true,
    debit: false,
    description: 'Ticket to DC',
    merchant_id: '4edd40c86762e0fb12000017',
    category: 'Travel'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000006',
    amount: 100,
    credit: true,
    debit: false,
    description: 'Basketballs',
    merchant_id: '4edd40c86762e0fb12000016',
    category: 'Supplies'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000005',
    amount: 300,
    credit: true,
    debit: false,
    description: 'J.O.E Issue #2',
    merchant_id: '4edd40c86762e0fb12000015',
    category: 'Equipment'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000006',
    amount: 450,
    credit: true,
    debit: false,
    description: 'MEM to SLC',
    merchant_id: '4edd40c86762e0fb12000014',
    category: 'Travel'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000004',
    amount: 100,
    credit: true,
    debit: false,
    description: 'Trophy polish',
    merchant_id: '4edd40c86762e0fb12000015',
    category: 'Misc'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000003',
    amount: 100,
    credit: true,
    debit: false,
    description: 'Spidey suit',
    merchant_id: '4edd40c86762e0fb12000014',
    category: 'Misc'
  }),
  new TransactionModel({
    user_id: '4edd40c86762e0fb12000005',
    amount: 700,
    credit: true,
    debit: false,
    description: 'AUS to SLC',
    merchant_id: '4edd40c86762e0fb12000014',
    category: 'Travel'
  })
]

function addTransactions () {
  let transactionsDone = 0
  for (let i = 0; i < transactions.length; i++) {
    transactions[i].save(function (err, result) {
      transactionsDone++
      if (transactionsDone === transactions.length) {
        exit()
      }
    })
  }
}

function addMerchants () {
  let merchantDone = 0
  for (let i = 0; i < merchants.length; i++) {
    merchants[i].save(function (err, result) {
      merchantDone++
      if (merchantDone === merchants.length) {
        addTransactions()
      }
    })
  }
}

let done = 0
for (let i = 0; i < users.length; i++) {
  users[i].save(function (err, result) {
    done++
    if (done === users.length) {
      addMerchants()
    }
  })
}

function exit () {
  mongoose.disconnect()
}

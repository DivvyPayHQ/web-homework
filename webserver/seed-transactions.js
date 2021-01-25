const {TransactionModel} = require('./data-models/Transaction')
const Users = require('./query-resolvers/user-resolvers')

async function seedTransactions(count) {
  const users = await Users.find()

  const getRandomUser = () => {
    return users[Math.floor(Math.random() * Math.floor(3))]
  }

  const descriptions = [
    'Express is a perfect choice for a server when it comes to creating and exposing APIs',
    'Bought some interesting shoes',
    'You ever dream in 3-D?',
    'Carefully planned team lunch and activity',
    'Money towards a new company jet'
  ]

  const del = await TransactionModel.deleteMany({})

  var precision = 100;

  const res = await TransactionModel.insertMany(
    Array.from({ length: count }, (v, i) => {
      const debit = Math.random() < 0.5
      return {
        user_id: getRandomUser().id,
        description: descriptions[Math.floor(Math.random() * Math.floor(5))],
        debit: debit,
        credit: !debit,
        amount: Math.floor(Math.random() * (100 * precision - 1 * precision) + 1 * precision) / (1*precision)
      }
    })
  );

  return res

}

module.exports = {
  seedTransactions
}
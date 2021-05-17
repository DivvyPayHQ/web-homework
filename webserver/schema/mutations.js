const graphql = require('graphql')
const parse = require('csv-parse')

const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')
const SuccessType = require('./success-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })).save()
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id, description, merchant_id, debit, credit, amount }) {
        const tx = TransactionModel.findOneAndUpdate({ _id: id }, { description, merchant_id, debit, credit, amount })

        return tx
      }
    },
    removeTransaction: {
      type: SuccessType,
      args: {
        id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve: async (parentValue, { id }) => {
        await TransactionModel.findOneAndDelete({ _id: id })

        return { success: true }
      }
    },
    csvUpload: {
      type: SuccessType,
      args: {
        csvData: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { csvData }) {
        parse(csvData, (err, result) => {
          if (err){
            return { success: false }
          } else {
            const data = result.slice(1)

            data.forEach(([ _id, user_id, description, merchant_id, debit, credit, amount ]) => {
              const debitValue = debit === 'true'
              const creditValue = credit === 'true'
              const amountValue = Number(amount)

              new TransactionModel({ user_id, description, merchant_id, debit: debitValue, credit: creditValue, amount: amountValue }).save()
            });

            // parse csv and loop through
            // return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })).save()
            return { success: true }
          }
        })

      }
    }
  }
})

module.exports = mutation

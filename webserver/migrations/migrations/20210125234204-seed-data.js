module.exports = {
  async up(db, client) {
    const ObjectId = require('mongodb').ObjectID

    // generate ObjectIds
    const userId1 = '6009289ed114f1adbd982eb7'
    const userId2 = '6009295ed114f1adbd982eb8'
    const userId3 = '6009295ed114f1adbd982eb9'
    const userId4 = '6009295ed114f1adbd982eb0'

    const merchantId1 = '6009272bd114f1adbd982eb4'
    const merchantId2 = '600927efd114f1adbd982eb5'
    const merchantId3 = '6009283ed114f1adbd982eb6'
    const merchantId4 = '6009272bd114f1adbd982eb7'

    const categoryId1 = '600924cfd114f1adbd982eb0'
    const categoryId2 = '600924cfd114f1adbd982eb1'
    const categoryId3 = '600924cfd114f1adbd982eb2'
    const categoryId4 = '600924cfd114f1adbd982eb3'

    await db.createCollection('users')
    await db.collection('users').insert({ _id: ObjectId(userId1), firstName: 'Luke', lastName: 'Skywalker', dob: '1977-05-25' })
    await db.collection('users').insert({ _id: ObjectId(userId2), firstName: 'Darth', lastName: 'Vader', dob: '1957-10-22' })
    await db.collection('users').insert({ _id: ObjectId(userId3), firstName: 'Obiwan', lastName: 'Kenobi', dob: '1952-01-25' })
    await db.collection('users').insert({ _id: ObjectId(userId4), firstName: 'Leia', lastName: 'Organa', dob: '1977-05-25' })

    await db.createCollection('merchants')
    await db.collection('merchants').insert({ _id: ObjectId(merchantId1), name: 'Space Cantina' })
    await db.collection('merchants').insert({ _id: ObjectId(merchantId2), name: 'Tosche Station' })
    await db.collection('merchants').insert({ _id: ObjectId(merchantId3), name: 'Jabbas Palace' })
    await db.collection('merchants').insert({ _id: ObjectId(merchantId4), name: 'Cloud City' })

    await db.createCollection('categories')
    await db.collection('categories').insert({ _id: ObjectId(categoryId1), name: 'Space Fuel' })
    await db.collection('categories').insert({ _id: ObjectId(categoryId2), name: 'Food' })
    await db.collection('categories').insert({ _id: ObjectId(categoryId3), name: 'Laser Weapons' })
    await db.collection('categories').insert({ _id: ObjectId(categoryId4), name: 'Spaceship Parts' })

    await db.createCollection('transactions')
    await db
      .collection('transactions')
      .insert({
        _id: ObjectId('60092464fcae97574c1eed22'),
        user_id: userId1,
        credit: true,
        debit: false,
        amount: 12.5,
        category_id: categoryId1,
        merchant_id: merchantId2,
        description: 'Fuel for the X-Wing',
        date: '2020-12-15'
      })
    await db
      .collection('transactions')
      .insert({
        _id: ObjectId('60092464fcae97574c1eed23'),
        user_id: userId2,
        credit: false,
        debit: true,
        amount: 1025.52,
        category_id: categoryId4,
        merchant_id: merchantId4,
        description: 'Parts for Carbonite Freezing',
        date: '2021-01-11'
      })
    await db
      .collection('transactions')
      .insert({
        _id: ObjectId('60092464fcae97574c1eed24'),
        user_id: userId3,
        credit: false,
        debit: true,
        amount: 153.4,
        category_id: categoryId3,
        merchant_id: merchantId1,
        description: 'Necessary preparations',
        date: '2021-01-20'
      })
    await db
      .collection('transactions')
      .insert({
        _id: ObjectId('60092464fcae97574c1eed25'),
        user_id: userId4,
        credit: false,
        debit: true,
        amount: 18.75,
        category_id: categoryId2,
        merchant_id: merchantId3,
        description: 'Necessary preparations',
        date: '2020-10-13'
      })
  },

  async down(db, client) {
    await db.collection('transactions').drop()
    await db.collection('categories').drop()
    await db.collection('merchants').drop()
    await db.collection('users').drop()
  }
}

print('INIT #################################################################');

db = db.getSiblingDB('graphql')
db.createUser(
  {
    user: 'divvy',
    pwd: 'secret',
    roles: [
      {
        role: 'readWrite',
        db: 'graphql'
      }
    ]
  }
)
db.createCollection('transaction')

print('END #################################################################');
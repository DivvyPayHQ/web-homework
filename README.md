# SPENDIFY 💰

- A budgeting app.

## Setup
- If you are on a Mac OS machine download Homebrew (https://brew.sh/)
- Make sure you have MongoDB running in the background by tapping and running MongoDb through Homebrew: (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
- Then do the following commands:
```bash 
    cd webapp/
    yarn
    
    cd webserver/
    yarn
```

## To Run
- In both the webapp and webserver folders run:
```bash 
  yarn start
```
- This will get the client and the server app running.
- To run tests: `yarn test`

## Cleaning Up
- If you want to clean up the DB, in your Terminal type in:
  `mongo`
  `use graphql`
  `db.dropDatabase()`
- This will wipe your DB so you can start clean

And thats it! You can see the app on http://localhost:3000/ in your browser
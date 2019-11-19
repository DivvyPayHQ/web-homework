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
1) In both the webapp and webserver folders run:
```bash 
  yarn start
```
2) This will get the client and the server app running.
3) To run tests: 
```bash 
  yarn test
```
4) NOTE: You can use .csv file inside `/testFiles` folder to test out the Upload feature inside the app
5) And thats it! You can see the app on http://localhost:3000/ in your browser

## Cleaning Up the DB
- If you want to clean up the DB, in your Terminal run the mongo comand fillowed by the `use` and `db`:
  ```bash
    mongo
    use graphql
    db.dropDatabase()
  ```
- This will wipe your DB of the data so you can start clean.

## TODOs
- Write more/better tests
- Edit Transaction button and functionality
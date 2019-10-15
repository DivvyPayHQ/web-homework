# Divvy Front End Homework Assignment


This repository provides a starting point for a basic React + GraphQL application.  All of the configuration boilerplate is complete so you can start by writing the code that you want us to see.  

Please **fork** this repo to your GitHub account.


## Project Setup

This repository is broken into a web app directory (eg `/webapp`) and a server directory (eg `/webserver`).  

This project is intentionally not utilizing 3rd party services or create-react-app to give you the opportunity to showcase your talents wherever they are, be it the front end or the back end. 

**Node** version **11.15.0** is the safest NodeJS release to use.  Node 12 has issues with node-gyp on OSX and anything less than 11 is missing some necessary es6 features.

## Instructions

You do not have to complete all of these objectives, but as many as you can without feeling like you are wasting your time is ideal.

The completed homework assignment must have a usable interface that load dynamically and is interactive.

For **senior engineers**, please complete enough of the project to demonstrate your abilities as a senior.  This should be more than 3 objectives.  You can modify anything you need to with this project, so show us what you can do.

For **mid-level engineers**, please complete any 3 objectives.

For **junior engineers** please complete any 1 of these objectives and include a basic Jest test.  These tasks are possible with limited or no prior knowledge of React within a very short amount of time.

## Objectives

 * Write a basic user inerface that allows users to enter, edit, and remove transactions.

   > Bonus points for adding other data models such as users and merchants that can be input as part of the transaction.

 * Provide a pie chart or histogram of the spend per category or spend per day, respectively.

 * Create a user setting that can convert the displayed numbers to Roman Numerals.  Please do not use the examples on StackOverflow for this.

 * Include a CSV file that can be uploaded through your application to seed the database.  You may also modify the web server post install script to ensure the databse is correctly seeded instead. 

 * Add an i18n setting via URL (eg `?i18n=true`) that turns all of the display text into gibberish (eg replace the front with something that does not use a latin based charset).

   > Bonus points if you can utilize this setting in the URL (eg `/i18n/app` ).  You will have to modify the existing route or SPA configuration in the web server to return the index file for both the main URL and the i18n url.

 * Add a user experience that showcases your abilities on the front end.  
 
 If you are not very comfortable writing React code, import a funny gif (eg giphy) via keyboard shortcut or something just as simple.  
 
 If your strengths are in the backend, feel free to modify anything with the webserver to demonstrate your strengths.


## How to go about it

* Add more routes to the Front End application (ie [React Router](https://github.com/ReactTraining/react-router)) 

* Use [emotion-js](https://github.com/emotion-js/emotion) for css styling.

* Separate the global page layout styling from each component style so that you can move the components to any part of the layout with negatively impacting the UX of the individual component.

* Write "unit" tests in Jest.

   > Bonus for using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and using small snapshots and/or click events and asserting DOM changes.

* Add more objects to the GraphQL schema and user interface (eg users, merchants, etc..)

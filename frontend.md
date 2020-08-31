# Divvy Front End Homework Instructions

Instructions for the front end assignment.

## Instructions

You do not have to complete all of these objectives, but do as many as you can without wasting your time.

The completed homework assignment must have a usable interface that loads dynamically and is interactive.

For **senior engineers**, complete enough of the project to demonstrate your abilities as a senior.  This should be more than 3 objectives.  You can modify anything you need to with this project, so kick the tires and show us what you can do.

For **mid-level engineers**, complete any 3 objectives.

For **junior engineers** complete any 1 of these objectives and include a basic Jest test.  These tasks are possible with limited or no prior knowledge of React within a very short amount of time.

## Objectives

 * Write a basic user inerface that allows users to enter, edit, and remove transactions.

   > Bonus points for adding other data models such as users and merchants that can be input as part of the transaction.

 * Provide a pie chart or histogram of the spend per category or spend per day, respectively.

 * Create a user setting that can convert the displayed numbers to Roman Numerals.  This is a problem that we may cover in your interview, so be able to walk us through the code for this feature.

 * Seed the database.  Possible solutions include:
   * producing a CSV file and endpoint that allows the file to be uploaded through the web server
   * modifying the web server post install script to ensure the databse is correctly seeded instead

 * Add an i18n setting.  This is easily done in a couple of ways.
   * Via URL (eg `?i18n=true`) that turns all of the display text into gibberish (eg replace the front with something that does not use a latin based charset).
   * Utilize this path in the URL (eg `/i18n/app` ) to enable an obviously i18n'd display.  You will have to modify the existing route or SPA configuration in the web server to return the index file for both the main URL and the i18n url.

 * Add a user experience that showcases your abilities on the front end such as:
   * better navigation
   * improved styling
   * nested views
   * multiple routes with content (budgets, vendors, users, etc)

 If you are uncomfortable writing React code, do something to make us laugh.  Maybe a couple of these:
 * Import a funny gif (eg giphy) via keyboard shortcut.
 * Add the Konami code and have it do something unique as an easter egg.
 * Remake an audio player UI (eg Winamp, Spotify, Pandora, etc).

 Should your strengths be in the backend, you are free to modify anything with the webserver to demonstrate them.

## Getting Started

* Add more routes to the Front End application (ie [React Router](https://github.com/ReactTraining/react-router))

* Use [emotion-js](https://github.com/emotion-js/emotion) for css styling.

* Separate the global page layout styling from each component style so that you can move the components to any part of the layout with negatively impacting the UX of the individual component.

* Write "unit" tests in Jest.

   > Bonus for using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and using small snapshots and/or click events and asserting DOM changes.

   > Cypress.io is coming to the web homework shortly, as an alternative option.  If you can add it on your own, that will be considered a feature.

* Add more models to the GraphQL schema and user interface (eg users, merchants, etc..).
  This will require modification of the GraphQL schema, and resolvers in the web server.
  It should be straight-forward if you are already comfortable with JavaScript and GraphQL.

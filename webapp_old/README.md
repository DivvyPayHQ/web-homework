# Divvy Front End Homework Instructions

Instructions for the front end assignment.

This is the completed boilerplate for a basic React application, with 
[Babel](https://babeljs.io/), 
[eslint](https://eslint.org/), 
[React](https://reactjs.org/), 
[React Router](https://github.com/ReactTraining/react-router), 
[Apollo Client (GraphQL)](https://www.apollographql.com/), and 
[emotion-js](https://github.com/emotion-js/emotion) already configured.  

Please fork this project when submitting your homework assignment.

<br />

**Setup**

A terminal multiplexer is recommended for this project, but is not needed. Multiple terminal windows work too. 
  
  1. install and start `mongodb`
  2. cd into the webapp directory
  3. run `yarn`
  4. cd into the webserver directory
  5. run `yarn`
  6. start the webserver (`yarn start`)
  7. start the webapp (`yarn start` in `../webapp`)

Defaults (host: `localhost`, port `3000`)

<br />

**Potential Issues**

If you run into trouble, make sure you are on `node` **v14+** and `yarn` **v1.19+** with an updated **master** branch.  Delete all node_modules in the webserver and webapp directories to reset if needed.

If you are using a Windows operating system, please either use a [Virtual Machine](https://www.virtualbox.org/) with [Linux](https://linuxmint.com/download.php) or [install WSL](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-wsl2) for this project.  There is a babel and webpack compatibility issue with the Windows + node combination.

If for any reason you still have issues, please reach out to your recruiter to explain the issue.


<br />

## Instructions

You do not have to complete all of these objectives. Do as many as you can without wasting your time.

The completed homework assignment must have a usable interface that loads dynamically and is interactive.


| Level                            | Rubric                        | Context                                                                                                  |
| -------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Seniors+**                     | > 3 objectives                | Modify anything you like and demonstrate your abilities                                                  |
| **Mid-level (I/II) engineers**   | 3+ objectives                 | The more you demonstrate your abilities, the better your score will be                                   |
| **Junior (Associate) engineers** | > 1 objective + > 1 jest test | This is possible with no prior knowledge of React with minimal research (10 minutes, don't overthink it) |

<br />

## Objectives

 * Write a basic user inerface that allows users to enter, edit, and remove transactions.

   * Bonus points for adding other data models such as users and merchants that can be input as part of the transaction.

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

 <br />

## Getting Started

* Add more routes to the Front End application (ie [React Router](https://github.com/ReactTraining/react-router))

* Use [emotion-js](https://github.com/emotion-js/emotion) for css styling.

* Separate the global page layout styling from each component style so that you can move the components to any part of the layout with negatively impacting the UX of the individual component.  If you want to use a styling framework, we recommend [Material UI](https://material-ui.com/). Just don't forget about utilizing @emotion to meet your objectives.

* Write "unit" tests in Jest.

   * Bonus for using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and using small snapshots and/or click events and asserting DOM changes.

* Add more models to the GraphQL schema and user interface (eg users, merchants, etc..).
  This will require modification of the GraphQL schema, and resolvers in the web server.
  It should be straight-forward if you are already comfortable with JavaScript and GraphQL.

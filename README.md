# BriteCore-Payments-DataTable

The project's goal is to build from scratch (in a few hours) a data table component, which simulates the payment data for one of the BriteCore products.

![Alt text](https://github.com/mejiamanuel57/britecore-payments-datatable/raw/master/screenshot.jpg)

## How was done

##### Frontend essentials: 
Vue.js, HTML5 and CCS3/Sass
##### Extra libraries: 
date-fns, vue-flatpickr-component and xlsx
##### Testing: 
Jest and Vue Test Utils
##### Linter: 
ESLint

## How to run a developer version
``` bash

# clone respository
git clone https://github.com/mejiamanuel57/britecore-payments-datatable.git britecore-payments-datatable

# enter to the repository
cd britecore-payments-datatable

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## How run the production version
Link: [https://mejiamanuel57.github.io/britecore-payments-datatable](https://mejiamanuel57.github.io/britecore-payments-datatable).
## How to run the tests
``` bash

# run all tests 
npm run test

# run watch mode
npm run test-watch
```
## Bonus questions
##### How long did you spend on the test? 
A total of 12 hours + 1 hour of documentation.
##### Would you do anything differently if you had more time?
I would add:
   - friendly pagination
   - options to send the invoice with an email
   - for mobile screen only show 2 columns (Name and Status) and open the payments with a modal/pop-up
   - filter by multiple columns
   - storage the payments in a database to move the data between the backend and frontend using a GraphQL library.  
   - make a more fancy UI/UX
   - more tests

##### In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?
I would receive the data and the properties of the data as a vue props, identifying the date, numerical and editable columns. Also, I would receive the align and class of each one.

##### What is one CSS property that you recently learned about that helped you solve a problem?
I wanted to use Sass/SCSS for this project and therefore I had to learn in a few minutes, that was the highlight.

License
MIT

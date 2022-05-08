# CS546 Final Project: JavaReads Cafe

A web application that will serve as the main portal for JavaReads-Cafe, a Hoboken located coffee-shop where users can purchase various types of coffee, pastries, and smoothies. Before ordering, users will have the option of reserving seats in the restaurant for a block of time. Users can also  like or dislike, and write reviews for products being offered at the cafe. On top of selling coffee to customers, JavaReads-Cafe has the unique twist of hosting a reading community, where users can browse through the cafe’s book catalog online and read them at the cafe. Just like the food/drinks, users can write reviews of books that are part of the cafe’s book catalog on the website.

## How to Setup
### Install dependencies 
`npm install`

### Populate the database
`npm run seed`

### Run server
`npm start`

## How the Application Works
- The initial page is the login form. A user can also create an account as a customer or an employee of the cafe by indicating it in the signup form.
- A non-authenticated user will only be able to view general information about the cafe. 
- Once logged in as an employee, the user will be able to add items to the menu and the book catalog. In addition, the employee will be able to open available seats at the cafe for each day of the week so that customers can reserve their preferred time slots. 
- The employee user will also have access to some features available to the customer user such as viewing the menu and book catalog. 
- As a customer, the user will be able to view the menu and book catalog of the cafe, make a reservation, order a drink, and reserve a book. The user can also write reviews under each menu and book item as well as comment on other users' reviews. 

## GitHub Repo Link
https://github.com/hchachko/cs546-final-project

# Web application of a hungarian restaurant network with home delivery

## Functional requirements

- differentiate functions between user roles

### Guest functions
- sign up *to become an user*
- log in using email and password *to be able to use non-guest functions*

### User functions
- edit user settings *to change your preferred restaurant or your address*
- view menu *to find what you want to order*
- filter menu by category *to see the products only from your chosen category*
- add product to cart *to select the products that you want to order*
- place order *to let the restaurant staff know what you want to order*
- view user orders and its status *to know what have you already ordered and when will you get your order*
- review products *to tell others about your opinion of the product*

### Admin functions
- view orders for the restaurant *to find and manage incoming orders*
- change status of order *to let the customer know when will the order arrive*
- add product *to let customers know about a new product*
- remove product *to don't let customers order a discontinued product*

### Details
- each email can only be used for one user
- guests can sign up only with a city where there is a restaurant
- users can review a product only if the user has already ordered it
- users can place orders only when the restaurant is open
- the restaurants offer the same menu, but their opening hours may differ
- the order is made to the restaurant that is set in settings
- admins can only manage the restaurant that is set in settings
- contents of the cart are stored in session
- no delivery cost, no online payment

## Non-functional requirements

- new orders are immediately available for the restaurant staff to process
- no downtime during opening hours
- available documentation
- reliable, fast operation
- store passwords securely, hashed
- user friendly user interface

## Team members

- [Fityó Csaba](https://github.com/fityocsaba96/)
- [Márhoffer Balázs](https://github.com/marhofferbalazs/)

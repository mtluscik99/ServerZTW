##### TripMate Server

## Commends to start:
```
npm install
npm start
```

## Technologies used:
- Node.js
- ExpressJS
- MongoDB
- mongoose

URL: [address](http://localhost:5000/)

### API Endpoints:
#    USER:
1. POST  /users/signup     
   - register a user
2. POST  /users/signin      
   - log in a user
3. GET   /users              
   - list of all users
4. GET   /users/user      
   - shows particular user
5. PATCH /users/edit-profile       
   - update particular user by changing at least 1 field
6. GET   /users/trips              
   - shows list of all trip offerts that users are taking part in publisher (user id (auth-token) needed in header request)
7. GET   /users/book-trip/:offerId   
   - ask publisher to book an offer and save it in a toAccept array in user(user id (auth-token) needed in header request as user, and offer id needed in path as an offer to book) returns offer
8. GET   /users/users-to-accept/:offerId 
   - shows a list of unaccepted users wanted to book a trip to partiicular offer (publisher id (auth-token) needed in header request and offer id needed in path)
9. GET   /users/accept-user/:offerId/:userId 
   - add asking user for a trip (publisher id (auth-token) needed in header request and offer id needed in path and user id needed in a path)
10. GET   /users/reject-user/:offerId/:userId 
    - disagree for booking a trip by an user(publisher id (auth-token) needed in header request and offer id needed in path and user id needed in a path)
11. GET   /users/resign-trip/:offerId   
    - resign an offer and remove it from trips array in user(user id (auth-token) needed in header request as user, and offer id needed in path as an offer to book)

    
#    OFFER:
1. GET   /offers           
   - list of all offers
2. POST  /offers/add                
   - creates a new offer (publisher id (auth-token) needed in header request)
3. GET   /offers/published-offers               
   - shows list of offers published by user (publisher id (auth-token) needed in header request)
4. GET   /offers/:offerId                          
   - shows particular offer
5. GET   /offers/offer-travellers/:offeriId          
   - shows offer travellers
6. PUT   /offers/:id                               
   - update particular offer by replacing
7. PATCH /offers/:id                               
   - update particular offer by changing at least 1 field
8. GET   /offers/searcher-city-from?search=Warszawa  
   - search for all cities from with Warszawa (req.query.search = text to search)
9. GET   /offers/searcher-city-to?search=Warszawa      
   - search for all cities to with Warszawa (req.query.search = text to search)
10. GET   /offers/searcher?searchFrom=Wrocław&searchTo=Kraśnik  
    - search for all offers with given cities
11. DELETE/offers/:offerId                           
    - deletes particular users offer (publisher id (auth-token) needed in header request and offer id in path)

## Current structure of project:

-config
    -index.js
-controllers
    -offers.js
    -users.js
-helpers
    -routeHelpers.js
-models
    -offer.js
    -user.js
-node_modules..
-routes
    -offers.js
    -users.js
-test
    -api
        -offers
            -get.js
            -post.js





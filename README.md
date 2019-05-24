Commends:
#npm install
#npm start 

Technologies:
-Node.js
-ExpressJS
-MongoDB
-mongoose

URL: http://localhost:5000/

API Endpoints:
    USER:
POST  /users/signup                 - register a user
POST  /users/signin                 - log in a user
GET   /users                        - list of all users
GET   /users/user                   - shows particular user
PATCH /users/edit-profile           - update particular user by changing at least 1 field
GET   /users/trips                  - shows list of all trip offerts that users are taking part in publisher (user id (auth-token) needed in header request)
GET   /users/book-trip/:offerId     - ask publisher to book an offer and save it in a toAccept array in user(user id (auth-token) needed in header request as user, and offer id needed in path as an offer to book) returns offer
GET   /users/users-to-accept/:offerId - showa a list of unaccepted users wanted to book a trip to partiicular offer (publisher id (auth-token) needed in header request and offer id needed in path)
GET   /users/accept-user/:offerId/:userId - add asking user for a trip (publisher id (auth-token) needed in header request and offer id needed in path and user id needed in a path)
GET   /users/reject-user/:offerId/:userId - disagree for booking a trip by an user(publisher id (auth-token) needed in header request and offer id needed in path and user id needed in a path)
GET   /users/resign-trip/:offerId   - resign an offer and remove it from trips array in user(user id (auth-token) needed in header request as user, and offer id needed in path as an offer to book)

    
    OFFER:
GET   /offers                                       - list of all offers
POST  /offers/add                                   - creates a new offer (publisher id (auth-token) needed in header request)
GET   /offers/published-offers                      - shows list of offers published by user (publisher id (auth-token) needed in header request)
GET   /offers/:offerId                              - shows particular offer
GET   /offers/offer-travellers/:offeriId            - shows offer travellers
PUT   /offers/:id                                   - update particular offer by replacing
PATCH /offers/:id                                   - update particular offer by changing at least 1 field
GET   /offers/searcher-city-from?search=Warszawa    - search for all cities from with Warszawa (req.query.search = text to search)
GET   /offers/searcher-city-to?search=Warszawa      - search for all cities to with Warszawa (req.query.search = text to search)
GET   /offers/searcher?searchFrom=Wrocław&searchTo=Kraśnik      -search for all offers with given cities
DELETE/offers/:offerId                              - deletes particular users offer (publisher id (auth-token) needed in header request and offer id in path)

Current structure of project:

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





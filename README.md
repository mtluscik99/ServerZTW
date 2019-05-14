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
POST  /users/signup      - register a user
POST  /users/signin      - log in a user
GET   /users             - list of all users
GET   /users/user        - shows particular user
PATCH /users/edit-profile- update particular user by changing at least 1 field
GET   /users/trips       - shows list of all trip offerts that users are taking part in publisher (user id (auth-token) needed in header request)
PUT   /users/book-trip/:offerId   - book an offer and save it in a trips array in user(user id (auth-token) needed in header request as user, and offer id needed in path as an offer to book)
    
    OFFER:
GET   /offers             - list of all offers
POST  /offers/add         - creates a new offer (publisher id (auth-token) needed in header request)
GET   /offers/published-offers - shows list of offers published by user (publisher id (auth-token) needed in header request)

GET   /offers/:offerId        - shows particular offer
GET   /offers/offer-travellers/:offeriId        - shows offer travellers
PUT   /offers/:id         - update particular offer by replacing
PATCH /offers/:id         - update particular offer by changing at least 1 field
DELETE/offers/:offerId         - deletes particular users offer (publisher id (auth-token) needed in header request and offer id in path)

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





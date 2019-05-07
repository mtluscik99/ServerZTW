Commends:
#npm install
#npm start

Technologies:
-Node.js
-ExpressJS
-MongoDB
-mongoose

API Endpoints:

POST  /users/signup      - register a user
POST  /users/signin      - log in a user
GET   /users             - list of all users
GET   /users/:id         - shows particular user
PUT   /users/:id         - update particular user by replacing
PATCH /users/:id         - update particular user by changing at least 1 field
GET   /users/:id/trips   - shows list of all trip offerts that users are taking part in

GET   /offers             - list of all offers
POST  /offers             - creates a new offer (publisher id needed in body request)
GET   /offers/:id         - shows particular offer
PUT   /offers/:id         - update particular offer by replacing
PATCH /offers/:id         - update particular offer by changing at least 1 field
DELETE/offers/:id         - deletes particular users offer

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





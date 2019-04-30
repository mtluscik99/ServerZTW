const express = require('express');
//const router = express.Router();
const router= require('express-promise-router')();
const UsersController = require('../controllers/users');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(UsersController.index) 
    .post(validateBody(schemas.userSchema),UsersController.newUser);

// /users/:id
router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUser)
    .put([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema)], UsersController.replaceUser)
    .patch([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema)],UsersController.updateUser);

router.route('/:userId/trips')
    .get(validateParam(schemas.idSchema, 'userId'), UsersController.getUsersBookedTrips)
    //.post([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOfferSchema)], UsersController.newUserBookedTrip);

router.route('/signup')
    .post(validateBody(schemas.userSchema), UsersController.signUp);

router.route('/signin')
    .post(UsersController.signIn);

// router.route('/secret')
//     .get(UsersController.secret);

module.exports = router; 
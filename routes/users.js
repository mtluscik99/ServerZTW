const express = require('express');
const router= require('express-promise-router')();
const UsersController = require('../controllers/users');
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(UsersController.index); 
    //.post(validateBody(schemas.userSchema),UsersController.newUser);

router.route('/user')
    .get(UsersController.getUser);

router.route('/edit-profile')
    .patch(validateBody(schemas.userOptionalSchema), UsersController.updateUser);

router.route('/trips')
    .get( UsersController.getUsersBookedTrips)
    //.post([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOfferSchema)], UsersController.newUserBookedTrip);

router.route('/book-trip/:offerId')
    .get(validateParam(schemas.idSchema, 'offerId'), UsersController.bookTrip);

router.route('/users-to-accept/:offerId')
    .get(validateParam(schemas.idSchema, 'offerId'), UsersController.getUsersToAcceptTrip);

router.route('/accept-user/:offerId/:userId')
    .get([validateParam(schemas.idSchema, 'offerId'), validateParam(schemas.idSchema, 'offerId')],UsersController.acceptUser);

router.route('/reject-user/:offerId/:userId')
    .get([validateParam(schemas.idSchema, 'offerId'), validateParam(schemas.idSchema, 'offerId')], UsersController.rejectUser);

router.route('/resign-trip/:offerId')
    .get(validateParam(schemas.idSchema, 'offerId'), UsersController.resignFromTrip);

router.route('/signup')
    .post(validateBody(schemas.userSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), UsersController.signIn);

module.exports = router; 
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
    
//router.route('/:userId')
    //.get(validateParam(schemas.idSchema, 'userId'), UsersController.getUser)
    //.get(UsersController.getUser)
    //.put([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userSchema)], UsersController.replaceUser)
    //.patch([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOptionalSchema)],UsersController.updateUser);

router.route('/trips')
    .get( UsersController.getUsersBookedTrips)
    .post([validateParam(schemas.idSchema, 'userId'), validateBody(schemas.userOfferSchema)], UsersController.newUserBookedTrip);

router.route('/signup')
    .post(validateBody(schemas.userSchema), UsersController.signUp);

router.route('/signin')
    .post(validateBody(schemas.authSchema), UsersController.signIn);

module.exports = router; 
const express = require('express');
const router = require('express-promise-router')();

const OffersController = require('../controllers/offers');
const {
    validateBody,
    validateParam,
    schemas
} = require('../helpers/routeHelpers');

router.route('/')
    .get(OffersController.index)
    .post(validateBody(schemas.offerSchema), OffersController.newOffer);

router.route('/:offerId')
    .get(validateParam(schemas.idSchema, 'offerId'), OffersController.getOffer)
    .put([validateParam(schemas.idSchema, 'offerId'), validateBody(schemas.putOfferSchema)], OffersController.replaceOffer)
    .patch([validateParam(schemas.idSchema, 'offerId'), validateBody(schemas.patchOfferSchema)], OffersController.replaceOffer)
    .delete(validateParam(schemas.idSchema, 'offerId'), OffersController.deleteOffer);

router.route('/:offerId/travellers')
    .get(validateParam(schemas.idSchema, 'offerId'), OffersController.getOffersTravellers)
    .post([validateParam(schemas.idSchema, 'offerId'), validateBody(schemas.offerUserSchema)], OffersController.newOffersTraveller);
   
    
    module.exports = router; 
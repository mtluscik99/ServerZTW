const express = require('express');
const router = require('express-promise-router')();

const OffersController = require('../controllers/offers');
const {
    validateBody,
    validateParam,
    schemas
} = require('../helpers/routeHelpers');

router.route('/')
    .get(OffersController.index);

router.route('/add')
    .post(validateBody(schemas.offerSchema), OffersController.newOffer);

router.route('/published-offers')
    .get(OffersController.getPublisherOffers);

router.route('/offer-travellers/:offerId')
    .get(validateParam(schemas.idSchema, 'offerId'), OffersController.getOfferTravellers)

router.route('/searcher')
    .get( OffersController.searcherOffer);

router.route('/searcher-city-to')
    .get(OffersController.searcherCityTo);

router.route('/searcher-city-from')
    .get(OffersController.searcherCityFrom);

router.route('/:offerId')
    .get(validateParam(schemas.idSchema, 'offerId'), OffersController.getOffer)
    .put([validateParam(schemas.idSchema, 'offerId'), validateBody(schemas.putOfferSchema)], OffersController.replaceOffer)
    .patch([validateParam(schemas.idSchema, 'offerId'), validateBody(schemas.patchOfferSchema)], OffersController.replaceOffer)
    .delete(validateParam(schemas.idSchema, 'offerId'), OffersController.deleteOffer);
    
    module.exports = router; 
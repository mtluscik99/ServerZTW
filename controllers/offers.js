const Offer = require('../models/offer');
const User = require('../models/user');
var moment = require('moment');

module.exports = {
    index: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);
        // const offers = await Offer.find(publisher.filter(function (item) {
        //     return item != user;
        //     console.log(user);
        // }));
        //console.log(offers);
        const offers = await Offer.find( { });
        console.log(offers);
        res.status(200).json(offers);
    },

    getPublisherOffers: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);
        const offers = await Offer.find({ publisher: user});
        res.status(200).json(offers);
    },

    newOffer: async (req, res, next) => {
        console.log(req.value);
        const id = req.header('auth-token');
        const user = await User.findById(id);
        console.log(req.body.arrivalDate);
        const newOffer = req.body;
        const offer = new Offer(newOffer);
        offer.publisher = user;
        offer.departureDate = "2020-01-01";
        console.log(offer.departureDate);
        console.log(offer.arrivalDate);
        await offer.save();
        res.status(201).json(offer);
    },

    getOffer: async (req, res, next) => {
        const offer = await Offer.findById(req.value.params.offerId);
        res.status(200).json(offer);
    },

    getOfferTravellers: async (req, res, next) => {
        const offer = await Offer.findById(req.value.params.offerId);
        const users = await User.find({ trips: offer });
        res.status(200).json(users);
    },

    replaceOffer: async (req, res, next) => {
        //request of body must contain all the fields
        const { offerId } = req.value.params;
        const newOffer = req.value.body;
        const result = await Offer.findByIdAndUpdate(offerId, newOffer);
        res.status(200).json({ success: true });
    },

    deleteOffer: async(req, res, next) => {
        const { offerId } = req.value.params;
        const offer = await Offer.findById(offerId);
        const id = req.header('auth-token');
        const user = await User.findById(id);
        if (offer.publisher != id) {
            return res.status(403).json({ error: 'You do not have a permission to that operation' });
        }
        const users = await User.find({ trips: offer });
        for(var i = 0; i < users.length; i++){
            var listOfTrips = users[i].trips;
            var listOfTrips = listOfTrips.filter(function (item) {
                return item != offer.id;
            });
            users[i].trips = listOfTrips;
            await users[i].save();
        }
        
        await offer.remove();
        res.status(200).json({ success: true});
    },

    searcherCityFrom: (req, res, next) => {
        Offer.searchCityFrom(req.query.search, function (err, data) {
            console.log(data);
            if (data.length == 0) {
                return res.status(200).json({ sorry: "Offers with given city from not found" });
            }
            res.status(200).json(data);
        })
    },

    searcherCityTo: (req, res, next) => {
        Offer.searchCityTo(req.query.search, function (err, data) {
            console.log(data);
            if (data.length == 0) {
                return res.status(200).json({ sorry: "Offers with given city to not found" });
            }
            res.status(200).json(data);
        })
    },

    searcherOffer: async (req, res, next) => {
        let cityFrom = req.query.searchFrom;
        let cityTo = req.query.searchTo;

        let offers = await Offer.find({cityFrom: cityFrom, cityTo: cityTo});
        console.log(offers);
            if (offers.length == 0) {
                return res.status(200).json({ sorry: "Offers with given cities not found" });
            }
        res.status(200).json(offers);
        
    }


}


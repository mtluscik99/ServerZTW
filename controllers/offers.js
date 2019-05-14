const Offer = require('../models/offer');
const User = require('../models/user');

module.exports = {
    index: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);
        // const offers = await Offer.find(publisher.filter(function (item) {
        //     return item != user;
        //     console.log(user);
        // }));
        //console.log(offers);
        //const offers = await Offer.reduce({ publisher: user });
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
        const newOffer = req.body;
        const offer = new Offer(newOffer);
        offer.publisher = user;
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
    }
}
// Offer.search('Warszawa', function(err, data){
//         console.log(data);
//     })

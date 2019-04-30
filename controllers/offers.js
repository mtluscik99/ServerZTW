const Offer = require('../models/offer');
const User = require('../models/user');

module.exports = {
    index: async (req, res, next) => {
        const offers = await Offer.find({});
        res.status(200).json(offers);
    },

    newOffer: async (req, res, next) => {
        console.log(req.value);
        //find the actual publisher of offer
        const publisher = await User.findById(req.body.publisher);
        //create new offer
        const newOffer = req.body;
        delete newOffer.publisher;
        const offer = new Offer(newOffer);
        offer.publisher = publisher;
        await offer.save();
        //add newly created offer to the actual publisher
        publisher.trips.push(offer);
        await publisher.save();

        res.status(201).json(offer);
    },

    getOffer: async (req, res, next) => {
        const offer = await Offer.findById(req.value.params.offerId);
        res.status(200).json(offer);
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
        //get an offer
        const offer = await Offer.findById(offerId);
        const publisherId = offer.publisher;
        //get the publisher
        const publisher = await User.findById(publisherId);
        //remove an offer
        await offer.remove();
        //remove offer from the users trip list
        publisher.trips.pull(offer);
        res.status(200).json({ success: true});
    },

    getOffersTravellers: async (req, res, next) => {
        const { offerId } = req.value.params;
        const offer = await Ofer.findById(offerId).select('-password').populate('travellers'); //populate() gives whole object, not ony array of id's
        res.status(200).json(offer.travellers);
    },

    newOffersTraveller: async (req, res, next) => {
        const { offerId } = req.value.params;
        //create a new offer
        const newUser = new User(req.value.body);
        //get user
        const offer = await Offer.findById(offerId);
        //assign user to offer publisher
        newUser.publisher = user;
        //Save the offer
        await newOffer.save();
        //add offer to the users's 'trips' array
        user.trips.push(newOffer);
        await user.save();
        res.status(200).json(newOffer);
    }

}
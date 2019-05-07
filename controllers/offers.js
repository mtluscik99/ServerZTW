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
        const offer = new Offer(newOffer);
        offer.publisher = publisher;
        await offer.save();
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
        const offer = await Ofer.findById(offerId).populate('travellers').select('-password'); //populate() gives whole object, not ony array of id's
        res.status(200).json(offer.travellers);
    },

    newOffersTraveller: async (req, res, next) => {
        const { offerId } = req.value.params;
        const offer = await Offer.findById(offerId);
        const user = req.value.body;
        const email = user.email;
        const traveller = await User.find({ email: email});
        //assign user to offer publisher
        offer.travellers.push(traveller.id);
        //Save the offer
        await offer.save();
        //add offer to the users's 'trips' array
        traveller.trips.push(offer);
        await traveller.save();
        res.status(200).json(traveller);
    }

}
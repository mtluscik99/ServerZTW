const User = require('../models/user');
const Offer = require('../models/offer');


module.exports = {
    index: async (req, res, next) => {
       const users = await User.find({});
       res.status(200).json(users);
    },

    newUser: async (req, res, next) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },

    getUser: async (req, res, next) => {
        const { userId } = req.value.params;
        //const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    replaceUser: async (req, res, next) => {
        //request of body must contain all the fields
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    updateUser: async (req, res, next) => {
        //request of body may cantailn any number of fields
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },

    getUsersBookedTrips: async (req, res, next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId).populate('trips'); //populate() gives whole object, not ony array of id's
        res.status(200).json(user.trips);
    },

    newUserBookedTrip: async (req, res, next) => {
        const { userId } = req.value.params;
        //create a new offer
        const newOffer = new Offer(req.value.body);
        //get user
        const user = await User.findById(userId);
        //assign user to offer publisher
        newOffer.publisher = user;
        //Save the offer
        await newOffer.save();
        //add offer to the users's 'trips' array
        user.trips.push(newOffer);
        await user.save();
        res.status(200).json(newOffer);
    }

};
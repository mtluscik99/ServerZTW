const User = require('../models/user');
const Offer = require('../models/offer');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/index');
const bcrypt = require('bcrypt');

signToken = user => {
    return JWT.sign({
        iss: 'TripMate',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}

module.exports = {
    index: async (req, res, next) => {
       const users = await User.find({});
       res.status(200).json(users);
    },

    // newUser: async (req, res, next) => {
    //     const newUser = new User(req.value.body);
    //     const user = await newUser.save();
    //     res.status(201).json(user);
    // },

    getUser: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);
        res.status(200).json(user);
    },

    updateUser: async (req, res, next) => {
        //request of body may cantailn any number of fields
        const id = req.header('auth-token');
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(id, newUser);
        res.status(200).json({ success: true });
    },

    getUsersBookedTrips: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id).populate('trips'); //populate() gives whole object, not ony array of id's
        res.status(200).json(user.trips);
    },

    newUserBookedTrip: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);
        const { offerId } = req.value.params;
        const offer = await Offer.findById(offerId);
        if (offer.seatsLeft < 1) {
            return res.status(403).json({ error: 'We dont have any seats left in this offer'});
        }
        console.log({offer});
        user.trips.push(offer);
        await user.save();
        offer.seatsLeft = offer.seatsLeft - 1;
        await offer.save();
        const offers = await Offer.find({});
        console.log({ offers });
        res.status(200).json(offers);
    },

    resignFromTrip: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);
        const { offerId } = req.value.params;
        const offer = await Offer.findById(offerId);
    
        console.log({ offer });
        console.log({ user });

        var offersToStay = user.trips.filter(function (item) {
            return item != offer.id;
        });
        if (user.trips.length == offersToStay.length){
            return res.status(403).json({ error: 'You did not book any seats here' });
        }
        user.trips = offersToStay;
        await user.save();
        console.log({ user });
        offer.seatsLeft = offer.seatsLeft + 1;
        await offer.save();
        console.log({ offer });
        const offers = await Offer.find({});
        res.status(200).json(offers);
    },

    signUp: async (req, res, next) => {
        const { name, surname, email, password } = req.value.body;
        console.log(req.value.body);
        //Check if there is a user with the same email
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new User({ name, surname, email, password });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();

        res.status(200).json({ newUser });
    },
    
    signIn: async (req, res, next) => {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');       
        // Generate token
        //const token = signToken(user);
        //res.header('auth-token', token).send(user);
        const token = user._id;
        res.status(200).json({token});
    },

   
    

};
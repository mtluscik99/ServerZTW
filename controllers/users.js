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

    newUser: async (req, res, next) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },

    getUser: async (req, res, next) => {
        //const { userId } = req.value.params;
        const id = req.headers['auth-token'];
        const user = await User.findById(id);
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
       // const newOffer = await Offer(req.value.body);
        //get user
        const user = await User.findById(userId);
       // const offer = req.value.body;
        const offer = req.value.body;
        const offerId = offer._id;
        const offerToTrips = await Offer.findById(offerId);
        //assign user to offer publisher
        //newOffer.publisher = user;
        //Save the offer
        //await newOffer.save();
        //add offer to the users's 'trips' array
        user.trips.push(offerToTrips);
        await user.save();
        offerToTrips.travellers.push(user);
        await offerToTrips.save();
        res.status(200).json(offerToTrips, user);
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
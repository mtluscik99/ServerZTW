const User = require('../models/user');
const Offer = require('../models/offer');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/index');

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
        //newUser.hash = bcrypt.hashSync(req.value.password, 10);
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
        const newOffer = await Offer(req.value.body);
        //get user
        const user = await User.findById(userId);
        const offer = await Offer.findById(newOffer);
        //assign user to offer publisher
        //newOffer.publisher = user;
        //Save the offer
        await newOffer.save();
        //add offer to the users's 'trips' array
        user.trips.push(offer);
        await user.save();
        res.status(200).json(offer);
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
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);

        // Respond with token
        res.status(200).json({ token });
    },
    
    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

   
    

};
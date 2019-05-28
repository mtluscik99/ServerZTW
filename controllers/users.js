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

    bookTrip: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);
        const { offerId } = req.value.params;
        const offer = await Offer.findById(offerId);
        if (offer.seatsLeft < 1) {
            return res.status(403).json({ error: 'We dont have any seats left in this offer' });
        }
        console.log({ offer });
        user.toAccept.push(offer);
        await user.save();
        res.status(200).json(offer);
    },

    getUsersToAcceptTrip: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);
        const { offerId } = req.value.params;
        const offer = await Offer.findById(offerId);
        const offers = await Offer.find({ publisher: user});
        console.log({ offers });
        const users = await User.find({ toAccept: offer});
        console.log({ users });
   
        // var result = [];
        // for(var i =0; i < users.length; i++){
        //     var listOfTrips = users[i].toAccept;
        //     var listOfTrips = listOfTrips.filter(function (item) {
        //         return item == offer.id;
        //     });
        //     if(listOfTrips !=0 ){
        //     result.push(listOfTrips);
        //     }
        // }
        res.status(200).json(users);
    },

    getAllUsersToAccept: async (req, res, next) => {
        const id = req.header('auth-token');
        const user = await User.findById(id);
        const offers = await Offer.find({ publisher: user });
        const users = await User.find({}).populate('toAccept');
        
        var resultOffers =[];
        var resultUsers = [];
        var offersIds =[];
        for (var i = 0; i < users.length; i++) {
            var usertoPrint;
            var output = users[i].toAccept;
            var output= output.filter(function (value) { 
                if (value.publisher == id){
                    offersIds = offersIds.concat(value.id);
                }
                return value.publisher == id; })
            if(output.length > 0 ){
            usertoPrint = users[i];
            resultUsers = resultUsers.concat(usertoPrint);
            resultOffers = resultOffers.concat(output);
            }
        }
        //console.log({ offersIds });
        console.log({ resultUsers });
        //console.log({ resultOffers });
    
        res.status(200).json(resultUsers);
    },

    acceptUser: async (req, res, next) => {
        const id = req.header('auth-token');
        const publisher = await User.findById(id);
        const { offerId } = req.value.params;
        const offer = await Offer.findById(offerId);
        const userId = req.params.userId;
        const user = await User.findById(userId);
        console.log({user});
        if (offer.seatsLeft < 1) {
            return res.status(403).json({ error: 'You dont have any seats left in this offer now'});
        }
        console.log({offer});
        console.log(user.toAccept);
        // if (!user.find({toAccept: offer})){
        //     return res.status(403).json({ error: 'This user did not book any seats here :o' });
        // }
        var toAcceptList = user.toAccept;
        var toAcceptList = toAcceptList.filter(function (item) {
            return item != offer.id;
        });
        user.toAccept = toAcceptList;
        await user.save();
        user.trips.push(offer);
        await user.save();
        offer.seatsLeft = offer.seatsLeft - 1;
        await offer.save();
        const users = await User.find({ toAccept: offer });
        console.log({ users });
        res.status(200).json(users);
    },

    rejectUser: async (req, res, next) => {
        const id = req.header('auth-token');
        const publisher = await User.findById(id);
        const { offerId } = req.value.params;
        const offer = await Offer.findById(offerId);
        const userId = req.params.userId;
        const user = await User.findById(userId);
        var toAcceptList = user.toAccept;
        var toAcceptList = toAcceptList.filter(function (item) {
            return item != offer.id;
        });
        user.toAccept = toAcceptList;
        await user.save();
        const users = await User.find({ toAccept: offer });
        res.status(200).json(users);

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
        const { name, surname, email, password, phone, aboutMe } = req.value.body;
        console.log(req.value.body);
        //Check if there is a user with the same email
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({ error: 'Email is already in use' });
        }

        // Create a new user
        const newUser = new User({ name, surname, email, password, phone, aboutMe });
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
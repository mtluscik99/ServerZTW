const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    
    cityFrom: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    cityTo: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    seatsLeft: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    departureDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    arrivalDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    description: {
        type: String,
        required: false,
        maxlength: 500
    },
    travellers: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});


offerSchema.index({ '$**': 'text'});

const Offer = mongoose.model('offer', offerSchema);
module.exports = Offer;
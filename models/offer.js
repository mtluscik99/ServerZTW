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
        min: 0,
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
    }
});


offerSchema.index({ '$**': 'text'});

offerSchema.statics = {
    searchPartial: function (q, callback) {
        return this.find({
            $or: [
                { "cityFrom": new RegExp(q, "gi") },
                { "cityTo": new RegExp(q, "gi") },
                { "description": new RegExp(q, "gi") },
            ]
        }, callback);
    },

    searchFull: function (q, callback) {
        return this.find({
            $text: { $search: q, $caseSensitive: false }
        }, callback)
    },

    search: function (q, callback) {
        this.searchFull(q, (err, data) => {
            if (err) return callback(err, data);
            if (!err && data.length) return callback(err, data);
            if (!err && data.length === 0) return this.searchPartial(q, callback);
        });
    },
}

const Offer = mongoose.model('offer', offerSchema);
module.exports = Offer;
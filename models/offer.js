const mongoose = require('mongoose');
var moment = require('moment');
var DateOnly = require('mongoose-dateonly')(mongoose);

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
        type: String,
        required: true
        //default: Date.now()
    },
    arrivalDate: {
        type: String,
        required: true
        //default: Date.now()
    },
    description: {
        type: String,
        required: false,
        maxlength: 500
    }
});


offerSchema.index({ '$**': 'text'});

offerSchema.statics = {
    searchPartialCityFrom: function (q, callback) {
        return this.find({
            $or: [
                { "cityFrom": new RegExp(q, "gi") },
            ]
        }, callback);
    },

    searchPartialCityTo: function (q, callback) {
        return this.find({
            $or: [
                { "cityTo": new RegExp(q, "gi") },
            ]
        }, callback);
    },

    searchFull: function (q, callback) {
        return this.find({
            $text: { $search: q, $caseSensitive: false }
        }, callback)
    },

    searchCityFrom: function (q, callback) {
        this.searchFull(q, (err, data) => {
            if (err) return callback(err, data);
            if (!err && data.length) return callback(err, data);
            if (!err && data.length === 0) return this.searchPartialCityFrom(q, callback);
        });
    },

    searchCityTo: function (q, callback) {
        this.searchFull(q, (err, data) => {
            if (err) return callback(err, data);
            if (!err && data.length) return callback(err, data);
            if (!err && data.length === 0) return this.searchPartialCityTo(q, callback);
        });
    },
}

const Offer = mongoose.model('offer', offerSchema);
module.exports = Offer;
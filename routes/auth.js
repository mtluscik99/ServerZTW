const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
//const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');

const { User } = require('../models/user');
//const mongoose = require('mongoose');
//const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, 'jtwPrivateKey');
    res.header('auth-token', token).send(user._id, user.name, user.surname, user.email);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    };

    return Joi.validate(req, schema);
}

module.exports = router; 





// const router = require('express-promise-router')();

// const UsersController = require('../controllers/users');
// const {
//     validateBody,
//     validateParam,
//     schemas
// } = require('../helpers/routeHelpers');

// router.route('/')
//     .post(validateBody(schemas. authSchema),UsersController.auth);

// module.exports = router; 

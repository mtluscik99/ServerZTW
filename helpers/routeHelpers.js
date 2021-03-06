const Joi = require('joi');

module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({ param: req['params'][name]}, schema);
            if(result.error){
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['params'])
                    req.value['params'] = {};
                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate( req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value['body'])
                    req.value['body'] = {};
                req.value['body'] = result.value;
                next();
            }
        }
    },

    schemas: {

        userSchema:Joi.object().keys({
            name: Joi.string().required(),
            surname: Joi.string().required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(1024).required(),
            phone: Joi.string().required(),
            aboutMe: Joi.string().optional().max(1024)
        }),

        userOptionalSchema: Joi.object().keys({
            name: Joi.string().optional(),
            surname: Joi.string().optional(),
            email: Joi.string().min(5).max(255).optional().email(),
            password: Joi.string().min(5).max(1024).optional(),
            phone: Joi.string().optional(),
            aboutMe: Joi.string().optional().max(1024)
        }),

        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        offerUserSchema: Joi.object().keys({
            email: Joi.string().min(5).max(255).required().email()
        }),

        userOfferSchema: Joi.object().keys({
            //_id: Joi.string().required(),
            cityFrom: Joi.string().required(),
            cityTo: Joi.string().required(),
            seatsLeft: Joi.number().min(1).max(6).required(),
            departureDate: Joi.string(),
            arrivalDate: Joi.string(),
            description: Joi.string().max(500).optional()
        }),

        offerSchema: Joi.object().keys({
            //publisher: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            cityFrom: Joi.string().required(),
            cityTo: Joi.string().required(),
            seatsLeft: Joi.number().min(1).max(6).required(),
            departureDate: Joi.string(),
            arrivalDate: Joi.string(),
            description: Joi.string().max(500).optional()
        }),
        putOfferSchema: Joi.object().keys({
            cityFrom: Joi.string().required(),
            cityTo: Joi.string().required(),
            seatsLeft: Joi.number().min(1).max(6).required(),
            departureDate: Joi.string(),
            arrivalDate: Joi.string(),
            description: Joi.string().max(500).optional()
        }),
        patchOfferSchema: Joi.object().keys({
            cityFrom: Joi.string().optional(),
            cityTo: Joi.string().optional(),
            seatsLeft: Joi.number().min(1).max(6).optional(),
            departureDate: Joi.string(),
            arrivalDate: Joi.string(),
            description: Joi.string().max(500).optional()
        }),
        authSchema: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required()
        })
    }
}
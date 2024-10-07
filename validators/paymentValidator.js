const Joi = require('joi');

const paymentSchema = Joi.object({
    userId: Joi.number().integer().required(),
    valorTotal: Joi.number().precision(2).positive().required()
});

module.exports = {
    validatePayment: (req, res, next) => {
        const { error } = paymentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    }
};

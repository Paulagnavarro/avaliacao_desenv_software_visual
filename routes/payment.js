var express = require('express');
var router = express.Router();
const auth = require('../auth');

const db = require('../models');
const PaymentService = require('../services/paymentService');
const PaymentController = require('../controllers/paymentController');

const paymentService = new PaymentService(db.Transaction);
const paymentController = new PaymentController(paymentService);
const paymentValidator = require('../validators/paymentValidator');

// Pagamento - cartão de crédito
router.post('/credit-card', auth.verifyToken, paymentValidator.validatePayment, async (req, res) => {
    paymentController.creditCardPayment(req, res);
});

// Pagamento - PIX
router.post('/pix', auth.verifyToken, paymentValidator.validatePayment, async (req, res) => {
    paymentController.pixPayment(req, res);
});

// Consultar status da transação
router.get('/status/:transactionId', auth.verifyToken, async (req, res) => {
    paymentController.getTransactionStatus(req, res);
});

module.exports = router;

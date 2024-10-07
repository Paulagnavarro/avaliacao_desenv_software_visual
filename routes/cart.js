var express = require('express');
var router = express.Router();

const db = require('../models');
const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');

const cartService = new CartService(db.Cart, db.Product);
const cartController = new CartController(cartService);

// Adicionar um produto na cesta
router.post('/add', async (req, res) => {
    cartController.addItemToCart(req, res);
});

// Remover um produto da cesta
router.delete('/remove/:id', async (req, res) => {
    cartController.removeItemFromCart(req, res);
});

// Visualizar a cesta
router.get('/', async (req, res) => {
    cartController.getCart(req, res);
});

module.exports = router;

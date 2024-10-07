var express = require('express');
var router = express.Router();

const db = require('../models');
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

// Criação de um novo produto
router.post('/', async (req, res) => {
    productController.createProduct(req, res);
});

// Listar todos os produtos
router.get('/', async (req, res) => {
    productController.getAllProducts(req, res);
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
    productController.updateProduct(req, res);
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
    productController.deleteProduct(req, res);
});

module.exports = router;

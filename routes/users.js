var express = require('express');
var router = express.Router();
const auth = require('../auth');
const db =require('../models')

const UserService = require('../services/userService');
const UserController = require('../controllers/userController');

const userService = new UserService(db.User);
const userController = new UserController(userService);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Módulo de usuários rodando.');
});

// login
router.post('/login', async(req,res)=>{
  userController.login(req,res);
});

// Registrar novo usuário
router.post('/novouser', async (req,res)=>{
  userController.createUser(req,res);
});

// Retornar todos os usuários
router.get('/allusers', auth.verifyToken, async(req,res)=>{
  userController.findAllUsers(req,res);
});

// Retonar um usuário pelo id
router.get('/getUserById', async (req,res)=>{
  userController.findUserById(req,res);
});

module.exports = router;

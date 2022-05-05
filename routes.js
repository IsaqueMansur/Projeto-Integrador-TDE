const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const publicarController = require("./src/controllers/publicarController");

const { loginRequired, admRequired } = require('./src/middlewares/middleware');

//ROTAS HOME
route.get('/', homeController.index);

//ROTAS LOGIN
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/register', loginRequired, admRequired, loginController.indexCadastro);
route.post('/login/register', loginRequired, admRequired, loginController.register);
route.get('/login/logout', loginController.logout);

//ROTAS PUBLICAR
route.get('/publicar/index', loginRequired, publicarController.index);
/* route.post('/publicar/publicar', loginRequired, publicarController.publicar); */




module.exports = route;

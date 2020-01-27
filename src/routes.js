const {Router} = require('express');
const routes = Router();

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const axios = require('axios');

routes.delete('/devs/:id',DevController.remove)
routes.get('/search',SearchController.index)
routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)

module.exports = routes;
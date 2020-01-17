const {Router} = require('express');
const routes = Router();
const Dev = require('./models/Dev');
const axios = require('axios');

routes.delete('/devs/:id', async (request, response) => {
    console.log(request.params.id);
    try {
        
        await Dev.deleteOne({_id: request.params.id});
    } catch (error) {
        console.log(error);
        return response.status(422).json({message: error})

        
    }

   return response.status(200).json({message: "User deleted."})
})
routes.post('/devs', async (request,response) => {
    console.log(request.body);
    const {github_username, techs, latitude, longitude} = request.body;
    const techsArray = techs.split(',').map(tech => tech.trim());
    const gitResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    const {name = login ,avatar_url, bio } = gitResponse.data;
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    console.log(name);
    console.log(avatar_url);
    console.log(bio);
    const savedDev = await Dev.create({
        github_username,
        name,
        avatar_url,
        techs: techsArray,
        bio,
        location
    })

    return response.status(200).json(savedDev);
})

module.exports = routes;
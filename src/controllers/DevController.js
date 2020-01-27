const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray')
const axios = require('axios')
module.exports = {
    async index(request,response) {
        const devs = await Dev.find();

        return response.json(devs);
    },
    async store(request,response) {
        console.log(request.body);
        const {github_username, techs, latitude, longitude} = request.body;
        let dev = await Dev.findOne({github_username});
        if(!dev){

            const techsArray = parseStringAsArray(techs);
            const gitResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login ,avatar_url, bio } = gitResponse.data;
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            }
            console.log(name);
            console.log(avatar_url);
            console.log(bio);
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                techs: techsArray,
                bio,
                location
            })
        }
        return response.status(200).json(dev);
    },

    async remove(request, response){
        console.log(request.params.id);
        try {
            
            await Dev.deleteOne({_id: request.params.id});
        } catch (error) {
            console.log(error);
            return response.status(422).json({message: error})
    
            
        }
    
       return response.status(200).json({message: "User deleted."})
    }
};
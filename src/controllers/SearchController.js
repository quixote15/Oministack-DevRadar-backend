const parseStringAsArray = require('../Utils/parseStringAsArray')
const Dev = require('../models/Dev');
module.exports = {
    async index(request, response){
        // Buscar todos devs num raio de 10km
        // filtrar por tecnologias
        console.log(request.query)
        const {latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })

        console.log(longitude)
        console.log(latitude)
        console.log(techsArray)

        return response.json({devs})
    }
}
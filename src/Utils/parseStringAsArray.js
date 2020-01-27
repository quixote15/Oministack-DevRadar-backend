module.exports = function parseStringAsArray(input){
return input.split(',').map(tech => tech.trim());
}
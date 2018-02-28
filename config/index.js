let environment = process.env.ENV || 'development';

module.exports = require(`./${environment}`);

const config = require("../../../knexfile");
const knex = require("knex");

const connection = knex(config[process.env.ENVIRONMENT]);

module.exports = connection;

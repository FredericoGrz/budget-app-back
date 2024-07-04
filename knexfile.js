const path = require("path");
require("dotenv/config");

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_CONN,
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
    seeds: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL, // Utilize variáveis de ambiente para produção
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "knex", "seeds"),
    },
    useNullAsDefault: true,
  },
};

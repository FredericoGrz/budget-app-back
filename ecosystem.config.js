require("dotenv").config();
module.exports = {
  apps: [
    {
      name: "app",
      script: "./src/server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: process.env.ENVIRONMENT,
        PORT: process.env.PORT,
        DATABASE_URL: process.env.DB_CONN,
        AUTH_SECRET: process.env.AUTH_SECRET,
      },
      env_production: {
        NODE_ENV: process.env.ENVIRONMENT,
        PORT: process.env.PORT,
        DATABASE_URL: process.env.DB_CONN,
        AUTH_SECRET: process.env.AUTH_SECRET,
      },
    },
  ],
};

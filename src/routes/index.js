const { Router } = require("express");

// Todas as rotas
const userRoutes = require("./users.router");
const sessionsRoutes = require("./sessions.router");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;

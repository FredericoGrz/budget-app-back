const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// Todas as rotas
const userRoutes = require("./users.router");
const sessionsRoutes = require("./sessions.router");
const expensesRoutes = require("./expenses.router");
const incomesRoutes = require("./incomes.router");
const budgetRoutes = require("./budget.router");

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/expenses", ensureAuthenticated, expensesRoutes);
routes.use("/incomes", ensureAuthenticated, incomesRoutes);
routes.use("/budget", ensureAuthenticated, budgetRoutes);

module.exports = routes;

const { Router } = require("express");
const BudgetController = require("../controller/BudgetController");

const budgetRoutes = Router();
const budgetController = new BudgetController();

budgetRoutes.get("/", budgetController.index);

module.exports = budgetRoutes;

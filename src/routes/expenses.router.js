const { Router } = require("express");

const ExpenseController = require("../controller/ExpenseController");

const expensesRoutes = Router();
const expenseController = new ExpenseController();

expensesRoutes.get("/", expenseController.index);
expensesRoutes.get("/:id", expenseController.show);
expensesRoutes.post("/", expenseController.create);
expensesRoutes.put("/:id", expenseController.update);
expensesRoutes.delete("/:id", expenseController.delete);

module.exports = expensesRoutes;

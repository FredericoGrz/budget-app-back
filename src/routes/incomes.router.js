const { Router } = require("express");

const IncomeController = require("../controller/IncomeController");

const incomesRoutes = Router();
const incomeController = new IncomeController();

incomesRoutes.get("/", incomeController.index);
incomesRoutes.get("/:id", incomeController.show);
incomesRoutes.post("/", incomeController.create);
incomesRoutes.put("/:id", incomeController.update);
incomesRoutes.delete("/:id", incomeController.delete);

module.exports = incomesRoutes;

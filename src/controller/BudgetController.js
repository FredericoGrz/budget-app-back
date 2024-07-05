const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class BudgetController {
  async index(req, res) {
    try {
      const { id: user_id } = req.user;

      const expenses = await knex("expenses").where({ user_id });
      const incomes = await knex("incomes").where({ user_id });

      const totalExpenses = expenses.reduce(
        (acc, expense) => acc + Number(expense.value),
        0
      );
      const totalIncomes = incomes.reduce(
        (acc, income) => acc + Number(income.value),
        0
      );
      const totalBudget = totalIncomes - totalExpenses;

      res.status(200).json({ totalBudget, expenses: totalExpenses });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = BudgetController;

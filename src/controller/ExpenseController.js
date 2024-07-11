const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class ExpenseController {
  async index(req, res) {
    try {
      const { id: user_id } = req.user;

      let expenses = await knex("expenses")
        .where({ user_id })
        .orderBy("created_at", "desc");

      res.status(200).json(expenses);
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async show(req, res) {
    try {
      const { id: user_id } = req.user;
      const { id } = req.params;

      const expense = await knex("expenses").where({ id, user_id }).first();

      if (!expense) throw new AppError("Expense not found", 404);

      res.status(200).json(expense);
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async create(req, res) {
    try {
      const { id: user_id } = req.user;
      const { value, description } = req.body;

      const allRequiredFieldAvailable = value && description;

      if (!allRequiredFieldAvailable)
        throw new AppError("All required field must be provided", 400);

      if (typeof value !== "number")
        throw new AppError("Value must be a number", 400);
      if (typeof description !== "string")
        throw new AppError("Description must be a text", 400);

      await knex("expenses").insert({
        user_id,
        value,
        description,
      });
      console.log(res);
      res.status(201).json({ teste: "AAA" });
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async update(req, res) {
    try {
      const { id: user_id } = req.user;
      const { id } = req.params;
      const { value, description } = req.body;

      const allRequiredFieldAvailable = id && value && description;

      if (!allRequiredFieldAvailable)
        throw new AppError("All required field must be provided", 400);

      if (typeof value !== "number")
        throw new AppError("Value must be a number", 400);
      if (typeof description !== "string")
        throw new AppError("Description must be a text", 400);

      const updated_at = knex.fn.now();

      const updatedExpense = await knex("expenses")
        .where({ id, user_id })
        .update({ value, description, updated_at })
        .returning("*");

      if (updatedExpense[0] === undefined)
        throw new AppError("Expense not found", 404);

      res.status(200).json(updatedExpense[0]);
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async delete(req, res) {
    try {
      const { id: user_id } = req.user;
      const { id } = req.params;

      await knex("expenses").where({ id, user_id }).delete();

      res.status(204).send();
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = ExpenseController;

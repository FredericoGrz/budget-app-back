const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class IncomeController {
  async index(req, res) {
    try {
      const { id: user_id } = req.user;

      let incomes = await knex("incomes")
        .where({ user_id })
        .orderBy("created_at", "desc");

      res.status(200).json(incomes);
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async show(req, res) {
    try {
      const { id: user_id } = req.user;
      const { id } = req.params;

      const income = await knex("incomes").where({ id, user_id }).first();

      if (!income) throw new AppError("Expense not found", 404);

      res.status(200).json(income);
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

      await knex("incomes").insert({
        user_id,
        value,
        description,
      });

      res.status(201).json({ message: "Created" });
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

      const updatedIncome = await knex("incomes")
        .where({ id, user_id })
        .update({ value, description, updated_at })
        .returning("*");

      if (updatedIncome[0] === undefined)
        throw new AppError("Expense not found", 404);

      res.status(200).json(updatedIncome[0]);
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async delete(req, res) {
    try {
      const { id: user_id } = req.user;
      const { id } = req.params;

      await knex("incomes").where({ id, user_id }).delete();

      res.status(204).send();
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = IncomeController;

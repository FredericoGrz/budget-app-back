const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UserController {
  // Método de criar um novo Usuario
  async create(req, res) {
    try {
      let { name, email, password } = req.body;
      const allRequiredDataAvailable = name && email && password;

      if (!allRequiredDataAvailable) {
        throw new AppError("Por favor preencha todos os campos necessários!");
      }

      email = email.toLowerCase();

      const user = await knex("users").where({ email }).first();

      //Se o email já existe
      if (user) throw new AppError("Email já cadastrado");
      else {
        const hashedPassword = await hash(password, 10);

        //Insere um novo usuário
        await knex("users").insert({ name, email, password: hashedPassword });

        res.status(201).json({ message: "Created" });
      }
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = UserController;

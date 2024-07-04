const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionController {
  async create(req, res) {
    try {
      let { email, password } = req.body;
      // Valida se email e senha foram preenchidos
      if (!email || !password) {
        throw new AppError("Email and password are required", 400);
      }

      email = email.toLowerCase(); // Converte o email para minúsculo para evitar duplicidade de email

      // Busca o usuário pelo email
      const user = await knex("users").where({ email }).first();

      // Valida se o usuário existe e a senha é válida
      if (!user || !(await compare(password, user.password))) {
        throw new AppError("Invalid email or password", 401);
      }

      // Gera um token JWT
      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: String(user.id),
        expiresIn,
      });

      delete user.password;
      delete user.created_at;
      delete user.updated_at;

      res.status(200).json({ user, token });
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = SessionController;

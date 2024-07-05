exports.up = function (knex) {
  return knex.schema.createTable("incomes", function (table) {
    table.increments("id").primary(); // ID auto-incrementado
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users"); // ID do usuário, assumindo que existe uma tabela 'users'
    table.decimal("value", 10, 2).notNullable(); // Valor com até 10 dígitos e 2 casas decimais
    table.string("description").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("incomes");
};

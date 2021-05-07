
exports.up = function(knex) {
  return knex.schema.createTable("theaters", (table) => {
      table.increments("theater_id").primary();
      table.text("name");
      table.text("address_line_1");
      table.text("address_line_2");
      table.text("city");
      table.text("state");
      table.text("zip");
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("theaters");
};

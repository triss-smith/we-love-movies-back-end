
exports.up = function(knex) {
  return knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary();
      table.text("preferred_name");
      table.text("surname");
      table.text("organization_name");
      table.timestamps(true,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("critics");
};

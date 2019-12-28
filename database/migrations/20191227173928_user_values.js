
exports.up = function(knex) {
  return knex.schema.createTable('user_values',tbl=>{
    tbl.increments();

    tbl.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE") 
      .onUpdate("CASCADE");

    tbl.string('value_name',255)
      .notNullable();

    tbl.string('color',255)
      .notNullable();

    tbl.string('importance_description',511);

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_values');
};

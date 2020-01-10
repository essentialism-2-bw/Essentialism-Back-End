
exports.up = function(knex) {
  return knex.schema.createTable('projects',tbl=>{
    tbl.increments();

    tbl.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE") 
      .onUpdate("CASCADE");

    tbl.string('project_title',255)
      .notNullable();

    tbl.string('project_description',511);

    tbl.integer("user_values_id")
      .unsigned()
      .references("id")
      .inTable("user_values")
      .onDelete("CASCADE") 
      .onUpdate("CASCADE");
      
    tbl.boolean('completed')
      .defaultTo(false);

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects');
};

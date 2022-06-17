/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments('project_id')
            tbl.string('project_name').notNullable()
            tbl.text('project_description')
            tbl.boolean('project_completed').defaultTo(false)
        })  
        .createTable('resources', tbl => {
            tbl.increments('resource_id')
            tbl.string('resource_name').unique().notNullable()
            tbl.string('resource_description')
        })
        .createTable('tasks', tbl => {
            tbl.increments('task_id')
            tbl.string('task_description').notNullable()
            tbl.string('task_notes')
            tbl.boolean('task_completed').defaultTo(0)
            tbl.integer('project_id').notNullable()
                .references('project_id').inTable('projects')
                .onUpdate('CASCADE').onDelete('CASCADE')
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('projects')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
};

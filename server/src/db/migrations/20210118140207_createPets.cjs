/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("pets", (table) => {
    table.bigIncrements("id").primary()
    table.string("name").notNullable()
    table.boolean("available").notNullable()
    table.integer("weight")
    table.integer("estimatedAge")
    table.bigInteger("speciesId").unsigned().index().references("species.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("pets")
}

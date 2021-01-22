const Model = require("./Model.js")

class Pet extends Model {
  static get tableName() {
    return "pets"
  }

  static get relationMappings() {
    const Species = require("./Species.js")

    return {
      species: {
        relation: Model.BelongsToOneRelation,
        classModel: Species,
        join: {
          from: "pets.speciesId",
          to: "species.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      additionalProperties: false,
      required: ["name", "available"],
      properties: {
        name: { type: "string" },
        available: { type: ["boolean", "string"] },
        weight: { type: ["integer", "string"] },
        estimatedAge: { type: ["integer", "string"] },
        speciesId: { type: ["integer", "string"] }
      }
    }
  }
}

module.exports = Pet

const Model = require("./Model.js")

class Species extends Model {
  static get tableName() {
    return "species"
  }

  static get relationMappings() {
    const Pet = require("./Pet.js")

    return {
      pets: {
        relation: Model.HasManyRelation,
        modelClass: Pet,
        join: {
          from: "species.id",
          to: "pets.speciesId"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      additionalProperties: false,
      required: ["name"],
      properties: {
        name: { type: "string" }
      }
    }
  }
}

module.exports = Species

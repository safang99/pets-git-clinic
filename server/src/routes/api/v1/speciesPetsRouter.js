import express from "express"
import objection, { ValidationError } from "objection"

import { Pet } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const speciesPetsRouter = new express.Router({ mergeParams: true })

speciesPetsRouter.post("/", async (req, res) => {
  const speciesId = req.params.id
  const cleanInput = cleanUserInput(req.body)
  cleanInput.speciesId = speciesId

  try {
    const newPet = await Pet.query().insertAndFetch(cleanInput)
    return res.status(201).json({ pet: newPet })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default speciesPetsRouter

import express from "express"

import { Species } from "../../../models/index.js"
import speciesPetsRouter from "./speciesPetsRouter.js"

const speciesRouter = new express.Router()

speciesRouter.use("/:id/pets", speciesPetsRouter)

speciesRouter.get("/", async (req, res) => {
  try {
    const species = await Species.query()
    return res.status(200).json({ species: species })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

speciesRouter.get("/:id", async (req, res) => {
  const id = req.params.id

  try {
    const species = await Species.query().findById(id).throwIfNotFound()
    species.pets = await species.$relatedQuery("pets")
    return res.status(200).json({ species: species })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default speciesRouter

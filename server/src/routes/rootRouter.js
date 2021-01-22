import express from "express"

import speciesRouter from "./api/v1/speciesRouter.js"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/species", speciesRouter)
rootRouter.use("/", clientRouter)

export default rootRouter

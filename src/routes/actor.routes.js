import { Router } from 'express'
import { createActor, deleteActor, getAllActors, getOneActor, updateActor } from '../controllers/actor.controllers.js'

const router = Router()

router.get("/actors", getAllActors)
router.get("/actor/:id", getOneActor)
router.post("/actor", createActor)
router.put("/actor/:id", updateActor)
router.delete("/actor/:id", deleteActor)

export default router
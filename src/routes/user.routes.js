import { Router } from 'express'
import { createUser, deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user.controllers.js'
import validateCreateUserDTO from '../dto/validateCreateUserDTO.js'

const router = Router()

router.get("/users", getAllUsers)
router.get("/user/:id", getOneUser)
router.post("/user", validateCreateUserDTO, createUser)
router.put("/user/:id", updateUser)
router.delete("/user/:id", deleteUser)


export default router
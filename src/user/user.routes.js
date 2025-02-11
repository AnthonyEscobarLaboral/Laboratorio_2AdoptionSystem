import { Router } from "express"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"
import { getUserById, getUsers, deleteUser, updatePassword, updateUser, updateProfilePicture } from "./user.controller.js"
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator,updateProfilePictureValidator } from "../middlewares/user-validators.js"

const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

router.patch("/updateProfilePicture/:uid",uploadProfilePicture.single("profilePicture"),
updateProfilePictureValidator,updateProfilePicture)

export default router

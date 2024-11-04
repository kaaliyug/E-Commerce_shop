import Router from "express";
const router = Router();
import * as authControllers from "../controllers/user.controller.js"
import auth from "../middleware/auth_middleware.js";
import admin from "../middleware/admin.middleware.js";

// Get Methods
// router.route("/").get(authControllers.home);
// router.route("/login").post(authControllers.verifyUser, authControllers.loginUser)

// Post Methods
router.route("/register").post(authControllers.registerUser);
router.route("/login").post(authControllers.loginUser)
// put method
router.route("/updateProfile").put(auth, authControllers.updateProfile)
router.route("/changePassword").put(auth, authControllers.changePassword)
router.route("/toggleBlock/:userId").put(admin, authControllers.toggleBlock)
router.route("/update").put(admin, authControllers.updateUser)
// get method
router.route("/getall/:searchTerm?").get(admin, authControllers.getAll)
router.route("/getById/:userId").get(admin, authControllers.getUserId)




export default router
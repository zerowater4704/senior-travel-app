import { Router } from "express";
import { createUser, loginUser } from "../controllers/user-controllers";

const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);

export default router;

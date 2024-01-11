import express from 'express';
import { validateJwtMiddleware } from '../auth/passport';
import { authController } from '../controllers/auth.controller';

const router = express.Router();

router.post("/login", authController.login);
router.get("/logout", validateJwtMiddleware, authController.logout);

export default router;


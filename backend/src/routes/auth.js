import express from 'express';
import { register, login } from '../controllers/auth.js';
import { registerValidation, loginValidation } from '../utils/validation.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;
import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/users.js';
import { verifyToken, authorize, validateRole } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken, authorize('admin'));

router.get('/', getAllUsers);
router.put('/:id', validateRole, updateUser);
router.delete('/:id', deleteUser);

export default router;
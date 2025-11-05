import express from 'express';
import { 
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket
} from '../controllers/tickets.js';
import { verifyToken, authorize } from '../middleware/auth.js';
import { ticketValidation } from '../utils/validation.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', ticketValidation, createTicket);
router.get('/', getTickets);
router.get('/:id', getTicket);
router.put('/:id', ticketValidation, updateTicket);
router.delete('/:id', authorize('admin'), deleteTicket);

export default router;
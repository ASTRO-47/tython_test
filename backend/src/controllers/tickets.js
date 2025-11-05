import { validationResult } from 'express-validator';
import { Ticket } from '../models/ticket.js';

export const createTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      user_id: req.user.id
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Error creating ticket' });
  }
};

export const getTickets = async (req, res) => {
  try {
    console.log('alllllo from tickets');
    

    const tickets = await Ticket.findAll(req.user.id, req.user.role);
    res.json(tickets);
  } catch (error) {
    console.error('Error getting tickets:', error);
    res.status(500).json({ message: 'Error retrieving tickets' });
  }
};

export const getTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (req.user.role === 'user' && ticket.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Error getting ticket:', error);
    res.status(500).json({ message: 'Error retrieving ticket' });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description, status } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const updatedTicket = await Ticket.update(
      id,
      { title, description, status },
      req.user.id,
      req.user.role
    );

    if (!updatedTicket) {
      return res.status(403).json({ message: 'Not authorized to update this ticket' });
    }

    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ message: 'Error updating ticket' });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await Ticket.delete(id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Error deleting ticket' });
  }
};
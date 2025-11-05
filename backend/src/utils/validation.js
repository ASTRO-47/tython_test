import { body } from 'express-validator';

export const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['user', 'support', 'admin'])
    .withMessage('Invalid role specified')
];

export const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
];

export const ticketValidation = [
  // body('title')
  //   .trim()
  //   .isLength({ min: 3, max: 255 })
  //   .withMessage('Title must be between 3 and 255 characters'),
  // body('description')
  //   .optional()
  //   .trim(),
  // body('status')
  //   .optional()
  //   .isIn(['open', 'in-progress', 'resolved', 'closed'])
  //   .withMessage('Invalid status specified')
];
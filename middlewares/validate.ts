import { NextFunction, Request, Response } from "express"
import { body, validationResult } from 'express-validator'

export const validateBlogPost = [
  body('blog').notEmpty().withMessage('Blog content is required'),
  body('blog').isLength({ max: 256 }).withMessage('Blog content exceeds maximum length of 256 characters'),
  body('category').notEmpty().withMessage('Category is required'),
  body('category').isIn(['Food', 'Travel', 'Fashion', 'Lifestyle', 'Other']).withMessage('Invalid category'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]

export const validateUserDetails = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password should be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];


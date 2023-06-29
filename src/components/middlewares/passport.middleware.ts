// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};



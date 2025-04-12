import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Add custom type declaration for Request
declare module 'express-serve-static-core' {
  interface Request {
    user?: jwt.JwtPayload;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret';

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user && typeof user !== 'string') {
      req.user = user;
    }
    next();
  });
}
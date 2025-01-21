import express, { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error.utils';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const accessToken = process.env.JWT_SECRET;

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(401, 'MISSING_AUTHORIZATION_HEADER', 'Authorization header is required');
    return;
  }

  const token = authHeader.split(' ')[1]; 

  try {
    jwt.verify(token, accessToken!, (err, decoded) => {
      if (err) {
        throw new AppError(401, 'INVALID_TOKEN', 'Invalid token');
      }
      console.log("DECODED", decoded);
      (req as any).decoded = decoded;
      next();
    })
  } catch (error) {
    throw new AppError(401, 'INVALID_TOKEN', 'Invalid token');
  }
};
import express, { Application, Request, Response, NextFunction, RequestHandler } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middleware
const corsMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const allowedOrigin = process.env.FRONT_END_URL || 'http://localhost:5173'; // Fallback if not defined

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
  
  // Handle OPTIONS request separately
  if (req.method === 'OPTIONS') {
    res.sendStatus(204); // Terminates the request-response cycle
    return; // No need to call next() after sending a response
  }

  // For other methods, pass control to the next middleware
  next(); 
};

// Use the middleware
app.use(express.json());
app.use(corsMiddleware);

// Function to dynamically load routes
const loadRoutes = (app: Application): void => {
  const routesPath = path.join(__dirname, 'src/routes');
  
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.routes.ts')) {
      // Dynamically require the route file
      const route = require(path.join(routesPath, file)).default;

      // Register the routes with the app
      app.use('/api', route); // Set prefix for routes
    }
  });
};

// Load routes
loadRoutes(app);

export default app;

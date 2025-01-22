import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user/user.routes";
import flatshareRoutes from "./routes/flatshare/flatshare.routes";
import { AppError } from "./utils/error.utils";
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

// Middlewares globaux
app.use(express.json()); // Permet de lire le body en JSON
app.use(cors());         // Active CORS pour les requêtes cross-origin
app.use(helmet());       // Sécurise les headers HTTP

// Routes
app.get("/", (req, res) => {
  throw new Error("Il n'y a rien d'implémenté dans cette route, à vous de jouer !");
});

// Middleware to log successful requests
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const originalSend = res.send.bind(res);
  res.send = (body) => {
    if (req.path.startsWith('/api') && res.statusCode >= 200 && res.statusCode < 400) {
      const generalLogPath = path.join(__dirname, '../logs/logs.txt');
      const logMessage = `${new Date().toISOString()} - ${req.method} ${res.statusCode} ${req.originalUrl} - SUCCESS\n`;
      fs.appendFileSync(generalLogPath, logMessage);
      console.log(logMessage);
    }
    return originalSend(body);
  };
  next();
});

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation de l'API avec Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL de votre API (modifiez si nécessaire)
      },
    ],
  },
  apis: ["**/*.ts"], // Chemins vers vos fichiers de routes pour les commentaires Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/users", userRoutes); // Routes pour les utilisateurs

app.use("/api/flatshares", flatshareRoutes); // Routes pour les collocs


// Middleware de gestion des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(err);
  const errorLogPath = path.join(__dirname, '../logs/errors.txt');

  if (req.path.startsWith('/api')) {
    if (err instanceof AppError) {
      const logMessage = `${err.timestamp} - ${req.method} ${err.statusCode} ${req.path} - ${err.errorCode} - ${err.message}\n`;
      fs.appendFileSync(errorLogPath, logMessage);
      res.status(err.statusCode).json({
        statusCode: err.statusCode,
        errorCode: err.errorCode,
        message: err.message,
        method: req.method,
        path: req.path,
        timestamp: err.timestamp,
      });
    } else {
      const logMessage = `${new Date().toISOString()} - 500 - INTERNAL_SERVER_ERROR - An unexpected error occurred - ${req.method} - ${req.path}\n`;
      fs.appendFileSync(errorLogPath, logMessage);
      res.status(500).json({
        statusCode: 500,
        errorCode: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
        method: req.method,
        path: req.path,
        timestamp: new Date().toISOString(),
      });
    }
  } else {
    next(err);
  }
});

export default app;
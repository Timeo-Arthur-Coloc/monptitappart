import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user/user.routes";
import { AppError } from "./utils/error.utils";
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

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
  apis: ["./routes/**/*.ts"], // Chemins vers vos fichiers de routes pour les commentaires Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/users", userRoutes); // Routes pour les utilisateurs

// Middleware de gestion des erreurs (à vous de le personnaliser pour qu'il soit réutilisable, pensez aux classes d'erreurs)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(err);
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      errorCode: err.errorCode,
      message: err.message,
      method: req.method,
      path: req.path,
      timestamp: err.timestamp,
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      errorCode: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
      method: req.method,
      path: req.path,
      timestamp: new Date().toISOString(),
    });
  }
});

export default app;
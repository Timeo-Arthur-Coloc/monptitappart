import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user/user.routes";
import { AppError } from "./utils/error.utils";

const app = express();

// Middlewares globaux
app.use(express.json()); // Permet de lire le body en JSON
app.use(cors());         // Active CORS pour les requêtes cross-origin
// app.use(helmet());       // Sécurise les headers HTTP

// Routes
app.get("/", (req, res) => {
  throw new Error("Il n'y a rien d'implémenté dans cette route, à vous de jouer !");
});

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
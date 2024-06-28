// Server imports
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import errorHandler from 'middleware-http-errors';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';


// Route imports
import { authRegister } from './auth/register';
import { authLogin } from './auth/login';


const prisma = new PrismaClient()


// Set up web app using JSON
const app = express();
app.use(express.json());

const httpServer = new Server(app);


// Use middleware that allows for access from other domains
app.use(cors({
  origin: ["http://localhost:3001"],
  credentials: true
}));

const PORT: number = parseInt(process.env.PORT || '3000');
const isProduction: boolean = process.env.NODE_ENV === "production"


// HEALTH CHECK ROUTE
app.get('/', (req: Request, res: Response) => {
  console.log("Health check")
  return res.status(200).json({
    message: "Server is up!"
  });
});


// AUTH ROUTES
app.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, username } = req.body;
    const { token, userId, userName, userUsername } = await authRegister(name, email, password, username);

    // Assign cookies
    res.cookie('token', token, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", maxAge: 7776000000 });

    res.header('Access-Control-Allow-Credentials', 'true');

    res.status(200).json({ userId: userId, name: userName, username: userUsername });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, userId, userUsername, userName } = await authLogin(email, password);

    // Assign cookies
    res.cookie('token', token, { httpOnly: isProduction, path: "/", secure: isProduction, sameSite: isProduction ? "none" : "lax", maxAge: 7776000000 });

    res.header('Access-Control-Allow-Credentials', 'true');

    res.status(200).json({ userId: userId, username: userUsername, name: userName });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});


// Logging errors
app.use(morgan('dev'));

app.use(errorHandler());

// Start server
const server = httpServer.listen(PORT, () => {
  console.log(`⚡️ Server listening on port ${process.env.PORT || '3000'}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});

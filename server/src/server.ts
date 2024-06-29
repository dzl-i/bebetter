// Server imports
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import errorHandler from 'middleware-http-errors';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { Server } from 'http';
import jwt, { JwtPayload } from 'jsonwebtoken';


// Route imports
import { authRegister } from './auth/register';
import { authLogin } from './auth/login';
import { getNutrientData } from './helper/converter';
import { updateProfilePicture } from './profile/updateProfilePicture';
import { updateProfileDescription } from './profile/updateProfileDescription';
import { retrieveUserPosts } from './profile/retrieveUserPosts';
import { retrieveProfileInfo } from './profile/retrieveProfileInfo';
import { updateProfileName } from './profile/updateProfileName';
import { postCreate } from './posts/create';

const prisma = new PrismaClient()


// Set up web app using JSON
const app = express();
app.use(express.json());
app.use(cookieParser());


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


// POSTS ROUTES
app.post('/posts/create', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { description, steps } = req.body;
    const post = await postCreate(userId, description, steps);

    res.status(200).json({ postId: post.id, description: post.description, steps: post.steps, timeCreated: post.timeCreated });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});


// CALORIE ROUTES
app.get('/calculateCalorie', async (req: Request, res: Response) => {
  try {
    const { food, quantity } = req.body;
    if (!Number.isInteger(quantity)) {
      throw new Error("incorrect inputs - please input food as a strig and quantity as an int")
    }
    const info = JSON.stringify(await getNutrientData(food));
    const name: any = info.match(food)
    var calories: any = info.match('calories.+?[0-9]+')
    calories = Number(calories.toString().slice(10))
    const total_cals = quantity * calories
    const information = {
      food_name: name.toString(),
      item_calories: calories,
      quantity: quantity,
      total_calories: total_cals
    }
    return res.status(200).json(information);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});


// PROFILE ROUTES
app.post('/profile/name', async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { name } = req.body;
    await updateProfileName(userId, name);

    res.status(200);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.post('/profile/picture', async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { profilePicture } = req.body;
    await updateProfilePicture(userId, profilePicture);

    res.status(200);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.post('/profile/description', async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { description } = req.body;
    await updateProfileDescription(userId, description);

    res.status(200);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.get('/profile/posts', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const posts = await retrieveUserPosts(userId as string);

    res.status(200).json({ posts: posts });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.get('/profile/info', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const profileInfo = retrieveProfileInfo(userId as string);

    res.status(200).json({ profileInfo: profileInfo });
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


/* ---------------------------- HELPER FUNCTIONS ---------------------------- */
async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ error: "No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    if (decoded && decoded.userId) {
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

      if (!user) {
        return res.status(403).json({ error: "User not found." });
      }

      if (user.remainingLoginAttempts <= 0) {
        return res.status(403).json({ error: "User is blocked." });
      }

      res.locals.userId = decoded.userId;
      next();
    } else {
      res.status(403).json({ error: "Invalid token." });
    }
  } catch (err) {
    res.status(403).json({ error: "Invalid token." });
  }
}

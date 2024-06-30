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
import { getNutrientData, getSteps } from './helper/converter';
import { updateProfilePicture } from './profile/updateProfilePicture';
import { updateProfileDescription } from './profile/updateProfileDescription';
import { retrieveUserPosts } from './profile/retrieveUserPosts';
import { retrieveProfileInfo } from './profile/retrieveProfileInfo';
import { updateProfileName } from './profile/updateProfileName';
import { postCreate } from './posts/create';
import { postDelete } from './posts/delete';
import { postListAll } from './posts/listAll';
import { postListUser } from './posts/listUser';
import { postComment } from './posts/comment';
import { postReact } from './posts/react';
import { postDetails } from './posts/detail';

const prisma = new PrismaClient()


// Set up web app using JSON
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());


const httpServer = new Server(app);


// Use middleware that allows for access from other domains
app.use(cors({
  origin: ["http://localhost:3000", "https://bebetter.denzeliskandar.com"],
  credentials: true
}));

const PORT: number = parseInt(process.env.PORT || '3030');
const isProduction: boolean = false;


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
    const { description, steps, picture } = req.body;
    const post = await postCreate(userId, description, steps, picture);

    res.status(200).json({ postId: post.id, description: post.description, steps: post.steps, timeCreated: post.timeCreated });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.post('/posts/delete', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { postId } = req.body;
    await postDelete(userId, postId);

    res.status(200).json({ message: "Successfully deleted post!" });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.get('/posts/list-all', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const posts = await postListAll(userId);

    res.status(200).json({ posts: posts });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.get('/posts/list-user', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const posts = await postListUser(userId);

    res.status(200).json({ posts: posts });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.post('/posts/comment', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { postId, comment } = req.body;
    await postComment(userId, postId, comment);

    res.status(200).json({ message: "Successfully added comment!" });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.post('/posts/react', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { postId, reactName } = req.body;
    await postReact(userId, postId, reactName);

    res.status(200).json({ message: "Successfully added a reaction!" });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

app.get('/posts/details', async (req: Request, res: Response) => {
  try {
    const { postId } = req.query;
    const post = await postDetails(postId as string);

    res.status(200).json({ post: post });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});


// CALORIE ROUTES
app.post('/calculate/calorie', async (req: Request, res: Response) => {
  try {
    const { food, quantity } = req.body;
    if (!Number.isInteger(quantity)) {
      return res.status(400).json({ message: "incorrect inputs - please input food as a strig and quantity as an int" });
    }
    const info = JSON.stringify(await getNutrientData(food));
    const name: any = info.match(food);
    let calories: any = info.match('calories.+?[0-9]+');
    calories = Number(calories.toString().slice(10));
    const total_cals = quantity * calories;
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

app.post('/steps', async (req: Request, res: Response) => {
  try {
    const { activity } = req.body;
    const stepsInformation: any = await getSteps(activity);
    const first_activity = stepsInformation[0]
    const second_activity = stepsInformation[1]
    const third_activity = stepsInformation[2]
    const information = {
      first_activity: first_activity,
      second_activity: second_activity,
      third_activity: third_activity
    }
    return res.status(200).json(information)
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message || "An error occurred." });
  }
});

// PROFILE ROUTES
app.put('/profile/name', authenticateToken, async (req: Request, res: Response) => {
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

app.put('/profile/picture', authenticateToken, async (req: Request, res: Response) => {
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

app.post('/profile/description', authenticateToken, async (req: Request, res: Response) => {
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
    const profileInfo = await retrieveProfileInfo(userId as string);

    res.status(200).json({ profileInfo });
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
  console.log(`⚡️ Server listening on port ${PORT}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});


/* ---------------------------- HELPER FUNCTIONS ---------------------------- */
async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;

  // if (!token) return res.status(401).json({ error: "No token provided." });
  if (token === undefined) {
    res.locals.userId = "";
    next();
  } else {
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
      res.locals.userId = "";
      next();
    }
  }
}

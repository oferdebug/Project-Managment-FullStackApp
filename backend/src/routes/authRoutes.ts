import express, { RequestHandler } from 'express';
import { RegisterNewUser, LoginUser } from '../controllers/authController';

const router = express.Router();

const registerHandler: RequestHandler = async (req, res) => {
  await RegisterNewUser(req, res);
};
const loginHandler: RequestHandler = async (req, res) => {
  await LoginUser(req, res);
};

router.post('/register', registerHandler);
router.post('/login', loginHandler);

export default router;
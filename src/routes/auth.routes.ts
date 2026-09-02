import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { authLimiter } from '../middleware/ratelimiter.middleware.js';
import {validateData} from '../middleware/validate.middleware.js';
import { authSchema } from '../schemas/auth.schema.js';
import {logout} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authLimiter, validateData(authSchema), register);
router.post('/login', authLimiter, validateData(authSchema), login);
router.post('/logout', logout);

export default router;
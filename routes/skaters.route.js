import { Router } from 'express';
import { SkaterController } from '../controllers/skaters.controller.js';

const router = Router()

router.get('/skaters', SkaterController.getAllSkaters)
router.post('/login', SkaterController.login)
router.post('/register', SkaterController.register)

export default router;
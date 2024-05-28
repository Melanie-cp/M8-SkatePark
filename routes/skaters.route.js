import { Router } from 'express';
import { SkaterController } from '../controllers/skaters.controller.js';
import { verifyTokenJWT } from '../middlewares/jwt.middleware.js';

const router = Router()

router.get('/skaters', SkaterController.getAllSkaters)
router.post('/login', SkaterController.login)
router.post('/register', SkaterController.register)
router.put('/edit', verifyTokenJWT, SkaterController.updateSkater)
router.put('/admin', SkaterController.updateState)
router.delete('/delete', verifyTokenJWT, SkaterController.removeSkater)


export default router;
import { Router } from 'express';
import { SkaterController } from '../controllers/skaters.controller.js';

const router = Router()

router.get('/skaters', SkaterController.getAllSkaters)
router.post('/login', SkaterController.login)
router.post('/register', SkaterController.register)
router.put('/edit', SkaterController.updateSkater)
router.put('/admin', SkaterController.updateState)
router.delete('/delete', SkaterController.removeSkater)


export default router;
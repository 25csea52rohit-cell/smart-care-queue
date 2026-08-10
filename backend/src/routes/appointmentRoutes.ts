import { Router } from 'express';
import { getAppointments, createAppointment } from '../controllers/appointmentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getAppointments);
router.post('/', authenticateToken, createAppointment);

export default router;

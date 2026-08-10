import { Router } from 'express';
import { getRooms, updateRoomStatus } from '../controllers/roomController';
import { authenticateToken, requireRoles } from '../middleware/auth';

const router = Router();

router.get('/', getRooms);
router.patch('/:id/status', authenticateToken, requireRoles(['RECEPTIONIST', 'DOCTOR', 'ADMIN']), updateRoomStatus);

export default router;

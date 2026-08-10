import { Router } from 'express';
import { getLiveQueue, getMyTicket, bookTicket, callTicket, completeConsultation } from '../controllers/queueController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/live', getLiveQueue);
router.get('/my-ticket', authenticateToken, getMyTicket);
router.post('/book', authenticateToken, bookTicket);
router.post('/call', authenticateToken, callTicket);
router.post('/complete', authenticateToken, completeConsultation);

export default router;

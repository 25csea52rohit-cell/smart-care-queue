export const JWT_SECRET = process.env.JWT_SECRET || 'medqueue_super_secret_jwt_key_2026';

export const CATEGORY_CONFIG = {
  EMERGENCY: {
    prefix: 'E',
    baseScore: 1000,
    targetWaitMinutes: 0,
    color: '#ef4444',
    wing: 'Emergency Wing',
    floor: 1,
    allowedRooms: ['101', '102', '103', '104', '105'],
  },
  URGENT: {
    prefix: 'U',
    baseScore: 500,
    targetWaitMinutes: 15,
    color: '#f97316',
    wing: 'Urgent Care Wing',
    floor: 2,
    allowedRooms: ['201', '202', '203', '204', '205'],
  },
  PRIORITY: {
    prefix: 'P',
    baseScore: 200,
    targetWaitMinutes: 30,
    color: '#eab308',
    wing: 'Specialist Wing',
    floor: 3,
    allowedRooms: ['301', '302', '303', '304', '305'],
  },
  GENERAL: {
    prefix: 'G',
    baseScore: 50,
    targetWaitMinutes: 45,
    color: '#3b82f6',
    wing: 'General OPD Wing',
    floor: 4,
    allowedRooms: ['401', '402', '403', '404', '405', '406', '407', '408', '409', '410'],
  },
};

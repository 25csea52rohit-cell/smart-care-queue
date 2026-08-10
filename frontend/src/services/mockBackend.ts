import { QueueTicket, QueueCategory, AnalyticsData } from '../types';

let mockTickets: QueueTicket[] = [
  {
    id: 't-1',
    ticketNumber: 'E-001',
    patientId: 'patient-1',
    patientName: 'John Doe',
    patientAge: 34,
    category: 'EMERGENCY',
    symptoms: 'Chest pain, shortness of breath',
    priorityScore: 1000,
    status: 'IN_CONSULTATION',
    departmentId: 'dept-emerg',
    roomId: 'room-101',
    room: { number: '101', wing: 'Emergency Wing', floor: 1 },
    doctor: { user: { name: 'Dr. Sarah Jenkins' } },
    estimatedWaitMinutes: 0,
    positionInLine: 1,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 't-2',
    ticketNumber: 'U-001',
    patientId: 'patient-2',
    patientName: 'Emily Watson',
    patientAge: 68,
    category: 'URGENT',
    symptoms: 'Severe abdominal pain, high fever',
    priorityScore: 520,
    status: 'WAITING',
    departmentId: 'dept-gen',
    roomId: 'room-201',
    room: { number: '201', wing: 'Urgent Care Wing', floor: 2 },
    doctor: { user: { name: 'Dr. Marcus Vance' } },
    estimatedWaitMinutes: 8,
    positionInLine: 1,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 't-3',
    ticketNumber: 'P-001',
    patientId: 'patient-3',
    patientName: 'Michael Chang',
    patientAge: 45,
    category: 'PRIORITY',
    symptoms: 'Post-surgery knee pain, mobility issues',
    priorityScore: 210,
    status: 'WAITING',
    departmentId: 'dept-ortho',
    roomId: 'room-301',
    room: { number: '301', wing: 'Specialist Wing', floor: 3 },
    doctor: { user: { name: 'Dr. Sarah Jenkins' } },
    estimatedWaitMinutes: 18,
    positionInLine: 2,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 't-4',
    ticketNumber: 'G-001',
    patientId: 'patient-4',
    patientName: 'Sophia Martinez',
    patientAge: 29,
    category: 'GENERAL',
    symptoms: 'Routine checkup & allergy prescription renewal',
    priorityScore: 50,
    status: 'WAITING',
    departmentId: 'dept-gen',
    roomId: 'room-402',
    room: { number: '402', wing: 'General OPD Wing', floor: 4 },
    doctor: { user: { name: 'Dr. Marcus Vance' } },
    estimatedWaitMinutes: 32,
    positionInLine: 3,
    createdAt: new Date().toISOString(),
  },
];

let dailyCategoryCounts = {
  EMERGENCY: 1,
  URGENT: 1,
  PRIORITY: 1,
  GENERAL: 1,
};

const categoryRooms = {
  EMERGENCY: { room: '101', wing: 'Emergency Wing', floor: 1 },
  URGENT: { room: '201', wing: 'Urgent Care Wing', floor: 2 },
  PRIORITY: { room: '301', wing: 'Specialist Wing', floor: 3 },
  GENERAL: { room: '402', wing: 'General OPD Wing', floor: 4 },
};

export const mockBackendService = {
  getLiveQueue(): QueueTicket[] {
    return [...mockTickets].sort((a, b) => b.priorityScore - a.priorityScore);
  },

  bookTicket(symptoms: string, age?: number, nameOverride?: string, categoryOverride?: string): QueueTicket {
    let category: QueueCategory = 'GENERAL';
    let priorityScore = 50;

    const lower = symptoms.toLowerCase();
    if (categoryOverride && ['EMERGENCY', 'URGENT', 'PRIORITY', 'GENERAL'].includes(categoryOverride)) {
      category = categoryOverride as QueueCategory;
      priorityScore = category === 'EMERGENCY' ? 1000 : category === 'URGENT' ? 500 : category === 'PRIORITY' ? 200 : 50;
    } else if (lower.includes('heart') || lower.includes('bleed') || lower.includes('chest pain') || lower.includes('stroke') || lower.includes('unconscious')) {
      category = 'EMERGENCY';
      priorityScore = 1000;
    } else if (lower.includes('fever') || lower.includes('severe pain') || lower.includes('pregnant') || (age && age >= 70)) {
      category = 'URGENT';
      priorityScore = 500;
    } else if (lower.includes('surgery') || lower.includes('disabled') || lower.includes('chronic')) {
      category = 'PRIORITY';
      priorityScore = 200;
    }

    dailyCategoryCounts[category] += 1;
    const prefix = category.charAt(0);
    const seq = dailyCategoryCounts[category].toString().padStart(3, '0');
    const ticketNumber = `${prefix}-${seq}`;

    const roomDetails = categoryRooms[category];

    const newTicket: QueueTicket = {
      id: `t-${Date.now()}`,
      ticketNumber,
      patientId: 'patient-1',
      patientName: nameOverride || 'John Doe',
      patientAge: age || 34,
      category,
      symptoms,
      priorityScore,
      status: 'WAITING',
      departmentId: 'dept-gen',
      roomId: `room-${roomDetails.room}`,
      room: { number: roomDetails.room, wing: roomDetails.wing, floor: roomDetails.floor },
      doctor: { user: { name: 'Dr. Sarah Jenkins' } },
      estimatedWaitMinutes: category === 'EMERGENCY' ? 0 : category === 'URGENT' ? 8 : 20,
      positionInLine: mockTickets.filter(t => t.status === 'WAITING').length + 1,
      createdAt: new Date().toISOString(),
    };

    mockTickets.unshift(newTicket);
    mockTickets.sort((a, b) => b.priorityScore - a.priorityScore);

    return newTicket;
  },

  callTicket(ticketId: string): QueueTicket | null {
    const t = mockTickets.find(x => x.id === ticketId);
    if (t) {
      t.status = 'CALLED';
    }
    return t || null;
  },

  completeConsultation(ticketId: string): QueueTicket | null {
    const t = mockTickets.find(x => x.id === ticketId);
    if (t) {
      t.status = 'COMPLETED';
    }
    return t || null;
  },

  getAnalytics(): AnalyticsData {
    return {
      patientsServedToday: mockTickets.filter(t => t.status === 'COMPLETED').length + 42,
      avgWaitTimeMinutes: 12,
      doctorsActive: 4,
      emergencyCasesCount: mockTickets.filter(t => t.category === 'EMERGENCY').length + 7,
      roomUtilizationRate: 68,
      hourlyQueueVolume: [
        { hour: '08:00', count: 12 },
        { hour: '09:00', count: 28 },
        { hour: '10:00', count: 42 },
        { hour: '11:00', count: 35 },
        { hour: '12:00', count: 20 },
        { hour: '13:00', count: 25 },
        { hour: '14:00', count: 38 },
        { hour: '15:00', count: 31 },
      ],
      categoryBreakdown: [
        { category: 'EMERGENCY', count: 7 },
        { category: 'URGENT', count: 12 },
        { category: 'PRIORITY', count: 9 },
        { category: 'GENERAL', count: 18 },
      ],
      departmentWaitTimes: [
        { department: 'Emergency', avgWait: 2 },
        { department: 'Urgent Care', avgWait: 11 },
        { department: 'General OPD', avgWait: 24 },
        { department: 'Pediatrics', avgWait: 18 },
        { department: 'Orthopedics', avgWait: 29 },
      ],
    };
  },
};

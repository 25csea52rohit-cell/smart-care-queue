export type UserRole = 'PATIENT' | 'RECEPTIONIST' | 'DOCTOR' | 'ADMIN';
export type QueueCategory = 'EMERGENCY' | 'URGENT' | 'PRIORITY' | 'GENERAL';
export type TicketStatus = 'WAITING' | 'CALLED' | 'IN_CONSULTATION' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
}

export interface QueueTicket {
  id: string;
  ticketNumber: string;
  patientId: string;
  patientName: string;
  patientAge?: number;
  category: QueueCategory;
  symptoms: string;
  priorityScore: number;
  status: TicketStatus;
  departmentId: string;
  department?: { name: string };
  doctorId?: string;
  doctor?: { user: { name: string } };
  roomId?: string;
  room?: { number: string; wing: string; floor: number };
  estimatedWaitMinutes: number;
  positionInLine: number;
  qrCodeUrl?: string;
  createdAt: string;
}

export interface AnalyticsData {
  patientsServedToday: number;
  avgWaitTimeMinutes: number;
  doctorsActive: number;
  emergencyCasesCount: number;
  roomUtilizationRate: number;
  hourlyQueueVolume: { hour: string; count: number }[];
  categoryBreakdown: { category: QueueCategory; count: number }[];
  departmentWaitTimes: { department: string; avgWait: number }[];
}

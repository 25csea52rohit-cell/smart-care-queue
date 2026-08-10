export type UserRole = 'PATIENT' | 'RECEPTIONIST' | 'DOCTOR' | 'ADMIN';

export type QueueCategory = 'EMERGENCY' | 'URGENT' | 'PRIORITY' | 'GENERAL';

export type TicketStatus = 'WAITING' | 'CALLED' | 'IN_CONSULTATION' | 'COMPLETED' | 'CANCELLED';

export type RoomStatus = 'AVAILABLE' | 'BUSY' | 'MAINTENANCE' | 'OFFLINE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface Doctor {
  id: string;
  userId: string;
  user: User;
  specialty: string;
  departmentId: string;
  departmentName?: string;
  roomId?: string;
  roomNumber?: string;
  isAvailable: boolean;
  maxPatientsPerDay: number;
}

export interface Room {
  id: string;
  number: string; // e.g. "101", "201", "301", "401"
  wing: string; // e.g. "Emergency Wing", "General OPD", "Specialist Wing"
  floor: number; // 1, 2, 3, 4
  categoryAllowed: QueueCategory;
  status: RoomStatus;
  currentDoctorId?: string;
  currentDoctorName?: string;
}

export interface QueueTicket {
  id: string;
  ticketNumber: string; // e.g. "E-001", "U-002", "P-005", "G-012"
  patientId: string;
  patientName: string;
  patientAge?: number;
  category: QueueCategory;
  symptoms: string;
  priorityScore: number;
  status: TicketStatus;
  departmentId: string;
  departmentName?: string;
  doctorId?: string;
  doctorName?: string;
  roomId?: string;
  roomNumber?: string;
  wing?: string;
  estimatedWaitMinutes: number;
  positionInLine: number;
  qrCodeUrl?: string;
  createdAt: string;
  calledAt?: string;
  completedAt?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  scheduledTime: string;
  symptoms: string;
  category: QueueCategory;
  status: 'SCHEDULED' | 'CHECKED_IN' | 'CANCELLED' | 'COMPLETED';
  ticketId?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'EMERGENCY';
  read: boolean;
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

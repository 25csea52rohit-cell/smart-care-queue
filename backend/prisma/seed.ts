import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Smart Healthcare Queue database...');

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.queueTicket.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.doctorProfile.deleteMany();
  await prisma.patientProfile.deleteMany();
  await prisma.room.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Users
  const patientUser = await prisma.user.create({
    data: {
      email: 'patient@hospital.org',
      passwordHash,
      name: 'John Doe',
      role: 'PATIENT',
      phone: '+1 (555) 234-5678',
      patientProfile: {
        create: {
          age: 34,
          medicalHistory: 'Asthma, Mild Hypertension',
          emergencyContact: '+1 (555) 999-0000',
        },
      },
    },
  });

  const receptionistUser = await prisma.user.create({
    data: {
      email: 'receptionist@hospital.org',
      passwordHash,
      name: 'Clara Oswald',
      role: 'RECEPTIONIST',
      phone: '+1 (555) 345-6789',
    },
  });

  const doctorUser1 = await prisma.user.create({
    data: {
      email: 'doctor@hospital.org',
      passwordHash,
      name: 'Dr. Sarah Jenkins',
      role: 'DOCTOR',
      phone: '+1 (555) 456-7890',
    },
  });

  const doctorUser2 = await prisma.user.create({
    data: {
      email: 'doctor2@hospital.org',
      passwordHash,
      name: 'Dr. Marcus Vance',
      role: 'DOCTOR',
      phone: '+1 (555) 567-8901',
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@hospital.org',
      passwordHash,
      name: 'Chief Admin Robert Chen',
      role: 'ADMIN',
      phone: '+1 (555) 678-9012',
    },
  });

  // 2. Create Departments
  const deptEmerg = await prisma.department.create({
    data: {
      name: 'Emergency Medicine',
      code: 'EMERG',
      description: '24/7 Acute critical care & emergency trauma response',
    },
  });

  const deptGen = await prisma.department.create({
    data: {
      name: 'General Medicine',
      code: 'GEN',
      description: 'Routine outpatient consultation and primary health',
    },
  });

  const deptPed = await prisma.department.create({
    data: {
      name: 'Pediatrics',
      code: 'PED',
      description: 'Infant, child, and adolescent healthcare',
    },
  });

  const deptOrtho = await prisma.department.create({
    data: {
      name: 'Orthopedics',
      code: 'ORTHO',
      description: 'Bone, joint, and musculoskeletal care',
    },
  });

  // 3. Create Rooms
  const room101 = await prisma.room.create({
    data: {
      number: '101',
      wing: 'Emergency Wing',
      floor: 1,
      categoryAllowed: 'EMERGENCY',
      status: 'BUSY',
    },
  });

  const room102 = await prisma.room.create({
    data: {
      number: '102',
      wing: 'Emergency Wing',
      floor: 1,
      categoryAllowed: 'EMERGENCY',
      status: 'AVAILABLE',
    },
  });

  const room201 = await prisma.room.create({
    data: {
      number: '201',
      wing: 'Urgent Care Wing',
      floor: 2,
      categoryAllowed: 'URGENT',
      status: 'AVAILABLE',
    },
  });

  const room301 = await prisma.room.create({
    data: {
      number: '301',
      wing: 'Specialist Wing',
      floor: 3,
      categoryAllowed: 'PRIORITY',
      status: 'AVAILABLE',
    },
  });

  const room401 = await prisma.room.create({
    data: {
      number: '401',
      wing: 'General OPD Wing',
      floor: 4,
      categoryAllowed: 'GENERAL',
      status: 'BUSY',
    },
  });

  const room402 = await prisma.room.create({
    data: {
      number: '402',
      wing: 'General OPD Wing',
      floor: 4,
      categoryAllowed: 'GENERAL',
      status: 'AVAILABLE',
    },
  });

  // 4. Create Doctor Profiles
  const doctorProfile1 = await prisma.doctorProfile.create({
    data: {
      userId: doctorUser1.id,
      specialty: 'Emergency Physician',
      departmentId: deptEmerg.id,
      roomId: room101.id,
      isAvailable: true,
      maxPatientsPerDay: 40,
    },
  });

  const doctorProfile2 = await prisma.doctorProfile.create({
    data: {
      userId: doctorUser2.id,
      specialty: 'General Practitioner',
      departmentId: deptGen.id,
      roomId: room401.id,
      isAvailable: true,
      maxPatientsPerDay: 30,
    },
  });

  // Update room current doctors
  await prisma.room.update({
    where: { id: room101.id },
    data: { status: 'BUSY' },
  });

  // 5. Create Queue Tickets for demonstration
  await prisma.queueTicket.create({
    data: {
      ticketNumber: 'E-001',
      patientId: patientUser.id,
      patientName: 'John Doe',
      patientAge: 34,
      category: 'EMERGENCY',
      symptoms: 'Chest pain, shortness of breath',
      priorityScore: 1000,
      status: 'IN_CONSULTATION',
      departmentId: deptEmerg.id,
      doctorId: doctorProfile1.id,
      roomId: room101.id,
      estimatedWaitMinutes: 0,
      positionInLine: 1,
      calledAt: new Date(Date.now() - 10 * 60 * 1000),
    },
  });

  await prisma.queueTicket.create({
    data: {
      ticketNumber: 'U-001',
      patientId: 'patient-2',
      patientName: 'Emily Watson',
      patientAge: 68,
      category: 'URGENT',
      symptoms: 'Severe abdominal pain, high fever',
      priorityScore: 520,
      status: 'WAITING',
      departmentId: deptGen.id,
      estimatedWaitMinutes: 10,
      positionInLine: 1,
    },
  });

  await prisma.queueTicket.create({
    data: {
      ticketNumber: 'P-001',
      patientId: 'patient-3',
      patientName: 'Michael Chang',
      patientAge: 45,
      category: 'PRIORITY',
      symptoms: 'Post-surgery knee pain, mobility issues',
      priorityScore: 210,
      status: 'WAITING',
      departmentId: deptOrtho.id,
      roomId: room301.id,
      estimatedWaitMinutes: 20,
      positionInLine: 2,
    },
  });

  await prisma.queueTicket.create({
    data: {
      ticketNumber: 'G-001',
      patientId: 'patient-4',
      patientName: 'Sophia Martinez',
      patientAge: 29,
      category: 'GENERAL',
      symptoms: 'Routine checkup & allergy prescription renewal',
      priorityScore: 50,
      status: 'WAITING',
      departmentId: deptGen.id,
      roomId: room402.id,
      estimatedWaitMinutes: 35,
      positionInLine: 3,
    },
  });

  // 6. Create Initial Notifications
  await prisma.notification.create({
    data: {
      userId: patientUser.id,
      title: 'Ticket Issued',
      message: 'Your ticket E-001 has been assigned to Room 101 with Dr. Sarah Jenkins.',
      type: 'EMERGENCY',
      read: false,
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log('Demo Credentials:');
  console.log('Patient: patient@hospital.org / password123');
  console.log('Receptionist: receptionist@hospital.org / password123');
  console.log('Doctor: doctor@hospital.org / password123');
  console.log('Admin: admin@hospital.org / password123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

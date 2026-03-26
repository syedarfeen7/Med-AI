import type { Appointment } from '@/features/bookings/types/appointment';

export const USER_BOOKINGS: Appointment[] = [
  {
    id: 'b1',
    doctorId: '2',
    doctorName: 'Dr. James Wilson',
    doctorSpecialty: 'General Physician',
    date: '2026-03-20',
    time: '10:00 AM',
    status: 'completed',
    patientName: 'John Doe',
    type: 'Regular Checkup',
  },
  {
    id: 'b2',
    doctorId: '1',
    doctorName: 'Dr. Sarah Mitchell',
    doctorSpecialty: 'Dermatologist',
    date: '2026-03-27',
    time: '02:00 PM',
    status: 'upcoming',
    patientName: 'John Doe',
    type: 'Skin Consultation',
  },
];

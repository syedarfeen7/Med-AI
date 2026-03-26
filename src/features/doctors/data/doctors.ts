import type { Doctor } from '@/features/doctors/types/doctor';

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Dermatologist',
    rating: 4.9,
    reviewsCount: 128,
    experience: 12,
    fee: 150,
    hospital: 'Skin & Aesthetic Center',
    location: 'Downtown Medical Plaza',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=200&h=200',
    about: 'Dr. Mitchell is a board-certified dermatologist specializing in medical and cosmetic dermatology with over 12 years of experience.',
    availableSlots: [
      { date: '2026-03-27', slots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'] },
      { date: '2026-03-28', slots: ['11:00 AM', '01:30 PM', '03:00 PM'] }
    ],
    education: ['MD from Stanford University', 'Residency at Mayo Clinic'],
    languages: ['English', 'Spanish'],
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'General Physician',
    rating: 4.8,
    reviewsCount: 256,
    experience: 15,
    fee: 100,
    hospital: 'City General Hospital',
    location: 'Westside Health Hub',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
    about: 'Dr. Wilson provides comprehensive primary care for adults, focusing on preventive medicine and chronic disease management.',
    availableSlots: [
      { date: '2026-03-27', slots: ['08:00 AM', '09:30 AM', '11:00 AM', '03:00 PM', '05:30 PM'] },
      { date: '2026-03-28', slots: ['09:00 AM', '10:00 AM', '02:00 PM'] }
    ],
    education: ['MD from Harvard Medical School', 'Internal Medicine Residency at Johns Hopkins'],
    languages: ['English'],
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    specialty: 'Pediatrician',
    rating: 4.9,
    reviewsCount: 184,
    experience: 10,
    fee: 120,
    hospital: 'Children\'s Wellness Clinic',
    location: 'Northside Pediatrics',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200',
    about: 'Dr. Rodriguez is dedicated to providing compassionate care for children from infancy through adolescence.',
    availableSlots: [
      { date: '2026-03-27', slots: ['10:00 AM', '11:30 AM', '01:00 PM', '04:00 PM'] },
      { date: '2026-03-29', slots: ['09:00 AM', '10:30 AM', '02:30 PM'] }
    ],
    education: ['MD from Yale School of Medicine', 'Pediatrics Residency at CHOP'],
    languages: ['English', 'Spanish', 'Portuguese'],
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    rating: 4.7,
    reviewsCount: 92,
    experience: 18,
    fee: 200,
    hospital: 'Heart & Vascular Institute',
    location: 'Central Medical District',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200',
    about: 'Dr. Chen is a specialist in interventional cardiology with a focus on minimally invasive heart procedures.',
    availableSlots: [
      { date: '2026-03-30', slots: ['08:30 AM', '10:00 AM', '01:30 PM', '03:30 PM'] }
    ],
    education: ['MD from Columbia University', 'Fellowship at Cleveland Clinic'],
    languages: ['English', 'Mandarin'],
  },
  {
    id: '5',
    name: 'Dr. Emily Blunt',
    specialty: 'Dentist',
    rating: 4.9,
    reviewsCount: 310,
    experience: 8,
    fee: 80,
    hospital: 'Bright Smiles Dental',
    location: 'Eastside Square',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=200&h=200',
    about: 'Dr. Blunt specializes in family dentistry and cosmetic procedures, ensuring a comfortable experience for all patients.',
    availableSlots: [
      { date: '2026-03-27', slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
      { date: '2026-03-28', slots: ['10:00 AM', '12:00 PM', '03:00 PM'] }
    ],
    education: ['DDS from University of Pennsylvania'],
    languages: ['English'],
  },
];

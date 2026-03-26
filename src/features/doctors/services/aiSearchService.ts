import { DOCTORS } from '@/features/doctors/data/doctors';
import { type Doctor } from '@/features/doctors/types/doctor';

export async function processAISearch(query: string): Promise<Doctor[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const q = query.toLowerCase();
  
  // Simple keyword matching for demo purposes
  // In a real app, this would call a Gemini model to extract intent
  return DOCTORS.filter(doc => {
    const matchesSpecialty = doc.specialty.toLowerCase().includes(q) || 
                            q.includes(doc.specialty.toLowerCase().split(' ')[0]);
    const matchesName = doc.name.toLowerCase().includes(q);
    const matchesLocation = doc.location.toLowerCase().includes(q);
    
    // Keywords for general physician
    if (q.includes('general') || q.includes('physician') || q.includes('doctor') || q.includes('checkup')) {
      if (doc.specialty === 'General Physician') return true;
    }
    
    // Keywords for skin
    if (q.includes('skin') || q.includes('dermatologist') || q.includes('rash') || q.includes('acne')) {
      if (doc.specialty === 'Dermatologist') return true;
    }

    // Keywords for heart
    if (q.includes('heart') || q.includes('cardio') || q.includes('chest')) {
      if (doc.specialty === 'Cardiologist') return true;
    }

    // Keywords for kids
    if (q.includes('kid') || q.includes('child') || q.includes('pediatric')) {
      if (doc.specialty === 'Pediatrician') return true;
    }

    // Keywords for teeth
    if (q.includes('tooth') || q.includes('teeth') || q.includes('dentist')) {
      if (doc.specialty === 'Dentist') return true;
    }

    return matchesSpecialty || matchesName || matchesLocation;
  });
}

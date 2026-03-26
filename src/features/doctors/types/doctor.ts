export interface DoctorAvailability {
  date: string;
  slots: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  experience: number;
  fee: number;
  hospital: string;
  location: string;
  image: string;
  about: string;
  availableSlots: DoctorAvailability[];
  education: string[];
  languages: string[];
}

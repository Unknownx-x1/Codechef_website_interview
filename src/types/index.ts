export type EventCategory = "Hackathon" | "Workshop" | "Contest" | "Seminar";

export interface ClubEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  venue: string;
  seatsFilled: number;
  seatsTotal: number;
  summary: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prize: string;
  timeline: Array<{
    time: string;
    item: string;
  }>;
  featured?: boolean;
}

export interface RegistrationPayload {
  eventId: string;
  name: string;
  email: string;
  registrationNumber: string;
  department: string;
  year: string;
  teamName?: string;
}

export interface RegistrationResponse {
  id: string;
  status: "confirmed";
}

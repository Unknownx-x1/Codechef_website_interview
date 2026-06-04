export type EventCategory = "Hackathon" | "Workshop" | "Contest" | "Seminar";

export interface ClubEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  venue: string;
  summary: string;
  description: string;
  prize?: string;
  timeline?: Array<{
    time: string;
    item: string;
  }>;
  featured?: boolean;
  track: string;
  topics: string[];
  format: string;
  duration: string;
  mode: "Online" | "Offline" | "Hybrid";
  recapLink?: string;
  archiveLink?: string;
  image?: string;
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

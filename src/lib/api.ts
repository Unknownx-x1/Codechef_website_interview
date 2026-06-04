import { events } from "@/data/events";
import type { ClubEvent, RegistrationPayload, RegistrationResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("External API is not configured.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `API request failed: ${response.status}`);
  }

  const result = (await response.json()) as ApiResponse<T>;
  return result.data;
}

const mockDelay = () => new Promise((resolve) => setTimeout(resolve, 350));

export async function getEvents(): Promise<ClubEvent[]> {
  if (API_BASE_URL) {
    try {
      return await request<ClubEvent[]>("/events");
    } catch (error) {
      console.warn("Failed to fetch events from API. Falling back to mock data.", error);
    }
  }

  await mockDelay();
  return events;
}

export async function getEventById(id: string): Promise<ClubEvent | null> {
  if (API_BASE_URL) {
    try {
      return await request<ClubEvent>(`/events/${id}`);
    } catch (error) {
      console.warn(`Failed to fetch event by id ${id} from API. Falling back to mock data.`, error);
    }
  }

  await mockDelay();
  return events.find((event) => event.id === id) ?? null;
}

export async function createRegistration(payload: RegistrationPayload): Promise<RegistrationResponse> {
  if (API_BASE_URL) {
    try {
      return await request<RegistrationResponse>("/registrations", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn("Failed to create registration via API. Falling back to mock data.", error);
    }
  }

  await mockDelay();
  return {
    id: `reg_${payload.eventId}_${Date.now()}`,
    status: "confirmed",
  };
}

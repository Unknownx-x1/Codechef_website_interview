import { events } from "@/data/events";
import type { ClubEvent, RegistrationPayload, RegistrationResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

const mockDelay = () => new Promise((resolve) => setTimeout(resolve, 350));

export async function getEvents(): Promise<ClubEvent[]> {
  if (API_BASE_URL) {
    return request<ClubEvent[]>("/events");
  }

  await mockDelay();
  return events;
}

export async function getEventById(id: string): Promise<ClubEvent | null> {
  if (API_BASE_URL) {
    return request<ClubEvent>(`/events/${id}`);
  }

  await mockDelay();
  return events.find((event) => event.id === id) ?? null;
}

export async function createRegistration(payload: RegistrationPayload): Promise<RegistrationResponse> {
  if (API_BASE_URL) {
    return request<RegistrationResponse>("/registrations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  await mockDelay();
  return {
    id: `reg_${payload.eventId}_${Date.now()}`,
    status: "confirmed",
  };
}

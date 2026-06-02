"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createRegistration } from "@/lib/api";
import type { ClubEvent } from "@/types";

const schema = z.object({
  eventId: z.string().min(1, "Choose an event."),
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Use a valid email."),
  registrationNumber: z.string().min(6, "Registration number looks too short."),
  department: z.string().min(2, "Department is required."),
  year: z.string().min(1, "Select your year."),
  teamName: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function RegistrationForm({ events, selectedEventId }: { events: ClubEvent[]; selectedEventId?: string }) {
  const [confirmed, setConfirmed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      eventId: selectedEventId ?? events[0]?.id,
      year: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await createRegistration(values);
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="terminal-panel p-6 font-mono text-sm text-acid">
        <p>&gt; Registration confirmed.</p>
        <p>&gt; Confirmation sent.</p>
        <p>&gt; See you at the event.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="terminal-panel grid gap-4 p-5" noValidate>
      <div className="relative z-10 mb-2 flex items-center justify-between border-b border-[var(--border)] pb-3 font-mono text-xs uppercase">
        <span>register/session</span>
        <span className="text-acid">secure</span>
      </div>
      <Field label="event" error={errors.eventId?.message}>
        <select {...register("eventId")} className="w-full bg-transparent px-0 pb-2 pt-5 outline-none">
          {events.map((event) => (
            <option key={event.id} value={event.id} className="bg-ink-950">
              {event.title}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="name" error={errors.name?.message}>
          <input {...register("name")} className="w-full bg-transparent px-0 pb-2 pt-5 outline-none" />
        </Field>
        <Field label="email" error={errors.email?.message}>
          <input {...register("email")} type="email" className="w-full bg-transparent px-0 pb-2 pt-5 outline-none" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="registration no." error={errors.registrationNumber?.message}>
          <input {...register("registrationNumber")} className="w-full bg-transparent px-0 pb-2 pt-5 font-mono outline-none" />
        </Field>
        <Field label="department" error={errors.department?.message}>
          <input {...register("department")} className="w-full bg-transparent px-0 pb-2 pt-5 outline-none" />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="year" error={errors.year?.message}>
          <select {...register("year")} className="w-full bg-transparent px-0 pb-2 pt-5 outline-none">
            <option value="" className="bg-ink-950">
              Select
            </option>
            <option value="1" className="bg-ink-950">
              First
            </option>
            <option value="2" className="bg-ink-950">
              Second
            </option>
            <option value="3" className="bg-ink-950">
              Third
            </option>
            <option value="4" className="bg-ink-950">
              Fourth
            </option>
          </select>
        </Field>
        <Field label="team name" error={errors.teamName?.message}>
          <input {...register("teamName")} className="w-full bg-transparent px-0 pb-2 pt-5 outline-none" />
        </Field>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 border border-acid bg-acid px-5 py-3 font-mono text-xs font-bold uppercase text-black disabled:cursor-wait disabled:opacity-70"
      >
        {isSubmitting ? "PROCESSING..." : "REGISTER_"}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="group relative z-10 block border border-[var(--border)] px-3">
      <span className="absolute left-3 top-2 font-mono text-[10px] uppercase text-[var(--muted)]">{label}</span>
      {children}
      {error ? <span className="mb-2 block font-mono text-[11px] text-warning">{error}</span> : null}
    </label>
  );
}

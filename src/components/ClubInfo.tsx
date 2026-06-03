"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { leadershipDirectory, LeadershipRole } from "@/data/club";
import { SectionHeading } from "@/components/SectionHeading";
import { cx } from "@/lib/utils";

export function ClubInfo() {
  return (
    <section id="club" className="section-shell py-12 md:py-16">
      <SectionHeading
        eyebrow="// PERSONNEL_REGISTRY"
        title="Club Leadership Dossier"
        copy="Access personnel files, roles, responsibilities, and directory keys for the CodeChef Chapter at VIT Chennai."
      />

      <div className="mt-8 flex flex-col gap-6">
        {/* Tier 1: Faculty Coordinator (Special Prominence) */}
        {leadershipDirectory
          .filter((role) => role.prominence === "special")
          .map((role) => (
            <RoleRecordCard key={role.code} role={role} />
          ))}

        {/* Tier 2: Executives (High Prominence - Chair / Vice Chair) */}
        <div className="grid gap-6 md:grid-cols-2">
          {leadershipDirectory
            .filter((role) => role.prominence === "high")
            .map((role) => (
              <RoleRecordCard key={role.code} role={role} />
            ))}
        </div>

        {/* Tier 3: Executives (Standard Prominence - Secretary / Co-Sec) */}
        <div className="grid gap-6 md:grid-cols-2">
          {leadershipDirectory
            .filter((role) => role.prominence === "standard")
            .map((role) => (
              <RoleRecordCard key={role.code} role={role} />
            ))}
        </div>

        {/* Tier 4: Team Leads (Dossier Stack) */}
        <div className="mt-4">
          <div className="mb-4 border-b border-[var(--border)] pb-2 font-mono text-xs uppercase text-[var(--muted)]">
            {"// DEPARTMENT_LEADS"}
          </div>
          <div className="flex flex-col gap-3">
            {leadershipDirectory
              .filter((role) => role.prominence === "lead")
              .map((role) => (
                <RoleRecordCard key={role.code} role={role} isRow />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleRecordCard({ role, isRow = false }: { role: LeadershipRole; isRow?: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className={cx(
        "group cursor-pointer border bg-[var(--surface)] p-5 transition-colors duration-200",
        expanded ? "border-acid" : "border-[var(--border)] hover:border-[var(--foreground)]",
        role.prominence === "special" && "border-l-4 border-l-acid",
        isRow && "p-4"
      )}
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <motion.div layout="position" className="flex items-start gap-4">
          <CyberAvatar
            code={role.code}
            imageUrl={role.members[0]?.avatar}
            large={role.prominence === "high" || role.prominence === "special"}
          />
          <div>
            <div className="font-mono text-[10px] uppercase text-[var(--muted)] flex items-center gap-2">
              <span>{role.code}</span>
              <span className="text-acid">•</span>
              <span className="text-acid">{role.category}</span>
            </div>
            <h3
              className={cx(
                "font-display font-black uppercase leading-tight mt-1",
                role.prominence === "special" && "text-2xl md:text-3xl",
                role.prominence === "high" && "text-xl md:text-2xl",
                role.prominence === "standard" && "text-lg md:text-xl",
                role.prominence === "lead" && "text-base md:text-lg"
              )}
            >
              {role.role}
            </h3>
            {/* Show member names in collapsed row state */}
            {!expanded && isRow && (
              <p className="mt-2 font-mono text-xs text-[var(--muted)]">
                LOGGED: {role.members.map((m) => m.name).join(" / ")}
              </p>
            )}
          </div>
        </motion.div>

        {!expanded && !isRow && (
          <motion.p
            layout="position"
            className="max-w-md font-mono text-xs text-[var(--muted)] md:text-right md:self-center"
          >
            {role.members.map((m) => m.name).join(" & ")}
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-[var(--border)] pt-5">
              <p className="max-w-2xl font-mono text-xs leading-relaxed text-[var(--foreground)]">
                &gt; DESCRIPTION: {role.description}
              </p>

              {/* Responsibilities */}
              <div className="mt-5">
                <p className="mb-3 font-mono text-[10px] uppercase text-acid">{"// CORE_DUTIES"}</p>
                <ul className="grid gap-2 pl-4">
                  {role.responsibilities.map((duty, idx) => (
                    <li key={idx} className="list-disc font-mono text-xs text-[var(--muted)]">
                      {duty}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Members breakdown */}
              <div className="mt-6">
                <p className="mb-3 font-mono text-[10px] uppercase text-acid">{"// LOGGED_PERSONNEL"}</p>
                <div className="grid gap-4 md:grid-cols-2">
                  {role.members.map((member) => (
                    <div
                      key={member.handle}
                      className="border border-[var(--border)] bg-[var(--background)]/60 p-4 font-mono flex items-start gap-4"
                    >
                      <CyberAvatar code={role.code} imageUrl={member.avatar} />
                      <div className="flex-1">
                        <p className="font-display font-black text-sm uppercase text-[var(--foreground)]">{member.name}</p>
                        <p className="text-[10px] text-acid">@{member.handle}</p>

                      {/* Contact Badges */}
                      <div className="mt-4 flex flex-wrap gap-3 text-[10px]">
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="border border-[var(--border)] px-2 py-1 text-[var(--muted)] hover:border-acid hover:text-acid"
                          >
                            [GITHUB]
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="border border-[var(--border)] px-2 py-1 text-[var(--muted)] hover:border-acid hover:text-acid"
                          >
                            [LINKEDIN]
                          </a>
                        )}
                        {member.codechef && (
                          <a
                            href={member.codechef}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="border border-[var(--border)] px-2 py-1 text-[var(--muted)] hover:border-acid hover:text-acid"
                          >
                            [CODECHEF]
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="border border-[var(--border)] px-2 py-1 text-[var(--muted)] hover:border-acid hover:text-acid"
                          >
                            [EMAIL]
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CyberAvatar({ code, imageUrl, large = false }: { code: string; imageUrl?: string; large?: boolean }) {
  const sizeClass = large ? "h-16 w-16 md:h-20 md:w-20" : "h-12 w-12 md:h-14 md:w-14";
  const iconSize = large ? "w-10 h-10 md:w-12 md:h-12" : "w-7 h-7 md:w-8 md:h-8";

  return (
    <div
      className={cx(
        "relative border border-acid/20 bg-black/40 p-1 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-acid/60 transition-colors duration-300",
        sizeClass
      )}
    >
      {/* Futuristic CRT Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_3px] opacity-30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(var(--accent)_0.8px,transparent_0.8px)] bg-[size:6px_6px] opacity-10 z-10 pointer-events-none" />

      {/* Scanning laser beam */}
      <div className="absolute left-0 right-0 h-[1.5px] bg-acid/40 top-0 animate-scan pointer-events-none z-10" />

      {/* Tech Corners */}
      <div className="absolute top-0.5 left-0.5 w-1 h-1 border-t border-l border-acid/40 z-10 pointer-events-none" />
      <div className="absolute top-0.5 right-0.5 w-1 h-1 border-t border-r border-acid/40 z-10 pointer-events-none" />
      <div className="absolute bottom-0.5 left-0.5 w-1 h-1 border-b border-l border-acid/40 z-10 pointer-events-none" />
      <div className="absolute bottom-0.5 right-0.5 w-1 h-1 border-b border-r border-acid/40 z-10 pointer-events-none" />

      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt="Profile Avatar"
          className="h-full w-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300"
        />
      ) : (
        <svg
          className={cx("text-acid/40 group-hover:text-acid/80 transition-colors duration-300", iconSize)}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )}

      <div className="absolute bottom-0.5 right-0.5 font-mono text-[6px] text-acid/20 select-none uppercase tracking-tighter z-10 pointer-events-none">
        {code.split("_").pop()}
      </div>
    </div>
  );
}

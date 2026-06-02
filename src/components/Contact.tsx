import { SectionHeading } from "@/components/SectionHeading";

const links = [
  { label: "mail_", value: "codechef@vitchennai.ac.in", href: "mailto:codechef@vitchennai.ac.in" },
  { label: "instagram_", value: "@codechefvitc", href: "https://instagram.com/codechefvitc" },
  { label: "github_", value: "github.com/codechefvitc", href: "https://github.com/codechefvitc" },
];

export function Contact() {
  return (
    <section id="contact" className="section-shell py-16 md:py-20">
      <SectionHeading eyebrow="// contact" title="Open a channel. Bring a problem." />
      <div className="terminal-panel p-5 font-mono text-sm">
        <div className="relative z-10 grid gap-4">
          {links.map((link) => (
            <p key={link.label} className="flex flex-wrap gap-3">
              <span className="text-[var(--muted)]">&gt; {link.label}</span>
              <a href={link.href} className="link-underline text-acid" target={link.href.startsWith("http") ? "_blank" : undefined}>
                {link.value}
              </a>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

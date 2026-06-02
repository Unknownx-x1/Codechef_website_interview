import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CursorField } from "@/components/CursorField";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CodeChef VIT Chennai",
  description: "Events, contests, workshops, and registrations for CodeChef VIT Chennai.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${space.variable} ${inter.variable} ${mono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="noise" />
          <CursorField />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthProvider from "@/providers/auth-provider";
import ThemeProvider from "@/providers/theme-provider";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flight Simulator",
  description: "Flight Simulator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen flex flex-col justify-center items-center">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FIREBASE_CONFIG } from "@/firebase/config";
import { FirebaseAppProvider } from "reactfire";
import AppWrapper from "@/components/wrappers/app-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Placement System",
  description: "Campus Placement System for 3rd Year Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`} suppressHydrationWarning={true}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

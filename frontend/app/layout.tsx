import "./globals.css";

import { Archivo, Archivo_Black, Space_Mono } from "next/font/google";
import GoogleProvider  from "@/providers/google-providers"

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata = {
  title: "ScratchSlate — Real-time Whiteboarding for Teams",
  description: "Real-time collaborative whiteboarding for teams.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${archivo.variable}
          ${archivoBlack.variable}
          ${spaceMono.variable}
          min-h-screen
          bg-paper
          text-ink
          font-grotesk
          antialiased
        `}
      > 
      <GoogleProvider>
        {children}
      </GoogleProvider>
      </body>
    </html>
  );
}
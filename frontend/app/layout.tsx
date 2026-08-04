
import "./globals.css";

import {
  Archivo,
  Archivo_Black,
  Space_Mono,
} from "next/font/google";
import GoogleProvider from "@/providers/google-providers";

const archivo = Archivo({
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoBlack.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-full flex flex-col">
          {children}
      </body>
    </html>
  );
}

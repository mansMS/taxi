import type { Metadata, Viewport } from "next";
import SWRegister from "./components/sw-register";
import InstallPrompt from "./components/InstallPrompt";

import "./globals.css";

const isProduction = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  title: "Dylym Taxi",
  description: "Сервис такси в Дылыме",
  manifest: isProduction ? "/manifest" : undefined,
  appleWebApp: {
    capable: true,
    title: "D-Такси",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {isProduction ? <SWRegister /> : null}
        {isProduction ? <InstallPrompt /> : null}
        {children}
      </body>
    </html>
  );
}

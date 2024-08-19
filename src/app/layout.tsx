import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";

import "./globals.css";
import { Provider } from "@/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Food Explorer",
  description: "Cardápio Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.className} antialiased `}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

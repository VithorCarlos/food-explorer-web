import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { Provider } from "@/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Product Explorer",
  description: "Cardápio Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${poppins.className} antialiased`}
      suppressHydrationWarning={true}
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

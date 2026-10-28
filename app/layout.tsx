import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: { default: "Ask Japan | Discover Japan, one question at a time", template: "%s | Ask Japan" },
  description: "Ask questions about Japanese culture, daily life, and travel. Get email answers or request tailored research and travel support.",
  applicationName: "Ask Japan",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><Header /><main>{children}</main><Footer /></body></html>;
}

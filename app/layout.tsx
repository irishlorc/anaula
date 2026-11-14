import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anaula — Autonomous bioreactors",
  description:
    "Anaula builds autonomous bioreactors for pharmaceutical and biological production — reactors that sense, control and correct themselves.",
};

export const viewport: Viewport = {
  themeColor: "#0d110f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IE">
      <body>{children}</body>
    </html>
  );
}

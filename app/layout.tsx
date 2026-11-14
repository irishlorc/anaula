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
    <html lang="en-IE" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in')})},2500);",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

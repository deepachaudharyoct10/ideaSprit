import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "IdeaSprit – Transform Your Ideas Into Digital Reality",
  description:
    "IdeaSprit is a startup focused on building modern websites and web applications. We create stunning, high-performance digital experiences that help businesses grow.",
  keywords: ["web development", "web design", "UI/UX", "React", "Next.js", "startup"],
  authors: [{ name: "IdeaSprit Team" }],
  openGraph: {
    title: "IdeaSprit – Transform Your Ideas Into Digital Reality",
    description: "Modern websites and web applications for forward-thinking businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-space-900 text-white antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0f0f1a",
              color: "#fff",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}

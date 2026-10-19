import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Everyday Recipes",
  description: "Browse everyday culinary formulas and kitchen staples by cuisine and prep time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className} suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <footer className="footer">
          <div className="footer-inner">
            <span><span className="dot">●</span> © 2025 Everyday Recipes. Functional culinary notebook.</span>
            <div className="footer-links">
              <a href="/recipes">Recipes</a>
              <a href="#">Techniques</a>
              <a href="#">Glossary</a>
              <a href="#">GitHub Repository</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

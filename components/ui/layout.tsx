import Link from "next/link";
import { useState } from "react";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto p-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Little Cards
            </Link>
            <div className="md:hidden">
              <button
                className="text-primary-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <ul
              className={`md:flex md:flex-row md:space-x-4 ${
                isMenuOpen ? "flex flex-col space-y-2" : "hidden"
              } absolute md:relative top-16 md:top-0 left-0 right-0 bg-primary md:bg-transparent p-4 md:p-0`}
            >
              <li>
                <Link href="/" className="hover:underline block py-2 md:py-0">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-muted">
        <div className="container mx-auto p-4 text-center">
          <p>&copy; 2024 Little Cards. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

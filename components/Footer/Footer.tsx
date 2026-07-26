import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Works", href: "/works" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="mt-16 py-10 px-4 max-w-7xl mx-auto">
      <div
        data-aos="fade-down"
        data-aos-delay="50"
        data-aos-duration="1000"
        className="flex flex-col items-center justify-center gap-6 text-zinc-500 dark:text-[#676767] font-semibold text-center"
      >
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight hover:opacity-80 transition-opacity"
          >
            Rakibul Islam
          </Link>
        </div>

        <nav aria-label="Footer Navigation">
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-[var(--theme-color)] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <aside className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-500 font-medium">
          <p>
            Copyright © {currentYear} - All rights reserved by{" "}
            <span
              className="font-bold transition-colors duration-300"
              style={{ color: "var(--theme-color)" }}
            >
              Rakibul Islam
            </span>
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 py-10 px-4 max-w-7xl mx-auto">
      <div
        className="flex flex-col items-center justify-center gap-6 text-zinc-500 dark:text-[#676767] font-semibold text-center"
      >
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

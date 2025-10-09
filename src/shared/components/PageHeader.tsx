"use client";
import { usePathname } from "next/navigation";

interface SectionHeaderProps {
  header?: string;
  description?: string;
}

const PageHeader = ({ header, description }: SectionHeaderProps) => {
  const pathname = usePathname();

  const currentPage =
    pathname === "/"
      ? "Home"
      : pathname
          .split("/")
          .filter(Boolean)
          .pop()
          ?.replace(/-/g, " ") 
          .replace(/\b\w/g, (char) => char.toUpperCase()) || "";

  return (
    <div data-aos="fade-up" className="text-center py-10 space-y-5">
      <header className="font-serif tracking-[0.3em] uppercase text-sm text-gray-500">
        {currentPage}
      </header>

      <div className="max-w-2xl mx-auto space-y-5">
        <h1 className="text-3xl tracking-wide font-serif">
          {header || `${currentPage} Page`}
        </h1>
        {description && (
          <p className="text-xs max-w-8/12 mx-auto tracking-widest">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

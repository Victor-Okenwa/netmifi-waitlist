import Link from "next/link";
import { socialLinks } from "./social";

const SiteFooter = () => {
  return (
    <footer className="bg-[#1A0F28] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:px-8">
        <div className="max-w-2xl">
          <p className="text-lg font-semibold">Netmifi</p>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Tutorials, classmates, tutors, and study materials for the course
            in front of you, in one place.
          </p>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Joining is free. Share only work you have the right to distribute.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex gap-5">
            <Link href="/" className="hover:text-white/80">
              Home
            </Link>
            <Link href="/community" className="hover:text-white/80">
              Community
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-white/80">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

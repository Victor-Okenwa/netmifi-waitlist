"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJoinWaitlist } from "@/components/waitlist/useJoinWaitlist";
import { cn } from "@/lib/utils";

const NavWaitlist = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const join = useJoinWaitlist();
  const homeActive = pathname === "/" || pathname === "/home";
  const communityActive = pathname.includes("community");

  const closeAndJoin = () => {
    setIsNavOpen(false);
    join();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <Link
          href="/"
          className="block w-[120px] md:w-[133px]"
          onClick={() => setIsNavOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/netmifi_logo.svg" alt="Netmifi" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium",
              homeActive
                ? "text-red"
                : "text-[#1A0F28]/70 hover:text-[#1A0F28]"
            )}
          >
            Home
          </Link>
          <Link
            href="/community"
            className={cn(
              "text-sm font-medium",
              communityActive
                ? "text-red"
                : "text-[#1A0F28]/70 hover:text-[#1A0F28]"
            )}
          >
            Community
          </Link>
          <Button type="button" className="rounded-full px-5" onClick={join}>
            Join the waitlist
          </Button>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label={isNavOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsNavOpen((open) => !open)}
        >
          {isNavOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isNavOpen && (
        <div className="space-y-1 border-t border-black/5 bg-white px-5 py-4 md:hidden">
          <Link
            href="/"
            onClick={() => setIsNavOpen(false)}
            className={cn(
              "block rounded-lg px-3 py-3 text-sm font-medium",
              homeActive ? "text-red" : "text-[#1A0F28]/70"
            )}
          >
            Home
          </Link>
          <Link
            href="/community"
            onClick={() => setIsNavOpen(false)}
            className={cn(
              "block rounded-lg px-3 py-3 text-sm font-medium",
              communityActive ? "text-red" : "text-[#1A0F28]/70"
            )}
          >
            Community
          </Link>
          <Button
            type="button"
            className="mt-2 w-full rounded-full"
            onClick={closeAndJoin}
          >
            Join the waitlist
          </Button>
        </div>
      )}
    </header>
  );
};

export default NavWaitlist;

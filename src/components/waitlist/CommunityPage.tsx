"use client";

import { ExternalLink, Linkedin } from "lucide-react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import NavWaitlist from "@/components/navbar/NavbarWaitlist";
import { AnimatedMascot } from "@/components/waitlist/motion";
import SiteFooter from "@/components/waitlist/SiteFooter";
import { socialLinks } from "@/components/waitlist/social";
import { useJoinWaitlist } from "@/components/waitlist/useJoinWaitlist";

const icons = {
  "X (Formerly Twitter)": FaXTwitter,
  Telegram: FaTelegram,
  WhatsApp: FaWhatsapp,
  LinkedIn: Linkedin,
};

const CommunityPage = () => {
  const join = useJoinWaitlist();

  return (
    <div className="min-h-screen bg-[#F6F3F1] text-[#1A0F28]">
      <NavWaitlist />
      <main className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">
            Community
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            Follow along while you wait
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#1A0F28]/80 md:text-lg">
            Netmifi is not open yet. These public channels are for updates
            while you are on the waitlist. They are not chat inside the
            product.
          </p>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#1A0F28]/80">
            When Netmifi opens, tutorials, classmates, tutors, and study
            materials for the course in front of you will be in one place.
          </p>
          <div className="mt-8 space-y-3">
            {socialLinks.map((link) => {
              const Icon = icons[link.name];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl bg-white px-5 py-4 ring-1 ring-black/10"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span>{link.name}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 text-[#1A0F28]/50" />
                </a>
              );
            })}
          </div>
          <button
            type="button"
            onClick={join}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-red px-6 text-base font-medium text-white hover:brightness-95"
          >
            Join the waitlist
          </button>
        </div>
        <AnimatedMascot className="mx-auto w-full max-w-sm" />
      </main>
      <SiteFooter />
    </div>
  );
};

export default CommunityPage;

"use client";

import { useEffect } from "react";
import NavWaitlist from "@/components/navbar/NavbarWaitlist";
import CampusRecognition from "@/components/waitlist/CampusRecognition";
import Faq from "@/components/waitlist/Faq";
import Hero from "@/components/waitlist/Hero";
import HowItWorks from "@/components/waitlist/HowItWorks";
import Roadmap from "@/components/waitlist/Roadmap";
import SiteFooter from "@/components/waitlist/SiteFooter";
import TeachInvite from "@/components/waitlist/TeachInvite";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import { scrollToWaitlist } from "@/components/waitlist/useJoinWaitlist";

const HomePage = () => {
  useEffect(() => {
    const scrollIfNeeded = () => {
      if (window.location.hash !== "#waitlist") return;
      window.setTimeout(scrollToWaitlist, 50);
    };

    scrollIfNeeded();
    window.addEventListener("hashchange", scrollIfNeeded);
    return () => window.removeEventListener("hashchange", scrollIfNeeded);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F3F1] text-[#1A0F28]">
      <NavWaitlist />
      <main>
        <Hero />
        <CampusRecognition />
        <HowItWorks />
        <Roadmap />
        <TeachInvite />
        <Faq />
        <WaitlistForm />
      </main>
      <SiteFooter />
    </div>
  );
};

export default HomePage;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== "#waitlist") return;
    const id = window.setTimeout(scrollToWaitlist, 50);
    return () => window.clearTimeout(id);
  }, [location.hash]);

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

export default Home;

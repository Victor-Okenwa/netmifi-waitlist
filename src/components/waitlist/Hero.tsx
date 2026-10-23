"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  positiveWaitlistCount,
  useWaitlistCount,
} from "@/api/hooks/waitlist/useWaitlistCount";
import { AnimatedMascot } from "./motion";
import { useJoinWaitlist } from "./useJoinWaitlist";

const Hero = () => {
  const join = useJoinWaitlist();
  const { data } = useWaitlistCount();
  const count = positiveWaitlistCount(data?.count);

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:pb-24 md:pt-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">
          A free waitlist
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-[1.12] text-[#1A0F28] md:text-5xl">
          Tutorials, classmates, tutors, and study materials for the course in
          front of you.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#1A0F28]/80 md:text-lg">
          Netmifi is a learning, social, and commerce ecosystem. It starts with
          Nigerian undergraduates who need help with a specific course, topic,
          or exam, such as MTH 111 or matrices and determinants. Lecturers,
          tutors, and students who know the work publish in the same place. A
          learner can later teach.
        </p>
        <p className="mt-3 text-base font-medium text-[#1A0F28]">
          Joining is free.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            type="button"
            className="h-11 rounded-full px-6 text-base"
            onClick={join}
          >
            Join the waitlist
          </Button>
          <Link
            href="/community"
            className="text-sm font-medium text-red underline-offset-4 hover:underline"
          >
            Follow along while you wait
          </Link>
        </div>
        {count !== null && (
          <p className="mt-6 text-sm text-[#1A0F28]/70">
            {count.toLocaleString()} {count === 1 ? "person is" : "people are"}{" "}
            already on the waitlist.
          </p>
        )}
      </div>
      <AnimatedMascot className="mx-auto w-full max-w-sm" />
    </section>
  );
};

export default Hero;

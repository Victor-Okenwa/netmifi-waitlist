"use client";

import { Reveal } from "./motion";
import { useJoinWaitlist } from "./useJoinWaitlist";

const TeachInvite = () => {
  const join = useJoinWaitlist();

  return (
    <section className="bg-red py-16 text-white md:py-24">
      <Reveal className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
          Teach
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl font-bold md:text-4xl">
          Know a course well enough to teach it?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/90">
          Lecturers, tutors, and students can publish in the same place. Join
          the waitlist and we will tell you when teaching opens.
        </p>
        <button
          type="button"
          onClick={join}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-base font-medium text-red transition-colors hover:bg-white/90"
        >
          Join the waitlist
        </button>
      </Reveal>
    </section>
  );
};

export default TeachInvite;

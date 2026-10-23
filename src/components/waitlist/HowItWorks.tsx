"use client";

import { BookOpen, School, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion";

const roles: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Learners",
    body: "Find tutorials, classmates, tutors, and study materials for one course, topic, or exam.",
    icon: BookOpen,
  },
  {
    title: "Instructors",
    body: "Lecturers and tutors publish for a course they know.",
    icon: School,
  },
  {
    title: "Creators",
    body: "A student who has learned the work can later teach it here.",
    icon: Users,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">
            How it works
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold text-[#1A0F28] md:text-4xl">
            One place for the course in front of you
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <StaggerItem key={role.title}>
                <article className="h-full rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
                  <Icon className="h-6 w-6 text-red" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold text-[#1A0F28]">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#1A0F28]/75 md:text-base">
                    {role.body}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default HowItWorks;

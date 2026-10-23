"use client";

import { Reveal, Stagger, StaggerItem } from "./motion";

const stages = [
  {
    step: "1",
    title: "Academic foundation",
    body: "Nigerian undergraduate courses, topics, and exams come first.",
  },
  {
    step: "2",
    title: "Community and commerce",
    body: "Classmates and tutors share one place. Some material will stay free. Creators will be able to charge in naira for work they have the right to share.",
  },
];

const Roadmap = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">
            Roadmap
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold text-[#1A0F28] md:text-4xl">
            Academic work first, then community and commerce
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
          {stages.map((stage) => (
            <StaggerItem key={stage.step}>
              <article className="h-full rounded-3xl border border-black/5 bg-[#F6F3F1] p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red text-sm font-bold text-white">
                  {stage.step}
                </span>
                <h3 className="mt-4 text-xl font-bold text-[#1A0F28]">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#1A0F28]/75 md:text-base">
                  {stage.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-[#1A0F28]/70 md:text-base">
            Technical skills and lifelong learning stay on the roadmap, after
            this academic foundation. They are not what this page is for.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Roadmap;

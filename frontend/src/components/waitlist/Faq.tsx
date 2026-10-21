import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./motion";

const questions = [
  {
    id: "open",
    question: "Is Netmifi open?",
    answer:
      "No. This page is a waitlist. Netmifi is not open yet.",
  },
  {
    id: "free",
    question: "Is joining free?",
    answer: "Yes. Joining the waitlist is free.",
  },
  {
    id: "price",
    question: "Will material cost money?",
    answer:
      "When publishing opens, some material will stay free, and creators will be able to charge in naira.",
  },
  {
    id: "teach",
    question: "Can a learner teach later?",
    answer:
      "Yes. A learner can later teach a course they know. Lecturers, tutors, and knowledgeable students will publish in the same place. Teaching is not open yet. Join the waitlist and we will say when it is.",
  },
  {
    id: "rights",
    question: "What can I share?",
    answer: "Share only work you have the right to distribute.",
  },
  {
    id: "campuses",
    question: "Are the university and polytechnic marks partnerships?",
    answer:
      "No. The South-East university and polytechnic marks are recognition of where many first learners study. They are not partnerships, and Netmifi has no official deals with those institutions.",
  },
  {
    id: "later",
    question: "What about technical skills and lifelong learning?",
    answer:
      "They stay on the roadmap, after the academic foundation. They are not the focus of this waitlist.",
  },
  {
    id: "who",
    question: "Who is Netmifi for first?",
    answer:
      "Nigerian students, especially undergraduates who need help with a specific course, topic, or exam.",
  },
];

const Faq = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#1A0F28] md:text-4xl">
            Questions before you join
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {questions.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="mb-3 rounded-2xl border border-black/10 bg-white"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-7 text-[#1A0F28]/80">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};

export default Faq;

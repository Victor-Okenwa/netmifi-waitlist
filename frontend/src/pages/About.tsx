const About = () => {
  return (
    <main className="min-h-screen bg-[#F6F3F1] px-5 py-16 text-[#1A0F28] md:px-8">
      <article className="mx-auto max-w-3xl space-y-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">
            About
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight">
            Tutorials, classmates, tutors, and study materials for the course
            in front of you.
          </h1>
        </header>
        <p className="text-lg leading-8">
          Netmifi is a learning, social, and commerce ecosystem. The first
          audience is Nigerian students, especially undergraduates who need
          help with a specific course, topic, or exam, such as MTH 111 or
          matrices and determinants.
        </p>
        <p className="text-lg leading-8">
          Lecturers, tutors, and knowledgeable students will publish in the
          same place. A learner can later teach. Joining the waitlist is free.
          When publishing opens, some material will stay free, and creators
          will be able to charge in naira. Share only work you have the right
          to distribute.
        </p>
        <p className="text-lg leading-8">
          This is a waitlist. Netmifi is not open yet. Technical skills and
          lifelong learning stay on the roadmap, after the academic foundation.
        </p>
      </article>
    </main>
  );
};

export default About;

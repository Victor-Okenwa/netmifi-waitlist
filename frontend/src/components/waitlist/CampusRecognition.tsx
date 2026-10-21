import { Reveal, Stagger, StaggerItem } from "./motion";

const campuses = [
  { abbr: "UNN", name: "University of Nigeria, Nsukka" },
  { abbr: "UNIZIK", name: "Nnamdi Azikiwe University" },
  { abbr: "FUTO", name: "Federal University of Technology, Owerri" },
  { abbr: "ESUT", name: "Enugu State University of Science and Technology" },
  { abbr: "IMSU", name: "Imo State University" },
  { abbr: "ABSU", name: "Abia State University" },
  { abbr: "EBSU", name: "Ebonyi State University" },
  { abbr: "MOUAU", name: "Michael Okpara University of Agriculture" },
  { abbr: "AE-FUNAI", name: "Alex Ekwueme Federal University, Ndufu-Alike" },
];

function CampusMark({ abbr, name }: { abbr: string; name: string }) {
  const fontSize = abbr.length > 6 ? 8 : abbr.length > 4 ? 10 : 13;

  return (
    <figure className="flex flex-col items-center gap-3 text-center motion-reduce:transform-none transition-transform hover:-translate-y-1">
      <svg viewBox="0 0 80 92" className="h-20 w-16" aria-hidden="true">
        <path
          d="M40 4 L74 16 V46 C74 66 58 80 40 88 C22 80 6 66 6 46 V16 Z"
          fill="hsl(0 100% 31%)"
        />
        <path
          d="M40 10 L68 20 V46 C68 63 54 75 40 82 C26 75 12 63 12 46 V20 Z"
          fill="white"
          fillOpacity="0.14"
        />
        <text
          x="40"
          y="50"
          textAnchor="middle"
          fill="white"
          fontSize={fontSize}
          fontWeight="700"
          fontFamily="Dm Sans, sans-serif"
        >
          {abbr}
        </text>
      </svg>
      <figcaption className="max-w-[11rem] text-xs leading-snug text-[#1A0F28]/75">
        {name}
      </figcaption>
    </figure>
  );
}

const CampusRecognition = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red">
            South-East campuses
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold text-[#1A0F28] md:text-4xl">
            Recognition of where many first learners study
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#1A0F28]/75">
            These names mark campuses. They are not partnerships.
          </p>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
          {campuses.map((campus) => (
            <StaggerItem key={campus.abbr}>
              <CampusMark abbr={campus.abbr} name={campus.name} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default CampusRecognition;

"use client";

import { Reveal, Stagger, StaggerItem } from "./motion";

const campuses: { id: string; name: string; src: string }[] = [
  { id: "unn", name: "University of Nigeria, Nsukka", src: "/campuses/unn.png" },
  { id: "unizik", name: "Nnamdi Azikiwe University", src: "/campuses/unizik.png" },
  { id: "futo", name: "Federal University of Technology, Owerri", src: "/campuses/futo.png" },
  {
    id: "esut",
    name: "Enugu State University of Science and Technology",
    src: "/campuses/esut.png",
  },
  { id: "imsu", name: "Imo State University", src: "/campuses/imsu.png" },
  { id: "absu", name: "Abia State University", src: "/campuses/absu.png" },
  { id: "ebsu", name: "Ebonyi State University", src: "/campuses/ebsu.png" },
  {
    id: "mouau",
    name: "Michael Okpara University of Agriculture",
    src: "/campuses/mouau.png",
  },
  {
    id: "funai",
    name: "Alex Ekwueme Federal University, Ndufu-Alike",
    src: "/campuses/funai.png",
  },
  { id: "imt", name: "Institute of Management and Technology, Enugu", src: "/campuses/imt.png" },
  { id: "nekede", name: "Federal Polytechnic, Nekede", src: "/campuses/nekede.png" },
  { id: "oko", name: "Federal Polytechnic, Oko", src: "/campuses/oko.png" },
  {
    id: "unwana",
    name: "Akanu Ibiam Federal Polytechnic, Unwana",
    src: "/campuses/unwana.png",
  },
  { id: "abia-poly", name: "Abia State Polytechnic", src: "/campuses/abia-poly.png" },
  { id: "imo-poly", name: "Imo State Polytechnic, Umuagwo", src: "/campuses/imo-poly.png" },
];

function CampusMark({ name, src }: { name: string; src: string }) {
  return (
    <figure className="flex flex-col items-center gap-3 text-center transition-transform hover:-translate-y-1 motion-reduce:transform-none">
      {/* eslint-disable-next-line @next/next/no-img-element -- skip Sharp; Vercel linux-x64 cannot load it from this Windows lockfile */}
      <img src={src} alt="" className="h-20 w-20 object-contain" />
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
            South-East universities and polytechnics
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold text-[#1A0F28] md:text-4xl">
            Recognition of where many first learners study
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#1A0F28]/75">
            These marks are recognition only. They are not partnerships.
          </p>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {campuses.map((campus) => (
            <StaggerItem key={campus.id}>
              <CampusMark name={campus.name} src={campus.src} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default CampusRecognition;

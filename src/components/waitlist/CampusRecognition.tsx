"use client";

import Image, { type StaticImageData } from "next/image";
import unn from "@/assets/campuses/unn.png";
import unizik from "@/assets/campuses/unizik.png";
import futo from "@/assets/campuses/futo.png";
import esut from "@/assets/campuses/esut.png";
import imsu from "@/assets/campuses/imsu.png";
import absu from "@/assets/campuses/absu.png";
import ebsu from "@/assets/campuses/ebsu.png";
import mouau from "@/assets/campuses/mouau.png";
import funai from "@/assets/campuses/funai.png";
import imt from "@/assets/campuses/imt.png";
import nekede from "@/assets/campuses/nekede.png";
import oko from "@/assets/campuses/oko.png";
import unwana from "@/assets/campuses/unwana.png";
import abiaPoly from "@/assets/campuses/abia-poly.png";
import imoPoly from "@/assets/campuses/imo-poly.png";
import { Reveal, Stagger, StaggerItem } from "./motion";

const campuses: { id: string; name: string; src: StaticImageData }[] = [
  { id: "unn", name: "University of Nigeria, Nsukka", src: unn },
  { id: "unizik", name: "Nnamdi Azikiwe University", src: unizik },
  { id: "futo", name: "Federal University of Technology, Owerri", src: futo },
  {
    id: "esut",
    name: "Enugu State University of Science and Technology",
    src: esut,
  },
  { id: "imsu", name: "Imo State University", src: imsu },
  { id: "absu", name: "Abia State University", src: absu },
  { id: "ebsu", name: "Ebonyi State University", src: ebsu },
  {
    id: "mouau",
    name: "Michael Okpara University of Agriculture",
    src: mouau,
  },
  {
    id: "funai",
    name: "Alex Ekwueme Federal University, Ndufu-Alike",
    src: funai,
  },
  { id: "imt", name: "Institute of Management and Technology, Enugu", src: imt },
  { id: "nekede", name: "Federal Polytechnic, Nekede", src: nekede },
  { id: "oko", name: "Federal Polytechnic, Oko", src: oko },
  {
    id: "unwana",
    name: "Akanu Ibiam Federal Polytechnic, Unwana",
    src: unwana,
  },
  { id: "abia-poly", name: "Abia State Polytechnic", src: abiaPoly },
  { id: "imo-poly", name: "Imo State Polytechnic, Umuagwo", src: imoPoly },
];

function CampusMark({ name, src }: { name: string; src: StaticImageData }) {
  return (
    <figure className="flex flex-col items-center gap-3 text-center transition-transform hover:-translate-y-1 motion-reduce:transform-none">
      <Image
        src={src}
        alt=""
        width={80}
        height={80}
        className="h-20 w-20 object-contain"
      />
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

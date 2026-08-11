import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./Education.jsx";
import LeetcodeProfile from "./LeetcodeProfile.jsx";
import GfgProfile from "./GfgProfile.jsx";


export default function CodingProfile() {

  return (
    <section id="coding" className="mx-auto max-w-4xl px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Coding Profile" />
      </div>
      <LeetcodeProfile />
      <GfgProfile />
    </section>
  );
}
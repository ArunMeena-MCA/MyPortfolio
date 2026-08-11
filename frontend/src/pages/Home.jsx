import { useEffect } from "react";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import ResumeSection from "../components/ResumeSection.jsx";
import Education from "../components/Education.jsx";
import Experience from "../components/Experience.jsx";
import Projects from "../components/Projects.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import VisitorIntroPopup from "../components/VisitorIntroPopup.jsx";
import CodingProfile from "../components/CodingProfile.jsx";
import { trackVisit } from "../utils/api.js";
import { getVisitorKey } from "../utils/fingerprint.js";

export default function Home() {
  useEffect(() => {
    trackVisit(getVisitorKey(), "/").catch(() => {
      /* analytics being down should never block the site */
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <CodingProfile />
      <ResumeSection />
      <Education />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <VisitorIntroPopup />
    </div>
  );
}

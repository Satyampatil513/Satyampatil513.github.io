import SiteChrome from "@/components/SiteChrome";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CanSatMission from "@/components/CanSatMission";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SiteChrome />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <CanSatMission />
        <Achievements />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

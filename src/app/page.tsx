import Starfield from "@/components/Starfield";
import SiteChrome from "@/components/SiteChrome";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import CanSatMission from "@/components/CanSatMission";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Starfield />
      <SiteChrome />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <CanSatMission />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

/*
Mateo Herrera Lavalle

Pagina principal (landing)
Incluye el hero, testimonials y process
*/
import Hero from "@/components/general/Hero";
import Testimonials from "@/components/user/Testimonials";
import Process from "@/components/user/Process";
import LandingPageLayout from "@/components/user/landing_page_layout";

export default function Home() {
  return (
    <>
      <LandingPageLayout>
        <Hero />
        <Testimonials />
        <Process />
      </LandingPageLayout>
    </>
  );
}

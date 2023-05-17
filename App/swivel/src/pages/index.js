/*
Mateo Herrera Lavalle

Pagina principal (landing)
Incluye el hero, testimonials y process
*/
import Hero from "@/components/general/hero";
import Testimonials from "@/components/buyer/Testimonials";
import Process from "@/components/buyer/Process";
import LandingPageLayout from "@/components/buyer/landing_page_layout";

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

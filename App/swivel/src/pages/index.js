/*
Mateo Herrera Lavalle

Pagina principal (landing)
Incluye el hero, testimonials y process
*/
import Hero from "@/components/general/hero";
import Testimonials from "@/components/buyer/testimonials";
import Process from "@/components/buyer/process";
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

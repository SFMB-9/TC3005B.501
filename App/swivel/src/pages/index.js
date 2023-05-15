/*
Mateo Herrera Lavalle

Pagina principal (landing)
Incluye el hero, testimonials y process
*/
import Hero from "@/components/general/hero";
import Testimonials from "@/components/buyer/testimonials";
import Process from "@/components/buyer/process";
import BuyerLayout from "@/components/buyer/buyer_layout";

export default function Home() {
  return (
    <>
      <BuyerLayout>
        <Hero />
        <Testimonials />
        <Process />
      </BuyerLayout>
    </>
  );
}

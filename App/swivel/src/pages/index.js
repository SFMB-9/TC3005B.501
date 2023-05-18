/*
Mateo Herrera Lavalle

Pagina principal (landing)
Incluye el hero, testimonials y process
*/
import Testimonials from "@/components/buyer/testimonials";
import Process from "@/components/buyer/process";
import BuyerLayout from "@/components/buyer/buyer_layout";
import CustomHero from "@/components/general/custom_hero";
import CategoryViews from "@/components/buyer/category_views";
import CarViews from "@/components/buyer/car_views";
import SwivelExperience from "@/components/buyer/swivel_experience";

export default function Home() {
  return (
    <>
      <BuyerLayout>
        <CustomHero
          titleSize='200'
          title='Compra el auto de tus sueños en línea'
          message=''
          button
          containerSize={50}
        />
        <CategoryViews/>
        <CarViews/>
        <SwivelExperience/>
        <Process />
        <Testimonials />
      </BuyerLayout>
    </>
  );
}

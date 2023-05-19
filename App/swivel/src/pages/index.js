/*
Mateo Herrera Lavalle, Salvador Federico Milanés Braniff

Pagina principal (landing)
Incluye el hero, testimonials y process
*/
// import CustomHero from "@/components/general/custom_hero";
import BuyerLayout from "@/components/buyer/buyer_layout";
import RotatingHeader from "@/components/buyer/rotating_header";
import Process from "@/components/buyer/process";
import CategoryViews from "@/components/buyer/category_views";
import CarViews from "@/components/buyer/car_views";
import SwivelExperience from "@/components/buyer/swivel_experience";
import Testimonials from "@/components/buyer/testimonials";

export default function Home() {
  return (
    <>
      <BuyerLayout>
        {/* <CustomHero
          titleSize='200'
          title='Compra el auto de tus sueños en línea'
          message=''
          button
          containerSize={50}
        /> */}
        <RotatingHeader/>
        <CategoryViews/>
        <CarViews/>
        <SwivelExperience/>
        <Process />
        <Testimonials />
      </BuyerLayout>
    </>
  );
}

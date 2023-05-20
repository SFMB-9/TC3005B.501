import BuyerNavbar from "@/components/buyer/navbar"
import CustomHero from "@/components/general/custom_hero"
import CustomScrollerBar from "@/components/general/custom_scroller_bar"

// Use api to fill in components and render them below...

export default function CarDetails() {
  const components = [
    { component: ()=><>Características</>, name: "Características" },
    { component: ()=><>Extras</>, name: "Extras" },
    { component: ()=><>Financiamiento</>, name: "Financiamiento" },
  ]

  return (
    <div>
      <BuyerNavbar/>
      <CustomHero/>
      <CustomScrollerBar
        components={components}
        transparent
        bold
        stretched
      />
      <h1>seller landing</h1>
    </div>
  )
}
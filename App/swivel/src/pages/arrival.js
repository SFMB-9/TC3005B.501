import CustomHero from "@/components/general/custom_hero";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Arrival() {
  const [apiData, setApiData] = useState(null);

  const { data: session } = useSession();

  const fetchData = async () => {
    const resData = await fetch(
      `/api/managerProfile/managerP?id=${session.id}`
    );

    const res = await resData.json();

    setApiData(res.userData);
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  return(
    <CustomHero
      title={` Bienvenidx, ${apiData?.nombres}`}
      message={''}
      containerSize={100}
    />
  )
}
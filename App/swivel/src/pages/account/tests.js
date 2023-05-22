import {
  Grid,
} from "@mui/material";
import AccountLayout from "@/components/buyer/account_layout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import CatalogPagination from "@/components/buyer/catalog_pagination";

export default function Tests() {
  const router = useRouter();
  const [apiData, setApiData] = useState(null);
  const { data: session } = useSession();

  console.log("session", session);
  
  const fetchDrivingData = async () => {
      const res = await fetch(
        `http://localhost:3000/api/buyerProfile/getDrivingReq?user_id=${session.id}`
      );
      const data = await res.json();
      setApiData(data);
  };

  useEffect(() => {
      if (session){
          fetchDrivingData();
      }
  }, [session]);

  return (
    <AccountLayout>
      <Grid item xs={12} md={9} sm={8}>
            <div>
              <div
                style={{
                  padding: "3%",
                  overflowY: "scroll",
                  maxHeight: "100vh",
                }}
              >
                {
                  apiData && apiData.length > 0 && (
                    <CatalogPagination
                      catalogData={apiData}
                      carCardType="drivingTest"
                      itemsPerPage={6}
                    />
                  )
                }
              </div>
            </div>
          </Grid>
    </AccountLayout>
  )
}
import {
  Grid,
  Typography,
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

  const fetchDrivingData = async () => {
    const res = await fetch(
      `/api/buyerProfile/getDrivingReq?user_id=${session.id}`
    );
    const data = await res.json();
    setApiData(data);
  };

  useEffect(() => {
    if (session) {
      fetchDrivingData();
    }
  }, [session]);

  return (
    <AccountLayout>
      <Grid item xs={12} md={9} sm={8}>
        <div>
          <Typography
            variant="h4"
            fontWeight="bold"
            className="pb-2"
            sx={{
              fontFamily: "Raleway", color: "#333333",
              paddingTop: "1rem",
              paddingLeft: "2rem",
            }}
          >
            Mis pruebas de manejo
          </Typography>
          <div
            style={{
              padding: "3%",
              overflowY: "scroll",
              maxHeight: "100vh",
            }}
          >
            {
              apiData && apiData.length > 0 ? (
                <CatalogPagination
                  catalogData={apiData}
                  carCardType="drivingTest"
                  itemsPerPage={6}
                />
              )
                : (
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    className="pb-2"
                    sx={{
                      fontFamily: "Lato", color: "#333333",
                      paddingTop: "1rem",
                      paddingLeft: "2rem",
                    }}
                  >
                    Todavía no cuenta con solicitudes de prueba de manejo
                  </Typography>
                )
            }
          </div>
        </div>
      </Grid>
    </AccountLayout>
  )
}
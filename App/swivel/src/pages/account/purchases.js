import {
  Grid,
  Typography,
} from "@mui/material";
import AccountLayout from "@/components/buyer/account_layout";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import CatalogPagination from "@/components/buyer/catalog_pagination";
import CustomTogglerBar from "@/components/general/custom_toggler_bar";

export default function Purchases() {
  const router = useRouter();
  const [apiCurrentData, setApiCurrentData] = useState(null);
  const [apiCompletedData, setApiCompletedData] = useState(null);
  const { data: session } = useSession();

  console.log("session", session);

  const fetchData = async () => {
    const resCurrentPurchases = await fetch(
      `/api/buyerProfile/getPurchaseReq?user_id=${session.id}`
    );
    const resCompletedPurchases = await fetch(
      `/api/buyerProfile/getPurchase?user_id=${session.id}`
    );
    const currentData = await resCurrentPurchases.json();
    const completedData = await resCompletedPurchases.json();
    setApiCurrentData(currentData);
    setApiCompletedData(completedData);
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  console.log("apiData", apiCompletedData);
  console.log("apiData2", apiCurrentData);
  const components = [
    {
      name: "Solicitudes de compra",
      component: () => (
        <>
          <div>
            <div
              style={{
                padding: "3%",
                overflowY: "scroll",
                maxHeight: "100vh",
              }}
            >
              {
                apiCurrentData && apiCurrentData.length > 0 ? (
                  <CatalogPagination
                    catalogData={apiCurrentData}
                    carCardType="purchases"
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
                      Todavía no cuenta con solicitudes de compra en proceso.
                    </Typography>
                  )
              }
            </div>

          </div>
        </>
      )
    },
    {
      name: "Compras finalizadas",
      component: () =>
        <>
          <div>
            <div
              style={{
                padding: "3%",
                overflowY: "scroll",
                maxHeight: "100vh",
              }}
            >
              {
                apiCompletedData && apiCompletedData.length > 0 ? (
                  <CatalogPagination
                    catalogData={apiCompletedData}
                    carCardType="finalized"
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
                      Todavía no cuenta con compras finalizadas.
                    </Typography>
                  )
              }
            </div>
          </div>
        </>
    },
  ]
  return (
    <AccountLayout>
      <Grid item xs={12} md={9} sm={8}>
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
          Mis compras
        </Typography>
        <CustomTogglerBar
          components={components}
          stretched
          tall
        />
        {/* <div>
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
                  carCardType="purchasesCompleted"
                  itemsPerPage={6}
                />
              )
            }
          </div>
        </div> */}
      </Grid>
    </AccountLayout>
  )
}
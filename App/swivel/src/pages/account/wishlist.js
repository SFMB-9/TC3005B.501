import React, { useEffect, useState } from 'react';
import {useSession} from 'next-auth/react';
import axios from 'axios';

import {
  Grid,
  Typography,
} from '@mui/material';
import AccountLayout from '@/components/buyer/account_layout';
import CatalogPagination from '@/components/buyer/catalog_pagination';

const Wishlist = () => {
  const [lst, setLst] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/wishlist/pull-wishlist', { params: { id: session.id } }); // id should be gotten from the session, it's the user's session
        setLst(response.data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [session]);

  console.log(lst);

  if(session){
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
              Mis favoritos
            </Typography>
            <div
              style={{
                padding: "3%",
                overflowY: "scroll",
                maxHeight: "100vh",
              }}
            >
              {
                lst && lst.length > 0 ? (
                  <CatalogPagination
                    catalogData={lst}
                    carCardType="catalog"
                    itemsPerPage={6}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    className="pb-2"
                    sx={{
                      fontFamily: "Raleway", color: "#333333",
                      paddingTop: "1rem",
                      paddingLeft: "2rem",
                    }}
                  >
                    No hay favoritos
                  </Typography>
                )
              }

            </div>
          </div>
        {/* <div>
          <h2>Favoritos</h2>
          <ul>
            {lst.map((item) => (
              <li key={item._id}>{item.nombres}</li>
            ))}
          </ul>
        </div> */}
        </Grid>
      </AccountLayout>
    );
  }
}; // please add the additional thingies you need for this

export default Wishlist;

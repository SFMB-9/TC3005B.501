/*
Luis Javier Karam
30/5/2023

Page to view a list of all the agencies related to the GA user that is logged in and the ability 
to edit and delete agencies.
*/

import React from 'react'
import Searchbar from '@/components/general/searchbar'
import DataTable from '@/components/general/Table'
import GANavbar from '@/components/providers/GA/navbar'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import styles from '@/styles/portal_agencias.module.css'



export default function GA_agencies() {
    return (
        <div>
            <GANavbar />
            <div className={styles.mainContainer}>
                

            </div>
            
        </div>
    )
}
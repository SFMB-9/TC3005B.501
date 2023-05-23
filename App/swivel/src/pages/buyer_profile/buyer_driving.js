import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ApiDataDisplay from "@/components/buyer/api_data_display";

import BuyerLayout from "@/components/buyer/layout";

export default function ProfileDriveTests() {
    const router = useRouter();
    const [apiData, setApiData] = useState(null);
    const { data: session } = useSession();
    
    
    const fetchDrivingData = async () => {
        console.log("session", session.id);
        const res = await fetch(
        `http://localhost:3000/api/buyerProfile/getDrivingReq/user_id?${session.id}`
        );
        const data = await res.json();
        setApiData(data);
        console.log("data", apiData);
    };

    useEffect(() => {
        if (session){
            fetchDrivingData();
        }
    }, [session]);

    return (
        <BuyerLayout>
            <ApiDataDisplay apiData={apiData} />
        </BuyerLayout>
    )
} 
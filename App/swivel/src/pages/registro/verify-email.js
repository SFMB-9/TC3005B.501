"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function VerificationPage() {
    const router  = useRouter();

    const [message, setMessage] = useState('Verifying account...');

    useEffect(() => {
        async function verifyAccount() {

            const token = router.query.token;
            const email = router.query.email;

            if (!token || !email) {
                setMessage('Invalid verification link');
                return;
            }

            try {
                const { data } = await axios.post(`/api/registro/verify-email?token=${token}&email=${email}`);

                console.log(data);

                if(data.success){
                    setMessage("Account verified successfully");
                }
                else{
                    setMessage("Verification failed");
                }
            }
            catch (error) {
                setMessage("An error ocurred");
                console.log(error.response.data);
            }
        }
        verifyAccount();

    }, [router.query.token]);

    return (
        <div>
            <p>{message}</p>
        </div>
    )
}
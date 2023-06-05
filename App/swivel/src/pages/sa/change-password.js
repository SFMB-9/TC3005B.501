import React from 'react'
import ChangePassword from '@/components/SA/change_password'
import SANavbar from '@/components/SA/navbar'
import { useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';


export default function changePasswordSA() {

      const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
      if(!session){
        router.push("/auth/login");
      }
    })
    return (
        <div>
            <SANavbar />
            <ChangePassword />
        </div>
    )
}
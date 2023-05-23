import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Process() {
    const router = useRouter();
    const { process_id } = router.query;

    return (
        <div>
            <h1>Process: {process_id}</h1>
        </div>
    );
}
import React from 'react'
import Link from 'next/link'

export const AutomotiveGroupSidebar = () => {
    return (
        <div className='sidebar'>
            <div>
                <Link href='/automotive_group/settings'>Ajustes GA</Link>
            </div>
        </div>
    )
}
import '@/styles/globals.css'
import Image from 'next/image'

export default function RegistroCompradores() {
    return(
        <div className='RegistroCompradores'>
            <div className="flex justify-between items-center">
                <div className='formulario'>
                    <Image src="/swivel_landing.svg" alt="Swivel Logo" width={100} height={70}/>
                </div>
                <div className='bienvenida'>

                </div>
            </div>
        </div>
    )
}
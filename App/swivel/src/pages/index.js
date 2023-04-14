import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Link href='/'>
        <Image src='/logo.png' alt='Swivel' width={200} height={200} />
      </Link>
      <Link href='/auth/register'>Regístrate</Link>
      <Link href='/auth/login'>Inicia sesión</Link>
      <Link href='/automotive_group/settings'>Ajustes GA</Link>
      <Link href='buyer_account/subirdoc'>Mis documentos</Link>
    </>
  )
}

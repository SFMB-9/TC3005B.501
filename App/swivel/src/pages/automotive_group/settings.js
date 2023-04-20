import Link from 'next/link'

export default function Settings () {
  return (
    <>
      <Link href='/'>
        <div>
        <a>Home</a>
        </div>
      </Link>
      <Link href='/automotive_group/settings'>
        <div>
        <a>Ajustes GA</a>
        </div>
      </Link>
      <Link href='/automotive_group/docs'>
        <div>
        <a>Documentos</a>
        </div>
      </Link>
    </>
  )
}
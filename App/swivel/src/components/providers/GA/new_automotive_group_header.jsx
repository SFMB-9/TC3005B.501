/*
Salvador Federico Milanes Braniff
18-04-2023

NAGHeader es el encabezado de las páginas de Nuevo Grupo Automotriz.
Utilizarlo permite reducir la cantidad de codigo redundante en interfaces
*/
// New Automotive Group Header Component
import styles from '@/styles/new_automotive_group_header.module.css'

const NewAutomotiveGroupHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.tag}>
                <img src='/grupo_auto/header_profile_icon.svg' className={styles.icon} />
                <span className={styles.name}>Grupo Automotriz</span>
            </div>
        </div>
    )
}

export default NewAutomotiveGroupHeader
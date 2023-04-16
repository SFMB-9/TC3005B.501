import styles from '@/styles/new_automotive_group_header.module.css'

const NewAutomotiveGroupHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.tag}>
                <img src='/header_profile_icon.svg' className={styles.icon}/>
                <span className={styles.name}>Grupo Automotriz</span>
            </div>
        </div>
    )
}

export default NewAutomotiveGroupHeader
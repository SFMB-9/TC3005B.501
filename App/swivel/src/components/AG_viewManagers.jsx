// Header for when Automotive Group wants to see their Managers. 
import styles from '@/styles/new_automotive_group_header.module.css'

const AG_viewManagers = () => {
    return (
        <div className={styles.header}>
            <div className={styles.tag}>
                <img src='/header_profile_icon.svg' className={styles.icon}/>
                <span className={styles.name}>Gerentes</span>
            </div>
        </div>
    )
}

export default AG_viewManagers

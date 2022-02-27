import SignInButton from './SignInButton'
import styles from './style.module.scss'

export const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="Logo ignews" />
                <nav>
                    <a className={styles.active}>Inicio</a>
                    <a>Postagens</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}
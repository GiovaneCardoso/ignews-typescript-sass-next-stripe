import SignInButton from "./SignInButton";
import styles from "./style.module.scss";
import ActiveLink from "./ActiveLink";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="Logo ignews" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Inicio</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Postagens</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
};

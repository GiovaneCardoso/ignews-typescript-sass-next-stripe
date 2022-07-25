import React from "react"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { signIn, useSession, signOut } from "next-auth/react"
import { FiX } from "react-icons/fi"
import styles from "./styles.module.scss"

export const SignInButton = () => {
  const { data: session } = useSession()

  return session?.user ? (
    <button className={styles.signInButton} onClick={() => signOut()}>
      <FaGithub color="#04d361" />
      Olá {session?.user?.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <>
      <button className={styles.signInButton} onClick={() => signIn("google")}>
        <FaGoogle color="#eba417" />
        Entrar com Google
      </button>
      <button className={styles.signInButton} onClick={() => signIn("github")}>
        <FaGithub color="#eba417" />
        Entrar com Github
      </button>
    </>
  )
}

export default SignInButton

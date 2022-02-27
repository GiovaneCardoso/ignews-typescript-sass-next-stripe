import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export const SignInButton = () => {
  const isUserLoggedIn = true;

   return isUserLoggedIn ? (
    (
      <button className={styles.signInButton}>
        <FaGithub color='#eba417'/>
        Olá Giovane
        <FiX color='#737380' className={styles.closeIcon} />
      </button>
    )
   ) : (
    (
      <button className={styles.signInButton}>
        <FaGithub color='#eba417'/>
        Entrar com Github
      </button>
    )
   )
}

export default SignInButton
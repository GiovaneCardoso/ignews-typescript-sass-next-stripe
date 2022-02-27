import Head from 'next/head'
import SubscribeButton from '../components/SubscribeButton'
import styles from './home.module.scss'
export default function Home() {
return (
    <>
      <Head>
      	<title>Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Bem-vindo</span>
          <h1>Novidades sobre o mundo do <span>React</span></h1>
          <p>
            Garanta seu acesso a todos os conteúdos
            <span>por apenas R$9,90/mês</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

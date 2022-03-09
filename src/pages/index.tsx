import Head from 'next/head'
import { GetStaticProps } from 'next'
import SubscribeButton from '../components/SubscribeButton'
import styles from './home.module.scss'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product: { priceId, amount } }: HomeProps ) {
return (
    <>
      <Head>
      	<title>Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Bem-vindo</span>
          <h1>Novidades sobre o mundo do <span>NextJS</span></h1>
          <p>
            Garanta seu acesso a todos os conteúdos
            <span>por apenas {amount}/mês</span>
          </p>
          <SubscribeButton priceId={priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1Kb6onG2pINkmTxlnoV1Dc3G')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
      
    }).format(price.unit_amount! / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 1 dia
  } 
}
// export const getServerSideProps: GetServerSideProps = async () => {

//   const price = await stripe.prices.retrieve('price_1Kb6onG2pINkmTxlnoV1Dc3G')

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('pt-br', {
//       style: 'currency',
//       currency: 'BRL'
      
//     }).format(price.unit_amount! / 100)
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }


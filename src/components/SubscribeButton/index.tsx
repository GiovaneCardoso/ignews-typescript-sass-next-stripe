import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  
  const { data: session } = useSession()


  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()
      await stripe?.redirectToCheckout({ sessionId })

    } catch {

    }

  }

  return (
    <button type='button'
      onClick={handleSubscribe}
      className={styles.subscribeButton}
    >
        Insrever-se
    </button>
  )
}

export default SubscribeButton
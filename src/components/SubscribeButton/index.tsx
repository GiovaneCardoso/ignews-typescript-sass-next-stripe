import React from 'react'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

const SubscribeButton = ({priceId}: SubscribeButtonProps) => {
  return (
    <button type='button' className={styles.subscribeButton}>
        Insrever-se
    </button>
  )
}

export default SubscribeButton
import { CONTACT_EMAIL, INSTA } from '@/utils/lib/constants'

import styles from '@/components/Footer/Footer.module.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <ul className={styles['Footer__list']}>
        <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
        <li>follow me <a href={`https://www.instagram.com/${INSTA}`}>@{INSTA}</a></li>
      </ul>
    </footer>
  )
} 
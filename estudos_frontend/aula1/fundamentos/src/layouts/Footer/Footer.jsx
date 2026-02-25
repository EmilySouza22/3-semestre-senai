import React from 'react'
import styles from './Footer.module.css'

export const Footer = ({name}) => {
  return (
    <footer className={styles.footer}>
        <p className={styles.name}> {name} </p>
    </footer>
  )
}
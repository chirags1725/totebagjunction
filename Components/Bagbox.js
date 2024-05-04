import React from 'react'
import styles from '@/styles/box.module.css'
import Image from 'next/image'

const Bagbox = (props) => {
  return (
    <div>
      <div className={styles.box}>
        <div className={styles.img}>
            <img src={`data:image/jpeg;base64,${props.image}`} alt="Image" />
        </div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.rate}>&#8377; {props.price}</div>
    </div>
    </div>

  )
}

export default Bagbox

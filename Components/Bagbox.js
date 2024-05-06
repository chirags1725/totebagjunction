import React from 'react'
import styles from '@/styles/box.module.css'
import Image from 'next/image'
import { Zoom } from 'react-awesome-reveal';

const Bagbox = (props) => {
  return (
    <Zoom duration={'200'}>
    <div>
      <div className={styles.box}>
        <div className={styles.img}>
            <img src={`data:image/jpeg;base64,${props.image}`} alt="Image" />
        </div>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.rate}>&#8377; {props.price}</div>
    </div>
    </div>
    </Zoom>

  )
}

export default Bagbox

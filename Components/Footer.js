import React from 'react'

const Footer = () => {
  return (
    <div style={styles.footer}>
      <div>
      <h4 style={{marginBottom:'20px'}}>FOLLOW US</h4>
      <p>Thanks for visiting our website! Follow us on social media for updates on our latest products, promotions, and more. Click the buttons below to visit our profiles on Facebook, Instagram. Thanks for supporting Septemberish!</p>
      </div>
      <div >
        <h4 style={{marginBottom:'20px'}}>KEY LINKS</h4>
        <a>Contact Us</a><br/>
        <a>Order Tracking</a><br/>
        <a>FAQs</a><br/>
        <a>Blog</a><br/>
        <a>About Us</a><br/>
        <a>Refund & Returns Policy</a><br/>
        <a>Privacy Policy</a><br/>
        <a>SHIPPING & DELIVERY POLICY</a><br/>
        <a>Terms & Conditions</a><br/>
      </div>
    </div>
  )
}

const styles ={
    footer:{
        display:'flex',
        // width:'80%',
        margin:'20px',
        padding:'60px 80px',
        borderTop:'1px solid #00000040',
        columnGap:'100px',
    }

    
}

export default Footer

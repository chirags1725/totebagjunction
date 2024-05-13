import React from "react";

const Footer = () => {
  return (
    <div style={styles.footer}>
      <div>
        <h4 style={{ marginBottom: "20px" }}>FOLLOW US</h4>
        <p>
          Thanks for visiting our website! Follow us on social media for updates
          on our latest products, promotions, and more. Click the buttons below
          to visit our profiles on Facebook, Instagram. Thanks for supporting
          Septemberish!
        </p>
      </div>
      <div style={styles.keyLinks}>
        <h4 style={{ marginBottom: "20px" }}>KEY LINKS</h4>
        <div>Contact Us</div>
        <div>Order Tracking</div>
        <div>FAQs</div>
        <div>Blog</div>
        <div>About Us</div>
        <div>Refund & Returns Policy</div>
        <div>Privacy Policy</div>
        <div>SHIPPING & DELIVERY POLICY</div>
        <div>Terms & Conditions</div>
      </div>
    </div>
  );
};

const styles = {
  footer: {
    position: "relative",
    display: "flex",
    // backgroundColor: "red",
    margin: "0px",
    padding: "60px 20px", // Reduced padding for demonstration purpose
    borderTop: "1px solid #00000040",
    columnGap:"80px",
    width:'100%',
    left:"50%",
    transform:"translate(-50%)",
    
  },
  keyLinks: {
    flexShrink: 0, // Prevents shrinking of keyLinks container
    overflowX: "auto", // Enable horizontal scrolling if content exceeds width
    maxWidth: "100%", // Allow keyLinks container to take full available width
  },
};

export default Footer;

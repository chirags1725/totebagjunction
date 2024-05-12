import "@/styles/globals.css";
import Navbar from "../Components/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <>
  <Head>
        <title>Tote Bag Junction</title>
        <meta name="description" content="Tote bags junction. A modern day brand for stylish tote bags at a very affordable price." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Images/image1.jpeg" />
      </Head>
  <Navbar/>
  <Component {...pageProps} />
  
  </>
}
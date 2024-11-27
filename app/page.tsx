import Carousel from "./components/Carousel";
import Services from "./components/Services";
import VoiceOfferings from "./components/VoiceOfferings";
import Ticker from "./components/Ticker";
import TickerImages from "./components/TickerImages";
import CliVoiceTerminationSpecialComponent from "./components/CLISpecialComponent";
import BusinessServices from "./components/BusinessServices";
import BuisinessAnalitics from "./components/BuisinessAnalitics";
import FAQ from "./components/FAQ";
import FloatingButton from "./components/SpecialRatesPopup";
import SocialMediaTabs from "./components/SocialMedaPopup";
import Chatbot from "./chatbot/page";
import Head from "next/head";
import Header from "./components/Header";
import Footer from "./components/Footer";

const imageUrls = [
  "/flags/Austrelia.png",
  "/flags/Canada.png",
  "/flags/China.png",
  "/flags/Cuba.png",
  "/flags/France.png",
  "/flags/Germany.png",
  "/flags/Hongkong.png",
  "/flags/Italy.png",
  "/flags/Malesiya.png",
  "/flags/New Zealand.png",
  "/flags/Singapur.png",
  "/flags/Spain.png",
  
];




export default function HomePage() {
  return (
    <>
    <Head>
    <meta property="og:title" content="Cloudqlobe" />
    <meta property="og:description" content="Cloud Qlobe enables our wholesale VoIP service providers and carriers to operate from anywhere in the world." />
    <meta property="og:image" content="https://www.cloudqlobe.com/_next/image?url=%2Fimages%2Flogo.png&w=32&q=75" />
    <meta property="og:url" content="https://www.cloudqlobe.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Cloud Qlobe" />
  </Head>
    <div style ={{background:"white"}}>
      <Header/>
      <Carousel />
      <Ticker />
      <VoiceOfferings />
      <Services />
      <BuisinessAnalitics/>
      <CliVoiceTerminationSpecialComponent/>
      <BusinessServices/>
      <TickerImages images={imageUrls} />
      <FAQ/>
      <FloatingButton/>
      <SocialMediaTabs/>
      <Chatbot/>
      <Footer/>
    </div></>
  );
}

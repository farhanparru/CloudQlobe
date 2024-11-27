import "../styles/globals.css";
import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import Head from "next/head";
import { DefaultSeo } from 'next-seo';
export const metadata = {
  title: "CloudQlobe",
  description: "let the clouds Qlobe",
};
const SEO = {
  title: 'Cloudqlobe',
  description: 'We cloud Qlobe, a leading globel call centre solutions provider, Offering you a complete resolution for A-Z destinations accross the world',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.cloudqlobe.com/',
    site_name: 'CloudQlobe',
  },
  // twitter: {
  //   handle: '@yourtwitterhandle',
  //   site: '@site',
  //   cardType: 'summary_large_image',
  // },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">

      <Head>
      <meta name="google-site-verification" content="vheEktUO4P244fFp4uVfmW0-P6obSbCl8UMvBy6MQ1s" /></Head>
       <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-LBY3CCSPEK`} // replace with your Measurement ID
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LBY3CCSPEK'); // replace with your Measurement ID
        `}
      </Script>
      <body>
      
        
        <main>{children}</main>
        <Analytics />
       
      </body>
      
    </html>
  );
}

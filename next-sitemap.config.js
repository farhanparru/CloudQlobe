// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.cloudqlobe.com', // Base URL of your site
    generateRobotsTxt: true, // Generates robots.txt file
    sitemapSize: 7000, // Maximum number of URLs per sitemap file
    exclude: ['/modules/admin/*', '/secret'], // Paths to exclude from sitemap
    changefreq: 'daily', // Default change frequency
    priority: 0.7, // Default priority for all pages
  
    // Define additional custom paths to include in the sitemap
    additionalPaths: async (config) => {
      const customPaths = [
        '/about', // Replace with actual paths as needed
        '/services/CC-Routes',
        '/services/CLI-Voice-Termination',
        '/services/DID-Voice-Solutions',
        '/contacts',
        '/pricing',
        '/faq',
        '/modules/auth/Base/login',
        '/modules/auth/Base/Signup',
      ];
  
      // Optional: Log custom paths for debugging
      console.log("Custom Paths:", customPaths);
  
      // Map each custom path to the required sitemap format
      return customPaths.map((path) => ({
        loc: path, // Location of the URL
        changefreq: 'daily', // Frequency of changes for search engines
        priority: 0.7, // Priority relative to other URLs
      }));
    },
  };

import React from "react";
import Image from "next/image"; // Import the Image component from Next.js

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#323F3F] text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-orange-500 text-xl font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Rates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                CC Routes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                CLI Voice Termination
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                DID Solutions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-orange-500 text-xl font-semibold mb-4">
            Contact us
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span>+44 741836587</span>
            </li>
            <li className="flex items-center gap-2">
              <span>marketing@cloudqlobe.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span>sales@cloudqlobe.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span>carriers@cloudqlobe.com</span>
            </li>
            <li className="flex items-start gap-2">
              <div>
                44 Heung Yip Road,
                <br />
                Southern District, Hong Kong,
                <br />
                ZIP CODE: 999077
              </div>
            </li>
          </ul>
        </div>

        {/* Connect with us (Social Media) */}
        <div>
          <h3 className="text-orange-500 text-xl font-semibold mb-4">
            Connect with us :
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Image
                src="/social-media/Facebook.png"
                alt="Facebook"
                className="w-5 h-5"
                width={20} // Adjust width and height as necessary
                height={20}
              />
              <a href="#" className="hover:text-orange-500 transition-colors">
                facebook.com/cloudqlobe
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Image
                src="/social-media/Linkedin.png"
                alt="LinkedIn"
                className="w-5 h-5"
                width={20} // Adjust width and height as necessary
                height={20}
              />
              <a href="#" className="hover:text-orange-500 transition-colors">
                linkedin.com/cloud-qlobe/
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Image
                src="/social-media/Whatsapp.png"
                alt="WhatsApp"
                className="w-5 h-5"
                width={20} // Adjust width and height as necessary
                height={20}
              />
              <a href="#" className="hover:text-orange-500 transition-colors">
                whatsapp.me/9876543210
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Image
                src="/social-media/Skype.png"
                alt="Skype"
                className="w-5 h-5"
                width={20} // Adjust width and height as necessary
                height={20}
              />
              <a href="#" className="hover:text-orange-500 transition-colors">
                skype.com/cloudqlobe
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Image
                src="/social-media/Telegram.png"
                alt="Telegram"
                className="w-5 h-5"
                width={20} // Adjust width and height as necessary
                height={20}
              />
              <a href="#" className="hover:text-orange-500 transition-colors">
                telegram.me/cloudqlobe
              </a>
            </li>
          </ul>
        </div>

        {/* Join us */}
        <div>
          <h3 className="text-orange-500 text-xl font-semibold mb-4">
            Join us :
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Sign up
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Sign in
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Free demo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Special Rates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Open Trade Account
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-sm max-w-4xl mx-auto">
        <p>
          Copyright © 2024 CloudQlobe. All Rights Reserved. No part of this site
          or its content, including text, graphics, logos, images, or any other
          material, may be reproduced, distributed, transmitted, or used in any
          form without the prior written consent of the copyright owner.
        </p>
        <p className="mt-2">
          Unauthorized use of any material on this site is strictly prohibited
          and may result in legal action.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

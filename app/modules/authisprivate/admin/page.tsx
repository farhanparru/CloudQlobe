import React from 'react';
import Header from '../../customer/pages/auth/HeaderAndFooter/Header';
import Footer from '../../customer/pages/auth/HeaderAndFooter/Footer';
import AdminSignInPage from '../form/form';

const LoginFrame = ({  }) => {
  return (
    <div className="min-h-screen  text-black">
      <div className=" ">
   <Header />
   <div style ={{marginTop:"3em"}}><AdminSignInPage/></div>
   <Footer/>
      </div>
    </div>
  );
};

export default LoginFrame;

import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import SignInPage from '../../login/page';

const LoginFrame = ({  }) => {
  return (
    <div className="min-h-screen  text-black">
      <div className=" ">
   <Header />
   <div style ={{marginTop:"3em"}}><SignInPage/></div>
   <Footer/>
      </div>
    </div>
  );
};

export default LoginFrame;

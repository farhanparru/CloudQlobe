"use client";

import React from 'react';
import { Wallet, Receipt, CreditCard, Flame, Sparkles, Bitcoin } from 'lucide-react';
import DashboardLayout from '../dash_layout/page';

const PaymentsPage = () => {
  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br  from-emerald-50 to-rose-50">
      <div className="p-8">
        {/* Animated Header Section */}
        <div className="relative mb-6">
          <div className="flex items-center gap-3">
            <Wallet className="h-10 w-10 text-emerald-500" />
            <h1 className="text-4xl font-bold text-gray-800 mb-1 animate-fade-in">
              Payments
            </h1>
          </div>
          
          {/* Floating Icons Animation */}
          <div className="absolute right-0 -top-4 flex gap-4">
            <div className="animate-float-1">
              <div className="bg-emerald-400 p-4 rounded-2xl shadow-lg transform rotate-3">
                <Receipt className="text-white" size={24} />
              </div>
            </div>
            <div className="animate-float-2">
              <div className="bg-rose-400 p-4 rounded-2xl shadow-lg -rotate-3">
                <Sparkles className="text-white" size={24} />
              </div>
            </div>
            <div className="animate-float-3">
              <div className="bg-orange-400 p-4 rounded-2xl shadow-lg rotate-6">
                <Bitcoin className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-emerald-100">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <Flame className="text-orange-400 h-6 w-6" />
              <p className="text-gray-600 text-lg">
                Manage your payments and billing information with ease.
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-emerald-50 to-rose-50 p-6 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-6 w-6 text-emerald-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Contact Sales
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions or issues regarding your payments, 
                please contact our sales team for assistance.
              </p>
         
            </div>
            
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-20px) rotate(6deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(-20px) rotate(-3deg); }
          50% { transform: translateY(0px) rotate(-6deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(-10px) rotate(6deg); }
          50% { transform: translateY(10px) rotate(3deg); }
        }
        
        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 3.5s ease-in-out infinite;
        }
        
        .animate-float-3 {
          animation: float-3 4s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div></DashboardLayout>
  );
};

export default PaymentsPage;
// pages/navigation.js
"use client"
import { Url } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/navigation';

const NavigationPage = () => {
  const router = useRouter();

  const handleNavigate = (path: Url) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200 font-lato">
      <h1 className="text-3xl font-bold mb-6">Navigation Page</h1>
      <div className="space-y-4">
        <button
          onClick={() => handleNavigate('modules/customer/pages/dash_layout')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Go to Customer Dashboard
        </button>
        <button
          onClick={() => handleNavigate('modules/customer/pages/login')}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-200"
        >
          Go to Customer Login
        </button>
        <button
          onClick={() => handleNavigate('modules/customer/pages/rates_page')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Show Rates
        </button>
        <button
          onClick={() => handleNavigate('/modules/admin/Dashboard')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Go to Admin Dashboard
        </button>
        <button
          onClick={() => handleNavigate('/modules/admin/Login')}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Go to Admin Login
        </button>

      </div>
    </div>
  );
};

export default NavigationPage;

// client/src/pages/MainPage.js
import React from 'react';
import UserForm from '../components/UserForm';

import ChatBot from '../components/ChatBot';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center pt-10 pb-6">
          <h1 className="text-4xl font-bold text-gray-800">Create Your Portfolio</h1>
          <p className="mt-2 text-gray-600">
            Fill in your information to generate your portfolio and business card
          </p>
        </div>
        <UserForm />
        <ChatBot />
      </div>
    </div>
  );
};

export default MainPage;
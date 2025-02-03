// client/src/pages/BusinessCardPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../api';
import BusinessCard from '../components/BusinessCard';

const BusinessCardPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userAPI.get(username);
        setUserData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load business card');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <BusinessCard userData={userData} />
        <div className="mt-8">
          <a
            href={`/${username}`}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            View Full Portfolio
          </a>
        </div>
      </div>
    </div >
  );
};

export default BusinessCardPage;
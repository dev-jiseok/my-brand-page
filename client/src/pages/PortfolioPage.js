// client/src/pages/PortfolioPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../api';
import Portfolio from '../components/Portfolio';
import PortfolioEvaluation from '../components/PortfolioEvaluation';

const PortfolioPage = () => {
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
        setError(err.response?.data?.error || 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto">
        <Portfolio userData={userData} />
        {userData && (
          <div className="mt-8 px-6">
            <PortfolioEvaluation portfolioData={userData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
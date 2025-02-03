// client/src/components/PortfolioEvaluation.js
import React, { useState } from 'react';
import axios from 'axios';

const PortfolioEvaluation = ({ portfolioData }) => {
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestEvaluation = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/ai/evaluate', {
        portfolioData
      });
      setEvaluation(response.data.evaluation);
    } catch (error) {
      console.error('Evaluation error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">AI 포트폴리오 평가</h2>
      {!evaluation && !loading && (
        <button
          onClick={requestEvaluation}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          평가 받기
        </button>
      )}
      {loading && <div>평가 중...</div>}
      {evaluation && (
        <div className="prose max-w-none">
          <div className="whitespace-pre-line">{evaluation}</div>
        </div>
      )}
    </div>
  );
};

export default PortfolioEvaluation;
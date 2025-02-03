// client/src/components/BusinessCard.js
import React from 'react';

const BusinessCard = ({ userData }) => {
  if (!userData) return null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
      <div className="p-8">
        {/* 이름과 소개 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{userData.username}</h2>
          {userData.careers && userData.careers[0] && (
            <p className="text-gray-600 mt-1">{userData.careers[0].position}</p>
          )}
        </div>

        {/* 현재 회사 */}
        {userData.careers && userData.careers[0] && (
          <div className="mb-6 text-center">
            <p className="text-gray-700">{userData.careers[0].company_name}</p>
          </div>
        )}

        {/* 구분선 */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* 연락처 정보 */}
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="text-gray-600">Email:</span>
            <span className="ml-2 text-gray-800">{userData.email}</span>
          </div>
          {userData.phone && (
            <div className="flex items-center">
              <span className="text-gray-600">Phone:</span>
              <span className="ml-2 text-gray-800">{userData.phone}</span>
            </div>
          )}
        </div>

        {/* 학력 정보 */}
        {userData.education && userData.education[0] && (
          <div className="mt-6">
            <p className="text-gray-600 text-sm">
              {userData.education[0].school_name} - {userData.education[0].degree}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;
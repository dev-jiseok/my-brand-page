// client/src/components/UserForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../api';

const UserForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 초기 상태 설정
  const [formData, setFormData] = useState({
    // 기본 정보
    username: '',
    korean_name: '',
    japanese_name: '',
    email: '',
    phone: '',
    position: '',
    introduction: '',
    profile_image: '',
    location: '',
    contact_info: '',

    // 소셜 링크
    social_links: [{
      platform: '',
      url: ''
    }],

    // 비디오 섹션
    videos: [{
      title: '',
      youtube_url: '',
      upload_date: '',
      description: ''
    }],

    // 경력 정보
    careers: [{
      company_name: '',
      position: '',
      period_start: '',
      period_end: '',
      is_current: false,
      company_logo: ''
    }],

    // 교육 정보
    education: [{
      school_name: '',
      degree: '',
      major: '',
      period_start: '',
      period_end: '',
      is_current: false,
      school_logo: '',
      type: ''
    }],

    // 자격증 및 수상
    certificates_awards: [{
      type: '',
      title: '',
      issuer: '',
      date_received: '',
      description: ''
    }],

    // What I Do 섹션
    sections: [{
      title: '',
      content: '',
      icon: '',
      order_num: 0
    }],

    //book 섹션
    books: [{
      title: '',
      cover_image: '',
      isbn: '',
      yes24_url: '',
      kyobo_url: '',
      aladin_url: '',
      publication_date: ''
    }]
  });

  // 항목 추가 핸들러
  const handleAdd = (field, initialValue) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], initialValue]
    });
  };

  // 항목 삭제 핸들러
  const handleDelete = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  // 필드 업데이트 핸들러
  const handleFieldUpdate = (field, index, key, value) => {
    const newArray = [...formData[field]];
    newArray[index] = {
      ...newArray[index],
      [key]: value
    };
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  // 기본 필드 업데이트 핸들러
  const handleBasicFieldUpdate = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userAPI.create(formData);
      navigate(`/${formData.username}`);
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error creating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Create Your Portfolio</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 기본 정보 섹션 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold border-b pb-2">Basic Information</h3>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            {/* 이름 및 직위 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username*</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleBasicFieldUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleBasicFieldUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 한글/일본어 이름 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Korean Name</label>
                <input
                  type="text"
                  name="korean_name"
                  value={formData.korean_name}
                  onChange={handleBasicFieldUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Japanese Name</label>
                <input
                  type="text"
                  name="japanese_name"
                  value={formData.japanese_name}
                  onChange={handleBasicFieldUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleBasicFieldUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleBasicFieldUpdate}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 프로필 이미지 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
              <input
                type="url"
                name="profile_image"
                value={formData.profile_image}
                onChange={handleBasicFieldUpdate}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* 자기소개 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Introduction</label>
              <textarea
                name="introduction"
                value={formData.introduction}
                onChange={handleBasicFieldUpdate}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Social Links 섹션 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold border-b pb-2">Social Links</h3>
            <button
              type="button"
              onClick={() => handleAdd('social_links', { platform: '', url: '' })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Add Social Link
            </button>
          </div>

          <div className="space-y-4">
            {formData.social_links.map((link, index) => (
              <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleDelete('social_links', index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Platform</label>
                    <select
                      value={link.platform}
                      onChange={(e) => handleFieldUpdate('social_links', index, 'platform', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Platform</option>
                      <option value="kakao">Kakao</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="twitter">Twitter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleFieldUpdate('social_links', index, 'url', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Videos 섹션 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold border-b pb-2">Videos</h3>
            <button
              type="button"
              onClick={() => handleAdd('videos', {
                title: '',
                youtube_url: '',
                upload_date: '',
                description: ''
              })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Add Video
            </button>
          </div>

          <div className="space-y-4">
            {formData.videos.map((video, index) => (
              <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleDelete('videos', index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={video.title}
                      onChange={(e) => handleFieldUpdate('videos', index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Video Title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
                    <input
                      type="url"
                      value={video.youtube_url}
                      onChange={(e) => handleFieldUpdate('videos', index, 'youtube_url', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://youtube.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Date</label>
                    <input
                      type="date"
                      value={video.upload_date}
                      onChange={(e) => handleFieldUpdate('videos', index, 'upload_date', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={video.description}
                      onChange={(e) => handleFieldUpdate('videos', index, 'description', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Video description..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Books 섹션 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold border-b pb-2">Books</h3>
            <button
              type="button"
              onClick={() => handleAdd('books', {
                title: '',
                cover_image: '',
                isbn: '',
                yes24_url: '',
                kyobo_url: '',
                aladin_url: '',
                publication_date: ''
              })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Add Book
            </button>
          </div>

          <div className="space-y-4">
            {formData.books.map((book, index) => (
              <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleDelete('books', index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Book Title</label>
                    <input
                      type="text"
                      value={book.title}
                      onChange={(e) => handleFieldUpdate('books', index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Book title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                    <input
                      type="url"
                      value={book.cover_image}
                      onChange={(e) => handleFieldUpdate('books', index, 'cover_image', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">ISBN</label>
                    <input
                      type="text"
                      value={book.isbn}
                      onChange={(e) => handleFieldUpdate('books', index, 'isbn', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="ISBN"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Publication Date</label>
                    <input
                      type="date"
                      value={book.publication_date}
                      onChange={(e) => handleFieldUpdate('books', index, 'publication_date', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">YES24 URL</label>
                      <input
                        type="url"
                        value={book.yes24_url}
                        onChange={(e) => handleFieldUpdate('books', index, 'yes24_url', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="https://www.yes24.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">교보문고 URL</label>
                      <input
                        type="url"
                        value={book.kyobo_url}
                        onChange={(e) => handleFieldUpdate('books', index, 'kyobo_url', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="https://www.kyobobook.co.kr/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">알라딘 URL</label>
                      <input
                        type="url"
                        value={book.aladin_url}
                        onChange={(e) => handleFieldUpdate('books', index, 'aladin_url', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="https://www.aladin.co.kr/..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 'What I Do' 섹션 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold border-b pb-2">What I Do</h3>
            <button
              type="button"
              onClick={() => handleAdd('sections', {
                title: '',
                content: '',
                icon: '',
                order_num: 0
              })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Add Section
            </button>
          </div>

          <div className="space-y-4">
            {formData.sections.map((section, index) => (
              <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleDelete('sections', index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleFieldUpdate('sections', index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Section title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => handleFieldUpdate('sections', index, 'content', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Section content..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Icon</label>
                    <input
                      type="text"
                      value={section.icon}
                      onChange={(e) => handleFieldUpdate('sections', index, 'icon', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Section icon (e.g. bolt, code, etc.)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order</label>
                    <input
                      type="number"
                      value={section.order_num}
                      onChange={(e) => handleFieldUpdate('sections', index, 'order_num', parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Order number"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career 섹션 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold border-b pb-2">Career</h3>
            <button
              type="button"
              onClick={() => handleAdd('careers', {
                company_name: '',
                position: '',
                period_start: '',
                period_end: '',
                is_current: false,
                company_logo: ''
              })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Add Career
            </button>
          </div>

          <div className="space-y-4">
            {formData.careers.map((career, index) => (
              <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleDelete('careers', index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        type="text"
                        value={career.company_name}
                        onChange={(e) => handleFieldUpdate('careers', index, 'company_name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position</label>
                      <input
                        type="text"
                        value={career.position}
                        onChange={(e) => handleFieldUpdate('careers', index, 'position', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Your position"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Logo URL</label>
                    <input
                      type="url"
                      value={career.company_logo}
                      onChange={(e) => handleFieldUpdate('careers', index, 'company_logo', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        value={career.period_start}
                        onChange={(e) => handleFieldUpdate('careers', index, 'period_start', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={career.period_end}
                        onChange={(e) => handleFieldUpdate('careers', index, 'period_end', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled={career.is_current}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={career.is_current}
                      onChange={(e) => {
                        handleFieldUpdate('careers', index, 'is_current', e.target.checked);
                        if (e.target.checked) {
                          handleFieldUpdate('careers', index, 'period_end', '');
                        }
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 block text-sm text-gray-700">Current Position</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education 섹션 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold border-b pb-2">Education</h3>
            <button
              type="button"
              onClick={() => handleAdd('education', {
                school_name: '',
                degree: '',
                major: '',
                period_start: '',
                period_end: '',
                is_current: false,
                school_logo: '',
                type: ''
              })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Add Education
            </button>
          </div>

          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleDelete('education', index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">School Name</label>
                      <input
                        type="text"
                        value={edu.school_name}
                        onChange={(e) => handleFieldUpdate('education', index, 'school_name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="School name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        value={edu.type}
                        onChange={(e) => handleFieldUpdate('education', index, 'type', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Type</option>
                        <option value="과정수료">과정수료</option>
                        <option value="Exchange Student">Exchange Student</option>
                        <option value="학사">학사</option>
                        <option value="석사">석사</option>
                        <option value="박사">박사</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleFieldUpdate('education', index, 'degree', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Degree"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Major</label>
                      <input
                        type="text"
                        value={edu.major}
                        onChange={(e) => handleFieldUpdate('education', index, 'major', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Major"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">School Logo URL</label>
                    <input
                      type="url"
                      value={edu.school_logo}
                      onChange={(e) => handleFieldUpdate('education', index, 'school_logo', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        value={edu.period_start}
                        onChange={(e) => handleFieldUpdate('education', index, 'period_start', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        value={edu.period_end}
                        onChange={(e) => handleFieldUpdate('education', index, 'period_end', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled={edu.is_current}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={edu.is_current}
                      onChange={(e) => {
                        handleFieldUpdate('education', index, 'is_current', e.target.checked);
                        if (e.target.checked) {
                          handleFieldUpdate('education', index, 'period_end', '');
                        }
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 block text-sm text-gray-700">Current Student</label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates & Awards 섹션 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold border-b pb-2">Certificates & Awards</h3>
            <button
              type="button"
              onClick={() => handleAdd('certificates_awards', {
                type: '',
                title: '',
                issuer: '',
                date_received: '',
                description: ''
              })}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Add Certificate/Award
            </button>
          </div>

          <div className="space-y-4">
            {formData.certificates_awards.map((item, index) => (
              <div key={index} className="relative bg-gray-50 p-6 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleDelete('certificates_awards', index)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={item.type}
                      onChange={(e) => handleFieldUpdate('certificates_awards', index, 'type', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="certificate">Certificate</option>
                      <option value="award">Award</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleFieldUpdate('certificates_awards', index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Certificate/Award title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issuer</label>
                    <input
                      type="text"
                      value={item.issuer}
                      onChange={(e) => handleFieldUpdate('certificates_awards', index, 'issuer', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Issuing organization"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Received</label>
                    <input
                      type="date"
                      value={item.date_received}
                      onChange={(e) => handleFieldUpdate('certificates_awards', index, 'date_received', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleFieldUpdate('certificates_awards', index, 'description', e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Description of the certificate or award..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location & Contact 섹션 */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Location & Contact</h3>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <textarea
                name="location"
                value={formData.location}
                onChange={handleBasicFieldUpdate}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your location details..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Information</label>
              <textarea
                name="contact_info"
                value={formData.contact_info}
                onChange={handleBasicFieldUpdate}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Additional contact information..."
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors
              ${loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Portfolio...
              </span>
            ) : (
              'Create Portfolio'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
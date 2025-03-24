// client/src/components/Portfolio.js
import React from 'react';
import { Camera, MapPin, Mail, Book, Briefcase, Library, BookOpen } from 'lucide-react';


//유튜브 url 임베드url로 변환 하는 코드
const getYoutubeEmbedUrl = (url) => {
  if (!url) return '';

  // URL에서 비디오 ID 추출
  let videoId = '';

  // 정규표현식으로 다양한 유튜브 URL 형식 처리
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    videoId = match[2];
  }

  // 임베드 URL 반환
  return `https://www.youtube.com/embed/${videoId}`;
};


//책 관련 코드
const BookLinks = ({ bookUrls }) => {
  const icons = {
    yes24: "/icons/yes24.png",
    kyobo: "/icons/kyobo.webp",
    aladin: "/icons/aladin.png"
  };

  return (
    <div className="flex gap-2 mt-2">
      {bookUrls.yes24_url && (
        <a href={bookUrls.yes24_url} target="_blank" rel="noopener noreferrer">
          <img src={icons.yes24} alt="YES24" className="w-6 h-6" />
        </a>
      )}
      {bookUrls.kyobo_url && (
        <a href={bookUrls.kyobo_url} target="_blank" rel="noopener noreferrer">
          <img src={icons.kyobo} alt="교보문고" className="w-6 h-6" />
        </a>
      )}
      {bookUrls.aladin_url && (
        <a href={bookUrls.aladin_url} target="_blank" rel="noopener noreferrer">
          <img src={icons.aladin} alt="알라딘" className="w-6 h-6" />
        </a>
      )}
    </div>
  );
};

//메인 코드 시작
const Portfolio = ({ userData }) => {
  if (!userData) return null;

  const SocialIcon = ({ type }) => {
    const socialIcons = {
      kakaotalk: "/icons/kakao.svg",
      linkedin: "/icons/linkedin.svg",
      facebook: "/icons/facebook.svg",
      instagram: "/icons/instagram.svg",
      x: "/icons/x.svg"
    };

    return (
      <img
        src={socialIcons[type.toLowerCase()]}
        alt={type}
        className="w-6 h-6"
      />
    );
  };

  const SectionIcon = ({ type }) => {
    switch (type) {
      case 'business':
        return <Briefcase className="w-6 h-6 text-gray-400" />;
      case 'development':
        return <Book className="w-6 h-6 text-gray-400" />;
      case 'lecture':
        return <Library className="w-6 h-6 text-gray-400" />;
      case 'prompting':
        return <BookOpen className="w-6 h-6 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
            <img
              src={userData.profile_image}
              alt={userData.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold">{userData.username}</span>
        </div>
        <div className="flex space-x-6">
          <a href="#about" className="text-gray-300 hover:text-blue-400">About Me</a>
          <a href="#kakao" className="text-gray-300 hover:text-blue-400">Kakao Talk</a>
          <a href="#yumeta" className="text-gray-300 hover:text-blue-400">who am i?</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-7">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <div className="w-48 h-48 mx-auto relative">
              <img
                src={userData.profile_image}
                alt={userData.username}
                className="w-full h-full rounded-full object-cover border-4 border-gray-700"
              />
            </div>
          </div>
          <h2 className="text-blue-400 text-xl mb-2">{userData.position}</h2>
          <h1 className="text-4xl font-bold mb-4">{userData.username}</h1>
          <p className="text-gray-400 text-lg mb-6">
            {userData.korean_name} · {userData.japanese_name}
          </p>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{userData.introduction}</p>
          <div className="flex justify-center space-x-4">
            {userData.social_links?.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <SocialIcon type={link.platform} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-7 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userData.videos?.map((video, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYoutubeEmbedUrl(video.youtube_url)}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 font-medium">{video.title}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(video.upload_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-7 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">What I Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userData.sections?.map((section, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg">
                  <SectionIcon type={section.type} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-7 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {userData.books?.map((book, index) => (
              <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-auto aspect-[3/4] object-cover"
                />
                <div className="p-3">
                  <p className="text-sm font-medium mb-2">{book.title}</p>
                  <BookLinks
                    bookUrls={{
                      yes24_url: book.yes24_url,
                      kyobo_url: book.kyobo_url,
                      aladin_url: book.aladin_url
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career & Education Section */}
      <section className="py-7 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Career */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Careers</h2>
            <div className="space-y-6">
              {userData.careers?.map((career, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={career.company_logo}
                      alt={career.company_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold mb-1">{career.position}</div>
                    <div className="text-gray-400 text-sm mb-1">{career.company_name}</div>
                    <div className="text-gray-500 text-sm">
                      {new Date(career.period_start).getFullYear()} - {
                        career.is_current ? 'Present' : new Date(career.period_end).getFullYear()
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Education</h2>
            <div className="space-y-6">
              {userData.education?.map((edu, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={edu.school_logo}
                      alt={edu.school_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold mb-1">{edu.school_name}</div>
                    <div className="text-gray-400 text-sm mb-1">{edu.degree}</div>
                    <div className="text-gray-500 text-sm">
                      {new Date(edu.period_start).getFullYear()} - {
                        edu.is_current ? 'Present' : new Date(edu.period_end).getFullYear()
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates & Awards Section */}
      <section className="py-7 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Certificates & Awards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userData.certificates_awards?.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 text-sm uppercase">
                        {item.type}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(item.date_received).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      발급기관: {item.issuer}
                    </p>
                    {item.description && (
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-6 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Location & Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">{userData.location}</span>
              </div>
              <div className="h-64 bg-gray-700 rounded-lg overflow-hidden">
                {/* Map component would go here */}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">{userData.email}</span>
              </div>
              <p className="text-gray-400">{userData.contact_info}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Portfolio;
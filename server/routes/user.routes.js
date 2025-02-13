// server/routes/user.routes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');

// 사용자 생성 및 프로필 데이터 저장
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      username,
      email,
      phone,
      introduction,
      profile_image,
      japanese_name,
      korean_name,
      position,
      location,
      contact_info,
      social_links,
      videos,
      certificates_awards,
      lectures,
      careers,
      education,
      sections,
      books
    } = req.body;

    // undefined 값을 null로 대체

    // 기본 사용자 정보 저장
    const [userResult] = await connection.execute(
      'INSERT INTO users (username, email, phone, introduction, profile_image, japanese_name, korean_name, position, location, contact_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [username, email, phone, introduction, profile_image, japanese_name, korean_name, position, location, contact_info]
    );
    const userId = userResult.insertId;

    // SNS 링크 저장
    if (social_links && social_links.length > 0) {
      for (const link of social_links) {
        const linkPlatform = link.platform || null;
        const linkUrl = link.url || null;
        await connection.execute(
          'INSERT INTO social_links (user_id, platform, url) VALUES (?, ?, ?)',
          [userId, linkPlatform, linkUrl]
        );
      }
    }

    // 비디오 정보 저장
    if (videos && Array.isArray(videos) && videos.length > 0) {
      for (const video of videos) {
        const videoTitle = video.title || null;
        const videoYoutubeUrl = video.youtube_url || null;
        const videoThumbnailUrl = video.thumbnail_url || null;
        const videoUploadDate = video.upload_date || null;
        const videoDescription = video.description || null;
        await connection.execute(
          'INSERT INTO videos (user_id, title, youtube_url, thumbnail_url, upload_date, description) VALUES (?, ?, ?, ?, ?, ?)',
          [userId, videoTitle, videoYoutubeUrl, videoThumbnailUrl, videoUploadDate, videoDescription]
        );
      }
    }

    // 자격증 및 수상 정보 저장
    if (certificates_awards && Array.isArray(certificates_awards) && certificates_awards.length > 0) {
      for (const item of certificates_awards) {
        const itemType = item.type || null;
        const itemTitle = item.title || null;
        const itemIssuer = item.issuer || null;
        const itemDateReceived = item.date_received || null;
        const itemDescription = item.description || null;
        await connection.execute(
          'INSERT INTO certificates_awards (user_id, type, title, issuer, date_received, description) VALUES (?, ?, ?, ?, ?, ?)',
          [userId, itemType, itemTitle, itemIssuer, itemDateReceived, itemDescription]
        );
      }
    }

    // 강의 이력 저장
    if (lectures && Array.isArray(lectures) && lectures.length > 0) {
      for (const lecture of lectures) {
        const lectureTitle = lecture.title || null;
        const lectureInstitution = lecture.institution || null;
        const lectureDateStart = lecture.date_start || null;
        const lectureDateEnd = lecture.date_end || null;
        const lectureIsCurrent = lecture.is_current ? 1 : 0;
        const lectureDescription = lecture.description || null;
        const lectureType = lecture.type || null;
        await connection.execute(
          'INSERT INTO lectures (user_id, title, institution, date_start, date_end, is_current, description, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, lectureTitle, lectureInstitution, lectureDateStart, lectureDateEnd, lectureIsCurrent, lectureDescription, lectureType]
        );
      }
    }

    // Career 정보 저장
    if (careers && Array.isArray(careers) && careers.length > 0) {
      for (const career of careers) {
        const careerCompanyName = career.company_name || null;
        const careerPosition = career.position || null;
        const careerPeriodStart = career.period_start || null;
        const careerPeriodEnd = career.period_end || null;
        const careerIsCurrent = career.is_current ? 1 : 0;
        const careerCompanyLogo = career.company_logo || null;
        await connection.execute(
          'INSERT INTO careers (user_id, company_name, position, period_start, period_end, is_current, company_logo) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [userId, careerCompanyName, careerPosition, careerPeriodStart, careerPeriodEnd, careerIsCurrent, careerCompanyLogo]
        );
      }
    }

    // Education 정보 저장
    if (education && Array.isArray(education) && education.length > 0) {
      for (const edu of education) {
        const eduSchoolName = edu.school_name || null;
        const eduDegree = edu.degree || null;
        const eduMajor = edu.major || null;
        const eduPeriodStart = edu.period_start || null;
        const eduPeriodEnd = edu.period_end || null;
        const eduIsCurrent = edu.is_current ? 1 : 0;
        const eduSchoolLogo = edu.school_logo || null;
        const eduType = edu.type || null;
        await connection.execute(
          'INSERT INTO education (user_id, school_name, degree, major, period_start, period_end, is_current, school_logo, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [userId, eduSchoolName, eduDegree, eduMajor, eduPeriodStart, eduPeriodEnd, eduIsCurrent, eduSchoolLogo, eduType]
        );
      }
    }

    // Sections 정보 저장
    if (sections && Array.isArray(sections) && sections.length > 0) {
      for (const section of sections) {
        const sectionTitle = section.title || null;
        const sectionContent = section.content || null;
        const sectionIcon = section.icon || null;
        const sectionOrderNum = section.order_num || 0;
        await connection.execute(
          'INSERT INTO sections (user_id, title, content, icon, order_num) VALUES (?, ?, ?, ?, ?)',
          [userId, sectionTitle, sectionContent, sectionIcon, sectionOrderNum]
        );
      }
    }

    // books 관련 코드
    if (books && Array.isArray(books) && books.length > 0) {
      for (const book of books) {
        await connection.execute(
          'INSERT INTO books (user_id, title, cover_image, isbn, yes24_url, kyobo_url, aladin_url, publication_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            userId,
            book.title || null,
            book.cover_image || null,
            book.isbn || null,
            book.yes24_url || null,
            book.kyobo_url || null,
            book.aladin_url || null,
            book.publication_date || null
          ]
        );
      }
    }

    await connection.commit();
    res.json({ success: true, userId });

  } catch (error) {
    await connection.rollback();
    console.error('Error creating profile:', error);
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// 사용자 프로필 조회
router.get('/:username', async (req, res) => {
  try {
    // 기본 사용자 정보 조회
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [req.params.username]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    // SNS 링크 조회
    const [social_links] = await pool.execute(
      'SELECT * FROM social_links WHERE user_id = ?',
      [user.id]
    );

    // 비디오 조회
    const [videos] = await pool.execute(
      'SELECT * FROM videos WHERE user_id = ? ORDER BY upload_date DESC',
      [user.id]
    );

    // 자격증 및 수상 이력 조회
    const [certificates_awards] = await pool.execute(
      'SELECT * FROM certificates_awards WHERE user_id = ? ORDER BY date_received DESC',
      [user.id]
    );

    // 강의 이력 조회
    const [lectures] = await pool.execute(
      'SELECT * FROM lectures WHERE user_id = ? ORDER BY date_start DESC',
      [user.id]
    );

    // 기존 careers, education, sections 조회...
    // 경력 정보 조회
    const [careers] = await pool.execute(
      'SELECT * FROM careers WHERE user_id = ? ORDER BY period_start DESC',
      [user.id]
    );

    // 학력 정보 조회
    const [education] = await pool.execute(
      'SELECT * FROM education WHERE user_id = ? ORDER BY period_start DESC',
      [user.id]
    );

    // 소개 섹션 조회
    const [sections] = await pool.execute(
      'SELECT * FROM sections WHERE user_id = ? ORDER BY order_num',
      [user.id]
    );

    // 책 관련 조회
    const [books] = await pool.execute(
      'SELECT * FROM books WHERE user_id = ? ORDER BY publication_date DESC',
      [user.id]
    );

    res.json({
      ...user,
      social_links,
      videos,
      certificates_awards,
      lectures,
      careers,
      education,
      sections,
      books
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
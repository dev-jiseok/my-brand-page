// server/routes/ai.routes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_API_KEY = process.env.AZURE_OPENAI_KEY;

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received message:', message); // 디버깅용

    const response = await axios({
      method: 'post',
      url: AZURE_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_API_KEY,
      },
      data: {
        messages: [
          {
            role: "system",
            content: "당신은 포트폴리오 작성을 도와주는 전문 조력자입니다."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 800,
        temperature: 0.7,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 0.95,
        stop: null
      }
    });

    console.log('API Response:', response.data); // 디버깅용
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Detailed error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'AI 서비스 오류가 발생했습니다.',
      details: error.response?.data || error.message
    });
  }
});

// 포트폴리오 평가 엔드포인트 추가
router.post('/evaluate', async (req, res) => {
  try {
    const { portfolioData } = req.body;
    console.log('Received portfolio data:', portfolioData); // 디버깅용

    const response = await axios({
      method: 'post',
      url: AZURE_ENDPOINT,
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_API_KEY,
      },
      data: {
        messages: [
          {
            role: "system",
            content: "당신은 포트폴리오를 전문적으로 분석하고 평가하는 AI입니다. 주어진 포트폴리오의 강점과 개선점을 상세히 분석해주세요."
          },
          {
            role: "user",
            content: `다음 포트폴리오를 전문적으로 평가해주세요. 강점과 개선점을 구체적으로 설명해주세요:
           
           경력: ${portfolioData.careers ? JSON.stringify(portfolioData.careers) : '정보 없음'}
           학력: ${portfolioData.education ? JSON.stringify(portfolioData.education) : '정보 없음'}
           소개: ${portfolioData.introduction || '정보 없음'}
           기타 정보: ${portfolioData.sections ? JSON.stringify(portfolioData.sections) : '정보 없음'}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        frequency_penalty: 0,
        presence_penalty: 0,
        top_p: 0.95,
        stop: null
      }
    });

    console.log('API Response:', response.data); // 디버깅용
    res.json({ evaluation: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Detailed error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'AI 평가 서비스 오류가 발생했습니다.',
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;
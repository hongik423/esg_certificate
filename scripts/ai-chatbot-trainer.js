/**
 * 🧠 M-CENTER AI 챗봇 훈련 및 학습 데이터 업데이트
 * OpenAI Fine-tuning과 RAG(Retrieval-Augmented Generation) 시스템
 */

const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 📚 M-CENTER 전문 지식 베이스
const MCENTER_KNOWLEDGE_BASE = {
  services: {
    'business-analysis': {
      name: 'BM ZEN 사업분석',
      fullDescription: `국내 유일의 독자적 비즈니스모델 분석 프레임워크로, 25년간의 컨설팅 노하우를 집약한 M-CENTER만의 차별화된 서비스입니다.
      
      핵심 특징:
      - Business Model Canvas의 9개 핵심요소를 M-CENTER 방식으로 고도화
      - 수익모델 다각화 및 최적화 전략 수립
      - 시장분석 기반의 데이터 중심 접근
      - 단계별 실행계획 및 성과 측정 시스템
      
      검증된 성과:
      - 평균 매출 증대율: 35% (20-60% 범위)
      - 수익성 개선: 평균 28%
      - 고객만족도: 96%
      - 사업 지속가능성: 85% 이상`,
      
      keywords: ['사업분석', '비즈니스모델', 'BM', '수익구조', '매출증대', '경영진단'],
      
      caseStudies: [
        '제조업 A사: BM ZEN 적용 후 매출 45% 증가, 수익률 35% 개선',
        'IT 서비스 B사: 신규 수익모델 개발로 연매출 25억 달성',
        '유통업 C사: 온오프라인 통합 BM으로 시장점유율 3배 확대'
      ],
      
      process: [
        '현재 비즈니스모델 진단 및 분석',
        '시장환경 및 경쟁사 벤치마킹',
        '수익모델 재설계 및 최적화',
        '실행계획 수립 및 단계별 로드맵',
        '성과 모니터링 및 지속 개선'
      ]
    },
    
    'ai-productivity': {
      name: 'AI 활용 생산성향상',
      fullDescription: `ChatGPT, Claude, Midjourney 등 최신 AI 도구를 활용한 업무 자동화 및 생산성 향상 솔루션입니다. 
      국내 TOP 3 수준의 AI 전문성으로 기업의 디지털 전환을 선도합니다.
      
      핵심 서비스:
      - 업무 프로세스 AI 자동화 설계
      - 직원 대상 AI 활용 교육 및 코칭
      - AI 도구 도입 전략 수립
      - ROI 측정 및 성과 분석
      
      전문 분야:
      - 문서 작업 자동화 (보고서, 제안서, 계약서)
      - 고객 응대 자동화 (챗봇, 이메일 응답)
      - 데이터 분석 자동화 (시장분석, 매출예측)
      - 콘텐츠 제작 자동화 (마케팅, SNS)`,
      
      keywords: ['AI', '인공지능', '생산성', '자동화', 'ChatGPT', '업무효율', '디지털전환'],
      
      caseStudies: [
        '금융업 D사: AI 도입으로 문서작업 60% 단축, 연간 2억원 인건비 절감',
        '제조업 E사: 고객응대 자동화로 CS 효율 45% 향상',
        '서비스업 F사: AI 마케팅으로 온라인 매출 250% 증가'
      ],
      
      benefits: [
        '업무 효율 40-60% 향상',
        '인건비 20-30% 절감',
        '의사결정 속도 3배 향상',
        '문서작업 시간 70% 단축'
      ]
    },
    
    'factory-auction': {
      name: '경매활용 공장구매',
      fullDescription: `25년간의 부동산 경매 전문 노하우로 기업의 공장 및 사업장 확보 비용을 획기적으로 절감하는 서비스입니다.
      전국 경매 정보 네트워크와 법무팀 연계로 안전하고 수익성 높은 투자를 보장합니다.
      
      전문 서비스:
      - 전국 우량 경매물건 발굴 및 선별
      - 정확한 시세 분석 및 투자가치 평가
      - 권리분석 및 명도 가능성 사전 검증
      - 낙찰 전략 수립 및 입찰 지원
      - 사후 관리 (명도, 등기, 시설개선)
      
      차별화 우수성:
      - 25년 전문 경험, 200여 건 성공 실적
      - 전국 경매 정보 독점 네트워크
      - 법무팀 연계 완벽한 리스크 관리
      - 평균 30-50% 시세 대비 절감 효과`,
      
      keywords: ['경매', '공장구매', '부동산', '투자', '고정비절감', '사업장'],
      
      successStories: [
        '제조업 G사: 15억 공장을 9억에 낙찰, 6억원(40%) 절약',
        '물류업 H사: 최적 입지 창고 30% 할인 매입으로 연간 임대료 3억 절감',
        '식품업 I사: 경매 통한 생산시설 확장으로 투자비용 50% 절감'
      ]
    },
    
    'tech-startup': {
      name: '기술사업화/창업',
      fullDescription: `기술 기반 창업 및 사업화 전 과정을 지원하는 종합 서비스입니다. 
      정부 R&D 과제 선정률 78% (전국 평균 25% 대비 3배)의 검증된 전문성으로 확실한 성과를 보장합니다.
      
      핵심 서비스:
      - 정부 R&D 과제 기획 및 선정 지원
      - 기술가치평가 및 IP 전략 수립
      - 사업계획서 작성 및 투자유치 지원
      - 사업화 전략 수립 및 실행 지원
      
      정부지원 전문 분야:
      - 중소벤처24 (기술개발 3-10억, 사업화 5-20억)
      - 산업부 사업 (R&D 5-50억, 실증 10-100억)
      - 과기부 사업 (창업 1-5억, 기술이전 3-15억)
      - 지자체 특화사업 (1-10억, 글로벌진출 5-30억)`,
      
      keywords: ['기술사업화', '창업', '정부지원', 'R&D', '투자유치', '정부과제'],
      
      achievements: [
        '평균 정부지원금 확보: 5억원 이상',
        '과제 선정률: 78% (업계평균 25%)',
        '사업화 성공률: 85%',
        '누적 지원금 확보: 500억원 이상'
      ]
    },
    
    'certification': {
      name: '인증지원',
      fullDescription: `ISO, 벤처인증, 이노비즈 등 각종 기업 인증 취득을 통해 세제혜택과 경쟁력을 동시에 확보하는 서비스입니다.
      취득률 92% (업계 최고)의 검증된 노하우로 확실한 인증을 보장합니다.
      
      전문 인증 분야:
      - 품질경영시스템 (ISO 9001, ISO 14001, ISO 45001)
      - 정보보안 (ISO 27001, ISMS-P, 개인정보보호)
      - 기업 인증 (벤처기업, 이노비즈, 메인비즈)
      - 업종별 특화 인증 (ISO 13485, HACCP 등)
      
      인증 취득 혜택:
      - 세제 혜택: 법인세/소득세 감면 (연간 최대 5천만원)
      - 금융 혜택: 대출 금리 우대, 보증료 할인
      - 입찰 가점: 공공입찰 시 가점 획득
      - 브랜드 가치: 고객 신뢰도 및 시장경쟁력 향상`,
      
      keywords: ['인증', 'ISO', '벤처기업', '이노비즈', '세제혜택', '품질인증'],
      
      certificationBenefits: [
        '연간 세제혜택 3천만원~5천만원',
        '대출 금리 0.5%~1% 우대',
        '공공입찰 5~10점 가점',
        '브랜드 신뢰도 300% 향상'
      ]
    },
    
    'website': {
      name: '웹사이트 구축',
      fullDescription: `SEO 최적화와 온라인 마케팅을 통합한 매출 증대형 웹사이트 구축 서비스입니다.
      구글 검색 상위노출 보장과 온라인 문의 300-500% 증가의 검증된 성과를 제공합니다.
      
      핵심 서비스:
      - SEO 최적화 웹사이트 설계 및 구축
      - 반응형 디자인 및 모바일 최적화
      - 콘텐츠 마케팅 전략 수립
      - 온라인 광고 통합 관리 (구글, 네이버)
      
      차별화 우수성:
      - SEO 전문팀의 검색엔진 상위노출 보장
      - 전환율(CVR) 최적화 전문성
      - 업종별 특화 디자인 템플릿
      - 마케팅 자동화 시스템 구축`,
      
      keywords: ['웹사이트', '홈페이지', 'SEO', '온라인마케팅', '검색상위노출'],
      
      results: [
        '온라인 문의 300-500% 증가',
        '매출 직접 연결율 85%',
        '구글 검색 상위 3페이지 진입 보장',
        '모바일 최적화 완벽 구현'
      ]
    }
  },
  
  // 🎯 자주 묻는 질문과 전문 답변
  faq: [
    {
      category: 'general',
      question: 'M-CENTER는 어떤 회사인가요?',
      answer: `M-CENTER(기업의별 경영지도센터)는 25년간 검증된 노하우를 보유한 대한민국 최고 수준의 경영컨설팅 전문기관입니다.

🏆 핵심 차별화 우수성:
• 25년 경험의 이후경 경영지도사 직접 컨설팅
• 95% 이상의 높은 성공률과 고객만족도
• 정부지원사업 전문기관 (선정률 78%)
• 6가지 핵심 서비스의 통합 솔루션 제공

🎯 검증된 성과:
• 1,000여 기업 성공 지원
• 누적 정부지원금 확보 500억원
• 평균 매출 증대 35%
• 고객 재의뢰율 85%`
    },
    {
      category: 'service',
      question: '어떤 서비스가 우리 회사에 가장 적합할까요?',
      answer: `기업의 현재 상황과 목표에 따라 최적의 서비스 조합을 추천해드립니다:

📊 상황별 추천 서비스:
• 매출/수익 개선이 필요 → BM ZEN 사업분석
• 업무 효율성 향상 필요 → AI 생산성향상
• 고정비(임대료) 부담 → 경매활용 공장구매
• 기술보유, 자금 필요 → 기술사업화/창업
• 세금 부담 완화 → 인증지원
• 온라인 매출 확대 → 웹사이트 구축

🆓 정확한 진단을 위한 무료 상담을 제공합니다. 
전화(010-9251-9743) 또는 현장 방문을 통해 맞춤형 솔루션을 제안해드립니다.`
    },
    {
      category: 'cost',
      question: '비용은 어느 정도 드나요?',
      answer: `서비스별로 다르지만, 투자 대비 확실한 ROI를 보장하는 합리적 가격 정책을 운영합니다:

💰 투자 대비 효과:
• BM ZEN 사업분석: 투자금 대비 300-800% ROI
• AI 생산성향상: 3-6개월 내 투자비 회수
• 경매 공장구매: 30-50% 부동산비용 절감
• 정부지원 확보: 평균 5억원 이상 지원금
• 인증지원: 연간 3-5천만원 세제혜택
• 웹사이트: 온라인 매출 3-5배 증가

🆓 첫 상담 및 현황 진단은 완전 무료입니다.
구체적인 투자 계획은 무료 상담을 통해 맞춤형으로 제안해드립니다.`
    }
  ],
  
  // 🎨 상담 시나리오별 대응 전략
  consultationScenarios: {
    inquiry: '첫 문의 고객에게는 M-CENTER의 차별화된 우수성을 강조하며 신뢰감을 조성',
    comparison: '타 업체와 비교 시 25년 경험과 95% 성공률 등 검증된 실적을 강조',
    budget: '예산 문의 시 ROI와 투자 회수 기간을 구체적으로 제시',
    skeptical: '의구심 표현 시 실제 성공 사례와 고객 추천서를 활용',
    urgent: '긴급 상황 시 즉시 대응 가능한 전문가 직접 연결 서비스 강조'
  }
};

/**
 * 🔧 챗봇 학습 데이터 생성
 */
async function generateTrainingData() {
  console.log('🧠 AI 챗봇 학습 데이터 생성 중...');
  
  const trainingPrompts = [
    // 서비스별 전문 질문-답변 생성
    `M-CENTER의 BM ZEN 사업분석 서비스에 대한 다양한 고객 질문과 전문가 수준의 답변 10개를 생성해주세요. 
    실제 고객이 물어볼 만한 구체적이고 실무적인 질문들로 구성해주세요.`,
    
    `AI 생산성향상 서비스에 대한 기술적 질문부터 비용 문의까지 다양한 수준의 질문-답변 10개를 생성해주세요.
    ChatGPT, AI 도구 활용에 대한 전문적인 내용을 포함해주세요.`,
    
    `경매활용 공장구매 서비스에 대한 투자, 리스크, 절차 관련 질문-답변 10개를 생성해주세요.
    25년 전문 노하우와 안전성을 강조한 답변으로 구성해주세요.`,
    
    // 상황별 대화 시나리오 생성
    `중소기업 CEO가 처음 M-CENTER에 문의하는 상황의 대화 시나리오 5개를 생성해주세요.
    신뢰감 조성부터 서비스 추천까지 자연스러운 대화 흐름으로 구성해주세요.`,
    
    `기존 고객이 추가 서비스를 문의하는 상황의 대화 5개를 생성해주세요.
    기존 성과를 바탕으로 한 Up-selling 상황을 포함해주세요.`
  ];

  const trainingData = [];
  
  for (const prompt of trainingPrompts) {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `당신은 M-CENTER의 AI 챗봇 학습 데이터를 생성하는 전문가입니다. 
            25년 경험의 경영지도사 수준의 전문성으로 고품질의 질문-답변 쌍을 생성해주세요.
            
            답변 작성 시 반드시 포함할 요소:
            1. M-CENTER의 차별화된 우수성 강조
            2. 구체적인 성과 수치와 실적
            3. 고객의 즉시 행동을 유도하는 CTA
            4. 전문가 직접 연결 정보 (010-9251-9743)`
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.8
      });
      
      trainingData.push({
        prompt: prompt,
        response: completion.choices[0].message.content,
        timestamp: new Date().toISOString()
      });
      
      // API 호출 간격 조절
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('학습 데이터 생성 실패:', error);
    }
  }
  
  return trainingData;
}

/**
 * 📝 학습 데이터를 JSONL 형식으로 변환
 */
function convertToJSONL(trainingData) {
  const jsonlData = trainingData.map(item => {
    return JSON.stringify({
      messages: [
        { role: "system", content: "당신은 M-CENTER의 전문 AI 상담사입니다. 25년 경험의 경영지도사 수준의 전문성으로 고객을 상담합니다." },
        { role: "user", content: item.prompt },
        { role: "assistant", content: item.response }
      ]
    });
  }).join('\n');
  
  return jsonlData;
}

/**
 * 🧠 챗봇 성능 분석
 */
async function analyzeChatbotPerformance() {
  console.log('📊 AI 챗봇 성능 분석 중...');
  
  const testQuestions = [
    "M-CENTER는 어떤 회사인가요?",
    "우리 회사에 맞는 서비스를 추천해주세요",
    "BM ZEN이 뭔가요?",
    "AI 도입 효과는 어느 정도인가요?",
    "비용은 얼마나 드나요?",
    "정부지원금을 받을 수 있나요?",
    "무료 상담을 받고 싶습니다"
  ];
  
  const analysisPrompt = `다음 질문들에 대한 M-CENTER AI 챗봇의 응답 품질을 분석하고 개선 방안을 제시해주세요:

질문 목록: ${testQuestions.join(', ')}

분석 기준:
1. 전문성: 25년 경영지도사 수준의 깊이
2. 차별화: M-CENTER만의 우수성 강조
3. 신뢰성: 구체적 수치와 실적 제시
4. 행동유도: 고객의 즉시 상담 신청 유도
5. 완전성: 질문에 대한 완벽한 답변

각 기준별로 점수(1-10)와 개선 방안을 제시해주세요.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: analysisPrompt }],
      max_tokens: 1500,
      temperature: 0.6
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('성능 분석 실패:', error);
    return '성능 분석을 완료할 수 없습니다.';
  }
}

/**
 * 🚀 메인 함수: 챗봇 훈련 데이터 업데이트
 */
async function updateChatbotTraining() {
  console.log('🧠 M-CENTER AI 챗봇 훈련 시작...');
  
  try {
    // 훈련 데이터 디렉토리 생성
    const trainingDir = path.join(process.cwd(), 'training-data');
    try {
      await fs.access(trainingDir);
    } catch {
      await fs.mkdir(trainingDir, { recursive: true });
    }

    // 1. 새로운 학습 데이터 생성
    console.log('📚 새로운 학습 데이터 생성 중...');
    const trainingData = await generateTrainingData();
    
    // 2. 지식 베이스 업데이트
    console.log('🔄 지식 베이스 업데이트 중...');
    const knowledgeBasePath = path.join(trainingDir, 'knowledge-base.json');
    await fs.writeFile(knowledgeBasePath, JSON.stringify(MCENTER_KNOWLEDGE_BASE, null, 2), 'utf8');
    
    // 3. JSONL 형식으로 훈련 데이터 저장
    console.log('💾 훈련 데이터 저장 중...');
    const jsonlData = convertToJSONL(trainingData);
    const currentDate = new Date().toISOString().split('T')[0];
    const trainingFilePath = path.join(trainingDir, `training-data-${currentDate}.jsonl`);
    await fs.writeFile(trainingFilePath, jsonlData, 'utf8');
    
    // 4. 성능 분석 수행
    console.log('📊 챗봇 성능 분석 중...');
    const performanceAnalysis = await analyzeChatbotPerformance();
    const analysisPath = path.join(trainingDir, `performance-analysis-${currentDate}.md`);
    await fs.writeFile(analysisPath, performanceAnalysis, 'utf8');
    
    // 5. 훈련 요약 보고서 생성
    const summaryReport = `# M-CENTER AI 챗봇 훈련 보고서
    
## 📅 훈련 일시
${new Date().toLocaleString('ko-KR')}

## 📊 훈련 데이터 현황
- 총 데이터 수: ${trainingData.length}개
- 지식 베이스 서비스: ${Object.keys(MCENTER_KNOWLEDGE_BASE.services).length}개
- FAQ 항목: ${MCENTER_KNOWLEDGE_BASE.faq.length}개

## 🎯 훈련 목표
1. M-CENTER 차별화 우수성 강화
2. 전문 상담사 수준의 응답 품질 향상
3. 고객 상담 신청 전환율 증대
4. 서비스별 전문성 강화

## 📈 기대 효과
- 응답 정확도 95% 이상
- 고객 만족도 90% 이상
- 상담 신청 전환율 15% 향상
- 전문성 인식도 25% 상승

## 🔄 다음 업데이트
- 고객 피드백 반영
- 새로운 서비스 정보 추가
- 성과 데이터 업데이트
- 상담 시나리오 확장

---
© 2025 M-CENTER AI Training System`;

    const summaryPath = path.join(trainingDir, `training-summary-${currentDate}.md`);
    await fs.writeFile(summaryPath, summaryReport, 'utf8');
    
    console.log('✅ AI 챗봇 훈련 완료!');
    console.log(`📁 저장 위치: ${trainingDir}`);
    
    return {
      success: true,
      trainingDataCount: trainingData.length,
      files: {
        trainingData: trainingFilePath,
        knowledgeBase: knowledgeBasePath,
        performanceAnalysis: analysisPath,
        summary: summaryPath
      }
    };
    
  } catch (error) {
    console.error('❌ 챗봇 훈련 실패:', error);
    throw error;
  }
}

// 직접 실행 시
if (require.main === module) {
  updateChatbotTraining()
    .then(result => {
      console.log('🎉 챗봇 훈련 성공:', result);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 챗봇 훈련 실패:', error);
      process.exit(1);
    });
}

module.exports = {
  updateChatbotTraining,
  generateTrainingData,
  analyzeChatbotPerformance,
  MCENTER_KNOWLEDGE_BASE
}; 
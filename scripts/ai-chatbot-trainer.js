/**
 * 🧠 M-CENTER AI 챗봇 훈련 및 학습 데이터 업데이트
 * Google Gemini를 사용하여 챗봇 훈련 시스템
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs').promises;
const path = require('path');

// Gemini 클라이언트 초기화
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
      fullDescription: `AI 기술을 실무에 직접 적용하여 업무 효율성을 극대화하는 M-CENTER 특화 서비스입니다.
      
      핵심 특징:
      - 개별 기업 맞춤형 AI 도구 선정 및 도입
      - 실무진 대상 1:1 교육 및 지원
      - ROI 측정 가능한 구체적 성과 창출
      - 지속적 업그레이드 및 최적화 지원
      
      검증된 성과:
      - 업무 효율성: 평균 47% 향상
      - 인건비 절감: 25% 이상
      - 의사결정 속도: 3배 향상
      - 고객 대응 시간: 60% 단축`,
      
      keywords: ['AI', '인공지능', '생산성', '효율성', '자동화', '업무개선', '디지털전환'],
      
      caseStudies: [
        '건설업 D사: AI 견적 시스템으로 견적서 작성 시간 80% 단축',
        '마케팅업 E사: AI 콘텐츠 제작으로 생산성 300% 향상',
        '회계법인 F사: AI 문서처리로 업무 효율 5배 증가'
      ],
      
      process: [
        '현재 업무 프로세스 분석',
        'AI 적용 포인트 발굴',
        '맞춤형 AI 도구 선정 및 도입',
        '실무진 교육 및 적응 지원',
        '성과 측정 및 지속 개선'
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
• 세금계산기: 완전 무료 이용

🆓 첫 상담 및 현황 진단은 완전 무료입니다.
구체적인 투자 계획은 무료 상담을 통해 맞춤형으로 제안해드립니다.`
    },
    {
      category: 'tax-calculator',
      question: '세금계산기는 어떤 기능이 있나요?',
      answer: `🧮 **11개 전문 세금계산기로 모든 세무 계산을 정확하게!**

📊 **개인세금 (5개)**
• 근로소득세 계산기 - 월급, 연봉 소득세 정확 계산
• 종합소득세 계산기 - 사업소득, 기타소득 통합 계산  
• 양도소득세 계산기 - 부동산, 주식 양도 시 세금 계산
• 상속세 계산기 - 상속재산 세금 및 공제 계산
• 증여세 계산기 - 증여재산 세금 및 공제 계산

🏢 **법인세금 (3개)**
• 법인세 계산기 - 법인 소득세 및 지방소득세 계산
• 부가가치세 계산기 - 매출/매입 부가세 계산
• 원천징수세 계산기 - 급여, 사업소득 원천징수 계산

⚡ **전문세금 (3개)**
• 가업상속세금 계산기 - 가업승계 시 세금 최적화
• 주식이동세금 계산기 - 주식 양도/증여 세금 계산
• 간이 종합 계산기 - 통합 세무 계산 및 비교

✅ **2024년 최신 세법 완벽 반영, 100% 정확한 계산 보장!**`
    },
    {
      category: 'tax-guide',
      question: '세금계산기 사용법을 알고 싶어요',
      answer: `📖 **세금계산기 사용법 가이드**

🎯 **사용 방법**
1. /tax-calculator 페이지 접속
2. 필요한 계산기 선택 (11개 중)
3. 정보 입력 (소득, 공제, 자산 등)
4. 실시간 계산 결과 확인
5. 절세 방안 가이드 확인

💡 **정확한 계산을 위한 팁**
• 소득 정보는 정확하게 입력
• 공제 항목 빠짐없이 체크
• 특수 상황은 전문가 상담 권장

⚠️ **면책조항**
• 본 계산기는 참고용입니다
• 실제 세무신고 시 전문가 검토 필수
• 복잡한 세무는 세무사 상담 권장

📞 **세무 전문 상담: 010-9251-9743**`
    }
  ],
  
  // 🎨 상담 시나리오별 대응 전략
  consultationScenarios: {
    inquiry: '첫 문의 고객에게는 M-CENTER의 차별화된 우수성을 강조하며 신뢰감을 조성',
    comparison: '타 업체와 비교 시 25년 경험과 95% 성공률 등 검증된 실적을 강조',
    budget: '예산 문의 시 ROI와 투자 회수 기간을 구체적으로 제시',
    skeptical: '의구심 표현 시 실제 성공 사례와 고객 추천서를 활용',
    urgent: '긴급 상황 시 즉시 대응 가능한 전문가 직접 연결 서비스 강조'
  },

  // 🎯 M-CENTER 6대 핵심 서비스
  coreServices: [
    {
      name: 'BM ZEN 사업분석',
      description: '국내 유일 프레임워크로 매출 20-40% 증대 보장',
      keywords: ['사업분석', '비즈니스모델', '매출증대', 'BM ZEN', '수익구조'],
      benefits: ['매출 35% 평균 증가', '수익성 30% 개선', 'ROI 300-800%'],
      process: '현황분석 → 전략수립 → 실행계획 → 성과측정',
      price: '투자 대비 300-800% ROI 보장',
      government: '기업진단사업, 경영개선사업 연계'
    },
    {
      name: 'AI 활용 생산성향상',
      description: '업무효율 40-60% 향상, 국내 TOP 3 전문성',
      keywords: ['AI', '생산성', '자동화', 'ChatGPT', '업무효율'],
      benefits: ['업무효율 50% 향상', '인건비 25% 절감', '의사결정 3배 향상'],
      process: '현황진단 → AI도입 → 교육훈련 → 성과분석',
      price: '3-6개월 내 투자비 회수',
      government: 'AI 바우처 최대 2천만원 지원'
    },
    {
      name: '경매활용 공장구매',
      description: '25년 노하우로 부동산비용 30-50% 절감',
      keywords: ['경매', '공장구매', '부동산', '투자', '공장이전'],
      benefits: ['부동산비용 40% 절감', '투자수익 200-500%', '안전낙찰률 95%'],
      process: '물건발굴 → 가치평가 → 법적검토 → 낙찰지원 → 사후관리',
      price: '30-50% 부동산비용 절감',
      government: '중소기업 시설자금 대출 연계'
    },
    {
      name: '기술사업화/창업',
      description: '정부과제 선정률 78%, 평균 5억원 지원 확보',
      keywords: ['기술사업화', '창업', '정부지원', 'R&D', '투자유치'],
      benefits: ['평균 5억원 지원', '사업화 성공률 82%', '투자유치 65%'],
      process: '기술진단 → 과제기획 → 선정지원 → 사업수행 → 사업화',
      price: '선정 시까지 무료 지원',
      government: 'TIPS, 창업도약패키지, 기술보증기금'
    },
    {
      name: '인증지원',
      description: '취득률 92% 업계 최고, 연간 5천만원 세제혜택',
      keywords: ['인증', 'ISO', '벤처기업', '연구소', '세제혜택'],
      benefits: ['세제혜택 5천만원', '대기업 납품자격', '브랜드가치 300% 향상'],
      process: '현황진단 → 시스템구축 → 문서화 → 교육훈련 → 심사대응',
      price: '취득률 92% 보장',
      government: '벤처기업 확인, 연구소 설립 지원'
    },
    {
      name: '웹사이트 구축',
      description: 'SEO 상위노출 보장, 온라인 문의 300-500% 증가',
      keywords: ['웹사이트', '홈페이지', 'SEO', '온라인마케팅', '디지털마케팅'],
      benefits: ['온라인 문의 400% 증가', '매출연결률 85%', '구글 상위노출'],
      process: '기획설계 → 디자인 → 개발 → SEO최적화 → 마케팅',
      price: 'SEO 상위노출 보장, 성과 없으면 환불',
      government: '온라인 판로개척, 디지털 바우처 연계'
    },
    {
      name: '전문 세금계산기',
      description: '11개 계산기 완비, 2024년 최신 세법 반영',
      keywords: ['세금계산기', '세무', '소득세', '법인세', '부가가치세', '상속세', '증여세', '양도소득세'],
      benefits: ['100% 정확한 계산', '3초 내 계산 완료', '절세 방안 제안', '전문가 수준 분석'],
      process: '정보입력 → 실시간계산 → 결과분석 → 절세가이드 → 전문가상담',
      price: '완전 무료 이용',
      government: '세무신고 지원, 절세 컨설팅 연계'
    }
  ]
};

// 🎯 훈련 데이터 생성을 위한 질문 템플릿
const trainingPrompts = [
  "M-CENTER의 주요 서비스는 무엇인가요?",
  "BM ZEN 사업분석이 다른 컨설팅과 어떻게 다른가요?",
  "AI 생산성향상 서비스의 구체적인 효과는 무엇인가요?",
  "우리 회사에 맞는 M-CENTER 서비스를 추천해주세요",
  "M-CENTER의 성공 사례를 알려주세요",
  "상담을 받으려면 어떻게 해야 하나요?",
  "비용은 얼마나 드나요?",
  "정부 지원금을 받을 수 있나요?",
  "서비스 진행 기간은 얼마나 걸리나요?",
  "M-CENTER가 다른 컨설팅 회사와 다른 점은?",
  "무료 상담이나 진단을 받을 수 있나요?",
  "작은 회사도 서비스를 받을 수 있나요?",
  "온라인으로도 상담이 가능한가요?",
  "M-CENTER의 전문성은 어느 정도인가요?",
  "실제 성과를 보장할 수 있나요?"
];

/**
 * 🤖 AI 기반 훈련 데이터 생성
 */
async function generateTrainingData() {
  console.log('🚀 M-CENTER AI 챗봇 훈련 데이터 생성 시작...');
  
  const trainingData = [];
  
  for (const prompt of trainingPrompts) {
    try {
      const model = gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });
      
      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `당신은 M-CENTER의 AI 챗봇 학습 데이터를 생성하는 전문가입니다. 
                25년 경험의 경영지도사 수준의 전문성으로 고품질의 질문-답변 쌍을 생성해주세요.
                
                답변 작성 시 반드시 포함할 요소:
                1. M-CENTER의 차별화된 우수성 강조
                2. 구체적인 성과 수치와 실적
                3. 고객의 즉시 행동을 유도하는 CTA
                4. 전문가 직접 연결 정보 (010-9251-9743)
                
                질문: ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 4000, // 2000자 훈련 답변을 위해 4000 토큰으로 확대
          temperature: 0.8,
          topP: 0.9,
          topK: 40,
        },
      });
      
      const response = await result.response;
      
      trainingData.push({
        prompt: prompt,
        response: response.text(),
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
 * 📊 훈련 데이터를 파일로 저장
 */
async function saveTrainingData(data) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `m-center-training-data-${timestamp}.json`;
    const filepath = path.join(__dirname, '../docs', filename);
    
    await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log(`✅ 훈련 데이터 저장 완료: ${filename}`);
    console.log(`📁 저장 위치: ${filepath}`);
    console.log(`📊 생성된 데이터 수: ${data.length}개`);
    
  } catch (error) {
    console.error('❌ 훈련 데이터 저장 실패:', error);
  }
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
    const model = gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: analysisPrompt }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 4000, // 2000자 성능 분석을 위해 4000 토큰으로 확대
        temperature: 0.6,
        topP: 0.9,
        topK: 40,
      },
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('성능 분석 실패:', error);
    return '성능 분석을 완료할 수 없습니다.';
  }
}

/**
 * 📈 성과 보고서 생성
 */
async function generatePerformanceReport(analysis) {
  const timestamp = new Date().toISOString();
  
  const report = {
    title: 'M-CENTER AI 챗봇 성능 분석 보고서',
    generatedAt: timestamp,
    analysis: analysis,
    recommendations: [
      '지속적인 실제 대화 데이터를 통한 학습 개선',
      'M-CENTER 특화 지식 베이스 확장',
      '고객 만족도 측정 시스템 구축',
      '실시간 성능 모니터링 도구 도입'
    ],
    nextSteps: [
      '월간 성능 리뷰 및 업데이트',
      '고객 피드백 수집 및 반영',
      '새로운 서비스 정보 추가',
      'AI 모델 최적화 및 업그레이드'
    ]
  };
  
  try {
    const filename = `chatbot-performance-report-${timestamp.split('T')[0]}.json`;
    const filepath = path.join(__dirname, '../docs', filename);
    
    await fs.writeFile(filepath, JSON.stringify(report, null, 2), 'utf8');
    
    console.log(`📊 성과 보고서 생성 완료: ${filename}`);
    return report;
    
  } catch (error) {
    console.error('성과 보고서 생성 실패:', error);
    return null;
  }
}

/**
 * 🚀 메인 실행 함수
 */
async function main() {
  try {
    console.log('🤖 M-CENTER AI 챗봇 훈련 시스템 시작');
    console.log('⏰ 시작 시간:', new Date().toISOString());
    
    // 1. 훈련 데이터 생성
    const trainingData = await generateTrainingData();
    
    // 2. 훈련 데이터 저장
    await saveTrainingData(trainingData);
    
    // 3. 성능 분석
    const performanceAnalysis = await analyzeChatbotPerformance();
    
    // 4. 성과 보고서 생성
    const report = await generatePerformanceReport(performanceAnalysis);
    
    console.log('✅ M-CENTER AI 챗봇 훈련 완료');
    console.log('📊 생성된 훈련 데이터:', trainingData.length, '개');
    console.log('⏰ 완료 시간:', new Date().toISOString());
    
  } catch (error) {
    console.error('❌ AI 챗봇 훈련 실패:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시 메인 함수 호출
if (require.main === module) {
  main();
}

module.exports = {
  generateTrainingData,
  saveTrainingData,
  analyzeChatbotPerformance,
  generatePerformanceReport,
  MCENTER_KNOWLEDGE_BASE
}; 
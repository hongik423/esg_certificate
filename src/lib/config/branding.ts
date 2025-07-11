/**
 * 🏢 브랜딩 및 연락처 정보 중앙 관리
 * 
 * 모든 브랜딩 관련 정보를 이 파일에서 중앙 관리합니다.
 * 변경 시 이 파일만 수정하면 전체 시스템에 적용됩니다.
 */

// 🏢 기업 정보
export const COMPANY_INFO = {
  name: 'ESG 인증원',
  shortName: 'ESG',
  businessNumber: '123-45-67890',
  ceoName: '박윤철',
  address: '서울특별시 강남구 테헤란로 123',
  foundedYear: '2020',
  description: 'KAB 인정 ESG 경영시스템 시범 인증기관',
  slogan: '고객에게 최적의 적합성 평가 서비스 제공',
  vision: '공평성을 최고의 가치로 신뢰받는 인증서비스 제공',
  mission: '인증의 전문성을 통한 인증프로세스의 완전성을 추구',
  coreValues: [
    '🌱 친환경성 (Environmental)',
    '🤝 공평성 (Impartiality)', 
    '🎯 전문성 (Professionalism)',
    '🌟 신뢰성 (Reliability)'
  ],
  website: 'https://www.esgrr.co.kr',
  email: 'hongik423@gmail.com',
  certifications: [
    'KAB 인정 인증기관',
    'ISO 9001 인증기관',
    'ISO 14001 인증기관',
    'ISO 45001 인증기관',
    'ESG 경영시스템 시범 인증기관'
  ]
} as const;

// 👨‍💼 담당자 정보
export const CONSULTANT_INFO = {
  name: '이후경',
  title: '경영지도사',
  fullTitle: '이후경 경영지도사',
  phone: '010-9251-9743',
  email: 'hongik423@gmail.com',
  experience: '25년',
  specialization: 'ESG 경영시스템 인증 및 컨설팅',
  certification: '중소벤처기업부 경영지도사',
  company: 'ESG 인증원',
  description: 'ESG 경영시스템 전문 컨설턴트',
  background: '대기업 실무 경험 + ESG 인증 전문 노하우'
} as const;

// 📞 연락처 정보
export const CONTACT_INFO = {
  mainPhone: '010-9251-9743',
  emergencyPhone: '010-9251-9743',
  mainEmail: 'hongik423@gmail.com',
  email: 'hongik423@gmail.com',
  officePhone: '02-588-5114',
  fax: '02-588-5115',
  kakaoTalk: '@esgrr',
  businessHours: '평일 09:00-18:00',
  consultationHours: '평일 09:00-18:00',
  responseTime: '24시간 이내 연락',
  visitConsultation: '무료 현장 방문 상담 가능',
  websiteUrl: 'https://www.esgrr.co.kr',
  
  // 상담 관련 정보
  consultationInfo: {
    freeConsultation: '초기 상담은 무료로 진행됩니다!',
    consultationTime: '30분~1시간',
    availableTime: '평일 09:00-18:00',
    responseMethod: '전화, 이메일 또는 방문 상담'
  }
} as const;

// 🌐 웹사이트 정보
export const WEBSITE_INFO = {
  domain: 'esgrr.co.kr',
  title: 'ESG 인증원 - KAB 인정 ESG 경영시스템 시범 인증기관',
  description: 'ISO 9001, ISO 14001, ISO 45001, ESG 경영시스템 인증 전문기관',
  
  // SEO 관련
  keywords: [
    'ESG 인증',
    'ISO 인증',
    'ISO 9001',
    'ISO 14001',
    'ISO 45001',
    'ESG 경영시스템',
    'KAB 인정',
    '인증기관',
    '경영시스템 인증',
    '품질경영',
    '환경경영',
    '안전보건경영'
  ],
  
  // 소셜미디어
  social: {
    // 추후 필요시 추가
  }
} as const;

// 📧 이메일 템플릿 정보
export const EMAIL_TEMPLATES = {
  // 발신자 정보
  sender: {
    name: COMPANY_INFO.name,
    email: CONTACT_INFO.mainEmail,
    replyTo: CONTACT_INFO.mainEmail
  },
  
  // 공통 서명
  signature: `
${COMPANY_INFO.name}
${CONSULTANT_INFO.fullTitle}
📞 ${CONTACT_INFO.mainPhone}
📧 ${CONTACT_INFO.mainEmail}

${CONTACT_INFO.consultationInfo.freeConsultation}
  `.trim(),
  
  // 공통 푸터
  footer: `
---
🏢 ${COMPANY_INFO.name}
${COMPANY_INFO.slogan}
📞 ${CONTACT_INFO.mainPhone} | 📧 ${CONTACT_INFO.mainEmail}
  `.trim()
} as const;

// 🎯 상담 챗봇 설정
export const CHATBOT_CONFIG = {
  name: `ESG 인증 상담원`,
  greeting: `안녕하세요! 🌱 ESG 인증원 ${CONSULTANT_INFO.fullTitle}입니다.`,
  
  systemMessage: `저는 ESG 인증원의 ${CONSULTANT_INFO.fullTitle}로, ESG 경영시스템 및 ISO 인증에 대한 전문 상담을 진행합니다.`,
  
  contactInfo: {
    consultant: CONSULTANT_INFO.fullTitle,
    phone: CONTACT_INFO.mainPhone,
    email: CONTACT_INFO.mainEmail
  },
  
  character: {
    identity: '이후경 경영지도사 (ESG 인증원)',
    expertise: 'ESG 및 ISO 인증 전문가',
    tone: '전문적이면서도 친근한',
    focus: '인증 절차 및 요구사항 안내'
  }
} as const;

// 🔧 환경 변수 (레거시 호환)
export const LEGACY_MAPPING = {
  // 기존 M-CENTER -> ESG 인증원
  'M-CENTER': COMPANY_INFO.name,
  'M-Center': COMPANY_INFO.name,
  'm-center': COMPANY_INFO.shortName,
  '기업의별 경영지도센터': COMPANY_INFO.name,
  
  // 기존 담당자 -> 새 담당자
  '이후경 책임컨설턴트': CONSULTANT_INFO.fullTitle,
  
  // 기존 이메일 -> 새 이메일
  'mcenter@example.com': CONTACT_INFO.mainEmail,
  'lhk@injc.kr': CONTACT_INFO.mainEmail,
  'ycpark55@naver.com': CONTACT_INFO.mainEmail
} as const;

// 🚀 내보내기 (편의 함수)
export const getBrandName = () => COMPANY_INFO.name;
export const getConsultantName = () => CONSULTANT_INFO.fullTitle;
export const getMainEmail = () => CONTACT_INFO.mainEmail;
export const getMainPhone = () => CONTACT_INFO.mainPhone;

// 전체 설정 객체
export const BRANDING_CONFIG = {
  company: COMPANY_INFO,
  consultant: CONSULTANT_INFO,
  contact: CONTACT_INFO,
  website: WEBSITE_INFO,
  email: EMAIL_TEMPLATES,
  chatbot: CHATBOT_CONFIG,
  legacy: LEGACY_MAPPING
} as const;

export default BRANDING_CONFIG; 
import { NextRequest, NextResponse } from 'next/server';
import { safeGet, validateApiResponse, collectErrorInfo } from '@/lib/utils/safeDataAccess';

// Vercel 최적화 설정
export const dynamic = 'force-dynamic';
export const revalidate = false;
export const runtime = 'nodejs';

// 🔧 CORS 설정을 위한 공통 헤더 함수
function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
  };
}

// 🎯 ESG 인증원 이후경 선임심사원 응답 시스템
const ESG_CERTIFICATION_RESPONSES = {
  // 기본 인사말
  greetings: [
    `안녕하세요! ESG 인증원 선임심사원 이후경 경영지도사입니다.

ISO 9001, ISO 14001, ISO 45001 전문 심사원으로서 기업의 지속가능한 성장을 위한 인증 솔루션을 제공해드리겠습니다.

🏆 **ESG 인증원 전문 서비스:**
• ISO 9001 (품질경영시스템)
• ISO 14001 (환경경영시스템)  
• ISO 45001 (안전보건경영시스템)
• ESG 경영시스템 인증

📞 **상담 문의:** 010-9251-9743`
  ],

  // ISO 9001 품질경영시스템
  'iso-9001': {
    keyword: ['iso 9001', '품질경영', '품질관리', '품질시스템', '품질인증'],
    level1: '안녕하세요! ISO 9001 품질경영시스템 인증에 대해 문의해주셔서 감사합니다. 기업의 품질 향상과 고객 만족을 위한 국제 표준 인증입니다.',
    level2: `ISO 9001 품질경영시스템 인증에 대해 상세히 안내해드리겠습니다.

🎯 **ISO 9001 핵심 특징:**
• 국제적으로 인정받는 품질경영 표준
• 고객 만족도 향상 및 품질 개선
• 지속적인 개선 프로세스 구축
• 대기업 협력사 등록 필수 요건

📊 **인증 효과:**
• 품질 개선율: 평균 35%
• 고객 만족도: 평균 25% 향상
• 불량률 감소: 평균 40%

📞 **상담 문의:** 010-9251-9743`,
    level3: `ISO 9001 품질경영시스템 인증에 대해 종합적으로 안내해드리겠습니다.

🎯 **ISO 9001 인증 개요:**
• 국제표준화기구(ISO)가 제정한 품질경영시스템 국제표준
• 전 세계 170개국 100만개 이상 기업이 인증 취득
• 고객 요구사항 충족 및 지속적 개선을 통한 고객 만족 실현

📋 **인증 절차 (12주):**
1. 현황 진단 (2주): 기업 현황 분석 및 갭 분석
2. 시스템 구축 (6주): 품질매뉴얼 및 절차서 작성
3. 내부심사 (2주): 시스템 운영 및 내부 점검
4. 인증심사 (2주): 외부 인증기관 심사 및 인증서 발급

🏆 **인증 효과:**
• 품질 개선: 불량률 40% 감소, 고객 만족도 25% 향상
• 비용 절감: 품질 비용 30% 절감, 운영 효율성 20% 향상
• 시장 경쟁력: 대기업 협력사 등록, 해외 진출 기회 확대

💰 **경제적 효과:**
• 대기업 납품 단가 10-15% 상승
• 연간 품질 비용 절감 효과 5천만원
• 정부 지원금 및 세제혜택 활용 가능

📞 **상담 문의:** 010-9251-9743`,
    level4: `ISO 9001 품질경영시스템 인증에 대해 전문적으로 안내해드리겠습니다.

🎯 **ISO 9001:2015 표준 구조:**
• 10개 조항의 체계적 구성
• 프로세스 접근법 기반 품질경영
• 위험기반 사고(Risk-based thinking) 적용
• 리더십 및 최고경영자 참여 강조

📋 **10개 조항 상세:**
1. 적용범위 2. 인용표준 3. 용어와 정의 4. 조직상황
5. 리더십 6. 기획 7. 지원 8. 운영 9. 성과평가 10. 개선

🏭 **업종별 적용 사례:**
• 제조업: 생산품질 관리, 공급망 품질 보증
• 서비스업: 서비스 품질 표준화, 고객 만족도 관리
• 건설업: 시공품질 관리, 안전품질 통합 관리
• IT업: 소프트웨어 품질 보증, 프로젝트 관리

🔍 **심사 프로세스:**
• 1단계 심사: 문서 검토 및 현장 준비상태 확인
• 2단계 심사: 현장 실사 및 시스템 운영 확인
• 사후 심사: 연간 유지심사 및 3년 갱신심사

💡 **성공 요인:**
• 최고경영자의 강력한 의지와 리더십
• 전 직원의 품질 마인드 함양
• 체계적인 문서화 및 프로세스 관리
• 지속적인 개선 활동 및 성과 측정

📞 **전문 상담:** 010-9251-9743`,
    level5: `ISO 9001 품질경영시스템 인증에 대해 전략적이고 종합적으로 안내해드리겠습니다.

🎯 **ISO 9001:2015 전략적 접근:**
• 조직의 내외부 이슈 분석을 통한 전략적 품질경영
• 이해관계자 요구사항 파악 및 균형적 접근
• 프로세스 접근법과 PDCA 사이클의 통합적 운영
• 위험기반 사고를 통한 예방적 품질관리

📊 **품질경영 성숙도 모델:**
• Level 1: 기본 요구사항 충족 (법적 준수)
• Level 2: 시스템 구축 및 운영 (표준 준수)
• Level 3: 성과 측정 및 개선 (지속적 개선)
• Level 4: 혁신 및 우수성 (경영 혁신)
• Level 5: 세계적 수준 (글로벌 벤치마킹)

🏭 **업종별 맞춤형 전략:**
• 제조업: 스마트 팩토리 연계, Industry 4.0 대응, 공급망 품질 통합
• 서비스업: 디지털 전환 지원, 고객 경험 최적화, 서비스 품질 혁신
• 건설업: BIM 연계 품질관리, 안전품질 통합, 지속가능 건설
• IT업: 애자일 개발 프로세스, DevOps 품질 보증, 클라우드 품질 관리

🔄 **통합경영시스템 구축:**
• ISO 9001 + ISO 14001 + ISO 45001 통합
• ESG 경영시스템과의 연계
• 디지털 전환 및 AI 기술 활용
• 지속가능성 보고서 작성 지원

💰 **투자 대비 효과 분석:**
• 1년차: 시스템 구축 비용 대비 품질 비용 절감 150%
• 2년차: 고객 만족도 향상으로 매출 증대 20%
• 3년차: 브랜드 가치 상승 및 시장 점유율 확대
• 5년차: 글로벌 시장 진출 및 지속가능한 성장 기반 구축

🌱 **지속가능성 통합 전략:**
• ESG 경영과의 시너지 효과 창출
• 탄소중립 및 친환경 품질관리
• 사회적 책임 이행 및 윤리경영
• 지배구조 개선 및 투명성 제고

📞 **전략 컨설팅:** 010-9251-9743`
  },

  // ISO 14001 환경경영시스템
  'iso-14001': {
    keyword: ['iso 14001', '환경경영', '환경관리', '환경시스템', '환경인증'],
    level1: '안녕하세요! ISO 14001 환경경영시스템 인증에 대해 문의해주셔서 감사합니다. 환경 보호와 지속가능한 경영을 위한 국제 표준입니다.',
    level2: `ISO 14001 환경경영시스템 인증에 대해 상세히 안내해드리겠습니다.

🌱 **ISO 14001 핵심 특징:**
• 환경 영향 최소화 및 환경 성과 개선
• 법적 요구사항 준수 및 환경 리스크 관리
• 지속가능한 발전 및 친환경 경영 실현
• 탄소중립 및 ESG 경영 기반 구축

📊 **인증 효과:**
• 환경 비용 절감: 평균 25%
• 에너지 효율성: 평균 20% 향상
• 폐기물 감소: 평균 30%

📞 **상담 문의:** 010-9251-9743`,
    level3: `ISO 14001 환경경영시스템 인증에 대해 종합적으로 안내해드리겠습니다.

🌱 **ISO 14001 인증 개요:**
• 국제표준화기구(ISO)가 제정한 환경경영시스템 국제표준
• 전 세계 환경 보호 및 지속가능한 발전을 위한 경영 도구
• 환경 영향 최소화 및 환경 성과 지속적 개선

📋 **인증 절차 (14주):**
1. 환경영향평가 (3주): 환경 측면 파악 및 중요 환경 측면 결정
2. 시스템 구축 (6주): 환경정책 수립 및 환경경영 매뉴얼 작성
3. 운영 및 점검 (3주): 환경 목표 설정 및 모니터링
4. 인증심사 (2주): 외부 인증기관 심사 및 인증서 발급

🏆 **인증 효과:**
• 환경 성과: 에너지 사용량 20% 절감, 폐기물 30% 감소
• 비용 절감: 환경 비용 25% 절감, 자원 효율성 향상
• 브랜드 가치: 친환경 기업 이미지, 고객 신뢰도 향상

💰 **경제적 효과:**
• 환경 비용 절감 연간 3천만원
• 친환경 정부 지원금 활용 가능
• 그린 금융 및 ESG 투자 유치 기회

📞 **상담 문의:** 010-9251-9743`,
    level4: `ISO 14001 환경경영시스템 인증에 대해 전문적으로 안내해드리겠습니다.

🌱 **ISO 14001:2015 표준 구조:**
• 10개 조항의 체계적 구성 (ISO 9001과 동일한 HLS 구조)
• 생애주기 관점(Life Cycle Perspective) 도입
• 리더십 및 최고경영자 참여 강조
• 전략적 환경경영 접근법 적용

📋 **환경경영 핵심 요소:**
1. 환경정책 수립 및 최고경영자 의지 표명
2. 환경 측면 파악 및 중요 환경 측면 결정
3. 법적 요구사항 및 기타 요구사항 파악
4. 환경 목표 및 세부목표 설정
5. 환경경영 프로그램 수립 및 실행

🏭 **업종별 환경 관리 포인트:**
• 제조업: 대기오염, 수질오염, 폐기물, 화학물질 관리
• 서비스업: 에너지 사용, 종이 사용, 교통 관련 환경 영향
• 건설업: 건설폐기물, 소음, 분진, 토양오염 관리
• IT업: 전자폐기물, 에너지 효율, 데이터센터 환경 관리

🔍 **환경 성과 평가:**
• 환경 목표 달성도 측정 및 평가
• 환경 지표(KPI) 설정 및 모니터링
• 내부 환경감사 실시 및 개선 기회 발굴
• 경영검토를 통한 지속적 개선

💡 **성공 전략:**
• 전 직원의 환경 의식 제고 및 교육
• 공급업체 환경 관리 및 그린 구매
• 이해관계자 소통 및 환경 정보 공개
• 환경 기술 혁신 및 친환경 제품 개발

📞 **전문 상담:** 010-9251-9743`,
    level5: `ISO 14001 환경경영시스템 인증에 대해 전략적이고 종합적으로 안내해드리겠습니다.

🌱 **ISO 14001:2015 전략적 환경경영:**
• 조직의 내외부 환경 이슈 분석 및 전략적 대응
• 이해관계자 요구사항 균형 및 환경 가치 창출
• 생애주기 관점의 환경 영향 평가 및 관리
• 순환경제 및 지속가능한 소비·생산 패턴 구축

📊 **환경경영 성숙도 모델:**
• Level 1: 법적 준수 (Compliance) - 환경 법규 준수
• Level 2: 시스템 구축 (System) - 환경경영시스템 운영
• Level 3: 성과 개선 (Performance) - 환경 성과 향상
• Level 4: 문화 혁신 (Culture) - 환경경영 문화 구축
• Level 5: 환경경영 리더십 (Environment Leadership)

🏭 **업종별 환경 전략:**
• 제조업: 스마트 그린 팩토리, 산업 생태계 구축, 자원 순환 경제
• 서비스업: 그린 IT, 친환경 서비스 모델, 디지털 환경 솔루션
• 건설업: 그린 빌딩, 친환경 건설 기술, 지속가능한 도시 개발
• IT업: 그린 컴퓨팅, 에너지 효율적 데이터센터, 디지털 탄소 발자국

🔄 **ESG 통합 환경경영:**
• Environment: ISO 14001 기반 환경경영시스템
• Social: 지역사회 환경 기여 및 사회적 책임
• Governance: 환경 거버넌스 및 투명한 환경 정보 공개

💰 **환경경영 투자 대비 효과:**
• 1년차: 환경 비용 절감 및 에너지 효율 개선 200%
• 2년차: 친환경 제품/서비스 개발로 매출 증대 15%
• 3년차: 환경 브랜드 가치 상승 및 시장 차별화
• 5년차: 글로벌 환경 규제 대응 및 지속가능한 경쟁 우위

🌍 **글로벌 환경 트렌드 대응:**
• 탄소중립 2050 로드맵 수립 및 이행
• EU 택소노미 및 CSRD 대응
• TCFD 권고안 기반 기후 리스크 관리
• RE100, SBTi 등 글로벌 환경 이니셔티브 참여

📞 **환경경영 전략 컨설팅:** 010-9251-9743`
  },

  // ISO 45001 안전보건경영시스템
  'iso-45001': {
    keyword: ['iso 45001', '안전보건', '안전관리', '보건시스템', '안전인증'],
    level1: '안녕하세요! ISO 45001 안전보건경영시스템 인증에 대해 문의해주셔서 감사합니다. 근로자의 안전과 건강을 보호하는 국제 표준입니다.',
    level2: `ISO 45001 안전보건경영시스템 인증에 대해 상세히 안내해드리겠습니다.

🛡️ **ISO 45001 핵심 특징:**
• 근로자 안전 보건 위험 예방 및 관리
• 산업재해 예방 및 안전 문화 구축
• 법적 요구사항 준수 및 안전 성과 개선
• 근로자 참여 및 협의 강화

📊 **인증 효과:**
• 산업재해 감소: 평균 60%
• 안전 비용 절감: 평균 35%
• 근로자 만족도: 평균 40% 향상

📞 **상담 문의:** 010-9251-9743`,
    level3: `ISO 45001 안전보건경영시스템 인증에 대해 종합적으로 안내해드리겠습니다.

🛡️ **ISO 45001 인증 개요:**
• 국제표준화기구(ISO)가 제정한 안전보건경영시스템 국제표준
• 전 세계 근로자의 안전과 건강 보호를 위한 경영 도구
• 산업재해 예방 및 안전 문화 구축을 통한 지속가능한 성장

📋 **인증 절차 (16주):**
1. 위험성 평가 (4주): 안전보건 위험 요인 파악 및 평가
2. 시스템 구축 (6주): 안전보건 정책 수립 및 매뉴얼 작성
3. 운영 및 교육 (4주): 안전보건 절차 운영 및 직원 교육
4. 인증심사 (2주): 외부 인증기관 심사 및 인증서 발급

🏆 **인증 효과:**
• 안전 성과: 산업재해 60% 감소, 안전 사고 예방
• 비용 절감: 안전 비용 35% 절감, 보험료 절감 효과
• 조직 문화: 안전 문화 구축, 근로자 참여 증대

💰 **경제적 효과:**
• 산업재해 예방으로 연간 비용 절감 5천만원
• 안전보건 정부 지원금 활용 가능
• 대기업 협력사 등록 우대 및 입찰 가점

📞 **상담 문의:** 010-9251-9743`,
    level4: `ISO 45001 안전보건경영시스템 인증에 대해 전문적으로 안내해드리겠습니다.

🛡️ **ISO 45001:2018 표준 구조:**
• 10개 조항의 체계적 구성 (HLS 구조 적용)
• 근로자 참여 및 협의 강화
• 리더십 및 최고경영자 의지 표명
• 위험기반 사고 및 기회 관리

📋 **안전보건경영 핵심 요소:**
1. 안전보건 정책 수립 및 최고경영자 의지 표명
2. 위험성 평가 및 안전보건 위험 요인 관리
3. 법적 요구사항 및 기타 요구사항 파악
4. 안전보건 목표 및 세부목표 설정
5. 안전보건 프로그램 수립 및 실행

🏭 **업종별 안전보건 관리 포인트:**
• 제조업: 기계 안전, 화학물질 관리, 작업환경 개선
• 건설업: 추락 방지, 중장비 안전, 안전 교육 강화
• 서비스업: 근골격계 질환 예방, 스트레스 관리, 화재 안전
• IT업: VDT 증후군 예방, 전자파 관리, 정신건강 관리

🔍 **안전보건 성과 평가:**
• 안전보건 목표 달성도 측정 및 평가
• 안전보건 지표(KPI) 설정 및 모니터링
• 내부 안전보건 감사 실시 및 개선 기회 발굴
• 경영검토를 통한 지속적 개선

💡 **성공 전략:**
• 전 직원의 안전 의식 제고 및 안전 교육
• 근로자 참여 및 안전보건 위원회 운영
• 안전보건 문화 구축 및 안전 리더십 강화
• 협력업체 안전보건 관리 및 안전 파트너십

📞 **전문 상담:** 010-9251-9743`,
    level5: `ISO 45001 안전보건경영시스템 인증에 대해 전략적이고 종합적으로 안내해드리겠습니다.

🛡️ **ISO 45001:2018 전략적 안전보건경영:**
• 조직의 내외부 안전보건 이슈 분석 및 전략적 대응
• 이해관계자 요구사항 균형 및 안전보건 가치 창출
• 근로자 참여 및 협의를 통한 안전보건 문화 구축
• 디지털 기술을 활용한 스마트 안전보건 관리

📊 **안전보건경영 성숙도 모델:**
• Level 1: 법적 준수 (Compliance) - 안전보건 법규 준수
• Level 2: 시스템 구축 (System) - 안전보건경영시스템 운영
• Level 3: 성과 개선 (Performance) - 안전보건 성과 향상
• Level 4: 문화 혁신 (Culture) - 안전보건 문화 구축
• Level 5: 안전보건 리더십 (Safety Leadership)

🏭 **업종별 안전보건 전략:**
• 제조업: 스마트 안전 시스템, IoT 기반 위험 감지, 예측적 안전 관리
• 건설업: BIM 기반 안전 관리, 드론 활용 안전 점검, 가상현실 안전 교육
• 서비스업: 근로자 웰빙 프로그램, 정신건강 관리, 원격근무 안전보건
• IT업: 디지털 안전보건 플랫폼, AI 기반 위험 예측, 사이버 보안 연계

🔄 **통합 안전보건경영:**
• ISO 45001 + ISO 9001 + ISO 14001 통합 시스템
• ESG 경영과 안전보건 성과 연계
• 공급망 안전보건 관리 및 안전 파트너십
• 지속가능한 안전보건 투자 및 혁신

💰 **안전보건 투자 대비 효과:**
• 1년차: 산업재해 예방 및 안전 비용 절감 300%
• 2년차: 안전 문화 구축으로 생산성 향상 25%
• 3년차: 안전보건 브랜드 가치 상승 및 인재 유치
• 5년차: 글로벌 안전보건 표준 대응 및 지속가능한 성장

🌍 **글로벌 안전보건 트렌드:**
• 디지털 전환 시대의 새로운 안전보건 위험 관리
• 코로나19 이후 감염병 예방 및 건강 관리
• 기후변화와 안전보건 리스크 통합 관리
• 인공지능과 로봇 기술의 안전보건 적용

📞 **안전보건 전략 컨설팅:** 010-9251-9743`
  },

  // ESG 경영시스템
  'esg-management': {
    keyword: ['esg', '지속가능', '환경사회지배구조', '탄소중립', '사회적책임'],
    level1: '안녕하세요! ESG 경영시스템에 대해 문의해주셔서 감사합니다. 환경·사회·지배구조의 지속가능한 경영을 지원합니다.',
    level2: `ESG 경영시스템에 대해 상세히 안내해드리겠습니다.

🌱 **ESG 경영시스템 핵심 특징:**
• Environment: 환경 경영 및 탄소중립 실현
• Social: 사회적 책임 및 이해관계자 가치 창출
• Governance: 투명한 지배구조 및 윤리경영
• 지속가능한 성장 및 ESG 투자 유치

📊 **ESG 경영 효과:**
• ESG 투자 유치: 평균 30% 증가
• 브랜드 가치: 평균 25% 상승
• 리스크 관리: 평균 40% 개선

📞 **상담 문의:** 010-9251-9743`,
    level3: `ESG 경영시스템에 대해 종합적으로 안내해드리겠습니다.

🌱 **ESG 경영시스템 개요:**
• 환경(Environment), 사회(Social), 지배구조(Governance)를 통합한 경영 시스템
• 지속가능한 발전목표(SDGs) 달성 및 사회적 가치 창출
• 투자자, 고객, 직원, 지역사회 등 이해관계자 가치 극대화

📋 **ESG 구축 절차 (20주):**
1. ESG 현황 진단 (4주): ESG 성과 평가 및 개선 영역 도출
2. ESG 전략 수립 (6주): ESG 비전, 목표, 로드맵 설정
3. ESG 시스템 구축 (8주): ESG 관리 체계 및 프로세스 구축
4. ESG 성과 관리 (2주): ESG 성과 측정 및 보고서 작성

🏆 **ESG 경영 효과:**
• 환경 성과: 탄소 배출량 30% 감소, 에너지 효율 25% 향상
• 사회 성과: 직원 만족도 35% 향상, 지역사회 기여 확대
• 지배구조: 투명성 제고, 윤리경영 문화 구축

💰 **경제적 효과:**
• ESG 투자 유치 기회 확대
• 브랜드 가치 상승 및 고객 충성도 향상
• 리스크 관리 및 장기적 경쟁 우위 확보

📞 **상담 문의:** 010-9251-9743`,
    level4: `ESG 경영시스템에 대해 전문적으로 안내해드리겠습니다.

🌱 **ESG 경영시스템 구조:**
• Environment: 기후변화 대응, 자원순환, 생물다양성 보전
• Social: 인권 보호, 노동 관행, 지역사회 기여, 제품 책임
• Governance: 지배구조, 윤리경영, 리스크 관리, 투명성

📋 **ESG 핵심 관리 요소:**
1. ESG 거버넌스 구축 및 최고경영자 의지 표명
2. 중요성 평가 및 핵심 ESG 이슈 도출
3. ESG 전략 및 목표 설정
4. ESG 성과 관리 및 모니터링
5. 이해관계자 소통 및 ESG 공시

🏭 **업종별 ESG 관리 포인트:**
• 제조업: 탄소중립, 순환경제, 공급망 ESG 관리
• 금융업: 책임투자, ESG 금융, 금융포용성
• 서비스업: 디지털 포용, 데이터 보안, 고객 만족
• IT업: 디지털 격차 해소, 개인정보 보호, 기술 윤리

🔍 **ESG 성과 평가:**
• ESG 지표(KPI) 설정 및 성과 측정
• 국제 ESG 평가 기준 대응 (MSCI, DJSI, CDP 등)
• ESG 보고서 작성 및 공시
• 제3자 검증 및 신뢰성 제고

💡 **ESG 성공 전략:**
• 최고경영자의 ESG 리더십 및 조직 문화 변화
• 이해관계자 참여 및 소통 강화
• ESG 데이터 관리 및 디지털 전환
• 공급망 ESG 관리 및 파트너십 구축

📞 **전문 상담:** 010-9251-9743`,
    level5: `ESG 경영시스템에 대해 전략적이고 종합적으로 안내해드리겠습니다.

🌱 **ESG 경영시스템 전략적 접근:**
• 글로벌 ESG 규제 및 표준 대응 (EU 택소노미, CSRD, SEC 기후공시 등)
• 이해관계자 자본주의 및 장기적 가치 창출
• ESG 통합 비즈니스 모델 및 지속가능한 혁신
• 디지털 기술을 활용한 ESG 데이터 관리 및 투명성 제고

📊 **ESG 경영 성숙도 모델:**
• Level 1: 기본 준수 (Basic Compliance) - ESG 법규 준수
• Level 2: 시스템 구축 (System Building) - ESG 관리 체계 구축
• Level 3: 성과 개선 (Performance Improvement) - ESG 성과 향상
• Level 4: 전략 통합 (Strategic Integration) - ESG 전략 통합
• Level 5: 지속가능성 리더십 (Sustainability Leadership)

🏭 **업종별 ESG 전략:**
• 제조업: 넷제로 달성, 순환경제 전환, 공급망 탈탄소화
• 금융업: 그린 금융, 임팩트 투자, ESG 리스크 관리
• 서비스업: 사회적 가치 창출, 디지털 포용, 고객 중심 ESG
• IT업: 그린 IT, 디지털 윤리, 기술의 사회적 영향

🔄 **ESG 통합 관리 시스템:**
• ESG + ISO 14001 + ISO 45001 통합 시스템
• 지속가능성 보고 및 통합 보고서 작성
• ESG 데이터 관리 플랫폼 구축
• 블록체인 기반 ESG 투명성 제고

💰 **ESG 투자 대비 효과:**
• 1년차: ESG 시스템 구축 및 기초 성과 창출 150%
• 2년차: ESG 브랜드 가치 상승 및 고객 충성도 향상 200%
• 3년차: ESG 투자 유치 및 자본 비용 절감 25%
• 5년차: 지속가능한 경쟁 우위 및 장기적 가치 창출

🌍 **글로벌 ESG 트렌드:**
• 탄소중립 2050 및 RE100, SBTi 등 글로벌 이니셔티브
• EU 그린딜 및 미국 IRA 등 정책적 지원
• ESG 공시 의무화 및 투명성 요구 증대
• 임팩트 투자 및 지속가능 금융 확산

📞 **ESG 전략 컨설팅:** 010-9251-9743`
  }
};

// 🔍 질문 복잡도 및 답변 길이 결정 함수
function determineResponseLevel(message: string): number {
  const lowerMessage = message.toLowerCase();
  
  // 1단계: 단순한 인사말이나 기본 문의 (500자 미만)
  if (/^(안녕|hi|hello|처음|시작|간단히|짧게)/i.test(message) || message.length < 20) {
    return 1;
  }
  
  // 2단계: 단일 서비스 문의 (1000자 미만)
  if (/iso 9001|iso14001|iso45001|esg(?!.*\+)|품질경영|환경경영|안전보건/i.test(lowerMessage) && 
      !/\+|그리고|또한|동시에|통합|복합|전략|종합/i.test(lowerMessage)) {
    return 2;
  }
  
  // 3단계: 두 가지 서비스 영역 (1500자 미만)
  if (/(\+|그리고|또한|동시에)/i.test(lowerMessage) || 
      (lowerMessage.match(/iso|품질|환경|안전|esg/gi) || []).length >= 2) {
    return 3;
  }
  
  // 4단계: 복합적인 문의 (2000자 미만)
  if (/통합|복합|전체|모든|전략|계획|로드맵|단계별/i.test(lowerMessage) ||
      (lowerMessage.match(/iso|품질|환경|안전|esg|인증|관리|시스템/gi) || []).length >= 3) {
    return 4;
  }
  
  // 5단계: 매우 복합적이고 전략적인 문의 (2500자 미만)
  if (/전략적|종합적|다각적|글로벌|미래|혁신|디지털|변화|트렌드|성숙도|벤치마킹|최적화|경쟁우위/i.test(lowerMessage) ||
      message.length > 100) {
    return 5;
  }
  
  return 2; // 기본값
}

// 🎯 질문 유형 식별 함수
function identifyQuestionType(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // 인사말 패턴
  if (/^(안녕|안녕하세요|hi|hello|처음|시작)/i.test(message)) {
    return 'greeting';
  }
  
  // ISO 9001 품질경영시스템
  if (/iso 9001|iso9001|품질경영|품질관리|품질시스템|품질인증/i.test(lowerMessage)) {
    return 'iso-9001';
  }
  
  // ISO 14001 환경경영시스템
  if (/iso 14001|iso14001|환경경영|환경관리|환경시스템|환경인증/i.test(lowerMessage)) {
    return 'iso-14001';
  }
  
  // ISO 45001 안전보건경영시스템
  if (/iso 45001|iso45001|안전보건|안전관리|보건시스템|안전인증/i.test(lowerMessage)) {
    return 'iso-45001';
  }
  
  // ESG 경영시스템
  if (/esg|지속가능|환경사회지배구조|탄소중립|사회적책임/i.test(lowerMessage)) {
    return 'esg-management';
  }
  
  return 'general';
}

// 🎯 응답 생성 함수
function generateEsgResponse(message: string): { response: string; buttons?: Array<{ text: string; url: string; style: string; icon: string }> } {
  const questionType = identifyQuestionType(message);
  const responseLevel = determineResponseLevel(message);
  
  console.log(`🔍 질문 분석: 유형=${questionType}, 레벨=${responseLevel}, 메시지="${message}"`);
  
  let response = '';
  
  if (questionType === 'greeting') {
    response = ESG_CERTIFICATION_RESPONSES.greetings[0];
  } else if (ESG_CERTIFICATION_RESPONSES[questionType]) {
    const serviceData = ESG_CERTIFICATION_RESPONSES[questionType];
    
    // 레벨에 따른 응답 선택
    if (responseLevel === 1 && serviceData.level1) {
      response = serviceData.level1;
    } else if (responseLevel === 2 && serviceData.level2) {
      response = serviceData.level2;
    } else if (responseLevel === 3 && serviceData.level3) {
      response = serviceData.level3;
    } else if (responseLevel === 4 && serviceData.level4) {
      response = serviceData.level4;
    } else if (responseLevel === 5 && serviceData.level5) {
      response = serviceData.level5;
    } else {
      response = serviceData.level2 || serviceData.level1 || '죄송합니다. 해당 서비스에 대한 정보를 준비 중입니다.';
    }
  } else {
    response = `안녕하세요! ESG 인증원 선임심사원 이후경 경영지도사입니다.

문의해주신 내용에 대해 전문적인 상담을 제공해드리겠습니다.

🏆 **ESG 인증원 전문 서비스:**
• ISO 9001 (품질경영시스템)
• ISO 14001 (환경경영시스템)
• ISO 45001 (안전보건경영시스템)
• ESG 경영시스템 인증

구체적인 문의사항을 말씀해주시면 맞춤형 상담을 제공해드리겠습니다.

📞 **상담 문의:** 010-9251-9743`;
  }
  
  // 상담 버튼 생성
  const buttons = [
    {
      text: '📞 인증 상담',
      url: '/esg-certification/consultation',
          style: 'primary',
          icon: '📞'
        },
        {
      text: '🎯 ISO 진단',
      url: '/iso-diagnosis',
          style: 'secondary',
          icon: '🎯'
        }
  ];
  
  return { response, buttons };
}

interface ChatMessage {
  message: string;
  history?: Array<{
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }>;
}

export async function POST(request: NextRequest) {
  let body: ChatMessage | undefined;
  
  try {
    // request body를 한 번만 읽기
    body = await request.json();
    
    if (!body) {
      return NextResponse.json(
        { error: '요청 본문이 비어있습니다.' },
        { 
          status: 400,
          headers: getCorsHeaders()
        }
      );
    }

    const { message, history = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: '메시지가 비어있습니다.' },
        { 
          status: 400,
          headers: getCorsHeaders()
        }
      );
    }

    // ESG 인증원 이후경 선임심사원 응답 생성
    console.log('ESG 인증원 이후경 선임심사원 응답 생성 시작:', { messageLength: message.length });
    
    const esgResponse = generateEsgResponse(message);

    console.log('ESG 인증원 이후경 선임심사원 응답 완료:', { 
      responseLength: esgResponse.response.length,
      hasButtons: !!esgResponse.buttons
    });
    
    return NextResponse.json({
      response: esgResponse.response,
      buttons: esgResponse.buttons || [],
      source: 'esg_certification_response',
      timestamp: new Date().toISOString(),
      consultant: 'ESG 인증원 이후경 선임심사원',
      experience: '25년 현장 경험',
      timestamp_force_update: new Date().toISOString(),
      deployment_version: 'v0.1.2_final_fix'
    }, {
      headers: {
        ...getCorsHeaders(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('❌ 응답 생성 오류:', error);
    
    // body가 정의되지 않은 경우를 위한 안전장치
    const fallbackMessage = body?.message || '일반 상담';
    
    return NextResponse.json({
      response: generateEsgResponse(fallbackMessage).response,
      source: 'esg_certification_fallback',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
      timestamp: new Date().toISOString(),
      consultant: 'ESG 인증원 이후경 선임심사원'
    }, {
      headers: getCorsHeaders()
    });
  }
}

// GET 요청 처리 (헬스 체크)
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'ok',
              message: 'ESG 인증원 전문상담사 시스템이 정상 작동 중입니다.',
      consultant: 'ESG 인증원 이후경 선임심사원',
      experience: '25년 현장 경험',
      timestamp: new Date().toISOString(),
      services: [
        'ISO 9001 (품질경영시스템)',
        'ISO 14001 (환경경영시스템)',
        'ISO 45001 (안전보건경영시스템)',
        'ESG 경영시스템 인증'
      ]
    }, {
      headers: getCorsHeaders()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: '시스템 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, {
      status: 500,
      headers: getCorsHeaders()
    });
  }
}

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders()
  });
} 
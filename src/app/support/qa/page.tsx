'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react';

export default function QAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPersona, setSelectedPersona] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const qaData = {
    ceo: {
      title: '성장형 중소기업 CEO',
      icon: '🏆',
      questions: [
        {
          id: 'ceo-1',
          question: '매출 100억 기업이 500억으로 성장하기 위한 구체적인 전략은?',
          answer: 'BM ZEN 분석 기반 5단계 성장전략으로 실현 가능합니다! 1단계 현황진단(핵심역량+시장위치+재무구조 정밀분석), 2단계 성장동력 발굴(신사업 기회+M&A 타겟+글로벌 진출 가능성), 3단계 자금조달 최적화(정책자금 50억+민간투자 30억+IPO 준비), 4단계 조직혁신(AI 도입+성과관리+핵심인재 영입), 5단계 브랜드 가치 극대화(대기업 납품+인증 12개+온라인 채널 구축). D기업 성공사례: 매출 120억→480억(3년), 영업이익률 8%→15%, 기업가치 300억→1,200억 달성',
          service: 'BM ZEN 사업분석'
        }
      ]
    },
    growth: {
      title: '성장기 스타트업',
      icon: '🚀',
      questions: [
        {
          id: 'growth-1',
          question: '레이저솔드링 기술로 창업을 준비 중인데, 정부지원 로드맵을 알고 싶어요',
          answer: '실제 ABC기업이 동일 기술로 성공한 검증된 로드맵을 제공합니다! 4단계 성장 로드맵: 1단계(창업준비) 특허출원+예비벤처+디딤돌과제(1.7억원), 2단계(성장기) 벤처확인+기술개발+정책자금 공장설립(24.7억원), 3단계(확장기) TIPS선정+해외진출+VC투자(57억원), 4단계(IPO준비) 상장준비+글로벌확대(목표 120억 매출). 총 확보 실적: 87억원 | ROI: 2,174%',
          service: '기술사업화'
        },
        {
          id: 'growth-2',
          question: '우리 기술의 시장성과 사업성을 정확히 검증받고 싶어요',
          answer: 'BM ZEN 프레임워크로 과학적 검증을 제공합니다. 3단계 검증 프로세스: 가치발견(시장규모/경쟁분석/고객니즈 정밀분석), 가치창출(5년 재무계획/ROI/NPV/IRR 정밀계산), 가치제공(타겟시장 진입전략/매출예측 모델). K바이오텍 검증사례: 시장성 연 15% 성장시장 진입 확인, 수익성 3년 후 흑자전환, 5년 ROI 280%, 결과 80억원 확보(R&D 50억 + 시설 30억)',
          service: 'BM ZEN 사업분석'
        },
        {
          id: 'growth-3',
          question: '투자유치를 위해 어떤 준비가 필요한가요?',
          answer: '투자 단계별 맞춤 전략으로 성공률을 극대화합니다. Pre-A: 사업타당성 검증+MVP 개발(5천만~2억), Series A: 시장검증+팀빌딩+특허확보(5~20억), Series B: 매출성장+시장확대(20~100억), IPO 준비: 글로벌진출+상장준비(100억+). ABC기업 성공사례: TIPS 선정 15억원 투자유치, 기업가치 500억원 달성, 연매출 120억원 목표',
          service: '기술사업화'
        },
        {
          id: 'growth-4',
          question: '정부 R&D 과제 선정 확률을 높이려면?',
          answer: '25년 R&D 전문가의 선정 노하우를 전수합니다. R&D 선정 4대 핵심요소: 기술혁신성(특허 3건 이상+차별화 기술), 시장파급효과(시장규모 1조원 이상+성장성 15%), 사업화 가능성(구체적 매출계획+고객확보 전략), 팀 역량(기술/사업/마케팅 전문가 구성). ABC기업 R&D 확보실적: 총 15억원',
          service: '기술사업화'
        },
        {
          id: 'growth-5',
          question: '해외진출을 위한 준비와 지원방안은?',
          answer: '글로벌 진출 전략과 정부지원을 연계한 체계적 접근을 제공합니다. 해외진출 3단계 전략: 1단계 시장조사+현지화 전략+파트너 발굴, 2단계 해외시장진출지원사업+무역보험+현지법인 설립, 3단계 글로벌 브랜딩+현지 마케팅+판로확대. 지원프로그램: 해외시장진출지원 3억원, 글로벌강소기업 5년간 20억원 지원',
          service: '기술사업화'
        },
        {
          id: 'growth-6',
          question: 'AI를 활용한 스타트업 운영 효율화 방법은?',
          answer: '소수정예 스타트업의 AI 활용 성공사례를 바탕으로 맞춤형 솔루션을 제공합니다. AAA에너지관리IT기업 사례: 제안서 작성 시간 50% 단축으로 해외사업 확장 가속화, 루틴 업무 자동화 40% 향상으로 소수 인력 다중역할 수행, AI 도구 활용률 90% 이상 달성. 20주 집중 프로그램: 현황진단(2주)+AI도구선정(3주)+실무적용(16주)+성과측정(2주). 정부지원: AI바우처 2천만원+일터혁신컨설팅 100% 무료지원',
          service: 'AI 생산성향상'
        },
        {
          id: 'growth-7',
          question: '기술기반 스타트업의 특허전략과 IP 포트폴리오 구축 방법은?',
          answer: '기술스타트업의 핵심자산인 IP 전략을 체계적으로 구축합니다. IP 포트폴리오 5단계 전략: 1단계 핵심기술 특허맵 분석(경쟁사 특허+기술트렌드), 2단계 특허출원 전략(국내외 PCT+디자인+상표 동시진행), 3단계 특허방어 전략(회피설계+무효화 대응), 4단계 라이센싱 전략(기술이전+로열티 수익모델), 5단계 IP 가치평가(기술가치 100억원 인정). E바이오 스타트업 사례: 특허 15건 확보→기술가치 150억원 평가→Series A 50억원 투자유치 성공',
          service: '기술사업화'
        }
      ]
    },
    manufacturing: {
      title: '제조업 경영진',
      icon: '🏭',
      questions: [
        {
          id: 'mfg-1',
          question: '공장 확장을 위한 대규모 정책자금 확보가 가능한가요?',
          answer: 'H관광개발 100억원 확보 사례처럼 충분히 가능합니다! 대규모 정책자금 확보전략: 시설자금 50억원(공장건설/설비도입), 운영자금 30억원(원자재/인건비), 기술개발 20억원(R&D/특허). H관광개발 성공사례: 확보금액 100억원, 금리 연 1.8%(시중은행 대비 3.2%p 절감), 상환조건 5년 거치 10년 분할상환',
          service: '정책자금'
        },
        {
          id: 'mfg-2',
          question: '스마트팩토리 구축을 위한 지원방안은?',
          answer: '4차 산업혁명 대응 스마트팩토리 구축을 완벽 지원합니다. 스마트팩토리 4단계 구축: 1단계 현황진단+구축계획 수립, 2단계 IoT/AI 시스템 도입+자동화 설비, 3단계 데이터 통합관리+예측분석, 4단계 완전자율운영+최적화. 지원프로그램: 스마트제조혁신 15억원, 뿌리기업 고도화 10억원, AI바우처 2억원',
          service: 'AI 생산성향상'
        },
        {
          id: 'mfg-3',
          question: '환경규제 대응과 친환경 전환 지원은?',
          answer: 'ESG 경영과 탄소중립 대응을 위한 종합 솔루션을 제공합니다. 친환경 전환 3단계: 진단(탄소배출량 측정+ESG 현황분석), 전환(친환경 설비도입+재생에너지 전환), 인증(ISO 14001+탄소중립 인증). 지원방안: 그린뉴딜펀드 30억원, 친환경 시설자금 20억원(연 1.5%), 탄소중립 기술개발 10억원',
          service: '인증지원'
        },
        {
          id: 'mfg-4',
          question: '대기업 납품을 위한 인증과 품질관리는?',
          answer: '대기업 협력사 등록을 위한 체계적 인증 로드맵을 제공합니다. 대기업 납품 4단계 전략: 1단계 ISO 9001/14001/45001 통합인증, 2단계 벤처기업/이노비즈 인증, 3단계 품질경영시스템 고도화, 4단계 대기업 협력사 등록. ABC기업 성과: 12개 인증 획득, 대기업 3개사 협력사 등록, 납품단가 20% 상승',
          service: '인증지원'
        },
        {
          id: 'mfg-5',
          question: 'MZ세대가 많은 조직의 성과관리와 노무관리 문제는 어떻게 해결하나요?',
          answer: '일과 삶의 균형과 성과공유제도 도입으로 MZ세대 동기부여와 고몰입 조직을 구축합니다. MZ세대 조직관리 4대 전략: 일과 삶의 균형(유연근무제+재택근무+워케이션 도입), 성과공유제도(스톡옵션+성과급+이익공유제), 수평적 문화(직급 축소+호칭 통일+자율적 의사결정), 성장 지원(개인 커리어 개발+교육훈련+멘토링). L테크 성공사례: MZ세대 비율 70% 조직에서 성과공유제 도입, 1년 만에 이직률 80% 감소, 매출 50% 증가',
          service: 'BM ZEN 사업분석'
        },
        {
          id: 'mfg-6',
          question: '단순반복 직무가 많은 생산공장의 인사노무관리 문제는?',
          answer: '스마트공장 도입과 직무분석을 통한 직무급 도입으로 일터혁신을 실현합니다. 생산공장 일터혁신 5단계: 1단계 직무분석+업무 프로세스 재설계, 2단계 스마트공장 도입으로 단순업무 자동화, 3단계 직무급제 도입+숙련도별 임금체계, 4단계 다기능 교육+직무순환제 도입, 5단계 현장 혁신활동+제안제도 활성화. M제조 혁신사례: 스마트공장 도입 단순업무 60% 자동화, 직무급제 시행 평균 임금 35% 상승, 생산성 80% 향상, 품질불량률 5%→0.5% 감소',
          service: 'AI 생산성향상'
        },
        {
          id: 'mfg-7',
          question: '제조업 디지털 전환을 위한 MES/ERP 도입과 데이터 활용 전략은?',
          answer: '제조 현장의 완전한 디지털화로 생산성 200% 향상을 실현합니다. 제조 DX 4단계: 1단계 MES 도입(실시간 생산현황+품질관리+설비관리), 2단계 ERP 통합(생산-재고-회계 실시간 연동), 3단계 빅데이터 분석(불량예측+최적생산계획+예방정비), 4단계 AI 최적화(수요예측+자동발주+스마트 스케줄링). F전자부품 사례: MES/ERP 통합→납기준수율 99%달성, 재고회전율 300% 개선, 연간 10억원 비용절감',
          service: 'AI 생산성향상'
        },
        {
          id: 'mfg-8',
          question: '중소 제조업의 수출 경쟁력 강화와 해외인증 획득 방법은?',
          answer: '글로벌 시장 진출을 위한 체계적인 수출 전략과 인증을 지원합니다. 수출경쟁력 5단계: 1단계 CE/UL/FDA 등 해외인증 획득, 2단계 글로벌 품질시스템 구축(ISO+IATF16949), 3단계 수출바우처 활용(마케팅+전시회+바이어발굴), 4단계 FTA 활용전략(원산지증명+관세혜택), 5단계 현지법인 설립지원. G자동차부품사 성과: 해외인증 8개 획득→미국/유럽 진출→수출 비중 60% 달성, 매출 300% 성장',
          service: '인증지원'
        }
      ]
    },
    service: {
      title: '서비스업 소상공인',
      icon: '🏢',
      questions: [
        {
          id: 'svc-1',
          question: '온라인 매출을 늘리기 위한 종합 마케팅 전략은?',
          answer: '디지털 마케팅 통합 솔루션으로 매출 300% 증대를 실현합니다. 디지털 마케팅 5단계: 웹사이트(SEO 최적화+모바일 퍼스트), 콘텐츠(AI 기반 자동생성+블로그 운영), 소셜미디어(인스타그램/유튜브 마케팅), 광고(구글/네이버 키워드 광고), CRM(고객관리+재구매 유도). G제조업 성공사례: 온라인 주문 월 500건, 웹 매출 연 15억원',
          service: '웹사이트 구축'
        },
        {
          id: 'svc-2',
          question: '소상공인도 정부지원을 받을 수 있나요?',
          answer: '소상공인 맞춤형 지원프로그램으로 성장을 돕습니다. 소상공인 지원프로그램: 창업자금 5천만원(무담보/저금리), 경영개선 2천만원(컨설팅 포함), 디지털 전환 1천만원(온라인 진출), 마케팅 500만원(홍보/광고). 지원 조건: 상시근로자 10명 미만, 연매출 10억원 이하, 업력 3년 이상',
          service: '정책자금'
        },
        {
          id: 'svc-3',
          question: '직원 교육과 인재 확보 방안은?',
          answer: '인적자원 개발과 우수인재 확보를 위한 종합 솔루션을 제공합니다. 인재 확보 4단계 전략: 채용(잡코리아/사람인+헤드헌팅), 교육(직업훈련+외부교육 지원), 복지(4대보험+퇴직연금+복리후생), 성과관리(KPI 설정+인센티브 제도). 정부지원 활용: 청년채용 지원금 월 80만원, 직업훈련비 100% 지원',
          service: 'BM ZEN 사업분석'
        },
        {
          id: 'svc-4',
          question: '프랜차이즈 창업과 운영 노하우는?',
          answer: '프랜차이즈 성공을 위한 체계적 창업 가이드를 제공합니다. 프랜차이즈 성공 5단계: 브랜드 선택(시장분석+수익성 검토), 입지 선정(상권분석+임대료 협상), 자금 조달(창업자금+운영자금 확보), 운영 시스템(매뉴얼 숙지+직원교육), 마케팅(지역 맞춤형 홍보전략). 창업자금 지원: 소상공인 창업자금 5천만원',
          service: 'BM ZEN 사업분석'
        },
        {
          id: 'svc-5',
          question: '온라인 브랜드 마케팅과 웹사이트 구축은 어떻게 진행하나요?',
          answer: '전문적인 웹사이트 구축과 온라인 브랜드 마케팅으로 디지털 전환을 완성합니다. 온라인 브랜드 구축 5단계: 브랜드 전략(브랜드 아이덴티티+스토리텔링+차별화 포인트), 웹사이트 구축(반응형 디자인+SEO 최적화+전환율 최적화), 콘텐츠 마케팅(블로그+영상 콘텐츠+SNS 통합 운영), 온라인 광고(구글/네이버 검색광고+디스플레이+리타게팅), 성과 분석(구글 애널리틱스+전환 추적+ROI 분석). G제조업 웹사이트 구축 성공사례: 웹사이트 구축비 3,000만원, 연간 마케팅비 6,000만원, 1년차 ROI 1,667%(매출 15억원 달성)',
          service: '웹사이트 구축'
        },
        {
          id: 'svc-6',
          question: 'AI를 활용한 고객 상담 자동화는 어떻게 구현하나요?',
          answer: 'AI 챗봇과 자동화 시스템으로 24시간 고객 응대 체계를 구축합니다. AI 고객상담 자동화 4단계: 1단계 FAQ 분석+시나리오 설계, 2단계 AI 챗봇 구축+학습 데이터 투입, 3단계 멀티채널 연동(웹/카톡/인스타), 4단계 고도화+성과분석. 실제 도입효과: 상담 응답시간 90% 단축(4시간→24분), 고객만족도 35% 향상, 인건비 연 3,600만원 절감, 24시간 365일 응대 가능. 정부지원: AI바우처 2천만원+디지털전환 지원금 활용',
          service: 'AI 생산성향상'
        },
        {
          id: 'svc-7',
          question: '오프라인 매장의 O2O 전략과 배달/픽업 시스템 구축은?',
          answer: '온오프라인 통합 전략으로 매출채널을 다각화합니다. O2O 전환 5단계: 1단계 온라인 주문시스템 구축(자체앱+배달앱 연동), 2단계 픽업/배달 프로세스 최적화, 3단계 재고관리 통합시스템, 4단계 멤버십/포인트 통합운영, 5단계 데이터 기반 마케팅. H카페 프랜차이즈 사례: O2O 도입 후 온라인 매출 비중 45% 달성, 신규고객 300% 증가, 객단가 35% 상승',
          service: '웹사이트 구축'
        },
        {
          id: 'svc-8',
          question: '소상공인을 위한 간편한 세무/회계 관리와 정부지원 연계 방법은?',
          answer: '복잡한 세무회계를 간소화하고 정부지원을 최대한 활용합니다. 세무회계 간소화 4단계: 1단계 전자세금계산서 의무화 대응, 2단계 간편장부 앱 도입(자동입력+실시간 집계), 3단계 세액공제 최적화(연구개발+고용증대+투자세액), 4단계 정기 세무진단. 정부지원 연계: 소상공인 세무회계 지원 연 200만원, 일자리안정자금 활용, 4대보험료 감면혜택. I음식점 사례: 세무비용 50% 절감+정부지원 연 1,500만원 확보',
          service: '정책자금'
        }
      ]
    },
    policy: {
      title: '정책자금 특별상담',
      icon: '💰',
      questions: [
        {
          id: 'policy-1',
          question: '업종별 맞춤형 정책자금 종류와 조건은?',
          answer: '업종별 특성에 맞는 최적의 정책자금을 매칭해드립니다. 제조업: 시설자금 50억원(연 1.5%, 10년 상환), 운영자금 30억원(연 2.0%, 5년 상환). 서비스업: 창업자금 10억원(연 2.5%, 7년 상환), 디지털 전환 5억원(연 1.8%, 5년 상환). 기술기업: R&D 자금 100억원(연 1.0%, 7년 거치)',
          service: '정책자금'
        },
        {
          id: 'policy-2',
          question: '정책자금 신청부터 실행까지 전체 프로세스는?',
          answer: '정책자금 확보의 전 과정을 완벽 대행해드립니다. 정책자금 확보 8단계: 1.기업진단(재무상태+사업계획 분석), 2.자금매칭(최적 정책자금 선별), 3.서류준비(사업계획서+재무계획 작성), 4.신청접수, 5.심사대응, 6.승인협상, 7.자금집행, 8.사후관리. 소요기간: 평균 3-6개월',
          service: '정책자금'
        },
        {
          id: 'policy-3',
          question: '정책자금과 은행대출의 차이점과 장점은?',
          answer: '정책자금의 압도적 장점을 구체적 수치로 보여드립니다. 10억원 기준 비교: 정책자금(금리 연 1.5-2.5%, 담보 50% 이하, 상환 5년 거치 10년 분할, 총 이자비용 1.2억원) vs 시중은행(금리 연 4.5-6.5%, 담보 120% 이상, 상환 1년 거치 5년 분할, 총 이자비용 3.8억원). 절약효과: 2.6억원(68% 절감)',
          service: '정책자금'
        },
        {
          id: 'policy-4',
          question: '소규모 기업도 대규모 정책자금을 활용한 성공사례가 있나요?',
          answer: '작은 기업도 체계적인 전략으로 대규모 정책자금을 확보할 수 있습니다. H관광개발 100억원 확보 성공스토리: 기업 현황(설립 2015년, 직원 15명, 연매출 20억원), 5년간 단계별 확보전략으로 총 100억원 확보(시설자금 45억+운영자금 5억+특별자금 30억+그린뉴딜 20억). 성장 성과: 매출 20억→150억원(650% 성장), 직원 15명→120명(8배 증가), 지역경제 기여 연간 500억원. 성공 핵심: 단계별 성장전략+정책자금 연계+지속적 재투자',
          service: '정책자금'
        },
        {
          id: 'policy-5',
          question: '정책자금 활용 후 사후관리와 추가 지원 연계 방법은?',
          answer: '정책자금은 단발성이 아닌 지속적 성장지원 시스템입니다. 사후관리 5단계: 1단계 자금집행 모니터링(용도별 사용실적+증빙관리), 2단계 성과지표 관리(매출/고용/수출 달성도), 3단계 추가자금 연계(성과 기반 추가대출+연계지원사업), 4단계 경영컨설팅 지원(무료 경영진단+개선방안), 5단계 졸업기업 우대(금리인하+한도확대+신규사업 우선지원). J기업 연계사례: 1차 10억→성공→2차 30억→3차 50억 단계별 확보, 총 90억원으로 매출 500% 성장 달성',
          service: '정책자금'
        }
      ]
    },
    strategy: {
      title: '성장전략 컨설팅',
      icon: '🎯',
      questions: [
        {
          id: 'strategy-1',
          question: '매출 정체기 돌파를 위한 성장전략은?',
          answer: 'BM ZEN 분석으로 새로운 성장동력을 발굴합니다. 성장전략 4단계 분석: 현황진단(매출구조+수익성+경쟁력 분석), 문제발굴(성장 저해요인+기회요소 도출), 전략수립(신시장 진출+신제품 개발+채널 다각화), 실행계획(로드맵+투자계획+성과지표). J기업 성장사례: 매출 정체 3년→2년만에 200% 성장',
          service: 'BM ZEN 사업분석'
        },
        {
          id: 'strategy-2',
          question: '디지털 전환과 AI 도입 전략은?',
          answer: 'AI 시대에 맞는 디지털 혁신 로드맵을 제시합니다. AI 도입 4단계: 준비(데이터 수집+디지털 인프라 구축), 도입(업무자동화+AI 도구 활용), 확산(전사 AI 플랫폼+스마트 운영), 혁신(AI 기반 신사업+경쟁우위 확보). ABC기업 AI 성과: 생산성 120% 향상, 운영비 30% 절감, ROI 420% 달성',
          service: 'AI 생산성향상'
        },
        {
          id: 'strategy-3',
          question: '중견기업 도약을 위한 종합 성장전략은?',
          answer: '매출 100억 돌파를 위한 검증된 5단계 성장전략을 제공합니다. BM ZEN 기반 도약전략: 1단계 핵심역량 재정의(차별화 포인트 발굴), 2단계 시장확대 전략(신규시장 3개 진입), 3단계 조직혁신(AI 도입+성과관리체계), 4단계 자금조달 최적화(정책자금 30억+민간투자 20억), 5단계 브랜드 가치 제고(인증 12개+온라인 마케팅). K중견기업 성공사례: 매출 80억→150억(2년), 수익률 8%→18%, 직원 50명→85명, 기업가치 300억→500억 상승',
          service: 'BM ZEN 사업분석'
        }
      ]
    },
    comprehensive: {
      title: '종합 상담',
      icon: '🔄',
      questions: [
        {
          id: 'comp-1',
          question: '우리 회사에 가장 적합한 서비스 조합은?',
          answer: '기업 상황별 맞춤형 서비스 포트폴리오를 제안합니다. 창업기(설립 3년 이하): 기술사업화+정책자금+인증지원, 예상효과 자금 30억+세제혜택 5천만원. 성장기(설립 3-10년): 사업분석+AI생산성+웹사이트구축, 예상효과 매출 50% 증가+효율성 40% 향상. 성숙기(설립 10년 이상): 정책자금+인증지원+사업분석',
          service: '종합 컨설팅'
        },
        {
          id: 'comp-2',
          question: 'M-CENTER만의 차별화된 장점은?',
          answer: '25년 축적된 전문성과 검증된 성과가 차별점입니다. M-CENTER 5대 차별점: 1.검증된 성과(300건+ 성공사례, 95% 성공률), 2.원스톱 서비스(6대 핵심서비스 통합 제공), 3.전문가 네트워크(25년 경력+정부기관 인맥), 4.성과 보장(100% 성공 보장 시스템), 5.지속 지원. 고객 평균 성과: 자금 확보 평균 15억원, 매출 증가 평균 180%',
          service: '종합 컨설팅'
        }
      ]
    }
  };

  const allQuestions = Object.values(qaData).flatMap(persona => 
    persona.questions.map(q => ({ ...q, personaTitle: persona.title, personaIcon: persona.icon }))
  );

  const filteredQuestions = allQuestions.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPersona = selectedPersona === 'all' || 
      item.personaTitle === selectedPersona;
    
    return matchesSearch && matchesPersona;
  });

  const serviceColors: Record<string, string> = {
    '기술사업화': 'bg-blue-100 text-blue-800',
    'BM ZEN 사업분석': 'bg-green-100 text-green-800',
    '정책자금': 'bg-yellow-100 text-yellow-800',
    'AI 생산성향상': 'bg-purple-100 text-purple-800',
    '인증지원': 'bg-red-100 text-red-800',
    '웹사이트 구축': 'bg-indigo-100 text-indigo-800',
    '종합 컨설팅': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 히어로 섹션 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              M-CENTER 고객지원 Q&A
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              25년 전문가 경험을 바탕으로 한 실제 컨설팅 사례 기반 답변
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                📊 총 34개 실무 질문
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                👥 7개 페르소나별 맞춤
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
                🚀 6대 핵심서비스 연계
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8">
        {/* 검색 및 필터 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="질문이나 답변 내용으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedPersona === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedPersona('all')}
                  size="sm"
                >
                  전체
                </Button>
                {Object.entries(qaData).map(([key, persona]) => (
                  <Button
                    key={key}
                    variant={selectedPersona === persona.title ? 'default' : 'outline'}
                    onClick={() => setSelectedPersona(persona.title)}
                    size="sm"
                  >
                    {persona.icon} {persona.title}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Q&A 목록 */}
        <div className="space-y-4 mb-8">
          {filteredQuestions.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{item.personaIcon}</span>
                      <Badge variant="outline">{item.personaTitle}</Badge>
                      <Badge className={serviceColors[item.service] || 'bg-gray-100'}>
                        {item.service}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.question}
                    </h3>
                  </div>
                  <div className="ml-4">
                    {expandedItems.includes(item.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </CardHeader>
              {expandedItems.includes(item.id) && (
                <CardContent className="pt-0">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* 통계 정보 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Q&A 시스템 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">34개</div>
                <div className="text-sm text-gray-600">총 질문</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">7개</div>
                <div className="text-sm text-gray-600">페르소나</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">성공률</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">400%</div>
                <div className="text-sm text-gray-600">평균 ROI</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 상담 신청 */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              무료 상담 신청하기
            </h2>
            <p className="mb-6">
              25년 경력의 전문가가 직접 상담해드립니다
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                010-9251-9743
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Mail className="h-5 w-5" />
                hongik423@gmail.com
              </Button>
            </div>
            <div className="mt-6 text-sm">
              <p>🎁 무료 혜택: 기업진단 (30만원 상당) + 맞춤형 성장전략 (50만원 상당)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
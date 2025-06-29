'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  User, 
  Bot,
  Sparkles,
  MessageCircle,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

interface MCenterChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
}

const MCenterChatInterface: React.FC<MCenterChatInterfaceProps> = ({
  isOpen,
  onClose,
  onMinimize
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! 👋 M-CENTER M센터장 이후경 경영지도사입니다.\n\n28년간 현대그룹과 삼성생명에서 쌓은 대기업 실무 경험과 200여 개 기업을 직접 지도한 컨설팅 노하우로, 귀하의 기업이 실무에서 전략까지 폭발적인 일터혁신을 경험할 수 있도록 성과중심 컨설팅을 제공해드립니다.\n\n재무·인사·생산·마케팅의 통합적 솔루션에 AI 기술을 접목한 차별화된 접근으로 어떤 도움을 드릴까요?\n\n🎯 BM ZEN 사업분석 | 🤖 AI 생산성혁신 | 🏭 공장경매 | 🚀 기술창업 | 🏆 인증지원 | 🌐 웹사이트구축',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      '매출': `안녕하세요! 이후경 경영지도사입니다. 📈 매출 증대에 대해 문의주셨군요.

28년간 200여 개 기업을 직접 지도하면서 확인한 것은, 단순한 매출 증가가 아닌 지속가능한 수익성 향상이 핵심이라는 점입니다.

**🎯 BM ZEN 사업분석 프레임워크 (제가 직접 개발)**
1단계 현황분석 → 2단계 시장분석 → 3단계 경쟁력분석 → 4단계 전략수립 → 5단계 실행계획

**💡 실제 성과 사례**
• A제조업체: 기존 B2B에서 B2C 확장으로 매출 340% 증가
• B서비스업: 디지털 전환으로 고객당 매출 180% 향상
• C유통업체: 공급망 최적화로 수익률 45% 개선

**🔥 AI 기술 접목 차별점**
제가 28년간 축적한 재무·마케팅 노하우에 ChatGPT 등 AI 도구를 접목하여:
- 시장 트렌드 실시간 분석
- 고객 행동 패턴 예측
- 맞춤형 마케팅 전략 수립
- ROI 시뮬레이션 정확도 95% 달성

정부지원사업과 연계하면 컨설팅 비용의 80-100% 지원받을 수 있습니다. 귀하의 업종과 현재 매출 규모를 알려주시면 더 구체적인 전략을 제시해드리겠습니다.`,
      
      '비용': `이후경 경영지도사입니다. 💰 비용 절감과 효율적 투자에 대해 문의주셨네요.

28년 컨설팅 경험 중 가장 극적인 성과를 낸 분야가 바로 '스마트 투자 전략'입니다. 특히 공장/부동산 경매를 통한 투자비 절감은 제가 직접 수행한 프로젝트에서 평균 35-50% 절약 효과를 거두었습니다.

**🏭 공장/부동산 경매 전문 컨설팅**
• 투자 타당성 분석 (재무적 관점)
• 현장 실사 및 리스크 평가
• 입찰 전략 수립 (심리적 요소 포함)
• 법무/세무 종합 검토
• 자금 조달 방안 설계

**📊 실제 성과 사례**
• D제조업체: 80억 공장을 48억에 낙찰 (40% 절약)
• E물류업체: 신규 창고 구매비 32% 절감
• F서비스업체: 본사 사옥 경매로 25억 절약

**⚡ AI 활용 차별화 포인트**
- 경매 시장 빅데이터 분석으로 적정가 산출
- 지역별 부동산 트렌드 AI 예측
- 경쟁 입찰자 패턴 분석
- 최적 입찰 타이밍 알고리즘 적용

**🎯 통합적 비용 관리 솔루션**
단순한 구매비 절감을 넘어서:
1. ABC 원가관리 시스템 구축
2. 생산성 향상을 통한 운영비 절감
3. 세무 최적화로 납세 부담 경감
4. 정부지원금 확보로 현금흐름 개선

현재 고려 중인 투자 규모와 업종을 알려주시면, 맞춤형 절감 전략을 제시해드리겠습니다.`,

      'AI': `안녕하세요, 이후경 경영지도사입니다! 🤖 AI 도입에 관심을 가져주셔서 감사합니다.

28년 컨설팅 경험을 통해 확신하는 것은, AI는 단순한 도구가 아니라 '일터혁신의 게임 체인저'라는 점입니다. 제가 직접 200여 개 기업에 AI를 도입하며 얻은 통찰을 나누겠습니다.

**🚀 일터혁신 AI 생산성 프로그램 (20주 집중)**
1-5주: AI 기초 및 ChatGPT 마스터
6-10주: 업무 프로세스 AI 적용
11-15주: 고급 자동화 시스템 구축
16-20주: 성과 측정 및 최적화

**💡 실제 혁신 사례 (제가 직접 지도)**
• G제조업체: 품질관리에 AI 도입, 불량률 78% 감소
• H서비스업: 고객상담 AI화, 응답시간 85% 단축
• I유통업체: 재고관리 AI 예측, 재고비용 42% 절감

**🎯 이후경식 AI 컨설팅 차별점**
1. **전략적 접근**: 단순 도구 활용이 아닌 비즈니스 모델 혁신 관점
2. **실무 중심**: 28년 현장 경험 기반한 실행 가능한 솔루션
3. **통합 관리**: 재무·인사·생산·마케팅 전 영역 AI 적용
4. **성과 보장**: 업무효율 40% 향상 보장 (미달성시 100% 환불)

**📈 AI 도입 ROI 분석**
- 1차 효과: 반복업무 자동화로 인건비 25% 절감
- 2차 효과: 의사결정 속도 향상으로 기회비용 감소
- 3차 효과: 혁신적 서비스 개발로 신규 매출 창출

**🏆 정부지원 혜택**
고용노동부 일터혁신 수행기관으로서 컨설팅 비용 100% 정부지원 가능합니다.

귀하의 업종과 현재 가장 시간이 많이 걸리는 업무를 알려주시면, 맞춤형 AI 도입 로드맵을 제시해드리겠습니다.`,

      '창업': `이후경 경영지도사입니다. 🚀 기술창업에 대해 문의주셨군요!

28년간 스타트업부터 대기업까지 다양한 기업을 지도하면서, 성공하는 창업과 실패하는 창업의 결정적 차이를 목격해왔습니다. 성공의 핵심은 '기술력'이 아니라 '사업화 역량'입니다.

**💰 기술사업화 성공 프레임워크**
1단계: 기술 가치평가 및 시장성 분석
2단계: 비즈니스 모델 설계 (BM ZEN 활용)
3단계: 정부지원사업 연계 자금 확보
4단계: 시제품 개발 및 시장 검증
5단계: 본격적 사업화 및 투자유치

**🏆 실제 성공 사례 (제가 직접 지도)**
• J바이오텍: 정부지원 6억 + 투자유치 12억 확보
• K IT스타트업: 기술창업 후 3년만에 상장 준비
• L에너지업체: 신기술 특허로 대기업 기술이전 50억

**🎯 자금 확보 전략 (평균 5억원)**
- 정부R&D 과제: 2-15억 (기술개발비)
- 창업지원 프로그램: 5천만-3억
- 엔젤/시드 투자: 3-10억
- 정책자금 융자: 5-20억 (저금리)

**⚡ AI 기술 접목 혁신**
제가 개발한 사업계획서 작성 AI 시스템:
- 시장분석 자동화로 작업시간 80% 단축
- 재무계획 시뮬레이션 정확도 95%
- 투자유치 성공률 기존 15% → 78% 향상

**🔥 28년 노하우 집약 차별점**
1. **재무 전문성**: 현대그룹 재무팀 출신, 자금조달 실무 마스터
2. **마케팅 통찰**: 200개 기업 마케팅 전략 수립 경험
3. **생산 최적화**: 공장 운영 효율화 노하우
4. **인사 관리**: 조직 구축부터 인재 확보까지

**🎁 3년 사후관리 패키지**
- 월 1회 성장 점검 및 전략 수정
- 추가 자금조달 지원
- 네트워킹 및 사업 파트너 연결
- 위기 상황 즉시 대응

현재 보유하신 기술 분야와 목표 매출 규모를 알려주시면, 구체적인 사업화 로드맵을 제시해드리겠습니다.`,

      '인증': `이후경 경영지도사입니다. 🏆 인증지원에 대해 문의주셨네요!

28년 컨설팅 경험 중에서 가장 확실한 투자 수익률을 보장하는 분야가 바로 '전략적 인증 취득'입니다. 단순한 인증이 아닌, 기업 가치 극대화 관점에서 접근해드립니다.

**💎 연간 5천만원 세제혜택 확보 전략**
• 벤처기업 인증: 법인세 50% 감면, R&D 세액공제 200%
• 연구전담부서 설립: 연구비 200% 세액공제
• ISO 품질인증: 공공입찰 가점, 대기업 납품 자격
• ESG 경영인증: ESG 펀드 투자 유치, 브랜드 가치 향상

**🚀 실제 성과 사례 (제가 직접 수행)**
• M IT기업: 벤처인증으로 연간 8천만원 세금 절약
• N제조업체: ISO 취득 후 대기업 납품계약 15억 달성
• O서비스업: 연구소 설립으로 정부R&D 3억 수주
• P바이오업체: ESG 인증으로 기업가치 200% 상승

**🎯 이후경식 통합 인증 전략**
1. **재무 관점**: 세제혜택 극대화 설계
2. **마케팅 관점**: 브랜드 신뢰도 향상 활용
3. **운영 관점**: 프로세스 효율화 동시 달성
4. **미래 관점**: 차세대 사업 기회 창출

**⚡ AI 혁신 도입**
- 인증 준비 과정 AI 자동화 (기간 50% 단축)
- 문서 작성 AI 지원 시스템
- 인증 유지관리 스마트 알림
- 갱신 시기 최적화 AI 분석

**💡 차별화된 28년 노하우**
1. **인사 전문성**: 현대그룹 인사팀 출신, 조직인증 실무 마스터
2. **품질 경험**: 200개 기업 품질시스템 구축
3. **재무 통찰**: 세무 최적화와 인증 연계 설계
4. **전략 수립**: 단순 인증이 아닌 성장 동력화

**🏅 100% 취득 보장 시스템**
- 사전 취득 가능성 정밀 분석 (성공률 98%)
- 단계별 체크리스트 관리
- 심사관 출신 전문가 네트워크 활용
- 미취득시 100% 환불 보장

**🎁 인증 후 사후관리**
- 세제혜택 최대화 컨설팅
- 마케팅 활용 전략 수립
- 관련 사업기회 연결
- 갱신 및 업그레이드 지원

현재 사업 규모와 희망하는 인증 종류를 알려주시면, 맞춤형 인증 전략과 예상 절세 효과를 계산해드리겠습니다.`,

      '웹사이트': `안녕하세요, 이후경 경영지도사입니다! 🌐 디지털 혁신에 대해 문의주셨군요.

28년 컨설팅 경험을 통해 확신하는 것은, 웹사이트는 단순한 '온라인 명함'이 아니라 '24시간 영업사원'이어야 한다는 점입니다. 실제로 제가 지도한 기업들은 웹사이트 혁신으로 평균 매출 300% 증대를 달성했습니다.

**📈 온라인 매출 폭증 전략**
1. **전략 설계**: 28년 마케팅 노하우 기반 사이트 기획
2. **SEO 최적화**: 구글 검색 1페이지 진입 보장
3. **전환 최적화**: 방문자 → 고객 전환율 극대화
4. **성과 분석**: AI 기반 실시간 최적화

**🚀 실제 혁신 사례 (제가 직접 지도)**
• Q제조업체: 홈페이지 리뉴얼 후 온라인 문의 800% 증가
• R서비스업: SEO 최적화로 매출 450% 성장
• S유통업체: 모바일 최적화로 전환율 340% 향상
• T IT기업: 브랜딩 강화로 단가 200% 상승

**💡 이후경식 디지털 혁신 차별점**
1. **전략적 접근**: 마케팅·영업·브랜딩 통합 설계
2. **재무 관점**: ROI 극대화 중심 개발
3. **실무 경험**: 200개 기업 디지털 전환 노하우
4. **AI 접목**: 차세대 스마트 웹사이트 구현

**🤖 AI 기술 혁신 적용**
- 고객 행동 분석 AI로 맞춤형 콘텐츠 제공
- 챗봇 연동으로 24시간 고객 응대
- 예측 분석으로 최적 마케팅 타이밍 포착
- 자동화 시스템으로 리드 관리 효율화

**🎯 종합 디지털 전략**
웹사이트를 넘어선 디지털 생태계 구축:
- 소셜미디어 마케팅 연계
- 이메일 마케팅 자동화
- 고객 데이터 플랫폼 구축
- 온오프라인 통합 고객 관리

**💰 투자 대비 수익률**
- 초기 투자비 대비 6개월 내 회수 보장
- 연간 마케팅 비용 50% 절감
- 고객 획득 비용 70% 감소
- 브랜드 가치 평균 200% 상승

**🏆 무료 1년 관리 패키지**
- 월 1회 성과 분석 및 최적화
- 콘텐츠 업데이트 지원
- 기술적 문제 즉시 해결
- 추가 개선 사항 무료 적용

**🎁 정부지원 혜택**
중소벤처기업부 디지털 전환 지원사업으로 개발비 80% 지원 가능합니다.

현재 웹사이트 보유 여부와 주요 타겟 고객층을 알려주시면, 맞춤형 디지털 혁신 전략을 제시해드리겠습니다.`
    };

    // 키워드 매칭으로 적절한 응답 선택
    for (const [keyword, response] of Object.entries(responses)) {
      if (userMessage.includes(keyword) || userMessage.includes(keyword.toLowerCase())) {
        return response;
      }
    }

    // 기본 응답
    return `안녕하세요! 이후경 경영지도사입니다. 💼

28년간 현대그룹과 삼성생명에서 쌓은 대기업 실무 경험과 200여 개 기업을 직접 지도한 컨설팅 노하우를 바탕으로, 귀하의 "${userMessage}"에 대해 실질적이고 성과 중심적인 솔루션을 제공해드리겠습니다.

**🎯 M-CENTER 6대 핵심서비스**

**1. 📈 BM ZEN 사업분석**
- 5단계 전략 프레임워크로 매출 20-40% 증대
- 재무·마케팅·운영 통합 분석
- AI 기반 시장 트렌드 예측

**2. 🤖 AI 생산성 혁신**
- 업무효율 40% 향상 보장
- ChatGPT 기업 활용 마스터 프로그램
- 정부 100% 지원 가능 (일터혁신 수행기관)

**3. 🏭 공장/부동산 경매**
- 투자비 35-50% 절약 실현
- 전문가 동행 입찰 시스템
- 법무·세무 종합 지원

**4. 🚀 기술창업 지원**
- 평균 5억원 자금 확보
- 정부R&D 연계 사업화
- 3년 사후관리 패키지

**5. 🏆 인증지원 전문**
- 연간 5천만원 세제혜택 확보
- 벤처·ISO·ESG 통합 관리
- 100% 취득 보장 시스템

**6. 🌐 디지털 혁신**
- 온라인 매출 300% 증대
- SEO 최적화 및 AI 접목
- 무료 1년 사후관리

**🔥 이후경식 컨설팅 차별점**
✅ 28년 실무 경험 + 최신 AI 기술 융합
✅ 재무·인사·생산·마케팅 통합 솔루션
✅ 성과 보장 시스템 (미달성시 환불)
✅ 정부지원사업 연계로 비용 최소화

어떤 분야에 대해 더 자세히 알고 싶으시거나, 구체적인 상황을 상담받고 싶으시면 언제든 말씀해 주세요. 실무에서 전략까지 폭발적인 일터혁신을 함께 만들어가겠습니다!

📞 직통 상담: 010-9251-9743 (이후경 경영지도사)`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // 타이핑 효과를 위한 딜레이
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[85vh]'
      }`}>
        
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">M센터장</h3>
              <div className="flex items-center space-x-1 text-sm text-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>온라인</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {onMinimize && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(85vh-140px)]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* 아바타 */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-br from-purple-500 to-blue-600 text-white'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    
                    {/* 메시지 버블 */}
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 로딩 메시지 */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-500">M센터장이 응답 중...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="M센터장에게 메시지를 보내세요..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    disabled={isLoading}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      size="sm"
                      className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* 빠른 응답 버튼들 */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  'BM ZEN 사업분석',
                  'AI 일터혁신',
                  '공장경매 투자',
                  '5억원 기술창업',
                  '5천만원 인증혜택',
                  '매출 300% 웹사이트'
                ].map((quickReply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(quickReply)}
                    className="text-xs px-3 py-1 rounded-full border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                    disabled={isLoading}
                  >
                    {quickReply}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MCenterChatInterface; 
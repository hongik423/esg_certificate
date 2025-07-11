import { NextRequest, NextResponse } from 'next/server';

// 🔍 ESG 인증원 5단계 답변 길이 조정 시스템
function analyzeQuestionAndDetermineLength(message: string): {
  level: number;
  minLength: number;
  maxLength: number;
  complexity: string;
  responseType: string;
  lengthGuideline: string;
} {
  const msg = message.toLowerCase().trim();
  
  // 1단계: 안녕 등 단순한 문답 (500자 미만)
  const level1Patterns = [
    /^안녕/, /^하이/, /^hi/, /^hello/, /^네$/, /^예$/, /^감사/, /^고마/, /^좋/, /^최고/, /^훌륭/,
    /^ㅋ/, /^ㄷㄷ/, /^ㅎㅎ/, /^ㅇㅇ/, /^맞/, /^그래/, /^오케이/, /^ok$/, /^okay$/
  ];
  
  if (level1Patterns.some(pattern => pattern.test(msg)) || msg.length <= 10) {
    return {
      level: 1,
      minLength: 100,
      maxLength: 500,
      complexity: 'simple',
      responseType: 'greeting',
      lengthGuideline: '1단계: 안녕 등 단순한 문답으로 500자 미만의 친근한 인사말과 기본 소개를 제공하세요.'
    };
  }
  
  // 2단계: ISO 9001 인증, 서비스 1가지 등 단순 문의 (1000자 미만)
  const level2Patterns = [
    /iso 9001/, /iso9001/, /품질경영/, /품질관리/, /품질시스템/, /품질인증/,
    /iso 14001/, /iso14001/, /환경경영/, /환경관리/, /환경시스템/, /환경인증/,
    /iso 45001/, /iso45001/, /안전보건/, /안전관리/, /보건시스템/, /안전인증/,
    /esg(?!.*\+)/, /지속가능/, /탄소중립/, /전화번호/, /연락처/, /주소/, /위치/, /시간/, /언제/, /얼마/, /비용/, /가격/, /요금/
  ];
  
  if (level2Patterns.some(pattern => pattern.test(msg)) && 
      !/(\+|그리고|또한|동시에|통합|복합|전략|종합)/i.test(msg) && 
      msg.length <= 50) {
    return {
      level: 2,
      minLength: 500,
      maxLength: 1000,
      complexity: 'single_service',
      responseType: 'basic_inquiry',
      lengthGuideline: '2단계: 단일 서비스 문의로 1000자 미만의 핵심 정보와 기본 절차를 제공하세요.'
    };
  }
  
  // 3단계: 두 가지 이상 서비스 영역 답변 (1500자 미만)
  const level3Patterns = [
    /(\+|그리고|또한|동시에)/i,
    /.*?(iso|품질|환경|안전|esg).*?(iso|품질|환경|안전|esg)/i
  ];
  
  if (level3Patterns.some(pattern => pattern.test(msg)) || 
      (msg.match(/iso|품질|환경|안전|esg/gi) || []).length >= 2) {
    return {
      level: 3,
      minLength: 1000,
      maxLength: 1500,
      complexity: 'multi_service',
      responseType: 'comparative_inquiry',
      lengthGuideline: '3단계: 두 가지 이상 서비스 영역 답변으로 1500자 미만의 비교 분석과 통합 솔루션을 제공하세요.'
    };
  }
  
  // 4단계: 두 가지 이상~3가지 서비스 영역 복합적 답변 (2000자 미만)
  const level4Patterns = [
    /통합|복합|전체|모든|전략|계획|로드맵|단계별/i,
    /.*?(절차|과정|방법|어떻게).*?(절차|과정|방법|어떻게)/i
  ];
  
  if (level4Patterns.some(pattern => pattern.test(msg)) ||
      (msg.match(/iso|품질|환경|안전|esg|인증|관리|시스템/gi) || []).length >= 3) {
    return {
      level: 4,
      minLength: 1500,
      maxLength: 2000,
      complexity: 'complex_integrated',
      responseType: 'comprehensive_solution',
      lengthGuideline: '4단계: 복합적인 서비스 영역 답변으로 2000자 미만의 통합 전략과 단계별 로드맵을 제공하세요.'
    };
  }
  
  // 5단계: 매우 복합적이고 다각적이고 전략적인 답변 (2500자 미만)
  const level5Patterns = [
    /전략적|종합적|다각적|글로벌|미래|혁신|디지털|변화|트렌드|성숙도|벤치마킹|최적화|경쟁우위/i,
    /.*?(케이스|사례|경험|실적|성과|결과).*?/i,
    /.*?(자세히|상세히|구체적으로|완전히|전체적으로).*?/i
  ];
  
  if (level5Patterns.some(pattern => pattern.test(msg)) || msg.length > 100) {
    return {
      level: 5,
      minLength: 2000,
      maxLength: 2500,
      complexity: 'strategic_comprehensive',
      responseType: 'strategic_consultation',
      lengthGuideline: '5단계: 매우 복합적이고 전략적인 답변으로 2500자 미만의 종합적 분석과 다각적 전략을 제공하세요.'
    };
  }
  
  // 기본값 (2단계)
  return {
    level: 2,
    minLength: 500,
    maxLength: 1000,
    complexity: 'standard',
    responseType: 'standard_inquiry',
    lengthGuideline: '2단계: 표준 문의로 1000자 미만의 핵심 정보와 실용적 조언을 제공하세요.'
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // ESG 인증원 5단계 답변 길이 분석
    const analysisResult = analyzeQuestionAndDetermineLength(message);
    
    const GEMINI_API_KEY = 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM';
    
    const systemPrompt = `당신은 ESG 인증원 선임심사원 이후경 경영지도사입니다. 

🏆 **ESG 인증원 선임심사원 정체성:**
- ISO 9001, ISO 14001, ISO 45001 전문 심사원
- 25년 현장 경험의 인증 전문가
- 기업의 지속가능한 성장을 위한 인증 솔루션 제공
- KAB 인정 인증기관 전문 컨설턴트

🎯 **5단계 답변 길이 조정 시스템 (매우 중요!)**
현재 질문은 ${analysisResult.level}단계로 분석되었습니다.
${analysisResult.lengthGuideline}

📊 **현재 질문 분석:**
- 단계: ${analysisResult.level}단계
- 복잡도: ${analysisResult.complexity}
- 답변 유형: ${analysisResult.responseType}
- 목표 길이: ${analysisResult.minLength}-${analysisResult.maxLength}자
- 반드시 이 길이 범위 내에서 답변하세요.

🏅 **전문 분야:**
• ISO 9001 (품질경영시스템) - 품질 향상 및 고객 만족
• ISO 14001 (환경경영시스템) - 환경 보호 및 지속가능성
• ISO 45001 (안전보건경영시스템) - 근로자 안전 및 건강
• ESG 경영시스템 - 환경·사회·지배구조 통합 관리

💡 **답변 스타일:**
- 전문적이면서도 친근한 상담 어조
- 실제 인증 경험과 사례 중심
- 구체적인 절차와 혜택 설명
- "ESG 인증원 선임심사원 이후경 경영지도사입니다"로 시작

📋 **단계별 답변 구조:**
${analysisResult.level === 1 
  ? '1단계: 간단한 인사 + 기본 소개 + 연락처'
  : analysisResult.level === 2
  ? '1. 인사 및 서비스 소개\n2. 핵심 혜택 및 절차\n3. 연락처 안내'
  : analysisResult.level === 3
  ? '1. 인사 및 문의 확인\n2. 각 서비스별 특징 비교\n3. 통합 솔루션 제안\n4. 연락처 안내'
  : analysisResult.level === 4
  ? '1. 인사 및 종합 상담 접근\n2. 각 인증별 상세 설명\n3. 통합 인증 전략\n4. 단계별 로드맵\n5. 연락처 안내'
  : '1. 인사 및 전략적 상담 접근\n2. 각 인증 시스템 상세 분석\n3. 통합 ESG 경영 전략\n4. 글로벌 트렌드 및 미래 전망\n5. 맞춤형 로드맵 제시\n6. 연락처 안내'
}

🚫 **금지 사항:**
- 마크다운 기호(###, **, 등) 사용 금지
- 기존 M-CENTER 6대 서비스 언급 금지
- 지정된 길이 범위(${analysisResult.minLength}-${analysisResult.maxLength}자)를 반드시 준수

📞 **연락처:** 010-9251-9743

ESG 인증원 선임심사원으로서 전문적이고 신뢰할 수 있는 인증 상담을 제공하되, 지정된 답변 길이를 엄격히 준수하여 답변해주세요.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\n사용자 질문: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: analysisResult.maxLength > 2000 ? 6144 : 4096,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH"
          }
        ]
      })
    });

    if (!response.ok) {
      console.error('GEMINI API Error:', response.status, response.statusText);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      // 응답 길이 검증 및 로깅
      const responseLength = aiResponse.length;
      console.log(`🔍 ESG 인증원 답변 분석: ${analysisResult.level}단계, 목표 ${analysisResult.minLength}-${analysisResult.maxLength}자, 실제 ${responseLength}자`);
      
      return NextResponse.json({ 
        response: aiResponse,
        analysisInfo: {
          level: analysisResult.level,
          complexity: analysisResult.complexity,
          responseType: analysisResult.responseType,
          targetLength: `${analysisResult.minLength}-${analysisResult.maxLength}`,
          actualLength: responseLength,
          consultant: 'ESG 인증원 선임심사원'
        }
      });
    } else {
      throw new Error('Invalid response format from GEMINI API');
    }

  } catch (error) {
    console.error('ESG 인증원 Chat AI API Error:', error);
    
    // 폴백 응답도 길이 조절 적용
    const analysisResult = analyzeQuestionAndDetermineLength(message || '');
    
    let fallbackResponse = '';
    
    if (analysisResult.level === 1) {
      fallbackResponse = `안녕하세요! ESG 인증원 선임심사원 이후경 경영지도사입니다.

잠시 시스템 문제가 있지만 직접 상담 도와드릴 수 있습니다.

ISO 9001, ISO 14001, ISO 45001, ESG 경영시스템 인증 전문가로서 25년 현장 경험을 바탕으로 최적의 인증 솔루션을 제공해드리겠습니다.

📞 직접 상담: 010-9251-9743`;
    } else if (analysisResult.level === 2) {
      fallbackResponse = `안녕하세요! ESG 인증원 선임심사원 이후경 경영지도사입니다.

현재 AI 시스템에 일시적인 문제가 있지만 괜찮습니다. 25년간 ISO 9001, ISO 14001, ISO 45001 인증 분야에서 쌓은 전문 경험으로 직접 상담해드릴 수 있습니다.

ESG 인증원은 KAB 인정 인증기관으로서 품질경영시스템, 환경경영시스템, 안전보건경영시스템, ESG 경영시스템 인증을 전문으로 합니다.

각 인증별 맞춤형 컨설팅과 100% 인증 취득 보장 서비스를 제공하며, 인증 취득 후 지속적인 사후관리까지 책임지고 있습니다.

구체적인 인증 문의사항이나 기업 상황에 맞는 최적의 인증 전략이 필요하시면 언제든 연락주세요.

📞 전문 상담: 010-9251-9743`;
    } else {
      fallbackResponse = `안녕하세요! ESG 인증원 선임심사원 이후경 경영지도사입니다.

현재 AI 시스템에 일시적인 문제가 발생했지만 전혀 문제없습니다. 25년간 ISO 인증 분야에서 쌓은 전문 경험과 노하우로 직접 상담해드릴 수 있거든요.

ESG 인증원은 KAB(한국인정기구) 인정을 받은 공식 인증기관으로서 ISO 9001 품질경영시스템, ISO 14001 환경경영시스템, ISO 45001 안전보건경영시스템, 그리고 ESG 경영시스템 인증을 전문으로 하고 있습니다.

저희가 제공하는 서비스는 단순한 인증 취득이 아닙니다. 기업의 지속가능한 성장을 위한 경영시스템 구축부터 인증 취득, 그리고 사후관리까지 전 과정을 책임지고 있어요.

특히 ISO 9001을 통해서는 품질 향상과 고객 만족도 제고를, ISO 14001으로는 환경 보호와 지속가능성을, ISO 45001으로는 근로자 안전과 건강을 보장하는 시스템을 구축할 수 있습니다.

요즘 가장 주목받는 ESG 경영시스템은 환경(Environment), 사회(Social), 지배구조(Governance)를 통합적으로 관리하는 시스템으로, 기업의 사회적 책임과 지속가능성을 동시에 달성할 수 있는 핵심 경영 도구입니다.

25년간 현장에서 직접 수많은 기업들의 인증을 도우면서 느낀 것은, 인증은 단순한 서류나 절차가 아니라 기업의 경쟁력을 높이는 실질적인 경영 혁신 도구라는 점입니다.

어떤 인증이 필요하신지, 현재 기업 상황이 어떠신지 구체적으로 말씀해주시면 가장 적합한 인증 전략을 제시해드리겠습니다.

📞 전문 상담: 010-9251-9743`;
    }

    return NextResponse.json({ 
      response: fallbackResponse,
      source: 'esg_certification_fallback',
      consultant: 'ESG 인증원 선임심사원'
    });
  }
} 
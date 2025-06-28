'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, MessageCircle, X, Bot, User } from 'lucide-react';
import { getImagePath } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 드래그 기능을 위한 상태 추가 - 오류신고 버튼과 겹치지 않게 위치 조정
  const [position, setPosition] = useState({ x: 20, y: 120 }); // y를 120으로 변경하여 오류신고 버튼(bottom-6) 위에 위치
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragReady, setIsDragReady] = useState(false); // 드래그 준비 상태
  const [snapPosition, setSnapPosition] = useState<'left' | 'right'>('right'); // 스냅 위치
  
  // SSR 안전한 화면 크기 상태 관리
  const [screenSize, setScreenSize] = useState({ width: 1024, height: 768 });
  const [isMobile, setIsMobile] = useState(false);

  // 환영 메시지 추가
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: `🌟 안녕하세요! **기업의별 M-CENTER** 별-AI상담사입니다!

✨ **GEMINI AI 기반 스마트 상담**으로 더욱 정확하고 개인화된 답변을 제공해드립니다!

🎯 **상담 가능한 분야:**
• 📈 **매출 증대 전략** - BM ZEN 사업분석 (성공률 95%)
• 🤖 **AI 생산성향상** - ChatGPT 활용법 (효율 40-60% 향상)
• 🏭 **공장/부동산** - 경매활용 구매전략 (30-50% 절감)
• 🚀 **기술창업** - 사업화 및 정부지원 (평균 5억원 확보)
• 🏆 **인증지원** - ISO/벤처/연구소 (연간 5천만원 세제혜택)
• 🌐 **웹사이트 구축** - SEO 전문 (매출 300-500% 증대)

💬 **궁금한 것을 자유롭게 물어보세요!**
📞 **긴급상담: 010-9251-9743 (이후경 경영지도사)**

---
💡 **예시 질문:**
"우리 회사 매출을 늘리려면 어떻게 해야 하나요?"
"AI 도입으로 업무 효율을 높이고 싶어요"
"공장 구매를 저렴하게 하는 방법이 있나요?"`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // 메시지 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 🔥 개선된 드래그 이벤트 핸들러들 - useCallback으로 메모이제이션
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 모바일 진동 피드백
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setIsDragReady(true);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: position.x, y: position.y });
    
    // 드래그 시작 애니메이션
    setTimeout(() => setIsDragReady(false), 200);
  }, [position.x, position.y]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    
    // 모바일 진동 피드백
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setIsDragReady(true);
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setDragOffset({ x: position.x, y: position.y });
    
    // 드래그 시작 애니메이션
    setTimeout(() => setIsDragReady(false), 200);
  }, [position.x, position.y]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    let clientX, clientY;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    const newX = dragOffset.x - deltaX; // 오른쪽에서의 거리이므로 반대로
    const newY = dragOffset.y - deltaY; // 하단에서의 거리이므로 반대로 (아래로 드래그하면 bottom 값이 작아져야 함)
    
    // 화면 경계 제한 (전체 2D 드래그) - 모바일 최적화
    const buttonSize = isMobile ? 60 : 70; // 모바일에서 버튼 크기 조정
    const maxX = screenSize.width - buttonSize - 10;
    const minX = 10;
    const maxY = screenSize.height - buttonSize - 10;
    const minY = 60; // 상단 여유 공간
    
    // 🚨 오류신고 버튼과의 충돌 방지 (우하단 영역) - 개선된 충돌 감지
    let finalX = Math.max(minX, Math.min(maxX, newX));
    let finalY = Math.max(minY, Math.min(maxY, newY));
    
    // 오류신고 버튼 영역 (우하단 90x90 픽셀) 충돌 감지 - 모바일 고려
    const errorButtonArea = {
      left: screenSize.width - (isMobile ? 100 : 120),
      right: screenSize.width - 10,
      top: screenSize.height - (isMobile ? 100 : 120),
      bottom: screenSize.height - 10
    };
    
    const chatbotArea = {
      left: screenSize.width - finalX - buttonSize,
      right: screenSize.width - finalX,
      top: screenSize.height - finalY - buttonSize,
      bottom: screenSize.height - finalY
    };
    
    // 충돌 감지
    const isColliding = (
      chatbotArea.left < errorButtonArea.right &&
      chatbotArea.right > errorButtonArea.left &&
      chatbotArea.top < errorButtonArea.bottom &&
      chatbotArea.bottom > errorButtonArea.top
    );
    
    // 충돌 시 위치 조정 - 더 자연스러운 위치로
    if (isColliding) {
      if (finalY > screenSize.height / 2) {
        // 하단에 있으면 위로 이동
        finalY = Math.min(finalY, screenSize.height - (isMobile ? 160 : 180));
      } else {
        // 상단에 있으면 왼쪽으로 이동
        finalX = Math.max(finalX, 100);
      }
    }
    
    // 좌우 스냅 위치 결정
    if (finalX > screenSize.width / 2) {
      setSnapPosition('right');
    } else {
      setSnapPosition('left');
    }
    
    setPosition({
      x: finalX,
      y: finalY
    });
  }, [isDragging, dragStart.x, dragStart.y, dragOffset.x, dragOffset.y, isMobile, screenSize.width, screenSize.height]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // 모바일 진동 피드백 (드래그 완료)
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    
    // 스냅 기능 - 화면 좌우 가장자리로 자동 이동
    const screenWidth = screenSize.width;
    const snapThreshold = screenWidth * 0.3; // 30% 지점
    
    setPosition(prev => {
      let newX = prev.x;
      
      // 좌우 스냅
      if (prev.x < snapThreshold) {
        newX = 20; // 왼쪽으로 스냅
        setSnapPosition('left');
      } else if (prev.x > screenWidth - snapThreshold) {
        newX = 20; // 오른쪽으로 스냅  
        setSnapPosition('right');
      }
      
      return {
        x: newX,
        y: Math.max(60, Math.min(screenSize.height - 100, prev.y)) // Y축 경계 재조정
      };
    });
  }, [isDragging, screenSize.width, screenSize.height]);

  // 🔥 전역 마우스 및 터치 이벤트 리스너 - 의존성 배열 최적화
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      document.body.style.userSelect = 'none'; // 드래그 중 텍스트 선택 방지
      document.body.style.cursor = 'grabbing';
      document.body.style.touchAction = 'none'; // 터치 스크롤 방지
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      document.body.style.touchAction = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 화면 크기 감지 (SSR 안전)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateScreenSize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
        setIsMobile(window.innerWidth < 768);
      };

      // 초기 설정
      updateScreenSize();

      // 리사이즈 이벤트 리스너
      window.addEventListener('resize', updateScreenSize);
      return () => window.removeEventListener('resize', updateScreenSize);
    }
  }, []);

  // AI 메시지 전송
  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      console.log('🚀 AI API 호출 시작:', { message: message.trim() });
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          history: messages.slice(-5)
        }),
      });

      console.log('📡 API 응답 상태:', { status: response.status, ok: response.ok });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ API 응답 성공:', { responseLength: data.response?.length || 0 });
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response || '죄송합니다. 응답을 생성하는데 문제가 발생했습니다.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error(`API 응답 실패: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ AI 응답 오류:', error);
      const fallbackResponse = generateFallbackResponse(message.trim());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // 폴백 응답 생성
  const generateFallbackResponse = (message: string): string => {
    return `✨ **기업의별 M-CENTER**에서 도움드리겠습니다!

🎯 **맞춤형 솔루션 제공 분야:**
• 📈 **매출 증대** - BM ZEN 사업분석으로 20-40% 성장
• 🤖 **AI 생산성향상** - ChatGPT 활용으로 업무효율 60% 향상  
• 🏭 **공장/부동산** - 경매활용으로 30-50% 비용절감
• 🚀 **기술창업** - 평균 5억원 정부지원 연계

**더 구체적인 상담을 원하시면:**
📞 **즉시 상담: 010-9251-9743 (이후경 경영지도사)**
🔗 **무료 진단: /services/diagnosis**

💡 **25년 경험의 전문 컨설팅**으로 확실한 성과를 보장합니다!`;
  };

  return (
    <>
      {/* 🔥 드래그 가능한 플로팅 챗봇 버튼 */}
      <div
        id="floating-chatbot-button"
        className={`${isOpen ? 'hidden' : 'block'} draggable-mobile gpu-accelerated ${isDragReady ? 'scale-110' : ''}`}
        style={{
          position: 'fixed',
          bottom: `${position.y}px`,
          right: snapPosition === 'right' ? `${position.x}px` : 'auto',
          left: snapPosition === 'left' ? `${position.x}px` : 'auto',
          width: isMobile ? '60px' : '70px',
          height: isMobile ? '60px' : '70px',
          backgroundColor: isDragging ? '#9C27B0' : '#4285F4',
          borderRadius: '50%',
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: 999999,
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isDragging 
            ? '0 8px 32px rgba(156, 39, 176, 0.6), 0 0 0 4px rgba(156, 39, 176, 0.2)' 
            : '0 4px 20px rgba(66, 133, 244, 0.4)',
          border: '3px solid white',
          transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          userSelect: 'none',
          transform: isDragging 
            ? 'scale(1.1) rotate(5deg)' 
            : isDragReady 
              ? 'scale(1.05)' 
              : 'scale(1)',
          filter: isDragging ? 'brightness(1.1)' : 'brightness(1)',
        }}
        onClick={(e) => {
          if (!isDragging) {
            setIsOpen(true);
            // 모바일 진동 피드백
            if (navigator.vibrate) {
              navigator.vibrate(100);
            }
          }
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={(e) => {
          if (!isDragging && !isMobile) {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = '#9C27B0';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging && !isMobile) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#4285F4';
          }
        }}
      >
        {/* 별-AI상담사 아이콘 */}
        <img
          src={getImagePath('/star-counselor-icon.svg')}
          alt="별-AI상담사"
          style={{
            width: isMobile ? '50px' : '60px',
            height: isMobile ? '50px' : '60px',
            borderRadius: '50%',
            objectFit: 'cover',
            pointerEvents: 'none',
            transition: 'all 0.3s ease',
            filter: isDragging ? 'brightness(1.2)' : 'brightness(1)'
          }}
        />
        
        {/* 드래그 인디케이터 (모바일) */}
        {isDragging && (
          <div
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              border: '2px dashed rgba(255, 255, 255, 0.8)',
              animation: 'spin 2s linear infinite',
              pointerEvents: 'none'
            }}
          />
        )}
        
        {/* 펄스 애니메이션 */}
        {!isDragging && (
          <div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(66, 133, 244, 0.3) 0%, transparent 70%)',
              animation: 'pulse 3s infinite',
              pointerEvents: 'none'
            }}
          />
        )}
        
        {/* 모바일 터치 가이드 */}
        {!isDragging && isMobile && (
          <div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              whiteSpace: 'nowrap',
              opacity: isDragReady ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
              zIndex: 1000000
            }}
          >
            🔄 드래그로 이동
          </div>
        )}
        
        {/* 데스크탑 툴팁 */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              right: snapPosition === 'right' ? '0' : 'auto',
              left: snapPosition === 'left' ? '0' : 'auto',
              backgroundColor: '#333',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none'
            }}
            className="tooltip"
          >
            {isDragging ? '🔄 드래그 중...' : '드래그로 자유롭게 이동 가능!'}
          </div>
        )}
      </div>

      {/* 채팅창 */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: `${position.y}px`,
            right: `${position.x}px`,
            width: '380px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            zIndex: 999998,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #e2e8f0'
          }}
        >
          {/* 헤더 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #4285F4 0%, #9C27B0 100%)',
              color: 'white',
              padding: '16px',
              borderRadius: '12px 12px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={getImagePath('/star-counselor-icon.svg')}
                alt="별-AI상담사"
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                  별-AI상담사
                </div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>
                  GEMINI AI • 온라인
                </div>
              </div>
            </div>
            
            {/* X 버튼 */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>

          {/* 메시지 영역 */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#f8fafc'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: message.sender === 'user' ? '#4285F4' : 'white',
                    color: message.sender === 'user' ? 'white' : '#333',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: message.sender === 'bot' ? '1px solid #e2e8f0' : 'none'
                  }}
                >
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {message.content}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      marginTop: '8px',
                      opacity: 0.7
                    }}
                  >
                    {message.timestamp.toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      backgroundColor: '#4285F4', 
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite'
                    }}></div>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      backgroundColor: '#4285F4', 
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite 0.2s'
                    }}></div>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      backgroundColor: '#4285F4', 
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite 0.4s'
                    }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: 'white',
              borderRadius: '0 0 12px 12px'
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="메시지를 입력하세요..."
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '24px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputValue.trim()) {
                      handleSendMessage(inputValue);
                    }
                  }
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4285F4';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                }}
                disabled={isTyping}
              />
              <button
                onClick={() => {
                  if (inputValue.trim()) {
                    handleSendMessage(inputValue);
                  }
                }}
                disabled={!inputValue.trim() || isTyping}
                style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: inputValue.trim() && !isTyping ? '#4285F4' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS 애니메이션 */}
      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        #floating-chatbot-button:hover .tooltip {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
} 
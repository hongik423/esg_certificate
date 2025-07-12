'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Award,
  Shield,
  Leaf,
  Globe,
  CheckCircle2,
  ArrowRight,
  FileText,
  BadgeCheck,
  Building2,
  Clock,
  Users,
  Star,
  Sparkles,
  Phone,
  Download,
  Brain,
  Cpu,
  Bot,
  Zap,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';

// 인증 서비스 데이터
const certificationServices = [
  {
    id: 'iso-9001',
    title: 'ISO 9001',
    subtitle: '품질경영시스템',
    description: '고객 만족과 지속적 개선을 위한 국제표준 인증',
    icon: BadgeCheck,
    color: 'blue',
    benefits: [
      '품질 경쟁력 강화',
      '고객 신뢰도 향상',
      '업무 프로세스 개선',
      '불량률 감소'
    ],
    industries: ['제조업', '서비스업', '건설업', '유통업'],
    timeline: '3-4개월',
    href: '/esg-certification/services/iso-9001'
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001',
    subtitle: '환경경영시스템',
    description: '환경 성과 개선과 지속가능경영을 위한 국제표준',
    icon: Leaf,
    color: 'green',
    benefits: [
      '환경 리스크 관리',
      '법규 준수 보장',
      '친환경 이미지 구축',
      '자원 효율성 증대'
    ],
    industries: ['제조업', '화학업', '건설업', '폐기물처리업'],
    timeline: '3-4개월',
    href: '/esg-certification/services/iso-14001'
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001',
    subtitle: '안전보건경영시스템',
    description: '안전한 작업환경 구축을 위한 국제표준',
    icon: Shield,
    color: 'orange',
    benefits: [
      '산업재해 예방',
      '법적 요구사항 충족',
      '안전문화 정착',
      '생산성 향상'
    ],
    industries: ['건설업', '제조업', '운송업', '에너지산업'],
    timeline: '3-4개월',
    href: '/esg-certification/services/iso-45001'
  },
  {
    id: 'esg-management',
    title: 'ESG 경영시스템',
    subtitle: '지속가능경영 인증',
    description: 'KAB 인정 ESG 경영시스템 시범 인증',
    icon: Globe,
    color: 'purple',
    benefits: [
      'ESG 경영 체계화',
      '투자자 신뢰 확보',
      '지속가능성 입증',
      '기업가치 향상'
    ],
    industries: ['전 산업분야'],
    timeline: '4-5개월',
    href: '/esg-certification/services/esg-management',
    featured: true
  }
];

// 인증 프로세스
const certificationProcess = [
  {
    step: 1,
    title: '인증 상담',
    description: '기업 현황 파악 및 맞춤형 컨설팅',
    duration: '1-2일'
  },
  {
    step: 2,
    title: '신청서 제출',
    description: '온라인/오프라인 신청서 작성 및 제출',
    duration: '1일'
  },
  {
    step: 3,
    title: '계약 체결',
    description: '심사 계약 및 일정 협의',
    duration: '2-3일'
  },
  {
    step: 4,
    title: '1차 심사',
    description: '문서심사 및 시정조치',
    duration: '2-3주'
  },
  {
    step: 5,
    title: '2차 심사',
    description: '현장심사 진행',
    duration: '2-3일'
  },
  {
    step: 6,
    title: '인증서 발급',
    description: '심사 결과 검토 및 인증서 발급',
    duration: '1-2주'
  }
];

export default function CertificationServicesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 🌟 AI-Enhanced Hero Section */}
      <section className="relative min-h-screen overflow-hidden" style={{background: 'linear-gradient(135deg, #001c40 0%, #002552 50%, #1a304d 100%)'}}>
        {/* AI-Powered Background Effects Layer 1 */}
        <div className="absolute inset-0 will-change-transform">
          {/* Animated Gradient Mesh */}
          <div className="absolute inset-0 animate-pulse" style={{background: 'linear-gradient(135deg, rgba(247, 127, 111, 0.1) 0%, rgba(204, 167, 0, 0.1) 50%, rgba(26, 48, 77, 0.2) 100%)'}}></div>
          
          {/* Floating Certification Icons */}
          {isClient && (
            <div className="absolute inset-0">
              {[Award, Shield, Leaf, Globe, BadgeCheck].map((Icon, i) => (
                <div
                  key={i}
                  className="absolute animate-float will-change-transform"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${20 + (i * 10)}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: `${4 + i}s`
                  }}
                >
                  <Icon className="w-6 h-6 text-white/20 animate-pulse" />
                </div>
              ))}
            </div>
          )}
          
          {/* Interactive Light Trails */}
          {isClient && (
            <div 
              className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-300 ease-out will-change-transform"
              style={{
                left: mousePosition.x - 192,
                top: mousePosition.y - 192,
                transform: `scale(${isHovered ? 1.5 : 1})`,
                background: 'radial-gradient(circle, rgba(247, 127, 111, 0.2) 0%, transparent 70%)'
              }}
            />
          )}
          
          {/* Certification Network Pattern */}
          <div className="absolute inset-0 opacity-10 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 1200 800">
              <defs>
                <pattern id="cert-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="3" fill="currentColor" className="text-white">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cert-grid)" />
              
              {/* Connecting Lines for Certification Network */}
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1={Math.random() * 1200}
                  y1={Math.random() * 800}
                  x2={Math.random() * 1200}
                  y2={Math.random() * 800}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-white/20"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0"
                    dur={`${3 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                </line>
              ))}
            </svg>
          </div>
        </div>

        {/* AI-Powered Background Effects Layer 2 */}
        <div className="absolute inset-0 will-change-transform">
          {/* Morphing Certification Shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 md:w-48 md:h-48 rounded-full blur-2xl animate-morph" style={{background: 'linear-gradient(135deg, rgba(247, 127, 111, 0.2) 0%, rgba(204, 167, 0, 0.2) 100%)'}}></div>
          <div className="absolute top-40 right-16 w-40 h-40 md:w-64 md:h-64 rounded-full blur-2xl animate-morph-reverse" style={{background: 'linear-gradient(135deg, rgba(204, 167, 0, 0.2) 0%, rgba(26, 48, 77, 0.2) 100%)'}}></div>
          <div className="absolute bottom-32 left-1/3 w-36 h-36 md:w-56 md:h-56 rounded-full blur-2xl animate-morph-slow" style={{background: 'linear-gradient(135deg, rgba(26, 48, 77, 0.2) 0%, rgba(247, 127, 111, 0.2) 100%)'}}></div>
          
          {/* ISO Standards Circuit Pattern */}
          <div className="absolute inset-0 opacity-5 hidden lg:block">
            <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-white/30 rounded-lg animate-pulse-slow-ai">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full animate-ping" style={{backgroundColor: '#f77f6f'}}></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full animate-ping" style={{backgroundColor: '#cca700', animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/20 text-xs font-bold">ISO</div>
            </div>
            <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-white/30 rounded-lg animate-pulse-slow-ai" style={{animationDelay: '2s'}}>
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full animate-ping" style={{backgroundColor: '#1a304d', animationDelay: '3s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/20 text-xs font-bold">ESG</div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 md:py-20 lg:py-24 xl:py-32 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* AI-Enhanced Status Badge */}
            <div 
              className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-2xl hover:bg-white/20 transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" style={{color: '#f77f6f'}} />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-ping" style={{backgroundColor: '#f77f6f'}}></div>
              </div>
              <span className="font-semibold text-white text-xs sm:text-sm mr-2">KAB 인정 인증기관</span>
              <div className="flex items-center space-x-1 ml-2">
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" style={{color: '#cca700'}} />
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" style={{color: '#1a304d', animationDelay: '0.5s'}} />
              </div>
            </div>
            
            {/* AI-Enhanced Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight hero-title">
              <span className="block text-white mb-2 sm:mb-4 animate-fade-in-up-ai">
                AI 기반 스마트 인증서비스
              </span>
              <span className="block bg-clip-text text-transparent animate-gradient-x animate-fade-in-up-ai" style={{backgroundImage: 'linear-gradient(90deg, #f77f6f 0%, #cca700 50%, #1a304d 100%)', animationDelay: '0.3s'}}>
                ISO & ESG 통합 솔루션
              </span>
            </h1>
            
            {/* AI-Enhanced Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-ai" style={{animationDelay: '0.6s'}}>
              <strong className="text-white bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(90deg, #f77f6f 0%, #cca700 100%)'}}>
                {COMPANY_INFO.name}
              </strong>의 AI 기반 인증 플랫폼으로<br className="hidden sm:block" />
              ISO 9001, ISO 14001, ISO 45001, ESG 경영시스템을 한 번에 관리하세요
            </p>
            
            {/* AI-Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 animate-fade-in-up-ai" style={{animationDelay: '0.9s'}}>
              <Link href="/esg-certification/consultation">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto relative text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl shadow-2xl transform hover:scale-[1.05] transition-all duration-300 group overflow-hidden border-0"
                  style={{
                    background: 'linear-gradient(135deg, #f77f6f 0%, #cca700 100%)',
                    boxShadow: '0 25px 50px -12px rgba(247, 127, 111, 0.25)'
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #cca700 0%, #f77f6f 100%)'}}></div>
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 relative z-10" />
                  <span className="relative z-10">AI 인증 신청하기</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Button>
              </Link>
              
              <Link href="/esg-certification/services/cost">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl border-2 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                  style={{
                    borderColor: 'rgba(247, 127, 111, 0.5)',
                    color: '#f77f6f'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#f77f6f';
                    e.currentTarget.style.color = '#f77f6f';
                  }}
                >
                  <div className="flex items-center justify-center">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-bounce" />
                    <span>AI 심사비용 계산</span>
                  </div>
                </Button>
              </Link>
            </div>

            {/* AI-Enhanced Certification Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 animate-fade-in-up-ai" style={{animationDelay: '1.2s'}}>
              {[
                { icon: BadgeCheck, title: 'ISO 9001', desc: 'AI 기반 품질관리', color: '#f77f6f' },
                { icon: Leaf, title: 'ISO 14001', desc: '스마트 환경관리', color: '#cca700' },
                { icon: Shield, title: 'ISO 45001', desc: '지능형 안전관리', color: '#1a304d' },
                { icon: Globe, title: 'ESG 시스템', desc: '통합 지속가능경영', color: '#f77f6f' }
              ].map((cert, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  style={{animationDelay: `${1.2 + index * 0.15}s`}}
                >
                  <cert.icon className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0" style={{color: cert.color}} />
                  <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{cert.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">{cert.desc}</p>
                </div>
              ))}
            </div>

            {/* AI-Enhanced Contact Info */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-gray-300 text-sm sm:text-base animate-fade-in-up-ai" style={{animationDelay: '1.5s'}}>
              <div className="flex items-center justify-center transition-colors duration-300 cursor-pointer group" style={{color: '#f77f6f'}}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:animate-pulse" style={{color: '#f77f6f'}} />
                <span className="text-center">{CONSULTANT_INFO.fullTitle}: {CONTACT_INFO.mainPhone}</span>
              </div>
              <div className="flex items-center justify-center transition-colors duration-300 cursor-pointer group" style={{color: '#cca700'}}>
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:animate-pulse" style={{color: '#cca700'}} />
                <span>24시간 AI 상담 가능</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1 sm:mt-2 animate-ping"></div>
          </div>
        </div>
      </section>

      {/* 인증 서비스 목록 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              인증 서비스
            </h2>
            <p className="text-lg text-gray-600">
              기업의 목적과 상황에 맞는 최적의 인증 서비스를 선택하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certificationServices.map((service) => (
              <Card 
                key={service.id} 
                className={`hover:shadow-xl transition-all duration-300 ${
                  service.featured ? 'ring-2 ring-purple-400 ring-opacity-50' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-${service.color}-100`}>
                      <service.icon className={`w-8 h-8 text-${service.color}-600`} />
                    </div>
                    {service.featured && (
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        <Sparkles className="w-3 h-3 mr-1" />
                        시범 인증
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-2xl">
                    {service.title}
                  </CardTitle>
                  
                  <p className={`text-lg font-semibold text-${service.color}-600`}>
                    {service.subtitle}
                  </p>
                  
                  <p className="text-gray-600 mt-2">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">주요 효과</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.timeline}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Building2 className="w-4 h-4 mr-1" />
                          {service.industries.length > 3 ? '전 산업' : service.industries[0]}
                        </div>
                      </div>
                    </div>
                    
                    <Link href={service.href}>
                      <Button className="w-full mt-4" variant="outline">
                        자세히 보기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 인증 프로세스 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              인증 프로세스
            </h2>
            <p className="text-lg text-gray-600">
              투명하고 체계적인 프로세스로 진행됩니다
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificationProcess.map((process, index) => (
                <div key={index} className="relative">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3">
                          {process.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {process.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {process.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {process.duration}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {index < certificationProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 인증 혜택 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  ESG 인증원 인증의 특별함
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        전문 심사원
                      </h4>
                      <p className="text-sm text-gray-600">
                        각 분야별 전문 심사원이 객관적이고 공정한 심사를 진행합니다
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        국제적 신뢰성
                      </h4>
                      <p className="text-sm text-gray-600">
                        KAB 인정을 받은 인증으로 국내외에서 공신력을 인정받습니다
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        맞춤형 컨설팅
                      </h4>
                      <p className="text-sm text-gray-600">
                        기업별 특성에 맞는 맞춤형 컨설팅을 함께 제공합니다
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-lg mr-4">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        신속한 처리
                      </h4>
                      <p className="text-sm text-gray-600">
                        효율적인 프로세스로 인증 취득 기간을 단축합니다
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 인증을 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {COMPANY_INFO.name}이 귀사의 성공적인 인증 취득을 도와드립니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/esg-certification/consultation">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Award className="w-5 h-5 mr-2" />
                인증 신청하기
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.mainPhone}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-5 h-5 mr-2" />
                {CONTACT_INFO.mainPhone}
              </Button>
            </a>
          </div>
          <p className="mt-6 text-sm opacity-80">
            {CONSULTANT_INFO.fullTitle} | {CONTACT_INFO.consultationHours}
          </p>
        </div>
      </section>
    </div>
  );
} 
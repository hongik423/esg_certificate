'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield,
  Award,
  FileCheck,
  GraduationCap,
  Building2,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Target,
  Quote,
  Clock,
  FileText,
  Sparkles,
  CheckCircle2,
  Phone,
  Bot,
  Leaf,
  Scale,
  BadgeCheck,
  BookOpen,
  MessageSquare,
  FolderOpen,
  Zap,
  Brain,
  Cpu
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';

// ESG 인증원 서비스 데이터
const services = [
  {
    id: 'iso-9001',
    title: 'ISO 9001',
    subtitle: '품질경영시스템',
    description: '고객만족과 지속적 개선을 위한 국제표준',
    icon: BadgeCheck,
    color: 'bg-blue-100 text-blue-600',
    bgColor: 'from-blue-50 to-cyan-50',
    textColor: 'text-blue-600',
    href: '/services/certification',
    benefits: ['품질 경쟁력 강화', '고객 신뢰도 향상', '프로세스 개선'],
    badge: 'KAB 인정',
    featured: true
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001',
    subtitle: '환경경영시스템',
    description: '지속가능한 환경경영을 위한 국제표준',
    icon: Leaf,
    color: 'bg-green-100 text-green-600',
    bgColor: 'from-green-50 to-emerald-50',
    textColor: 'text-green-600',
    href: '/services/certification',
    benefits: ['환경 리스크 관리', '법규 준수 보장', '친환경 이미지'],
    badge: 'KAB 인정'
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001',
    subtitle: '안전보건경영시스템',
    description: '안전한 작업환경 구축을 위한 국제표준',
    icon: Shield,
    color: 'bg-orange-100 text-orange-600',
    bgColor: 'from-orange-50 to-red-50',
    textColor: 'text-orange-600',
    href: '/services/certification',
    benefits: ['산업재해 예방', '법적 요구사항 충족', '안전문화 정착'],
    badge: 'KAB 인정'
  },
  {
    id: 'esg-management',
    title: 'ESG 경영시스템',
    subtitle: '지속가능경영 인증',
    description: 'KAB 인정 ESG 경영시스템 시범 인증',
    icon: Globe,
    color: 'bg-purple-100 text-purple-600',
    bgColor: 'from-purple-50 to-pink-50',
    textColor: 'text-purple-600',
    href: '/services/certification',
    benefits: ['ESG 경영 체계화', '투자자 신뢰 확보', '지속가능성 입증'],
    badge: '시범 인증기관',
    featured: true
  },
  {
    id: 'education',
    title: '교육 서비스',
    subtitle: '전문가 양성 과정',
    description: 'ISO 및 ESG 인증 관련 전문 교육',
    icon: GraduationCap,
    color: 'bg-indigo-100 text-indigo-600',
    bgColor: 'from-indigo-50 to-violet-50',
    textColor: 'text-indigo-600',
    href: '/education',
    benefits: ['내부심사원 양성', '실무 역량 강화', '수료증 발급'],
    badge: '전문 교육'
  },
  {
    id: 'consulting',
    title: '컨설팅 서비스',
    subtitle: '맞춤형 인증 컨설팅',
    description: '기업별 맞춤형 인증 취득 지원',
    icon: Building2,
    color: 'bg-teal-100 text-teal-600',
    bgColor: 'from-teal-50 to-cyan-50',
    textColor: 'text-teal-600',
    href: '/consultation',
    benefits: ['맞춤형 솔루션', '전문가 1:1 지원', '100% 인증 보장'],
    badge: '전문 컨설팅'
  }
];

// 인증 프로세스 단계
const certificationProcess = [
  {
    step: '1단계',
    title: '신청 및 계약',
    description: '인증 신청서 제출 및 계약 체결',
    features: ['온라인 신청', '견적 산출', '계약 체결'],
    color: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    icon: FileText
  },
  {
    step: '2단계',
    title: '1차 심사',
    description: '문서심사 및 현장 예비심사',
    features: ['문서 검토', '시정조치 요구', '2차 심사 준비'],
    color: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    icon: FileCheck
  },
  {
    step: '3단계',
    title: '2차 심사',
    description: '현장심사 및 시스템 운영 확인',
    features: ['현장 심사', '운영 상태 확인', '부적합 사항 확인'],
    color: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    icon: Shield
  },
  {
    step: '4단계',
    title: '인증서 발급',
    description: '심사 결과 검토 및 인증서 발급',
    features: ['인증 결정', '인증서 발급', '인증마크 사용'],
    color: 'from-orange-50 to-yellow-50',
    borderColor: 'border-orange-200',
    icon: Award
  }
];

// 고객 후기 데이터
const testimonials = [
  {
    name: '김대표',
    title: '대표이사',
    company: '○○제조(주)',
    content: 'ESG 인증원의 체계적인 심사 프로세스와 전문적인 컨설팅 덕분에 ISO 9001 인증을 무사히 취득했습니다. 공평성과 전문성이 돋보였습니다.',
    rating: 5,
    avatar: 'K'
  },
  {
    name: '이부장',
    title: '품질관리부장',
    company: '△△전자',
    content: 'ESG 경영시스템 시범 인증을 통해 회사의 지속가능경영 체계를 구축할 수 있었습니다. 향후 ESG 경영의 표준이 될 것 같습니다.',
    rating: 5,
    avatar: 'L'
  },
  {
    name: '박과장',
    title: '안전관리자',
    company: '□□건설',
    content: 'ISO 45001 인증 취득 과정에서 세심한 지도와 실무적인 조언을 받았습니다. 덕분에 안전보건 시스템이 크게 개선되었습니다.',
    rating: 5,
    avatar: 'P'
  }
];

export default function Home() {
  const router = useRouter();
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
    <div className="min-h-screen bg-white">
      {/* 🌟 AI-Enhanced Hero Section with Dual Effects */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* AI-Powered Background Effects Layer 1 */}
        <div className="absolute inset-0 will-change-transform">
          {/* Animated Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-green-600/20 animate-pulse"></div>
          
          {/* Floating Particles - Only render on client */}
          {isClient && (
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-float will-change-transform"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Interactive Light Trails - Only render on client */}
          {isClient && (
            <div 
              className="absolute w-96 h-96 bg-gradient-radial from-blue-400/20 to-transparent rounded-full blur-3xl transition-all duration-300 ease-out will-change-transform"
              style={{
                left: mousePosition.x - 192,
                top: mousePosition.y - 192,
                transform: `scale(${isHovered ? 1.5 : 1})`
              }}
            />
          )}
          
          {/* Neural Network Pattern */}
          <div className="absolute inset-0 opacity-10 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 1200 800">
              <defs>
                <pattern id="neural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="currentColor" className="text-white">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#neural-grid)" />
              
              {/* Connecting Lines */}
              {[...Array(15)].map((_, i) => (
                <line
                  key={i}
                  x1={Math.random() * 1200}
                  y1={Math.random() * 800}
                  x2={Math.random() * 1200}
                  y2={Math.random() * 800}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-white/20"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.5;0"
                    dur={`${2 + Math.random() * 3}s`}
                    repeatCount="indefinite"
                  />
                </line>
              ))}
            </svg>
          </div>
        </div>

        {/* AI-Powered Background Effects Layer 2 */}
        <div className="absolute inset-0 will-change-transform">
          {/* Morphing Shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-morph"></div>
          <div className="absolute top-40 right-16 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-morph-reverse"></div>
          <div className="absolute bottom-32 left-1/3 w-36 h-36 md:w-72 md:h-72 bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 rounded-full blur-2xl animate-morph-slow"></div>
          
          {/* AI Circuit Board Pattern */}
          <div className="absolute inset-0 opacity-5 hidden lg:block">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/30 rounded-lg animate-pulse-slow-ai">
              <div className="absolute top-2 left-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            </div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-white/30 rounded-lg animate-pulse-slow-ai" style={{animationDelay: '2s'}}>
              <div className="absolute top-1 right-1 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
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
                <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <span className="font-semibold text-white text-xs sm:text-sm mr-2">KAB 인정 ESG 경영시스템 시범 인증기관</span>
              <div className="flex items-center space-x-1 ml-2">
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 animate-pulse" />
                <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
            </div>
            
            {/* AI-Enhanced Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight hero-title">
              <span className="block text-white mb-2 sm:mb-4 animate-fade-in-up-ai">
                공평성을 최고의 가치로
              </span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x animate-fade-in-up-ai" style={{animationDelay: '0.3s'}}>
                AI 기반 신뢰 인증서비스
              </span>
            </h1>
            
            {/* AI-Enhanced Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-ai" style={{animationDelay: '0.6s'}}>
              <strong className="text-white bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                {COMPANY_INFO.name}
              </strong>은 AI 기술과 전문성을 결합하여<br className="hidden sm:block" />
              차세대 적합성 평가 서비스를 제공합니다
            </p>
            
            {/* AI-Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 animate-fade-in-up-ai" style={{animationDelay: '0.9s'}}>
              <Link href="/esg-certification/consultation">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto relative bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl shadow-2xl hover:shadow-green-500/25 transform hover:scale-[1.05] transition-all duration-300 group overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 relative z-10" />
                  <span className="relative z-10">AI 인증 신청하기</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Button>
              </Link>
              
              <Link href="/consultation">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl border-2 border-white/30 text-white hover:border-green-400 hover:text-green-400 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-bounce" />
                    <span>AI 전문가 상담</span>
                  </div>
                </Button>
              </Link>
            </div>

            {/* AI-Enhanced Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 animate-fade-in-up-ai" style={{animationDelay: '1.2s'}}>
              {[
                { icon: Brain, title: 'AI 기반 분석', desc: '인공지능을 활용한 정밀 진단' },
                { icon: Zap, title: '실시간 처리', desc: '빠르고 정확한 인증 프로세스' },
                { icon: Shield, title: '보안 강화', desc: '최고 수준의 데이터 보안' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  style={{animationDelay: `${1.2 + index * 0.2}s`}}
                >
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0" />
                  <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* AI-Enhanced Contact Info */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-gray-300 text-sm sm:text-base animate-fade-in-up-ai" style={{animationDelay: '1.5s'}}>
              <div className="flex items-center justify-center hover:text-green-400 transition-colors duration-300 cursor-pointer group">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-400 group-hover:animate-pulse" />
                <span className="text-center">{CONSULTANT_INFO.fullTitle}: {CONTACT_INFO.mainPhone}</span>
              </div>
              <div className="flex items-center justify-center hover:text-blue-400 transition-colors duration-300 cursor-pointer group">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-400 group-hover:animate-pulse" />
                <span>{CONTACT_INFO.mainEmail}</span>
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

      {/* 🏆 인증 서비스 소개 */}
      <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 mr-2 text-green-600" />
              <span className="font-semibold text-green-800">인증 서비스</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              전문성과 공평성을 바탕으로 한<br />
              <span className="text-green-600">최고의 인증 서비스</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              ISO 9001, ISO 14001, ISO 45001, ESG 경영시스템까지<br />
              기업의 지속가능한 성장을 위한 모든 인증을 지원합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link key={service.id} href={service.href}>
                <Card className={`h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br ${service.bgColor} relative overflow-hidden group cursor-pointer`}>
                  {service.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0">
                        주력 인증
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </CardTitle>
                    
                    <p className={`text-lg font-semibold ${service.textColor} mb-2`}>
                      {service.subtitle}
                    </p>
                    
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {service.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-white/70">
                        {service.badge}
                      </Badge>
                      <ArrowRight className={`w-5 h-5 ${service.textColor} group-hover:translate-x-2 transition-transform duration-300`} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 📋 인증 프로세스 */}
      <section className="py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full mb-6">
              <FileCheck className="w-4 h-4 mr-2 text-blue-600" />
              <span className="font-semibold text-blue-800">인증 프로세스</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              체계적이고 투명한<br />
              <span className="text-blue-600">4단계 인증 프로세스</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              신청부터 인증서 발급까지 명확하고 공정한 절차로 진행됩니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificationProcess.map((stage, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${stage.color} rounded-2xl p-8 border-2 ${stage.borderColor} hover:shadow-lg transition-all duration-300`}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <stage.icon className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    {stage.step}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-4">
                    {stage.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {stage.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {stage.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {index < certificationProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 고객 후기 */}
      <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4 mr-2 text-purple-600" />
              <span className="font-semibold text-purple-800">고객 후기</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              고객이 인정한<br />
              <span className="text-purple-600">최고의 인증 서비스</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-gray-300 mb-4" />
                  
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.title}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 📞 상담 신청 CTA */}
      <section className="py-20 md:py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            인증에 대한 모든 것,<br />
            전문가와 상담하세요
          </h2>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {COMPANY_INFO.name}의 전문 컨설턴트가<br />
            귀사에 최적화된 인증 솔루션을 제공합니다
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                무료 상담 신청
              </Button>
            </Link>
            
            <a href={`tel:${CONTACT_INFO.mainPhone}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
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

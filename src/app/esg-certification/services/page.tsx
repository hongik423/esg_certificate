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
  Settings,
  CheckCircle,
  TrendingUp,
  MessageSquare
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
      {/* 🍎 Apple Store Style Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          {/* Gentle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-indigo-50/20"></div>
          
          {/* Floating geometric shapes - Apple style */}
          {isClient && (
            <div className="absolute inset-0">
              <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-br from-slate-100/40 to-indigo-100/40 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
              <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s', animationDelay: '3s'}}></div>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Apple-style Badge */}
            <div className="inline-flex items-center bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 hover:bg-black/10 transition-all duration-300">
              <Award className="w-4 h-4 mr-2 text-slate-600" />
              <span className="text-sm font-medium text-gray-700">국제 표준 인증 기관</span>
            </div>
            
            {/* Apple-style Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block text-gray-900 mb-2">
                ESG 경영시스템
              </span>
              <span className="block bg-gradient-to-r from-slate-600 to-indigo-600 bg-clip-text text-transparent">
                인증서비스
              </span>
            </h1>
            
            {/* Apple-style Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              <strong className="font-semibold text-gray-900">{COMPANY_INFO.name}</strong>의 전문 인증서비스로<br className="hidden md:block" />
              국제 표준에 부합하는 ESG 경영시스템을 구축하세요
            </p>
            
            {/* Apple-style Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/esg-certification/consultation">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-slate-600 hover:bg-slate-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  <Award className="w-5 h-5 mr-3" />
                  인증 신청하기
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
              
              <Link href="/esg-certification/services/process">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:border-slate-600 hover:text-slate-600 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
                >
                  <FileText className="w-5 h-5 mr-3" />
                  인증 절차 보기
                </Button>
              </Link>
            </div>

            {/* Apple-style Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: CheckCircle, title: '국제 표준', desc: 'ISO 14001, 45001 기반', color: 'slate' },
                { icon: TrendingUp, title: '경영 개선', desc: '체계적 경영시스템 구축', color: 'indigo' },
                { icon: Shield, title: '신뢰성 확보', desc: '제3자 독립 인증', color: 'purple' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 hover:border-gray-300/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Apple-style Contact Info */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 text-gray-600">
              <div className="flex items-center justify-center group">
                <Phone className="w-5 h-5 mr-3 text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">{CONSULTANT_INFO.fullTitle}: {CONTACT_INFO.mainPhone}</span>
              </div>
              <div className="flex items-center justify-center group">
                <MessageSquare className="w-5 h-5 mr-3 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">인증 전문 상담</span>
              </div>
            </div>
          </div>
        </div>

        {/* Apple-style Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
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
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
  Download
} from 'lucide-react';
import Link from 'next/link';
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              <Award className="w-4 h-4 mr-1" />
              KAB 인정 인증기관
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ESG 인증원 인증서비스
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              ISO 9001, ISO 14001, ISO 45001, ESG 경영시스템까지<br />
              기업의 지속가능한 성장을 위한 모든 인증을 지원합니다
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esg-certification/consultation">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Award className="w-5 h-5 mr-2" />
                  인증 신청하기
                </Button>
              </Link>
              <Link href="/esg-certification/services/cost">
                <Button variant="outline">
                  <FileText className="w-5 h-5 mr-2" />
                  심사비용 확인
                </Button>
              </Link>
            </div>
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
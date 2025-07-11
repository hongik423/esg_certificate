'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award,
  Building2,
  Users,
  Target,
  Shield,
  Leaf,
  Globe,
  CheckCircle,
  ChevronRight,
  Scale,
  Heart,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BadgeCheck
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';

// 연혁 데이터
const historyData = [
  {
    year: '2024',
    events: [
      { month: '12', content: 'KAB ESG 경영시스템 시범 인증기관 지정' },
      { month: '10', content: 'ISO 45001 안전보건경영시스템 인증기관 인정' },
      { month: '06', content: 'ISO 14001 환경경영시스템 인증기관 인정' }
    ]
  },
  {
    year: '2023',
    events: [
      { month: '09', content: 'ISO 9001 품질경영시스템 인증기관 인정' },
      { month: '03', content: 'KAB 인정심사 통과' },
      { month: '01', content: 'ESG 인증원 설립' }
    ]
  }
];

// 조직도 데이터
const organizationData = {
  ceo: {
    name: COMPANY_INFO.ceoName,
    title: '대표이사',
    departments: [
      {
        name: '인증사업부',
        teams: ['심사팀', '기술팀', '인증관리팀']
      },
      {
        name: '교육사업부',
        teams: ['교육기획팀', '교육운영팀']
      },
      {
        name: '경영지원부',
        teams: ['총무팀', '재무팀', '마케팅팀']
      }
    ]
  }
};

// 품질방침 데이터
const qualityPolicies = [
  {
    icon: Scale,
    title: '공평성',
    description: '모든 인증 활동에 있어 공평하고 객관적인 평가를 실시합니다.',
    details: [
      '독립적인 인증 결정 프로세스',
      '이해관계 상충 방지 시스템',
      '투명한 심사 기준 적용'
    ]
  },
  {
    icon: BadgeCheck,
    title: '전문성',
    description: '국제 기준에 부합하는 전문적인 인증 서비스를 제공합니다.',
    details: [
      '전문 심사원 양성 프로그램',
      '지속적인 역량 개발',
      '최신 인증 동향 반영'
    ]
  },
  {
    icon: Heart,
    title: '고객중심',
    description: '고객의 성공적인 인증 취득을 위해 최선을 다합니다.',
    details: [
      '맞춤형 인증 솔루션',
      '신속한 고객 응대',
      '사후관리 서비스'
    ]
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section with AI-Powered Dual Effects */}
      <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-48 h-48 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-purple-400 rounded-full blur-xl opacity-20 animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-indigo-400 rounded-full blur-xl opacity-20 animate-pulse delay-3000"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-300 rounded-full animate-bounce delay-500"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-indigo-300 rounded-full animate-bounce delay-1200"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <Badge className="mb-6 bg-green-100 text-green-700 border-green-200 animate-pulse hover:scale-105 transition-transform duration-300">
              <Award className="w-4 h-4 mr-1 animate-spin-slow" />
              KAB 인정 인증기관
            </Badge>
            
            {/* Main Title with Gradient Animation */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                {COMPANY_INFO.name}
              </span>
              <br />
              <span className="text-gray-800">소개</span>
            </h1>
            
            {/* Subtitle with Typewriter Effect */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-fade-in-up delay-300">
              {COMPANY_INFO.slogan}
            </p>
            
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up delay-500">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-green-600">KAB</div>
                <div className="text-sm text-gray-600">인정기관</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-blue-600">4+</div>
                <div className="text-sm text-gray-600">인증분야</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-gray-600">신뢰성</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-indigo-600">24/7</div>
                <div className="text-sm text-gray-600">상담지원</div>
              </div>
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-700">
              <Link href="/esg-certification/consultation">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <Award className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  인증 신청하기
                </Button>
              </Link>
              <Link href="/consultation">
                <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  전문가 상담
                </Button>
              </Link>
            </div>
            
            {/* Core Values with Icons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in-up delay-1000">
              {COMPANY_INFO.coreValues.map((value, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="text-3xl mb-2 group-hover:animate-bounce">
                    {value.split(' ')[0]}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {value.split(' ').slice(1).join(' ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      
      {/* Custom CSS for Additional Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1200 {
          animation-delay: 1.2s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
        
        .delay-3000 {
          animation-delay: 3s;
        }
      `}</style>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="greeting" className="max-w-6xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
              <TabsTrigger value="greeting">인사말</TabsTrigger>
              <TabsTrigger value="history">연혁</TabsTrigger>
              <TabsTrigger value="organization">조직도</TabsTrigger>
              <TabsTrigger value="policy">품질방침</TabsTrigger>
            </TabsList>

            {/* 인사말 */}
            <TabsContent value="greeting" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-2 space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        대표이사 인사말
                      </h2>
                      
                      <div className="prose prose-lg max-w-none text-gray-700">
                        <p>
                          안녕하십니까,<br />
                          {COMPANY_INFO.name} 대표이사 {COMPANY_INFO.ceoName}입니다.
                        </p>
                        
                        <p>
                          저희 {COMPANY_INFO.name}은 한국인정지원센터(KAB)로부터 인정받은 
                          ESG 경영시스템 시범 인증기관으로서, 기업의 지속가능한 성장을 위한 
                          최고의 인증 서비스를 제공하고 있습니다.
                        </p>
                        
                        <p>
                          ISO 9001, ISO 14001, ISO 45001 그리고 ESG 경영시스템 인증을 통해 
                          고객 기업이 국제적 수준의 경영시스템을 구축하고, 글로벌 경쟁력을 
                          확보할 수 있도록 전문적이고 공정한 인증 서비스를 제공하겠습니다.
                        </p>
                        
                        <p>
                          {COMPANY_INFO.vision}
                        </p>
                        
                        <p>
                          감사합니다.
                        </p>
                        
                        <div className="mt-8 pt-8 border-t">
                          <p className="font-semibold">
                            {COMPANY_INFO.name} 대표이사 <span className="text-xl">{COMPANY_INFO.ceoName}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Card className="bg-gray-50">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <Building2 className="w-5 h-5 mr-2 text-green-600" />
                            연락처
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-start">
                            <Phone className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">전화</p>
                              <p className="font-medium">{CONTACT_INFO.officePhone}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Phone className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">상담문의</p>
                              <p className="font-medium">{CONTACT_INFO.mainPhone}</p>
                              <p className="text-xs text-gray-500">{CONSULTANT_INFO.fullTitle}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Mail className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">이메일</p>
                              <p className="font-medium text-sm">{CONTACT_INFO.mainEmail}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">주소</p>
                              <p className="font-medium text-sm">{COMPANY_INFO.address}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 연혁 */}
            <TabsContent value="history" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-green-600" />
                    ESG 인증원 연혁
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {historyData.map((yearData) => (
                      <div key={yearData.year} className="relative">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                            {yearData.year}
                          </div>
                          <div className="flex-1 h-px bg-gray-300 ml-4"></div>
                        </div>
                        
                        <div className="ml-8 space-y-4">
                          {yearData.events.map((event, index) => (
                            <div key={index} className="flex items-start">
                              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mr-4">
                                {event.month}월
                              </div>
                              <p className="text-gray-700 flex-1">{event.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 조직도 */}
            <TabsContent value="organization" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-6 h-6 mr-2 text-green-600" />
                    조직 구성
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center">
                    {/* CEO */}
                    <div className="inline-block">
                      <Card className="bg-green-600 text-white">
                        <CardContent className="px-8 py-4">
                          <h3 className="text-xl font-bold">{organizationData.ceo.title}</h3>
                          <p className="text-lg">{organizationData.ceo.name}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Connection Line */}
                    <div className="w-px h-12 bg-gray-300 mx-auto"></div>
                    
                    {/* Departments */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {organizationData.ceo.departments.map((dept, index) => (
                        <div key={index}>
                          <Card className="bg-blue-50 border-blue-200">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg text-blue-700">
                                {dept.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {dept.teams.map((team, idx) => (
                                  <div key={idx} className="bg-white px-3 py-2 rounded text-sm text-gray-700">
                                    {team}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 품질방침 */}
            <TabsContent value="policy" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-6 h-6 mr-2 text-green-600" />
                    품질방침
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {COMPANY_INFO.mission}
                    </h3>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                      {COMPANY_INFO.name}은 다음의 3대 품질방침을 바탕으로 
                      고객에게 최고의 인증 서비스를 제공합니다.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {qualityPolicies.map((policy, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <policy.icon className="w-8 h-8 text-green-600" />
                          </div>
                          <CardTitle className="text-xl text-center">
                            {policy.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-center mb-4">
                            {policy.description}
                          </p>
                          <ul className="space-y-2">
                            {policy.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            인증에 대한 모든 것, 전문가와 상담하세요
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
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-5 h-5 mr-2" />
                전문가 상담 신청
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 
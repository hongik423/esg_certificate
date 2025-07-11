'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf,
  CheckCircle,
  Recycle,
  TreePine,
  Droplets,
  Wind,
  Award,
  Building2,
  FileText,
  Calendar,
  Phone,
  Download,
  ArrowRight,
  Clock,
  DollarSign,
  Globe,
  Star,
  Lightbulb,
  Shield,
  BookOpen,
  BarChart3,
  Target,
  TrendingUp,
  Users,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';
import DownloadSection from '@/components/ui/download-section';
import { getDocumentsByCategory } from '@/lib/utils/download-handler';

// 환경경영 핵심 요소
const environmentalElements = [
  {
    title: '환경 정책',
    description: '조직의 환경 의지와 방향을 명시하는 최고 수준의 선언',
    icon: FileText,
    details: [
      '환경 보호 및 오염 예방 의지',
      '법적 요구사항 준수 약속',
      '지속적 개선 의지 표명',
      '이해관계자 소통 및 공개'
    ]
  },
  {
    title: '환경 측면 식별',
    description: '조직 활동이 환경에 미치는 영향 요소 파악',
    icon: Target,
    details: [
      '환경 측면 및 영향 식별',
      '중요 환경 측면 결정',
      '생애주기 관점 고려',
      '정기적 검토 및 업데이트'
    ]
  },
  {
    title: '법적 요구사항',
    description: '환경 관련 법규 및 규제 사항 관리',
    icon: Shield,
    details: [
      '적용 법규 식별 및 관리',
      '법규 준수 평가',
      '법규 변경사항 모니터링',
      '위반 시 시정조치'
    ]
  },
  {
    title: '환경 목표',
    description: '환경 성과 개선을 위한 구체적 목표 설정',
    icon: TrendingUp,
    details: [
      '환경 목표 및 세부목표 설정',
      '달성 가능하고 측정 가능한 목표',
      '환경 정책과의 일치성',
      '정기적 검토 및 개정'
    ]
  },
  {
    title: '자원 및 역량',
    description: '환경경영시스템 운영을 위한 자원 제공',
    icon: Users,
    details: [
      '인적 자원 확보',
      '기술적 자원 제공',
      '재정적 자원 할당',
      '역량 개발 및 교육'
    ]
  },
  {
    title: '운영 관리',
    description: '환경 영향을 관리하기 위한 운영 절차 수립',
    icon: BarChart3,
    details: [
      '운영 절차 문서화',
      '관리 기준 설정',
      '비상사태 대응',
      '공급업체 관리'
    ]
  },
  {
    title: '모니터링',
    description: '환경 성과 측정 및 모니터링',
    icon: BarChart3,
    details: [
      '환경 성과 측정',
      '모니터링 계획 수립',
      '측정 장비 교정',
      '데이터 분석 및 평가'
    ]
  },
  {
    title: '내부심사',
    description: '환경경영시스템의 효과성 평가',
    icon: CheckCircle,
    details: [
      '내부심사 계획 수립',
      '심사원 자격 및 독립성',
      '심사 결과 보고',
      '시정조치 이행'
    ]
  }
];

// 환경 영향 분야
const environmentalAspects = [
  {
    category: '대기 환경',
    icon: Wind,
    color: 'blue',
    items: [
      '온실가스 배출',
      '대기오염물질 배출',
      '악취 발생',
      '소음 및 진동'
    ]
  },
  {
    category: '수질 환경',
    icon: Droplets,
    color: 'blue',
    items: [
      '폐수 배출',
      '수질오염물질',
      '지하수 오염',
      '용수 사용량'
    ]
  },
  {
    category: '토양 환경',
    icon: TreePine,
    color: 'green',
    items: [
      '토양 오염',
      '화학물질 누출',
      '폐기물 매립',
      '토지 이용 변화'
    ]
  },
  {
    category: '자원 관리',
    icon: Recycle,
    color: 'orange',
    items: [
      '폐기물 발생',
      '재활용 및 재사용',
      '자원 소비',
      '에너지 사용'
    ]
  }
];

// 도입 효과
const benefits = [
  {
    category: '환경 성과',
    icon: Leaf,
    color: 'green',
    items: [
      '환경 오염 저감',
      '자원 사용 효율성 향상',
      '에너지 절약',
      '폐기물 감소'
    ]
  },
  {
    category: '법적 준수',
    icon: Shield,
    color: 'blue',
    items: [
      '환경 법규 준수',
      '법적 리스크 감소',
      '규제 대응 능력 향상',
      '정부 정책 부합'
    ]
  },
  {
    category: '경제적 효과',
    icon: DollarSign,
    color: 'green',
    items: [
      '운영비용 절감',
      '에너지 비용 절약',
      '폐기물 처리비용 감소',
      '보험료 절감'
    ]
  },
  {
    category: '기업 이미지',
    icon: Star,
    color: 'purple',
    items: [
      '친환경 기업 이미지',
      '브랜드 가치 향상',
      '고객 신뢰도 증대',
      '투자자 관심 증가'
    ]
  }
];

// 적용 업종
const applicableIndustries = [
  {
    industry: '제조업',
    description: '화학, 철강, 자동차, 전자 등',
    risks: ['대기오염', '폐수배출', '화학물질', '폐기물'],
    benefits: ['환경규제 대응', '원가절감', '품질향상']
  },
  {
    industry: '건설업',
    description: '토목, 건축, 플랜트 등',
    risks: ['토양오염', '소음진동', '분진발생', '폐기물'],
    benefits: ['환경영향 최소화', '민원 감소', '수주 경쟁력']
  },
  {
    industry: '서비스업',
    description: '물류, 유통, 금융 등',
    risks: ['에너지소비', '종이사용', '교통배출', '폐기물'],
    benefits: ['운영비 절감', '기업 이미지', '직원 만족도']
  },
  {
    industry: '공공기관',
    description: '정부기관, 공기업 등',
    risks: ['에너지소비', '자원사용', '폐기물', '교통배출'],
    benefits: ['정책 부합', '모범 사례', '예산 절감']
  }
];

export default function ISO14001Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              <Leaf className="w-4 h-4 mr-1" />
              ISO 14001:2015
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ISO 14001 환경경영시스템
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              환경 보호와 지속가능한 발전을 위한<br />
              체계적인 환경경영시스템 구축
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esg-certification/consultation">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Calendar className="w-5 h-5 mr-2" />
                  인증 신청하기
                </Button>
              </Link>
              <Link href="/esg-certification/services/cost">
                <Button variant="outline">
                  <DollarSign className="w-5 h-5 mr-2" />
                  비용 확인하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 개요 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">ISO 14001이란?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    ISO 14001은 환경경영시스템에 대한 국제표준으로, 조직이 환경 성과를 개선하고 
                    환경 의무를 이행하며 환경 목표를 달성할 수 있도록 지원하는 체계적인 접근법을 제공합니다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">환경 보호</h3>
                      <p className="text-sm text-gray-600">환경 오염 예방 및 보호</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">법규 준수</h3>
                      <p className="text-sm text-gray-600">환경 법규 및 규제 준수</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">지속적 개선</h3>
                      <p className="text-sm text-gray-600">환경 성과의 지속적 개선</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 상세 정보 탭 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="elements" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="elements">핵심 요소</TabsTrigger>
                <TabsTrigger value="aspects">환경 측면</TabsTrigger>
                <TabsTrigger value="benefits">도입 효과</TabsTrigger>
                <TabsTrigger value="industries">적용 업종</TabsTrigger>
              </TabsList>

              {/* 핵심 요소 */}
              <TabsContent value="elements">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">환경경영시스템 핵심 요소</h3>
                  <p className="text-gray-600 mb-8">
                    ISO 14001 환경경영시스템의 주요 구성 요소를 소개합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {environmentalElements.map((element, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <element.icon className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{element.title}</CardTitle>
                            <p className="text-sm text-gray-600">{element.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <ul className="space-y-2">
                          {element.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 환경 측면 */}
              <TabsContent value="aspects">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">주요 환경 측면</h3>
                  <p className="text-gray-600 mb-8">
                    조직 활동이 환경에 미치는 주요 영향 분야를 확인하세요.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {environmentalAspects.map((aspect, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 bg-${aspect.color}-100 rounded-full flex items-center justify-center`}>
                            <aspect.icon className={`w-6 h-6 text-${aspect.color}-600`} />
                          </div>
                          <CardTitle className="text-lg">{aspect.category}</CardTitle>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <ul className="space-y-3">
                          {aspect.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 도입 효과 */}
              <TabsContent value="benefits">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ISO 14001 도입 효과</h3>
                  <p className="text-gray-600 mb-8">
                    환경경영시스템 도입을 통해 얻을 수 있는 다양한 효과를 확인하세요.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 bg-${benefit.color}-100 rounded-full flex items-center justify-center`}>
                            <benefit.icon className={`w-6 h-6 text-${benefit.color}-600`} />
                          </div>
                          <CardTitle className="text-lg">{benefit.category}</CardTitle>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <ul className="space-y-3">
                          {benefit.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 적용 업종 */}
              <TabsContent value="industries">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">업종별 적용 사례</h3>
                  <p className="text-gray-600 mb-8">
                    다양한 업종에서의 ISO 14001 적용 사례와 효과를 확인하세요.
                  </p>
                </div>

                <div className="space-y-6">
                  {applicableIndustries.map((industry, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{industry.industry}</CardTitle>
                            <p className="text-gray-600 mt-1">{industry.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              주요 환경 리스크
                            </h4>
                            <ul className="space-y-1">
                              {industry.risks.map((risk, idx) => (
                                <li key={idx} className="text-sm text-gray-600">• {risk}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="md:col-span-2">
                            <h4 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              기대 효과
                            </h4>
                            <ul className="space-y-1">
                              {industry.benefits.map((benefit, idx) => (
                                <li key={idx} className="text-sm text-gray-600">• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* 성공 사례 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ISO 14001 인증 성공 사례
            </h2>
            <p className="text-lg text-gray-600">
              다양한 업종에서의 환경경영시스템 구축 성공 사례
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-green-100 text-green-700">화학업</Badge>
                <CardTitle className="text-lg">D 화학 제조업체</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 대기오염물질 30% 감소</li>
                  <li>• 폐수 처리 효율 95% 달성</li>
                  <li>• 환경 법규 100% 준수</li>
                  <li>• 환경 비용 20% 절감</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-blue-100 text-blue-700">건설업</Badge>
                <CardTitle className="text-lg">E 건설업체</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 건설 폐기물 50% 감소</li>
                  <li>• 소음 민원 80% 감소</li>
                  <li>• 친환경 건설 인증 획득</li>
                  <li>• 대형 프로젝트 수주 증가</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-purple-100 text-purple-700">물류업</Badge>
                <CardTitle className="text-lg">F 물류업체</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 연료 사용량 25% 절감</li>
                  <li>• 탄소 배출량 30% 감소</li>
                  <li>• 친환경 물류 브랜드 구축</li>
                  <li>• 그린 파트너십 체결</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 자료 다운로드 */}
      <DownloadSection
        title="ISO 14001 관련 자료 다운로드"
        description="환경경영시스템 구축과 관련된 상세 자료를 다운로드하실 수 있습니다"
        documents={[
          ...getDocumentsByCategory('iso-14001'),
          ...getDocumentsByCategory('application'),
          ...getDocumentsByCategory('cost')
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ISO 14001 인증을 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            환경경영시스템 구축을 통해 지속가능한 기업으로 성장하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/esg-certification/consultation">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" />
                무료 상담 신청
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
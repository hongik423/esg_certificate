'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield,
  CheckCircle,
  AlertTriangle,
  HardHat,
  Heart,
  Activity,
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
  BookOpen,
  BarChart3,
  Target,
  TrendingUp,
  Users,
  Eye,
  Wrench,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';
import DownloadSection from '@/components/ui/download-section';
import { getDocumentsByCategory } from '@/lib/utils/download-handler';

// 안전보건경영시스템 핵심 요소
const ohsElements = [
  {
    title: '안전보건 정책',
    description: '조직의 안전보건에 대한 의지와 방향을 명시',
    icon: FileText,
    details: [
      '최고경영진의 안전보건 의지 표명',
      '근로자 참여 및 협의 약속',
      '법적 요구사항 준수 의지',
      '지속적 개선 및 성과 향상'
    ]
  },
  {
    title: '위험성 평가',
    description: '작업장 내 위험요소 식별 및 평가',
    icon: AlertTriangle,
    details: [
      '위험요소 체계적 식별',
      '위험성 평가 및 분석',
      '허용 가능한 위험 수준 결정',
      '위험 통제 방안 수립'
    ]
  },
  {
    title: '법적 요구사항',
    description: '안전보건 관련 법규 및 규제 준수',
    icon: Shield,
    details: [
      '산업안전보건법 준수',
      '관련 법규 모니터링',
      '법적 의무사항 이행',
      '규제 변경사항 대응'
    ]
  },
  {
    title: '안전보건 목표',
    description: '안전보건 성과 개선을 위한 목표 설정',
    icon: Target,
    details: [
      '측정 가능한 목표 설정',
      '안전보건 정책과 일치',
      '위험성 평가 결과 반영',
      '정기적 검토 및 개정'
    ]
  },
  {
    title: '역량 및 인식',
    description: '안전보건 역량 강화 및 인식 제고',
    icon: Users,
    details: [
      '안전보건 교육 실시',
      '역량 요구사항 파악',
      '인식 제고 활동',
      '교육 효과성 평가'
    ]
  },
  {
    title: '의사소통',
    description: '안전보건 정보의 효과적 소통',
    icon: Users,
    details: [
      '내부 의사소통 체계',
      '외부 이해관계자 소통',
      '근로자 참여 및 협의',
      '정보 공유 및 피드백'
    ]
  },
  {
    title: '운영 관리',
    description: '안전보건 위험을 통제하기 위한 운영 절차',
    icon: BarChart3,
    details: [
      '운영 절차 수립',
      '안전작업 기준 설정',
      '비상사태 대응',
      '계약업체 관리'
    ]
  },
  {
    title: '성과 모니터링',
    description: '안전보건 성과 측정 및 평가',
    icon: BarChart3,
    details: [
      '성과 지표 설정',
      '모니터링 계획 수립',
      '측정 결과 분석',
      '개선 기회 식별'
    ]
  }
];

// 주요 위험 요소
const hazardTypes = [
  {
    category: '물리적 위험',
    icon: Wrench,
    color: 'red',
    items: [
      '기계 및 장비 위험',
      '낙하 및 추락',
      '화재 및 폭발',
      '소음 및 진동'
    ]
  },
  {
    category: '화학적 위험',
    icon: Zap,
    color: 'orange',
    items: [
      '유해화학물질',
      '가스 및 증기',
      '분진 및 흄',
      '방사선 노출'
    ]
  },
  {
    category: '생물학적 위험',
    icon: Activity,
    color: 'green',
    items: [
      '세균 및 바이러스',
      '곰팡이 및 효모',
      '감염성 물질',
      '알레르기 유발 물질'
    ]
  },
  {
    category: '인간공학적 위험',
    icon: Users,
    color: 'blue',
    items: [
      '반복 작업',
      '부적절한 자세',
      '과도한 힘 사용',
      '작업 환경 부적합'
    ]
  }
];

// 도입 효과
const benefits = [
  {
    category: '사고 예방',
    icon: Shield,
    color: 'red',
    items: [
      '산업재해 감소',
      '사고 발생률 저하',
      '안전사고 제로 달성',
      '위험 상황 사전 예방'
    ]
  },
  {
    category: '법적 준수',
    icon: FileText,
    color: 'blue',
    items: [
      '산업안전보건법 준수',
      '법적 리스크 감소',
      '규제 대응 능력 향상',
      '처벌 및 과태료 회피'
    ]
  },
  {
    category: '경제적 효과',
    icon: DollarSign,
    color: 'green',
    items: [
      '보상비용 절감',
      '생산성 향상',
      '보험료 절감',
      '의료비 절약'
    ]
  },
  {
    category: '조직 문화',
    icon: Heart,
    color: 'purple',
    items: [
      '안전 문화 정착',
      '직원 만족도 향상',
      '기업 이미지 개선',
      '인재 유치 및 보유'
    ]
  }
];

// 적용 업종
const applicableIndustries = [
  {
    industry: '제조업',
    description: '기계, 화학, 철강, 자동차 등',
    risks: ['기계 위험', '화학물질', '소음', '화재폭발'],
    benefits: ['사고 예방', '생산성 향상', '법규 준수', '품질 향상']
  },
  {
    industry: '건설업',
    description: '토목, 건축, 플랜트 건설 등',
    risks: ['추락', '낙하물', '중장비', '전기'],
    benefits: ['중대재해 예방', '공기 단축', '품질 향상', '수주 경쟁력']
  },
  {
    industry: '운송업',
    description: '육상, 해상, 항공 운송 등',
    risks: ['교통사고', '화물 취급', '연료', '피로'],
    benefits: ['교통사고 감소', '운송 효율성', '연료 절약', '고객 신뢰']
  },
  {
    industry: '서비스업',
    description: '병원, 학교, 사무실 등',
    risks: ['감염', '화재', '전기', '스트레스'],
    benefits: ['직원 안전', '서비스 품질', '고객 만족', '법적 보호']
  }
];

// 성공 사례
const successCases = [
  {
    company: 'G 제조업체',
    industry: '자동차 부품',
    badge: '제조업',
    badgeColor: 'blue',
    results: [
      '산업재해 90% 감소',
      '안전사고 제로 달성',
      '생산성 25% 향상',
      '보험료 30% 절감'
    ]
  },
  {
    company: 'H 건설업체',
    industry: '대형 건설',
    badge: '건설업',
    badgeColor: 'orange',
    results: [
      '중대재해 제로 달성',
      '안전 관리비 20% 절감',
      '공기 단축 15% 달성',
      '우수 건설업체 선정'
    ]
  },
  {
    company: 'I 물류업체',
    industry: '종합 물류',
    badge: '물류업',
    badgeColor: 'green',
    results: [
      '교통사고 70% 감소',
      '근골격계 질환 50% 감소',
      '운송 효율성 20% 향상',
      '고객 만족도 95% 달성'
    ]
  }
];

export default function ISO45001Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">
              <Shield className="w-4 h-4 mr-1" />
              ISO 45001:2018
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ISO 45001 안전보건경영시스템
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              근로자의 안전과 건강을 보호하는<br />
              체계적인 안전보건경영시스템 구축
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esg-certification/consultation">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
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
                <CardTitle className="text-2xl">ISO 45001이란?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    ISO 45001은 안전보건경영시스템에 대한 국제표준으로, 조직이 근로자와 기타 이해관계자의 
                    안전과 건강을 보호하고 안전보건 성과를 지속적으로 개선할 수 있도록 지원하는 체계입니다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HardHat className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="font-semibold mb-2">근로자 보호</h3>
                      <p className="text-sm text-gray-600">안전하고 건강한 작업환경 조성</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="font-semibold mb-2">사고 예방</h3>
                      <p className="text-sm text-gray-600">산업재해 및 직업병 예방</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">성과 개선</h3>
                      <p className="text-sm text-gray-600">안전보건 성과의 지속적 개선</p>
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
                <TabsTrigger value="hazards">위험 요소</TabsTrigger>
                <TabsTrigger value="benefits">도입 효과</TabsTrigger>
                <TabsTrigger value="industries">적용 업종</TabsTrigger>
              </TabsList>

              {/* 핵심 요소 */}
              <TabsContent value="elements">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">안전보건경영시스템 핵심 요소</h3>
                  <p className="text-gray-600 mb-8">
                    ISO 45001 안전보건경영시스템의 주요 구성 요소를 소개합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ohsElements.map((element, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <element.icon className="w-6 h-6 text-orange-600" />
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

              {/* 위험 요소 */}
              <TabsContent value="hazards">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">주요 위험 요소</h3>
                  <p className="text-gray-600 mb-8">
                    작업장에서 발생할 수 있는 주요 위험 요소를 분류별로 확인하세요.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {hazardTypes.map((hazard, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 bg-${hazard.color}-100 rounded-full flex items-center justify-center`}>
                            <hazard.icon className={`w-6 h-6 text-${hazard.color}-600`} />
                          </div>
                          <CardTitle className="text-lg">{hazard.category}</CardTitle>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <ul className="space-y-3">
                          {hazard.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ISO 45001 도입 효과</h3>
                  <p className="text-gray-600 mb-8">
                    안전보건경영시스템 도입을 통해 얻을 수 있는 다양한 효과를 확인하세요.
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
                    다양한 업종에서의 ISO 45001 적용 사례와 효과를 확인하세요.
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              주요 위험 요소
                            </h4>
                            <ul className="space-y-1">
                              {industry.risks.map((risk, idx) => (
                                <li key={idx} className="text-sm text-gray-600">• {risk}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
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
              ISO 45001 인증 성공 사례
            </h2>
            <p className="text-lg text-gray-600">
              다양한 업종에서의 안전보건경영시스템 구축 성공 사례
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {successCases.map((case_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <Badge className={`mb-2 w-fit bg-${case_.badgeColor}-100 text-${case_.badgeColor}-700`}>
                    {case_.badge}
                  </Badge>
                  <CardTitle className="text-lg">{case_.company}</CardTitle>
                  <p className="text-sm text-gray-600">{case_.industry}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {case_.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 자료 다운로드 */}
      <DownloadSection
        title="ISO 45001 관련 자료 다운로드"
        description="안전보건경영시스템 구축과 관련된 상세 자료를 다운로드하실 수 있습니다"
        documents={[
          ...getDocumentsByCategory('iso-45001'),
          ...getDocumentsByCategory('application'),
          ...getDocumentsByCategory('cost')
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ISO 45001 인증을 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            안전보건경영시스템 구축을 통해 근로자의 안전과 건강을 보호하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/esg-certification/consultation">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
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
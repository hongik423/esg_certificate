'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe,
  CheckCircle,
  Leaf,
  Users,
  Building2,
  BarChart3,
  Award,
  FileText,
  Calendar,
  Phone,
  Download,
  ArrowRight,
  Clock,
  DollarSign,
  Star,
  Lightbulb,
  Shield,
  BookOpen,
  Target,
  TrendingUp,
  Heart,
  Recycle,
  Handshake,
  Eye,
  Scale,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';
import DownloadSection from '@/components/ui/download-section';
import { getDocumentsByCategory } from '@/lib/utils/download-handler';

// ESG 3대 요소
const esgElements = [
  {
    category: 'Environmental',
    title: '환경 (E)',
    description: '환경 보호 및 지속가능성',
    icon: Leaf,
    color: 'green',
    details: [
      '온실가스 배출 관리',
      '에너지 효율성 개선',
      '폐기물 관리 및 재활용',
      '수자원 보호 및 관리',
      '생물 다양성 보전',
      '친환경 제품 및 서비스'
    ]
  },
  {
    category: 'Social',
    title: '사회 (S)',
    description: '사회적 책임 및 이해관계자 관리',
    icon: Users,
    color: 'blue',
    details: [
      '인권 보호 및 노동 기준',
      '직원 안전 및 복지',
      '다양성 및 포용성',
      '지역사회 기여',
      '고객 만족 및 제품 안전',
      '공급망 관리'
    ]
  },
  {
    category: 'Governance',
    title: '지배구조 (G)',
    description: '투명하고 윤리적인 경영',
    icon: Shield,
    color: 'purple',
    details: [
      '이사회 독립성 및 다양성',
      '윤리경영 및 준법',
      '투명한 정보 공개',
      '리스크 관리',
      '이해관계자 소통',
      '반부패 및 내부통제'
    ]
  }
];

// ESG 경영시스템 구성 요소
const managementElements = [
  {
    title: 'ESG 전략 수립',
    description: '조직의 ESG 비전과 전략 방향 설정',
    icon: Target,
    details: [
      'ESG 비전 및 미션 정립',
      '중대성 평가 실시',
      'ESG 전략 로드맵 수립',
      '이해관계자 참여 계획'
    ]
  },
  {
    title: 'ESG 거버넌스',
    description: 'ESG 경영을 위한 조직 체계 구축',
    icon: Building2,
    details: [
      'ESG 위원회 설치',
      '역할 및 책임 정의',
      '의사결정 프로세스',
      '보고 체계 구축'
    ]
  },
  {
    title: 'ESG 정책 및 절차',
    description: 'ESG 관련 정책과 운영 절차 수립',
    icon: FileText,
    details: [
      'ESG 정책 수립',
      '운영 절차 문서화',
      '가이드라인 제공',
      '교육 및 훈련 계획'
    ]
  },
  {
    title: 'ESG 성과 관리',
    description: 'ESG 성과 측정 및 개선 활동',
    icon: BarChart3,
    details: [
      'KPI 설정 및 측정',
      '성과 모니터링',
      '개선 계획 수립',
      '지속적 개선 활동'
    ]
  },
  {
    title: 'ESG 공시 및 소통',
    description: '이해관계자와의 투명한 소통',
    icon: Eye,
    details: [
      '지속가능경영보고서',
      '이해관계자 소통',
      '외부 평가 대응',
      '투명성 제고'
    ]
  },
  {
    title: 'ESG 리스크 관리',
    description: 'ESG 관련 위험 요소 식별 및 관리',
    icon: Shield,
    details: [
      '리스크 식별 및 평가',
      '대응 전략 수립',
      '모니터링 체계',
      '위기 대응 계획'
    ]
  }
];

// 도입 효과
const benefits = [
  {
    category: '재무적 성과',
    icon: DollarSign,
    color: 'green',
    items: [
      '투자 유치 기회 확대',
      '자금 조달 비용 절감',
      '신용 등급 개선',
      '장기적 수익성 향상'
    ]
  },
  {
    category: '시장 경쟁력',
    icon: TrendingUp,
    color: 'blue',
    items: [
      '브랜드 가치 향상',
      '고객 신뢰도 증대',
      '시장 차별화',
      '글로벌 진출 기회'
    ]
  },
  {
    category: '리스크 관리',
    icon: Shield,
    color: 'red',
    items: [
      '규제 리스크 감소',
      '평판 리스크 관리',
      '운영 리스크 완화',
      '공급망 안정성'
    ]
  },
  {
    category: '조직 역량',
    icon: Users,
    color: 'purple',
    items: [
      '인재 유치 및 보유',
      '직원 만족도 향상',
      '혁신 역량 강화',
      '조직 문화 개선'
    ]
  }
];

// 업종별 ESG 이슈
const industryIssues = [
  {
    industry: '제조업',
    description: '생산 과정의 환경 영향 및 노동 조건',
    keyIssues: [
      '온실가스 배출',
      '폐기물 관리',
      '작업장 안전',
      '공급망 관리'
    ],
    solutions: [
      '친환경 생산 공정',
      '에너지 효율성',
      '안전보건 시스템',
      '지속가능한 공급망'
    ]
  },
  {
    industry: '금융업',
    description: '투자 및 대출의 ESG 영향 고려',
    keyIssues: [
      '책임 투자',
      '금융 접근성',
      '데이터 보안',
      '윤리적 영업'
    ],
    solutions: [
      'ESG 투자 상품',
      '포용적 금융',
      '정보 보안 강화',
      '윤리경영 체계'
    ]
  },
  {
    industry: '건설업',
    description: '건설 과정의 환경 및 사회적 영향',
    keyIssues: [
      '건설 폐기물',
      '소음 및 분진',
      '근로자 안전',
      '지역사회 영향'
    ],
    solutions: [
      '친환경 건설 기법',
      '환경 영향 최소화',
      '안전 관리 시스템',
      '지역사회 소통'
    ]
  },
  {
    industry: 'IT/서비스업',
    description: '디지털 전환과 사회적 책임',
    keyIssues: [
      '에너지 소비',
      '디지털 격차',
      '개인정보 보호',
      '일과 삶의 균형'
    ],
    solutions: [
      '그린 IT 도입',
      '디지털 접근성',
      '프라이버시 보호',
      '유연근무 제도'
    ]
  }
];

// 글로벌 ESG 동향
const globalTrends = [
  {
    region: '유럽연합 (EU)',
    policy: 'EU 택소노미',
    description: '지속가능한 경제활동 분류체계',
    impact: '환경적으로 지속가능한 투자 기준 제시'
  },
  {
    region: '미국',
    policy: 'SEC ESG 공시 규정',
    description: '기후 관련 정보 공시 의무화',
    impact: '상장기업 ESG 정보 투명성 강화'
  },
  {
    region: '한국',
    policy: 'K-택소노미',
    description: '한국형 녹색분류체계',
    impact: '녹색금융 활성화 및 ESG 투자 확산'
  },
  {
    region: '글로벌',
    policy: 'TCFD 권고안',
    description: '기후 관련 재무정보 공개',
    impact: '기업의 기후 리스크 관리 강화'
  }
];

export default function ESGManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              <Globe className="w-4 h-4 mr-1" />
              ESG Management System
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ESG 경영시스템 인증
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              환경·사회·지배구조를 통합한<br />
              지속가능한 경영시스템 구축
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esg-certification/consultation">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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

      {/* ESG 개요 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">ESG 경영시스템이란?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    ESG 경영시스템은 환경(Environmental), 사회(Social), 지배구조(Governance)를 
                    통합적으로 관리하는 경영 체계로, 기업의 지속가능한 성장과 사회적 가치 창출을 
                    목표로 하는 체계적인 접근법입니다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {esgElements.map((element, index) => (
                      <div key={index} className="text-center">
                        <div className={`w-16 h-16 bg-${element.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <element.icon className={`w-8 h-8 text-${element.color}-600`} />
                        </div>
                        <h3 className="font-semibold mb-2">{element.title}</h3>
                        <p className="text-sm text-gray-600">{element.description}</p>
                      </div>
                    ))}
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
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="elements">ESG 요소</TabsTrigger>
                <TabsTrigger value="system">시스템 구성</TabsTrigger>
                <TabsTrigger value="benefits">도입 효과</TabsTrigger>
                <TabsTrigger value="industries">업종별 이슈</TabsTrigger>
                <TabsTrigger value="trends">글로벌 동향</TabsTrigger>
              </TabsList>

              {/* ESG 3대 요소 */}
              <TabsContent value="elements">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ESG 3대 핵심 요소</h3>
                  <p className="text-gray-600 mb-8">
                    환경, 사회, 지배구조 각 영역의 주요 관리 요소를 확인하세요.
                  </p>
                </div>

                <div className="space-y-8">
                  {esgElements.map((element, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 bg-${element.color}-100 rounded-full flex items-center justify-center`}>
                            <element.icon className={`w-8 h-8 text-${element.color}-600`} />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{element.title}</CardTitle>
                            <Badge variant="outline" className="mt-2">{element.category}</Badge>
                            <p className="text-gray-600 mt-2">{element.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {element.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 시스템 구성 */}
              <TabsContent value="system">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ESG 경영시스템 구성 요소</h3>
                  <p className="text-gray-600 mb-8">
                    효과적인 ESG 경영을 위한 시스템 구성 요소를 소개합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {managementElements.map((element, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <element.icon className="w-6 h-6 text-purple-600" />
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

              {/* 도입 효과 */}
              <TabsContent value="benefits">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ESG 경영시스템 도입 효과</h3>
                  <p className="text-gray-600 mb-8">
                    ESG 경영시스템 도입을 통해 얻을 수 있는 다양한 효과를 확인하세요.
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

              {/* 업종별 이슈 */}
              <TabsContent value="industries">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">업종별 ESG 주요 이슈</h3>
                  <p className="text-gray-600 mb-8">
                    업종별 ESG 핵심 이슈와 해결 방안을 확인하세요.
                  </p>
                </div>

                <div className="space-y-6">
                  {industryIssues.map((industry, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg">{industry.industry}</CardTitle>
                        <p className="text-gray-600">{industry.description}</p>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              주요 ESG 이슈
                            </h4>
                            <ul className="space-y-2">
                              {industry.keyIssues.map((issue, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <ArrowRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              해결 방안
                            </h4>
                            <ul className="space-y-2">
                              {industry.solutions.map((solution, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{solution}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 글로벌 동향 */}
              <TabsContent value="trends">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">글로벌 ESG 동향</h3>
                  <p className="text-gray-600 mb-8">
                    전 세계 ESG 정책 동향과 기업에 미치는 영향을 파악하세요.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {globalTrends.map((trend, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Globe className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{trend.region}</CardTitle>
                            <Badge variant="outline" className="mt-1">{trend.policy}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-sm text-gray-800 mb-1">정책 내용</h4>
                            <p className="text-sm text-gray-600">{trend.description}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-gray-800 mb-1">기업 영향</h4>
                            <p className="text-sm text-gray-600">{trend.impact}</p>
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
              ESG 경영시스템 구축 성공 사례
            </h2>
            <p className="text-lg text-gray-600">
              다양한 업종에서의 ESG 경영시스템 구축 성공 사례
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-green-100 text-green-700">제조업</Badge>
                <CardTitle className="text-lg">J 전자 제조업체</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 탄소 중립 목표 설정</li>
                  <li>• 재생에너지 100% 전환</li>
                  <li>• ESG 평가 A등급 획득</li>
                  <li>• 지속가능 투자 유치</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-blue-100 text-blue-700">금융업</Badge>
                <CardTitle className="text-lg">K 금융지주</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 책임 투자 원칙 도입</li>
                  <li>• ESG 금융 상품 확대</li>
                  <li>• 디지털 포용 금융</li>
                  <li>• 글로벌 ESG 지수 편입</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-purple-100 text-purple-700">유통업</Badge>
                <CardTitle className="text-lg">L 유통업체</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 친환경 매장 운영</li>
                  <li>• 지역사회 상생 프로그램</li>
                  <li>• 공정거래 인증 획득</li>
                  <li>• 브랜드 가치 20% 상승</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 자료 다운로드 */}
      <DownloadSection
        title="ESG 경영시스템 관련 자료 다운로드"
        description="ESG 경영시스템 구축과 관련된 상세 자료를 다운로드하실 수 있습니다"
        documents={[
          ...getDocumentsByCategory('esg'),
          ...getDocumentsByCategory('application'),
          ...getDocumentsByCategory('cost')
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ESG 경영시스템 인증을 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            지속가능한 경영을 통해 기업의 미래 가치를 창출하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/esg-certification/consultation">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
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
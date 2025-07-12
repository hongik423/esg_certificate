'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BadgeCheck,
  CheckCircle,
  Users,
  Target,
  TrendingUp,
  Award,
  Building2,
  FileText,
  Calendar,
  Phone,
  Download,
  ArrowLeft,
  ArrowRight,
  Clock,
  DollarSign,
  Globe,
  Star,
  Lightbulb,
  Shield,
  BookOpen,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';
import DownloadSection from '@/components/ui/download-section';
import { getDocumentsByCategory } from '@/lib/utils/download-handler';

// ISO 9001 핵심 원칙
const qualityPrinciples = [
  {
    title: '고객 중심',
    description: '고객의 요구사항과 기대를 충족하고 초과하는 것',
    icon: Users,
    details: [
      '고객 요구사항 파악 및 분석',
      '고객 만족도 측정 및 개선',
      '고객 피드백 시스템 구축',
      '고객 중심의 프로세스 설계'
    ]
  },
  {
    title: '리더십',
    description: '조직의 목적과 방향을 설정하고 내부 환경을 조성',
    icon: Target,
    details: [
      '품질 정책 및 목표 설정',
      '조직 문화 및 가치관 확립',
      '직원 참여 및 동기 부여',
      '리더십 역량 개발'
    ]
  },
  {
    title: '직원 참여',
    description: '모든 수준의 직원이 조직의 목표 달성에 기여',
    icon: Users,
    details: [
      '직원 역량 개발 및 교육',
      '권한 위임 및 책임 부여',
      '팀워크 및 협업 강화',
      '직원 제안 시스템 운영'
    ]
  },
  {
    title: '프로세스 접근법',
    description: '상호 관련된 프로세스를 시스템으로 관리',
    icon: BarChart3,
    details: [
      '프로세스 식별 및 매핑',
      '프로세스 성과 측정',
      '프로세스 개선 활동',
      '프로세스 간 상호작용 관리'
    ]
  },
  {
    title: '개선',
    description: '조직의 전반적인 성과를 지속적으로 개선',
    icon: TrendingUp,
    details: [
      '지속적 개선 문화 조성',
      '개선 기회 식별 및 활용',
      '혁신 활동 추진',
      '개선 성과 측정 및 평가'
    ]
  },
  {
    title: '증거 기반 의사결정',
    description: '데이터와 정보 분석에 기반한 의사결정',
    icon: BarChart3,
    details: [
      '데이터 수집 및 분석',
      '통계적 기법 활용',
      '정보 시스템 구축',
      '의사결정 과정 문서화'
    ]
  },
  {
    title: '관계 관리',
    description: '이해관계자와의 상호 이익이 되는 관계 관리',
    icon: Building2,
    details: [
      '공급업체 관계 관리',
      '파트너십 구축',
      '이해관계자 소통',
      '협력 네트워크 구축'
    ]
  }
];

// ISO 9001 요구사항
const requirements = [
  {
    clause: '4. 조직의 상황',
    title: '조직 상황 분석',
    description: '조직의 내외부 환경과 이해관계자 요구사항 파악',
    items: [
      '내외부 이슈 파악',
      '이해관계자 요구사항 결정',
      '품질경영시스템 범위 결정',
      '프로세스 접근법 적용'
    ]
  },
  {
    clause: '5. 리더십',
    title: '리더십 및 의지',
    description: '최고경영진의 리더십과 품질에 대한 의지 표명',
    items: [
      '품질 정책 수립',
      '조직 역할 및 책임 정의',
      '고객 중심 문화 조성',
      '품질 목표 설정'
    ]
  },
  {
    clause: '6. 기획',
    title: '품질경영시스템 기획',
    description: '위험과 기회를 고려한 품질경영시스템 기획',
    items: [
      '위험 및 기회 식별',
      '품질 목표 수립',
      '목표 달성 계획 수립',
      '변경 관리 계획'
    ]
  },
  {
    clause: '7. 지원',
    title: '지원 프로세스',
    description: '품질경영시스템 운영을 위한 자원 및 지원 제공',
    items: [
      '자원 제공',
      '역량 및 인식 제고',
      '의사소통 관리',
      '문서화된 정보 관리'
    ]
  },
  {
    clause: '8. 운영',
    title: '운영 프로세스',
    description: '제품 및 서비스 제공을 위한 운영 프로세스 관리',
    items: [
      '운영 기획 및 관리',
      '제품 및 서비스 요구사항',
      '설계 및 개발',
      '외부 제공 프로세스 관리'
    ]
  },
  {
    clause: '9. 성과평가',
    title: '성과 평가',
    description: '품질경영시스템의 성과 모니터링 및 평가',
    items: [
      '모니터링 및 측정',
      '고객 만족도 평가',
      '분석 및 평가',
      '내부심사 실시'
    ]
  },
  {
    clause: '10. 개선',
    title: '지속적 개선',
    description: '부적합 관리 및 지속적 개선 활동',
    items: [
      '부적합 및 시정조치',
      '지속적 개선',
      '예방조치 실시',
      '개선 성과 평가'
    ]
  }
];

// 도입 효과
const benefits = [
  {
    category: '품질 향상',
    icon: Award,
    color: 'blue',
    items: [
      '제품/서비스 품질 향상',
      '고객 만족도 증대',
      '불량률 감소',
      '품질 비용 절감'
    ]
  },
  {
    category: '경영 효율성',
    icon: TrendingUp,
    color: 'green',
    items: [
      '업무 프로세스 표준화',
      '업무 효율성 향상',
      '의사결정 체계 개선',
      '조직 운영 최적화'
    ]
  },
  {
    category: '시장 경쟁력',
    icon: Globe,
    color: 'purple',
    items: [
      '국제 시장 진출 기회',
      '대기업 납품 자격 획득',
      '브랜드 신뢰도 향상',
      '마케팅 도구 활용'
    ]
  },
  {
    category: '조직 역량',
    icon: Users,
    color: 'orange',
    items: [
      '직원 역량 강화',
      '조직 문화 개선',
      '리더십 역량 향상',
      '팀워크 강화'
    ]
  }
];

export default function ISO9001Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <Link href="/esg-certification/services" className="absolute top-4 left-4">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            인증서비스로 돌아가기
          </Button>
        </Link>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              <BadgeCheck className="w-4 h-4 mr-1" />
              ISO 9001:2015
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ISO 9001 품질경영시스템
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              고객 만족과 지속적 개선을 통한<br />
              조직의 품질 경쟁력 강화
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esg-certification/consultation">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
                <CardTitle className="text-2xl">ISO 9001이란?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    ISO 9001은 품질경영시스템에 대한 국제표준으로, 조직이 고객과 기타 이해관계자의 
                    요구사항을 충족하는 제품과 서비스를 일관되게 제공할 수 있는 능력을 입증하는 인증입니다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold mb-2">국제 표준</h3>
                      <p className="text-sm text-gray-600">170개국 이상에서 인정받는 국제 표준</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">고객 중심</h3>
                      <p className="text-sm text-gray-600">고객 만족을 최우선으로 하는 경영 시스템</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">지속적 개선</h3>
                      <p className="text-sm text-gray-600">PDCA 사이클을 통한 지속적 개선</p>
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
            <Tabs defaultValue="principles" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="principles">7대 원칙</TabsTrigger>
                <TabsTrigger value="requirements">요구사항</TabsTrigger>
                <TabsTrigger value="benefits">도입 효과</TabsTrigger>
                <TabsTrigger value="process">인증 절차</TabsTrigger>
              </TabsList>

              {/* 7대 원칙 */}
              <TabsContent value="principles">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">품질경영 7대 원칙</h3>
                  <p className="text-gray-600 mb-8">
                    ISO 9001의 기반이 되는 7가지 품질경영 원칙을 소개합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {qualityPrinciples.map((principle, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <principle.icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{principle.title}</CardTitle>
                            <p className="text-sm text-gray-600">{principle.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <ul className="space-y-2">
                          {principle.details.map((detail, idx) => (
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

              {/* 요구사항 */}
              <TabsContent value="requirements">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ISO 9001 요구사항</h3>
                  <p className="text-gray-600 mb-8">
                    ISO 9001:2015 표준의 주요 요구사항을 조항별로 설명합니다.
                  </p>
                </div>

                <div className="space-y-6">
                  {requirements.map((req, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{req.title}</CardTitle>
                            <Badge variant="outline" className="mt-2">{req.clause}</Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 mt-2">{req.description}</p>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {req.items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* 도입 효과 */}
              <TabsContent value="benefits">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ISO 9001 도입 효과</h3>
                  <p className="text-gray-600 mb-8">
                    ISO 9001 인증을 통해 얻을 수 있는 다양한 효과를 확인하세요.
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

              {/* 인증 절차 */}
              <TabsContent value="process">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">ISO 9001 인증 절차</h3>
                  <p className="text-gray-600 mb-8">
                    ISO 9001 인증 취득을 위한 단계별 절차를 안내합니다.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-8">
                      <div className="text-center mb-8">
                        <h4 className="text-xl font-semibold mb-4">예상 소요 기간: 3-4개월</h4>
                        <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>문서 심사: 1-2주</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            <span>현장 심사: 2-3일</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            <span>인증서 발급: 1-2주</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Link href="/esg-certification/services/process">
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            <FileText className="w-4 h-4 mr-2" />
                            상세 인증 절차 보기
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
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
              ISO 9001 인증 성공 사례
            </h2>
            <p className="text-lg text-gray-600">
              다양한 업종에서의 ISO 9001 인증 성공 사례를 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Badge className="mb-2 w-fit">제조업</Badge>
                <CardTitle className="text-lg">A 전자부품 제조업체</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 불량률 50% 감소</li>
                  <li>• 고객 만족도 95% 달성</li>
                  <li>• 대기업 납품 계약 체결</li>
                  <li>• 매출 30% 증가</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Badge className="mb-2 w-fit">서비스업</Badge>
                <CardTitle className="text-lg">B 물류 서비스업체</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 배송 정확도 99% 달성</li>
                  <li>• 고객 불만 80% 감소</li>
                  <li>• 업무 효율성 40% 향상</li>
                  <li>• 신규 고객 50% 증가</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <Badge className="mb-2 w-fit">건설업</Badge>
                <CardTitle className="text-lg">C 건설업체</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 공사 품질 향상</li>
                  <li>• 안전사고 제로 달성</li>
                  <li>• 공기 단축 20% 달성</li>
                  <li>• 대형 프로젝트 수주</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 자료 다운로드 */}
      <DownloadSection
        title="ISO 9001 관련 자료 다운로드"
        description="ISO 9001 인증과 관련된 상세 자료를 다운로드하실 수 있습니다"
        documents={[
          ...getDocumentsByCategory('iso-9001'),
          ...getDocumentsByCategory('application'),
          ...getDocumentsByCategory('cost')
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ISO 9001 인증을 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            품질경영시스템 구축을 통해 기업의 경쟁력을 강화하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/esg-certification/consultation">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
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
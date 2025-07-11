'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  Phone,
  Mail,
  Calendar,
  Users,
  Building2,
  Award,
  Clock,
  Target,
  Book,
  Scale,
  Eye,
  Gavel,
  BadgeCheck,
  Leaf,
  Globe,
  AlertCircle,
  Info,
  Star,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';
import DownloadSection from '@/components/ui/download-section';
import { getDocumentsByCategory } from '@/lib/utils/download-handler';

// 기업준수사항 카테고리
const complianceCategories = [
  {
    id: 'general',
    title: '일반 준수사항',
    icon: Shield,
    color: 'blue',
    description: '모든 인증에 공통으로 적용되는 기본 준수사항',
    items: [
      {
        title: '인증서 사용 규정',
        description: '인증서는 인증 범위 내에서만 사용 가능',
        mandatory: true,
        details: [
          '인증서에 명시된 범위 내에서만 사용',
          '인증서 복사본 사용 시 원본임을 명시',
          '인증서 변조 또는 위조 금지',
          '인증 취소 시 즉시 사용 중단'
        ]
      },
      {
        title: '인증마크 사용 규정',
        description: '인증마크는 승인된 형태로만 사용',
        mandatory: true,
        details: [
          '인증기관이 제공한 공식 마크만 사용',
          '마크 크기, 색상, 위치 규정 준수',
          '제품이나 서비스에 직접 부착 금지',
          '광고 및 홍보물에 올바른 방법으로 사용'
        ]
      },
      {
        title: '시스템 유지 관리',
        description: '인증받은 시스템의 지속적 운영 및 개선',
        mandatory: true,
        details: [
          '품질경영시스템의 지속적 운영',
          '정기적인 내부심사 실시',
          '시정 및 예방조치 이행',
          '지속적 개선 활동 수행'
        ]
      }
    ]
  },
  {
    id: 'iso-9001',
    title: 'ISO 9001 준수사항',
    icon: BadgeCheck,
    color: 'blue',
    description: '품질경영시스템 인증 관련 특별 준수사항',
    items: [
      {
        title: '고객 만족도 관리',
        description: '고객 만족도 측정 및 개선 활동',
        mandatory: true,
        details: [
          '고객 만족도 조사 정기 실시',
          '고객 불만 처리 시스템 운영',
          '고객 피드백 반영 체계 구축',
          '고객 만족도 개선 계획 수립'
        ]
      },
      {
        title: '품질 기록 관리',
        description: '품질 관련 모든 기록의 체계적 관리',
        mandatory: true,
        details: [
          '품질 기록의 식별 및 보관',
          '기록의 검색 및 보호 체계',
          '기록 보존 기간 설정 및 관리',
          '전자 기록 시스템 운영'
        ]
      },
      {
        title: '공급업체 관리',
        description: '공급업체 평가 및 관리 체계 운영',
        mandatory: true,
        details: [
          '공급업체 선정 기준 수립',
          '공급업체 정기 평가 실시',
          '공급업체 성과 모니터링',
          '부적합 공급업체 관리'
        ]
      }
    ]
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001 준수사항',
    icon: Leaf,
    color: 'green',
    description: '환경경영시스템 인증 관련 특별 준수사항',
    items: [
      {
        title: '환경법규 준수',
        description: '관련 환경법규 및 규제 사항 준수',
        mandatory: true,
        details: [
          '환경법규 모니터링 체계 구축',
          '법규 변경사항 정기 검토',
          '법규 위반 시 즉시 시정조치',
          '법규 준수 증빙 자료 관리'
        ]
      },
      {
        title: '환경 목표 관리',
        description: '환경 목표 설정 및 달성 관리',
        mandatory: true,
        details: [
          '환경 목표 및 세부목표 설정',
          '목표 달성 계획 수립',
          '정기적인 성과 모니터링',
          '목표 달성도 평가 및 개선'
        ]
      },
      {
        title: '환경 영향 평가',
        description: '환경 영향 요소 식별 및 평가',
        mandatory: true,
        details: [
          '환경 영향 요소 정기 검토',
          '중요 환경 영향 관리',
          '환경 영향 저감 활동',
          '환경 성과 측정 및 보고'
        ]
      }
    ]
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001 준수사항',
    icon: Shield,
    color: 'orange',
    description: '안전보건경영시스템 인증 관련 특별 준수사항',
    items: [
      {
        title: '안전보건 법규 준수',
        description: '산업안전보건법 등 관련 법규 준수',
        mandatory: true,
        details: [
          '산업안전보건법 준수',
          '안전보건 관리규정 운영',
          '안전보건 교육 실시',
          '사고 예방 및 대응 체계'
        ]
      },
      {
        title: '위험성 평가',
        description: '작업장 위험요소 식별 및 평가',
        mandatory: true,
        details: [
          '정기적인 위험성 평가 실시',
          '위험요소 개선 조치',
          '근로자 참여 체계 구축',
          '위험성 평가 결과 활용'
        ]
      },
      {
        title: '사고 조사 및 보고',
        description: '사고 발생 시 조사 및 보고 체계',
        mandatory: true,
        details: [
          '사고 즉시 보고 체계',
          '사고 원인 조사 실시',
          '재발 방지 대책 수립',
          '사고 통계 관리'
        ]
      }
    ]
  },
  {
    id: 'esg',
    title: 'ESG 경영시스템 준수사항',
    icon: Globe,
    color: 'purple',
    description: '지속가능경영 인증 관련 특별 준수사항',
    items: [
      {
        title: 'ESG 정보 공개',
        description: 'ESG 성과 및 활동 정보의 투명한 공개',
        mandatory: true,
        details: [
          'ESG 보고서 정기 발간',
          '이해관계자 소통 채널 운영',
          'ESG 성과 지표 공개',
          '제3자 검증 실시'
        ]
      },
      {
        title: '지배구조 투명성',
        description: '투명하고 책임감 있는 지배구조 운영',
        mandatory: true,
        details: [
          '이사회 독립성 확보',
          '내부통제 시스템 운영',
          '리스크 관리 체계 구축',
          '윤리경영 실천'
        ]
      },
      {
        title: '사회적 책임 이행',
        description: '사회적 가치 창출 및 책임 이행',
        mandatory: true,
        details: [
          '인권 존중 정책 수립',
          '지역사회 공헌 활동',
          '공정거래 실천',
          '다양성 및 포용성 증진'
        ]
      }
    ]
  }
];

// 위반 시 조치사항
const violationActions = [
  {
    level: '경고',
    description: '경미한 위반 사항에 대한 서면 경고',
    color: 'yellow',
    icon: AlertTriangle,
    examples: [
      '인증마크 사용 규정 위반',
      '경미한 문서 관리 미흡',
      '교육 실시 지연'
    ]
  },
  {
    level: '시정조치',
    description: '일정 기간 내 시정조치 요구',
    color: 'orange',
    icon: AlertCircle,
    examples: [
      '시스템 운영 부적합',
      '법규 준수 미흡',
      '고객 불만 처리 지연'
    ]
  },
  {
    level: '인증 정지',
    description: '인증의 일시적 정지',
    color: 'red',
    icon: Shield,
    examples: [
      '중대한 시스템 결함',
      '법규 위반 지속',
      '시정조치 미이행'
    ]
  },
  {
    level: '인증 취소',
    description: '인증의 완전 취소',
    color: 'red',
    icon: Gavel,
    examples: [
      '고의적 위반 행위',
      '시스템 운영 중단',
      '허위 정보 제공'
    ]
  }
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              <Scale className="w-4 h-4 mr-1" />
              준수사항 안내
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              기업 준수사항
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              인증 취득 후 지켜야 할 중요한 준수사항들을<br />
              명확하게 안내해드립니다
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esg-certification/consultation">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Calendar className="w-5 h-5 mr-2" />
                  상담 신청하기
                </Button>
              </Link>
              <Link href="/esg-certification/services/process">
                <Button variant="outline">
                  <FileText className="w-5 h-5 mr-2" />
                  인증 절차 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 중요 공지 */}
      <section className="py-8 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      중요 안내사항
                    </h3>
                    <p className="text-blue-800 mb-3">
                      인증 취득 후 아래 준수사항을 반드시 이행하셔야 합니다. 
                      위반 시 인증 정지 또는 취소 조치가 취해질 수 있습니다.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>정기적인 사후관리 심사 실시</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 준수사항 탭 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              인증별 준수사항
            </h2>
            <p className="text-lg text-gray-600">
              각 인증별 특별 준수사항을 확인하세요
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
                {complianceCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {complianceCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-${category.color}-100 rounded-full flex items-center justify-center`}>
                        <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.items.map((item, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            {item.mandatory && (
                              <Badge variant="destructive" className="ml-2">
                                필수
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </CardHeader>
                        
                        <CardContent>
                          <ul className="space-y-2">
                            {item.details.map((detail, idx) => (
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
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* 위반 시 조치사항 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              위반 시 조치사항
            </h2>
            <p className="text-lg text-gray-600">
              준수사항 위반 정도에 따른 조치 단계
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {violationActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-${action.color}-100 rounded-full flex items-center justify-center`}>
                      <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                    </div>
                    <Badge variant={action.color === 'red' ? 'destructive' : 'secondary'}>
                      {index + 1}단계
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{action.level}</CardTitle>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </CardHeader>
                
                <CardContent>
                  <h4 className="font-semibold text-sm mb-2">주요 사례</h4>
                  <ul className="space-y-1">
                    {action.examples.map((example, idx) => (
                      <li key={idx} className="text-xs text-gray-600">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 사후관리 안내 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              사후관리 심사
            </h2>
            <p className="text-lg text-gray-600">
              인증 유지를 위한 정기적인 사후관리 심사 안내
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">정기 심사</h3>
                <p className="text-gray-600 mb-4">
                  인증 후 매년 1회 정기 심사 실시
                </p>
                <div className="text-2xl font-bold text-blue-600">연 1회</div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">갱신 심사</h3>
                <p className="text-gray-600 mb-4">
                  인증서 만료 전 갱신 심사 실시
                </p>
                <div className="text-2xl font-bold text-green-600">3년마다</div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">특별 심사</h3>
                <p className="text-gray-600 mb-4">
                  필요시 특별 심사 실시
                </p>
                <div className="text-2xl font-bold text-purple-600">수시</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 지원 서비스 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              준수사항 지원 서비스
            </h2>
            <p className="text-lg text-gray-600">
              기업의 준수사항 이행을 위한 다양한 지원 서비스
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  교육 및 컨설팅
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    준수사항 이행 교육
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    맞춤형 컨설팅 제공
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    정기 점검 서비스
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    개선 방안 제시
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  기술 지원
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    전화 상담 지원
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    온라인 자료 제공
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    FAQ 및 가이드
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    정기 뉴스레터
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 자료 다운로드 */}
      <DownloadSection
        title="관련 자료 다운로드"
        description="준수사항 관련 상세 자료를 다운로드하실 수 있습니다"
        documents={[
          ...getDocumentsByCategory('compliance'),
          ...getDocumentsByCategory('application')
        ]}
        className="py-16"
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            준수사항에 대해 궁금하신가요?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            전문가와 상담하여 정확한 정보를 얻으세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/esg-certification/consultation">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" />
                상담 신청하기
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
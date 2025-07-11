'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle,
  Clock,
  FileText,
  Search,
  Award,
  AlertCircle,
  Download,
  Phone,
  Mail,
  Calendar,
  Users,
  Building2,
  Target,
  ArrowRight,
  Shield,
  Leaf,
  Globe,
  BadgeCheck
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';
import DownloadSection from '@/components/ui/download-section';
import { getDocumentsByCategory } from '@/lib/utils/download-handler';

// 인증 프로세스 단계
const certificationSteps = [
  {
    step: 1,
    title: '인증 상담',
    description: '기업 현황 파악 및 인증 범위 결정',
    duration: '1-2일',
    details: [
      '기업 현황 및 요구사항 파악',
      '인증 범위 및 적용 표준 결정',
      '인증 일정 및 비용 안내',
      '맞춤형 인증 전략 수립'
    ],
    icon: Users,
    color: 'blue'
  },
  {
    step: 2,
    title: '신청서 제출',
    description: '인증 신청서 작성 및 필요 서류 제출',
    duration: '1-2일',
    details: [
      '인증 신청서 작성',
      '회사 소개서 및 조직도 제출',
      '품질매뉴얼 및 절차서 검토',
      '심사 계약서 체결'
    ],
    icon: FileText,
    color: 'green'
  },
  {
    step: 3,
    title: '문서 심사 (1차)',
    description: '품질경영시스템 문서의 적합성 검토',
    duration: '1-2주',
    details: [
      '품질매뉴얼 검토',
      '절차서 및 지침서 검토',
      '문서 부적합 사항 통보',
      '문서 수정 및 보완'
    ],
    icon: Search,
    color: 'orange'
  },
  {
    step: 4,
    title: '현장 심사 (2차)',
    description: '현장에서 시스템 운영 상태 확인',
    duration: '2-3일',
    details: [
      '경영진 인터뷰',
      '부서별 시스템 운영 확인',
      '기록 및 문서 검토',
      '부적합 사항 지적 및 개선 요구'
    ],
    icon: Building2,
    color: 'purple'
  },
  {
    step: 5,
    title: '시정조치',
    description: '부적합 사항에 대한 개선 조치',
    duration: '2-4주',
    details: [
      '부적합 사항 원인 분석',
      '시정조치 계획 수립',
      '개선 조치 실행',
      '시정조치 보고서 제출'
    ],
    icon: Target,
    color: 'red'
  },
  {
    step: 6,
    title: '인증서 발급',
    description: '심사 결과 검토 및 인증서 발급',
    duration: '1-2주',
    details: [
      '심사 결과 종합 검토',
      '인증 위원회 심의',
      '인증서 발급 및 전달',
      '인증 마크 사용 권한 부여'
    ],
    icon: Award,
    color: 'green'
  }
];

// 인증 종류별 특성
const certificationTypes = [
  {
    id: 'iso-9001',
    title: 'ISO 9001',
    subtitle: '품질경영시스템',
    icon: BadgeCheck,
    color: 'blue',
    duration: '3-4개월',
    description: '고객 만족과 지속적 개선을 위한 품질경영시스템 구축'
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001',
    subtitle: '환경경영시스템',
    icon: Leaf,
    color: 'green',
    duration: '3-4개월',
    description: '환경 성과 개선과 지속가능경영을 위한 환경경영시스템 구축'
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001',
    subtitle: '안전보건경영시스템',
    icon: Shield,
    color: 'orange',
    duration: '3-4개월',
    description: '안전하고 건강한 작업환경 구축을 위한 안전보건경영시스템'
  },
  {
    id: 'esg',
    title: 'ESG 경영시스템',
    subtitle: '지속가능경영 인증',
    icon: Globe,
    color: 'purple',
    duration: '4-5개월',
    description: 'ESG 경영 체계화를 통한 지속가능한 기업 운영'
  }
];

export default function CertificationProcessPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              <Award className="w-4 h-4 mr-1" />
              KAB 인정 인증기관
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              인증 절차 안내
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              투명하고 체계적인 6단계 인증 프로세스로<br />
              신뢰할 수 있는 인증 서비스를 제공합니다
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esg-certification/consultation">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Calendar className="w-5 h-5 mr-2" />
                  인증 상담 신청
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

      {/* 인증 프로세스 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              인증 프로세스
            </h2>
            <p className="text-lg text-gray-600">
              6단계로 구성된 체계적인 인증 절차
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificationSteps.map((step, index) => (
                <Card key={index} className="relative hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-${step.color}-100 rounded-full flex items-center justify-center`}>
                        <step.icon className={`w-6 h-6 text-${step.color}-600`} />
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {step.duration}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 bg-${step.color}-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3`}>
                        {step.step}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                    
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 인증 종류별 특성 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              인증 종류별 특성
            </h2>
            <p className="text-lg text-gray-600">
              각 인증별 특성과 소요 기간을 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certificationTypes.map((cert) => (
              <Card key={cert.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-${cert.color}-100 rounded-full flex items-center justify-center mr-4`}>
                        <cert.icon className={`w-6 h-6 text-${cert.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{cert.title}</CardTitle>
                        <p className={`text-${cert.color}-600 font-medium`}>{cert.subtitle}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {cert.duration}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">{cert.description}</p>
                  <Link href={`/esg-certification/services/${cert.id}`}>
                    <Button variant="outline" className="w-full">
                      자세히 보기
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 특징 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ESG 인증원의 특징
            </h2>
            <p className="text-lg text-gray-600">
              신뢰할 수 있는 인증 서비스의 핵심 요소
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">전문 심사원</h3>
                <p className="text-gray-600">
                  각 분야별 전문 심사원이 객관적이고 공정한 심사를 진행합니다
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">KAB 인정</h3>
                <p className="text-gray-600">
                  한국인정지원센터(KAB) 인정을 받은 공신력 있는 인증기관입니다
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">신속한 처리</h3>
                <p className="text-gray-600">
                  효율적인 프로세스로 최단 기간 내 인증 취득을 지원합니다
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 자료 다운로드 */}
      <DownloadSection
        title="인증 관련 자료 다운로드"
        description="인증 절차와 관련된 상세 자료를 다운로드하실 수 있습니다"
        documents={[
          ...getDocumentsByCategory('application'),
          ...getDocumentsByCategory('cost'),
          ...getDocumentsByCategory('compliance'),
          ...getDocumentsByCategory('iso-9001'),
          ...getDocumentsByCategory('iso-14001'),
          ...getDocumentsByCategory('iso-45001')
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            인증 취득을 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            전문가와 상담하여 최적의 인증 전략을 수립하세요
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
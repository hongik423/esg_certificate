'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download,
  ChevronRight,
  Bot,
  Calculator,
  TrendingUp,
  Shield,
  Users,
  Database,
  Mail,
  GraduationCap,
  Award,
  DollarSign,
  Rocket,
  Globe,
  Phone,
  ArrowLeft,
  Eye,
  Calendar,
  User
} from 'lucide-react';
import Header from '@/components/layout/header';

const platformFeatures = [
  {
    id: 1,
    icon: Bot,
    title: 'AI 챗봇 상담 시스템',
    description: '24시간 무인 상담 서비스, 실시간 답변 제공',
    benefits: ['언제든지 전문 상담 가능', '즉시 답변으로 시간 절약', '상담 품질의 일관성 보장'],
    color: 'blue'
  },
  {
    id: 2,
    icon: Calculator,
    title: '세금계산기 시스템',
    description: '법인세, 소득세, 부가세 등 각종 세금 계산',
    benefits: ['2024년 최신 세법 반영', '실시간 계산 결과', 'PDF 리포트 생성'],
    color: 'green'
  },
  {
    id: 3,
    icon: TrendingUp,
    title: '투자타당성분석기',
    description: 'NPV, IRR, 회수기간 등 투자 분석',
    benefits: ['전문가 수준의 분석', '리스크 평가', 'AI 기반 투자 리포트'],
    color: 'purple'
  },
  {
    id: 4,
    icon: Shield,
    title: '통합 기업 진단',
    description: 'ISO 9001, 14001, 45001, ESG 진단',
    benefits: ['AI 기반 자동 분석', '개선 방안 제시', '맞춤형 컨설팅'],
    color: 'orange'
  },
  {
    id: 5,
    icon: Database,
    title: '구글 시트 연동 DB',
    description: '실시간 데이터 동기화 및 관리',
    benefits: ['클라우드 기반 접근', '자동 백업', '권한별 접근 제어'],
    color: 'indigo'
  },
  {
    id: 6,
    icon: Mail,
    title: '자동 이메일 시스템',
    description: '신청자 및 관리자 자동 알림',
    benefits: ['개인화된 메시지', '진행 상황 업데이트', '발송 결과 추적'],
    color: 'cyan'
  }
];

const businessBenefits = [
  { title: '업무 효율성 향상', value: '90%', description: '업무 자동화로 효율성 극대화' },
  { title: '비용 절감 효과', value: '70%', description: '인건비 및 운영비 대폭 절감' },
  { title: '시간 단축', value: '80%', description: '처리 시간 대폭 단축' },
  { title: '고객 만족도', value: '95%', description: '24시간 서비스로 만족도 향상' }
];

export default function PlatformFeaturesGuidePage() {
  const handleDownload = () => {
    // PDF 다운로드 처리
    const link = document.createElement('a');
    link.href = '/docs/esg_platform_features_guide.pdf';
    link.download = 'ESG_인증원_플랫폼_종합_기능_가이드.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 상단 배너 */}
      <div className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <span>HOME</span>
            <ChevronRight className="w-4 h-4" />
            <span>자료실</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-200">플랫폼 기능 가이드</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Link href="/resources" className="text-white/80 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-4xl font-bold">ESG 인증원 플랫폼 종합 기능 가이드</h1>
          </div>
          <p className="text-xl opacity-90">AI 기술을 활용한 차세대 인증 및 경영 지원 통합 솔루션</p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8">
        {/* 문서 정보 */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">플랫폼 종합 기능 가이드</h2>
                    <p className="text-gray-600">AI 기반 통합 솔루션의 모든 기능을 상세히 설명</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>ESG인증원</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>2025.01.20 10:00</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>조회 156</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">AI 플랫폼</Badge>
                  <Badge className="bg-green-100 text-green-800">종합 가이드</Badge>
                  <Badge className="bg-purple-100 text-purple-800">무료 제공</Badge>
                </div>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleDownload}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Download className="w-5 h-5 mr-2" />
                PDF 다운로드
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 플랫폼 개요 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">🌟 플랫폼 개요</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>ESG 인증원 플랫폼</strong>은 AI 기술을 활용한 차세대 인증 및 경영 지원 통합 솔루션입니다. 
              기업의 지속가능한 성장을 위한 모든 도구와 서비스를 한 곳에서 제공합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {businessBenefits.map((benefit, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{benefit.value}</div>
                  <div className="font-semibold text-gray-900 mb-1">{benefit.title}</div>
                  <div className="text-sm text-gray-600">{benefit.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 핵심 기능 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">🤖 AI 기반 핵심 기능</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platformFeatures.map((feature) => (
                <div key={feature.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-${feature.color}-100`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                      <div className="space-y-1">
                        {feature.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className={`w-2 h-2 rounded-full bg-${feature.color}-500`}></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 추가 서비스 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                교육 및 인증 서비스
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• AI 기반 맞춤형 교육 과정</li>
                <li>• ISO 내부심사원 양성 과정</li>
                <li>• ESG 경영 기본 과정</li>
                <li>• 자동 수료증 발급 시스템</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Rocket className="w-5 h-5 text-purple-600" />
                비즈니스 지원 도구
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 정책자금 연계 서비스</li>
                <li>• 기술창업 지원 시스템</li>
                <li>• 웹사이트 구축 서비스</li>
                <li>• 통합 관리자 대시보드</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 연락처 정보 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📞 문의 및 지원</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">기술 지원</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 24시간 기술 지원</li>
                  <li>• 원격 지원 서비스</li>
                  <li>• 사용자 교육 제공</li>
                  <li>• 정기 시스템 점검</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">연락처</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>010-9251-9743</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>hongik423@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>https://esg-certificate.vercel.app</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 하단 액션 */}
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            onClick={handleDownload}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mr-4"
          >
            <Download className="w-5 h-5 mr-2" />
            전체 가이드 PDF 다운로드
          </Button>
          <Link href="/consultation">
            <Button size="lg" variant="outline">
              <Phone className="w-5 h-5 mr-2" />
              전문가 상담 신청
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 
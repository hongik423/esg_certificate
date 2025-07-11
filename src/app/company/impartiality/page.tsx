'use client'

import React from 'react'
import { 
  Shield, 
  Users, 
  Award, 
  Target,
  Download,
  CheckCircle,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// 4대 핵심 원칙 데이터
const corePrinciples = [
  {
    icon: Shield,
    title: '독립성',
    description: '외부의 압력이나 영향 없이 독립적으로 심사를 수행합니다',
    details: [
      '심사원의 독립성 보장',
      '이해관계 상충 방지 정책',
      '외부 압력으로부터의 자유'
    ]
  },
  {
    icon: Users,
    title: '공정성',
    description: '모든 고객에게 동일한 기준과 절차를 적용합니다',
    details: [
      '표준화된 심사 절차',
      '일관된 평가 기준',
      '차별 없는 서비스 제공'
    ]
  },
  {
    icon: Award,
    title: '투명성',
    description: '인증 과정과 결과를 투명하게 공개합니다',
    details: [
      '심사 기준 공개',
      '처리 과정 실시간 공유',
      '결과에 대한 명확한 설명'
    ]
  },
  {
    icon: Target,
    title: '객관성',
    description: '사실과 증거에 기반한 객관적 심사를 실시합니다',
    details: [
      '증거 기반 평가',
      '데이터 중심 의사결정',
      '주관적 판단 배제'
    ]
  }
]

// 공평성 위원회 구성
const committeeMembers = [
  { role: '위원장', description: '외부 전문가 (대학교수 또는 변호사)' },
  { role: '위원', description: '인증 고객사 대표 2인' },
  { role: '위원', description: '소비자 단체 대표 1인' },
  { role: '위원', description: '품질경영 전문가 1인' },
  { role: '간사', description: 'ESG 인증원 품질관리팀장' }
]

export default function ImpartialityPage() {
  const handleDownload = () => {
    // PDF 다운로드 기능 구현
    const link = document.createElement('a')
    link.href = '/documents/공평성선언문.pdf'
    link.download = 'ESG인증원_공평성선언문.pdf'
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">공평성 선언</h1>
          <p className="text-xl">ESG 인증원은 공평하고 투명한 인증 서비스를 약속합니다</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 공평성 선언문 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">ESG 인증원 공평성 선언</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg text-center mb-8">
              <p className="text-lg leading-relaxed">
                ESG 인증원은 한국인정지원센터(KAB)로부터 인정받은 인증기관으로서,<br />
                모든 인증 활동에서 <strong>공평성</strong>을 최고의 가치로 삼고 있습니다.<br /><br />
                우리는 고객의 규모, 업종, 지역에 관계없이<br />
                동일한 기준과 절차를 적용하여 공정한 인증 서비스를 제공할 것을 선언합니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 4대 핵심 원칙 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">공평성 4대 핵심 원칙</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePrinciples.map((principle, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <principle.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                    <p className="text-gray-600 mb-4">{principle.description}</p>
                    <ul className="text-sm text-left w-full space-y-2">
                      {principle.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 공평성 보장 체계 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 공평성 위원회 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                공평성 위원회
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                ESG 인증원은 공평성을 보장하기 위해 외부 전문가를 포함한 공평성 위원회를 운영합니다.
              </p>
              <div className="space-y-3">
                {committeeMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <div>
                      <span className="font-medium">{member.role}:</span>
                      <span className="text-gray-600 ml-2">{member.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 공평성 관리 활동 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                공평성 관리 활동
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>정기 모니터링</strong>
                    <p className="text-sm text-gray-600">분기별 공평성 위험 분석 및 평가</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>이해관계 관리</strong>
                    <p className="text-sm text-gray-600">심사원 배정 시 이해관계 검토</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>불만사항 처리</strong>
                    <p className="text-sm text-gray-600">공평성 관련 불만의 체계적 관리</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <strong>교육 훈련</strong>
                    <p className="text-sm text-gray-600">전 직원 대상 공평성 교육 실시</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 서약 사항 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>우리의 약속</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">우리는 다음을 약속합니다:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <span>어떠한 외부 압력에도 굴복하지 않겠습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <span>모든 고객을 동등하게 대우하겠습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <span>투명한 심사 과정을 운영하겠습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <span>객관적인 증거에 기반하여 평가하겠습니다</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-red-700">우리는 다음을 하지 않겠습니다:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✕</span>
                    <span>컨설팅과 인증을 동시에 제공하지 않습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✕</span>
                    <span>이해관계가 있는 조직을 심사하지 않습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✕</span>
                    <span>심사 결과를 미리 약속하지 않습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✕</span>
                    <span>부당한 요구를 수용하지 않습니다</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 연락처 정보 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>공평성 관련 문의</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                공평성과 관련된 문의사항이나 불만사항이 있으시면 언제든지 연락주시기 바랍니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">연락처</h5>
                                      <p className="text-gray-600">전화: 010-9251-9743</p>
                  <p className="text-gray-600">이메일: hongik423@gmail.com</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">접수 시간</h5>
                  <p className="text-gray-600">평일 09:00 ~ 18:00</p>
                  <p className="text-gray-600">(토·일·공휴일 제외)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 다운로드 섹션 */}
        <Card className="text-center">
          <CardContent className="py-8">
            <h3 className="text-lg font-semibold mb-4">공평성 선언문 다운로드</h3>
            <p className="text-gray-600 mb-6">
              ESG 인증원의 공평성 선언문 전문을 PDF 파일로 다운로드하실 수 있습니다.
            </p>
            <Button 
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              공평성 선언문 다운로드 (PDF)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
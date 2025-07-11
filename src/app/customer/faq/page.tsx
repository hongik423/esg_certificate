'use client'

import React, { useState } from 'react'
import { Search, ChevronDown, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// FAQ 타입 정의
interface FAQ {
  id: string
  category: '인증' | '심사' | '비용' | '기타'
  question: string
  answer: string
  views: number
}

// 모의 데이터
const mockFAQs: FAQ[] = [
  // 인증 관련
  {
    id: '1',
    category: '인증',
    question: 'ISO 인증을 받으려면 어떤 준비가 필요한가요?',
    answer: `ISO 인증을 받기 위해서는 다음과 같은 준비가 필요합니다:

1. 경영시스템 구축: 해당 ISO 규격의 요구사항에 맞는 경영시스템을 구축해야 합니다.
2. 문서화: 매뉴얼, 절차서, 지침서 등 필요한 문서를 작성해야 합니다.
3. 실행 및 기록: 구축한 시스템을 최소 3개월 이상 운영하고 기록을 유지해야 합니다.
4. 내부심사: 인증 심사 전 내부심사를 실시하여 개선사항을 파악하고 조치해야 합니다.
5. 경영검토: 최고경영자의 경영검토를 실시해야 합니다.`,
    views: 1234
  },
  {
    id: '2',
    category: '인증',
    question: 'ESG 경영시스템 인증은 무엇인가요?',
    answer: `ESG 경영시스템 인증은 기업의 환경(Environmental), 사회(Social), 지배구조(Governance) 측면의 경영활동을 체계적으로 관리하고 있음을 제3자가 검증하는 인증제도입니다.

ESG 인증원은 한국인정지원센터(KAB)로부터 ESG 경영시스템 시범인증기관으로 지정받아, 국내 최초로 ESG 경영시스템 인증 서비스를 제공하고 있습니다.

인증을 통해 기업은 ESG 경영의 신뢰성을 확보하고, 이해관계자들에게 지속가능경영 노력을 객관적으로 입증할 수 있습니다.`,
    views: 890
  },
  {
    id: '3',
    category: '인증',
    question: '인증서의 유효기간은 얼마나 되나요?',
    answer: `ISO 인증서의 유효기간은 3년입니다. 

단, 인증의 유효성을 유지하기 위해서는:
- 매년 사후관리심사를 받아야 합니다 (1차년도, 2차년도)
- 3년 만료 전 갱신심사를 받아야 합니다
- 중대한 변경사항 발생 시 인증기관에 통보해야 합니다

사후관리심사를 받지 않거나 부적합사항을 시정하지 않을 경우 인증이 정지되거나 취소될 수 있습니다.`,
    views: 567
  },

  // 심사 관련
  {
    id: '4',
    category: '심사',
    question: '심사는 며칠 동안 진행되나요?',
    answer: `심사 일수는 인증 규격, 조직의 규모(종업원 수), 사업장 수, 업종의 복잡성 등에 따라 결정됩니다.

일반적인 심사 일수:
- 소규모 기업(50명 이하): 2-3일
- 중규모 기업(50-250명): 3-5일
- 대규모 기업(250명 이상): 5일 이상

복수 규격 통합심사 시에는 심사 일수가 단축될 수 있으며, 정확한 심사 일수는 신청서 검토 후 산정됩니다.`,
    views: 432
  },
  {
    id: '5',
    category: '심사',
    question: '심사 시 부적합이 발견되면 어떻게 하나요?',
    answer: `심사 시 부적합이 발견되면 다음과 같이 처리됩니다:

1. 중부적합: 시스템의 효과성에 중대한 영향을 미치는 경우
   - 30일 이내 시정조치 완료
   - 필요시 확인심사 실시

2. 경부적합: 시스템의 효과성에 경미한 영향을 미치는 경우
   - 90일 이내 시정조치 계획 제출
   - 다음 심사 시 조치결과 확인

모든 부적합사항이 적절히 시정되어야 인증서가 발급됩니다.`,
    views: 678
  },
  {
    id: '6',
    category: '심사',
    question: '원격심사도 가능한가요?',
    answer: `네, 특정 조건 하에서 원격심사(비대면 심사)가 가능합니다.

원격심사 가능 조건:
- COVID-19 등 불가피한 상황
- 고객사의 요청이 있는 경우
- ICT 기반 조직 등 원격심사가 적합한 경우

원격심사 진행 방법:
- 화상회의 시스템을 통한 인터뷰
- 전자문서 검토
- 현장 투어는 실시간 영상으로 대체

단, 일부 현장 확인이 필수적인 경우에는 부분적으로 현장심사가 병행될 수 있습니다.`,
    views: 345
  },

  // 비용 관련
  {
    id: '7',
    category: '비용',
    question: '인증 심사 비용은 어떻게 산정되나요?',
    answer: `인증 심사 비용은 다음 요소들을 고려하여 산정됩니다:

1. 심사원 수임료: 심사일수 × 일일 수임료
2. 인증 규격 및 범위
3. 조직의 규모(종업원 수)
4. 사업장 수 및 위치
5. 업종의 복잡성

비용 절감 방법:
- 복수 규격 통합심사 시 할인 적용
- 단체 신청 시 할인 가능
- 정기 프로모션 활용

정확한 견적은 홈페이지의 비용 계산기를 이용하거나 고객센터로 문의해 주시기 바랍니다.`,
    views: 1567
  },
  {
    id: '8',
    category: '비용',
    question: '심사 비용 외에 추가 비용이 있나요?',
    answer: `기본 심사 비용 외에 발생할 수 있는 추가 비용:

1. 출장비: 심사원의 교통비, 숙박비 (실비 정산)
2. 확인심사비: 중부적합 발생 시 확인심사가 필요한 경우
3. 특별심사비: 인증범위 확대, 변경 등의 경우
4. 인증서 재발급비: 분실, 변경 등으로 재발급이 필요한 경우

추가 비용 절감 팁:
- 심사원이 가까운 지역에서 배정되도록 요청
- 부적합 발생을 최소화하여 확인심사 방지
- 인증서 정보 변경을 최소화`,
    views: 890
  },

  // 기타
  {
    id: '9',
    category: '기타',
    question: '인증 마크는 어떻게 사용하나요?',
    answer: `인증 마크 사용 규정:

1. 사용 가능 범위:
   - 회사 홍보물 (브로슈어, 웹사이트 등)
   - 명함, 레터헤드
   - 차량, 건물 외벽

2. 사용 불가:
   - 제품 직접 표시
   - 제품 포장재 (단, 설명문구 병기 시 가능)
   - 오해를 유발하는 방식

3. 주의사항:
   - 인증범위를 명확히 표시
   - 지정된 색상과 비율 준수
   - 인증기관 로고와 함께 사용

자세한 사용 가이드라인은 인증서 발급 시 제공됩니다.`,
    views: 456
  },
  {
    id: '10',
    category: '기타',
    question: '인증 취소는 어떤 경우에 발생하나요?',
    answer: `인증 취소 사유:

1. 즉시 취소:
   - 고의적인 법규 위반
   - 인증 마크의 심각한 오남용
   - 심사 방해 또는 거부

2. 정지 후 취소:
   - 사후관리심사 미실시
   - 중부적합 미시정 (6개월 초과)
   - 인증 범위의 중대한 변경 미통보

3. 자진 반납:
   - 사업 중단 또는 폐업
   - 고객의 요청

인증 취소를 방지하려면 정기적인 사후관리심사를 받고, 변경사항을 즉시 통보해야 합니다.`,
    views: 234
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // 카테고리별 FAQ 필터링
  const getFilteredFAQs = (category?: string) => {
    let filtered = mockFAQs

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(
        faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 카테고리 필터링
    if (category && category !== 'all') {
      filtered = filtered.filter(faq => faq.category === category)
    }

    return filtered
  }

  // 카테고리별 FAQ 개수
  const getCategoryCount = (category: string) => {
    if (category === 'all') return mockFAQs.length
    return mockFAQs.filter(faq => faq.category === category).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">자주 묻는 질문</h1>
          <p className="text-xl">고객님들이 자주 문의하시는 내용을 정리했습니다</p>
        </div>
      </div>

      {/* 검색 영역 */}
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="궁금하신 내용을 검색해보세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-6 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* 카테고리 탭 및 FAQ 목록 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="all">
              전체 ({getCategoryCount('all')})
            </TabsTrigger>
            <TabsTrigger value="인증">
              인증 ({getCategoryCount('인증')})
            </TabsTrigger>
            <TabsTrigger value="심사">
              심사 ({getCategoryCount('심사')})
            </TabsTrigger>
            <TabsTrigger value="비용">
              비용 ({getCategoryCount('비용')})
            </TabsTrigger>
            <TabsTrigger value="기타">
              기타 ({getCategoryCount('기타')})
            </TabsTrigger>
          </TabsList>

          {/* 전체 탭 */}
          <TabsContent value="all">
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {getFilteredFAQs().map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-start gap-3 pr-4">
                          <HelpCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-2">
                              {faq.category}
                            </span>
                            <span className="font-medium">{faq.question}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-8 pr-4 text-gray-600 whitespace-pre-line">
                          {faq.answer}
                        </div>
                        <div className="pl-8 mt-4 text-sm text-gray-400">
                          조회수: {faq.views.toLocaleString()}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {getFilteredFAQs().length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">검색 결과가 없습니다.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 카테고리별 탭 */}
          {['인증', '심사', '비용', '기타'].map((category) => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {getFilteredFAQs(category).map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-start gap-3 pr-4">
                            <HelpCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="font-medium">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-8 pr-4 text-gray-600 whitespace-pre-line">
                            {faq.answer}
                          </div>
                          <div className="pl-8 mt-4 text-sm text-gray-400">
                            조회수: {faq.views.toLocaleString()}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {getFilteredFAQs(category).length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">검색 결과가 없습니다.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* 추가 문의 안내 */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              찾으시는 답변이 없으신가요?
            </h3>
            <p className="text-blue-700 mb-4">
              고객센터로 문의주시면 친절하게 답변드리겠습니다.
            </p>
            <div className="flex justify-center gap-4">
              <div className="text-blue-900">
                <strong>전화:</strong> 010-9251-9743
              </div>
              <div className="text-blue-900">
                <strong>이메일:</strong> hongik423@gmail.com
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
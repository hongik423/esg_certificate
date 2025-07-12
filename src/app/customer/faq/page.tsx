'use client'

import React, { useState } from 'react'
import { Search, ChevronDown, HelpCircle, ChevronRight, Bell, MessageSquare, Mail, Phone, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Header from '@/components/layout/header'

// 고객서비스 메뉴 데이터
const customerMenus = [
  {
    id: 'notice',
    title: '공지사항',
    icon: Bell,
    href: '/customer/notice',
    description: 'ESG 인증원의 새로운 소식',
    isActive: false
  },
  {
    id: 'complaint',
    title: '불만 및 이의제기',
    icon: MessageSquare,
    href: '/customer/complaint',
    description: '서비스 개선을 위한 의견',
    isActive: false
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: HelpCircle,
    href: '/customer/faq',
    description: '자주 묻는 질문과 답변',
    isActive: true
  }
]

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
  {
    id: '1',
    category: '인증',
    question: 'ISO 인증 취득 방법은?',
    answer: `1. 관련 인증을 취득을 분야에 결정하여야 합니다. ISO 9001은 품질경영, ISO 14001은 환경경영시스템으로 분야별로 인증표준이 다릅니다.

2. 해당되는 ISO 표준 요구사항에 따라 문서화된 절차를 구축을 갖추어야 합니다.

3. 시스템 구축이 완료되면 문서화된 절차를 실시하여야 신청 기준을 갖추어야 실시 기준을 갖추어야 합니다.

4. 이에스지인증원의 인증심사원 등을 통해 기업에 대한 시스템을 위한 모집합니다.

5. 인증서의 유효기간은 3년이며, 1년에 1회 이상 사후관리심사를 받아야 유지됩니다.

또한, 유효기간 종료 전에 갱신심사를 받아야 인증을 지속적으로 연장할 수 있습니다.`,
    views: 1250
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
      <Header />
      
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <span>HOME</span>
            <ChevronRight className="w-4 h-4" />
            <span>고객서비스</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-200">FAQ</span>
          </div>
          <h1 className="text-4xl font-bold">FAQ</h1>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">고객서비스</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {customerMenus.map((menu) => (
                    <Link
                      key={menu.id}
                      href={menu.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                        menu.isActive 
                          ? 'bg-green-50 text-green-700 border-r-2 border-green-600' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <menu.icon className="w-4 h-4" />
                      <div>
                        <div className="font-medium">{menu.title}</div>
                        <div className="text-xs text-gray-500">{menu.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* 고객 정보 */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">CUSTOMER</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <div className="text-sm">
                    <div className="font-medium">Address :</div>
                    <div className="text-gray-600">
                      (06653) 서울특별시<br />
                      서초구 효령로53길 21 6층<br />
                      603호
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div className="text-sm">
                    <span className="font-medium">Mail Us :</span>
                    <span className="text-gray-600 ml-1">ycpark55@naver.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <div className="text-sm">
                    <span className="font-medium">Tel :</span>
                    <span className="text-gray-600 ml-1">02-588-5114</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {/* FAQ 질문 */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-bold">Q</span>
                    </div>
                    <h2 className="text-xl font-bold text-green-700">ISO 인증 취득 방법은?</h2>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    1. 관련 인증을 취득을 분야에 결정하여야 합니다. ISO 9001은 품질경영, ISO 14001은 환경경영시스템으로 분야별로 인증표준이 다릅니다.
                  </p>
                  <p>
                    2. 해당되는 ISO 표준 요구사항에 따라 문서화된 절차를 구축을 갖추어야 합니다.
                  </p>
                  <p>
                    3. 시스템 구축이 완료되면 문서화된 절차를 실시하여야 신청 기준을 갖추어야 실시 기준을 갖추어야 합니다.
                  </p>
                  <p>
                    4. 이에스지인증원의 인증심사원 등을 통해 기업에 대한 시스템을 위한 모집합니다.
                  </p>
                  <p>
                    5. 인증서의 유효기간은 3년이며, 1년에 1회 이상 사후관리심사를 받아야 유지됩니다.
                  </p>
                  <p>
                    또한, 유효기간 종료 전에 갱신심사를 받아야 인증을 지속적으로 연장할 수 있습니다.
                  </p>
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t">
                  <span className="text-sm text-gray-600">[ 1 ]</span>
                  <select className="border rounded px-2 py-1 text-sm" aria-label="검색 조건 선택">
                    <option>제목</option>
                  </select>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    검색
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 
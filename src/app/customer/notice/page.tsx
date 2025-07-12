'use client'

import React, { useState } from 'react'
import { Search, ChevronRight, FileText, AlertCircle, Calendar, Eye, Bell, MessageSquare, HelpCircle, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
    isActive: true
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
    isActive: false
  }
]

// 공지사항 타입 정의
interface Notice {
  id: string
  category: '공지' | '소식' | '행사' | '채용'
  title: string
  content: string
  author: string
  createdAt: string
  views: number
  isNew: boolean
  isImportant: boolean
  attachments?: string[]
}

// 모의 데이터
const mockNotices: Notice[] = [
  {
    id: '1',
    category: '공지',
    title: '[기본] 안전보건경영체제 인증기관 인정서',
    content: '한국인정지원센터로부터 2024년 12월 11일 안전보건경영체제 인증기관 인정서를 받았습니다.',
    author: '이에스지인증원',
    createdAt: '2024.12.20 13:07',
    views: 42,
    isNew: true,
    isImportant: false,
    attachments: ['안전보건경영시스템_인정서.pdf']
  },
  {
    id: '2',
    category: '공지',
    title: '[기본] 이에스지인증원 심사원 활동 등록신청서',
    content: 'KAB으로부터 ISO 인정을 받은 이에스지인증원의 인정 범위 심사원을 위한 모집합니다. 모집분야: ISO 인증 활동 심사원 (수시모집), ISO9001/14001',
    author: '이에스지인증원',
    createdAt: '2022.04.20 11:21',
    views: 133,
    isNew: false,
    isImportant: false,
    attachments: []
  },
  {
    id: '3',
    category: '공지',
    title: '[기본] ESG 경영시스템 시범 인증기관 스킴 확대 인정 ((주)ESG인증원)',
    content: 'ESG 경영시스템 확대되어 시범 인증기관 인정범위가 확대되어 심사원의 심사활동 확대에 활용해 주시기 바랍니다.',
    author: '이에스지인증원',
    createdAt: '2024.06.20 14:47',
    views: 93,
    isNew: false,
    isImportant: false,
    attachments: ['ESG경영시스템_시범_인증기관_스킴확대_인정-ESGR.pdf']
  },
  {
    id: '4',
    category: '공지',
    title: '[기본] ESG 경영시스템 인정서 2024.6.19',
    content: 'ESG 경영시스템 시범 인증기관 인정서',
    author: '이에스지인증원',
    createdAt: '2024.06.20 15:04',
    views: 128,
    isNew: false,
    isImportant: false,
    attachments: ['1. 붙임_인정서_-_ESGR.pdf']
  },
  {
    id: '5',
    category: '공지',
    title: '[기본] ESG 보고서 검증',
    content: 'ESG 연계 지속가능보고서 검증(Assurance)에 가장 많이 쓰이는 국제적 검증기준인 영국 Accountability의 "AA1000AS v3"에 관련하여 검증합니다. 2021년 개정 검증기준에 따라 검증심사자를 활용하는 가정은 반드시 포트폴리오를 공개해야 합니다.',
    author: '이에스지인증원',
    createdAt: '2022.04.13 10:35',
    views: 136,
    isNew: false,
    isImportant: false,
    attachments: []
  }
]

export default function NoticePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 필터링
  const filteredNotices = mockNotices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // 중요 공지사항을 맨 위로 정렬
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isImportant && !b.isImportant) return -1
    if (!a.isImportant && b.isImportant) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  // 페이지네이션
  const totalPages = Math.ceil(sortedNotices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNotices = sortedNotices.slice(startIndex, endIndex)

  // 7일 이내 게시글인지 확인
  const isNewNotice = (date: string) => {
    const noticeDate = new Date(date)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - noticeDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
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
            <span className="text-green-200">공지사항</span>
          </div>
          <h1 className="text-4xl font-bold">공지사항</h1>
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
            {/* 공지사항 목록 */}
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {currentNotices.map((notice, index) => (
                    <Link 
                      key={notice.id} 
                      href={`/customer/notice/${notice.id}`}
                      className="block hover:bg-gray-50 transition-colors"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {/* 제목 */}
                              <h3 className={`font-medium text-lg ${
                                notice.isImportant ? 'text-red-600' : 'text-gray-900'
                              }`}>
                                {notice.isImportant && (
                                  <AlertCircle className="inline h-4 w-4 mr-1" />
                                )}
                                {notice.title}
                              </h3>

                              {/* NEW 표시 */}
                              {notice.isNew && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                                  hot
                                </span>
                              )}
                            </div>

                            {/* 메타 정보 */}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{notice.author}</span>
                              <span>{notice.createdAt}</span>
                              <span>조회 {notice.views}</span>
                            </div>

                            {/* 내용 미리보기 */}
                            <p className="text-gray-600 mt-2 line-clamp-2">
                              {notice.content}
                            </p>

                            {/* 첨부파일 */}
                            {notice.attachments && notice.attachments.length > 0 && (
                              <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                                <FileText className="w-4 h-4" />
                                <span>첨부파일 {notice.attachments.length}개</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 p-6 border-t">
                    <span className="text-sm text-gray-600">[ 1 ]</span>
                    <select className="border rounded px-2 py-1 text-sm" aria-label="검색 조건 선택">
                      <option>제목</option>
                    </select>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      검색
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 
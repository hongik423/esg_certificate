'use client'

import React, { useState } from 'react'
import { Search, ChevronRight, FileText, AlertCircle, Calendar, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'

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
    title: '[중요] ESG 경영시스템 인증 심사원 자격 요건 변경 안내',
    content: 'ESG 경영시스템 인증 심사원 자격 요건이 2024년 2월 1일부터 변경됩니다...',
    author: '관리자',
    createdAt: '2024-01-15',
    views: 234,
    isNew: true,
    isImportant: true,
    attachments: ['심사원_자격요건_변경안내.pdf']
  },
  {
    id: '2',
    category: '행사',
    title: '2024년 ISO 9001 내부심사원 양성교육 일정 안내',
    content: '2024년도 ISO 9001 내부심사원 양성교육 일정을 안내드립니다...',
    author: '교육팀',
    createdAt: '2024-01-14',
    views: 156,
    isNew: true,
    isImportant: false,
    attachments: ['교육일정표.xlsx']
  },
  {
    id: '3',
    category: '소식',
    title: 'ESG 인증원, KAB로부터 ESG 경영시스템 시범인증기관 지정',
    content: '우리 인증원이 한국인정지원센터(KAB)로부터 ESG 경영시스템 시범인증기관으로 지정되었습니다...',
    author: '홍보팀',
    createdAt: '2024-01-10',
    views: 567,
    isNew: true,
    isImportant: false
  },
  {
    id: '4',
    category: '공지',
    title: '2024년 설 연휴 업무 안내',
    content: '2024년 설 연휴 기간 동안의 업무 일정을 안내드립니다...',
    author: '관리자',
    createdAt: '2024-01-08',
    views: 89,
    isNew: false,
    isImportant: false
  },
  {
    id: '5',
    category: '채용',
    title: 'ISO 심사원 신규 채용 공고',
    content: 'ESG 인증원에서 함께할 ISO 심사원을 모집합니다...',
    author: '인사팀',
    createdAt: '2024-01-05',
    views: 432,
    isNew: false,
    isImportant: false,
    attachments: ['채용공고.pdf', '입사지원서.docx']
  },
  {
    id: '6',
    category: '공지',
    title: '인증서 재발급 절차 안내',
    content: '인증서 재발급 절차가 개선되었습니다. 온라인으로 간편하게 신청하실 수 있습니다...',
    author: '관리자',
    createdAt: '2023-12-28',
    views: 123,
    isNew: false,
    isImportant: false
  },
  {
    id: '7',
    category: '행사',
    title: 'ESG 경영 세미나 개최 안내',
    content: 'ESG 경영 도입을 준비하는 기업을 위한 무료 세미나를 개최합니다...',
    author: '교육팀',
    createdAt: '2023-12-25',
    views: 789,
    isNew: false,
    isImportant: false
  },
  {
    id: '8',
    category: '소식',
    title: '2023년 인증 실적 및 고객 만족도 조사 결과',
    content: '2023년 한 해 동안의 인증 실적과 고객 만족도 조사 결과를 공유드립니다...',
    author: '품질관리팀',
    createdAt: '2023-12-20',
    views: 345,
    isNew: false,
    isImportant: false,
    attachments: ['2023년_인증실적_보고서.pdf']
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
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">공지사항</h1>
          <p className="text-xl">ESG 인증원의 새로운 소식과 공지사항을 확인하세요</p>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 검색 */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="제목으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* 카테고리 필터 */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="공지">공지</SelectItem>
                  <SelectItem value="소식">소식</SelectItem>
                  <SelectItem value="행사">행사</SelectItem>
                  <SelectItem value="채용">채용</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

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
                          {/* 카테고리 */}
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            notice.category === '공지' 
                              ? 'bg-blue-100 text-blue-700'
                              : notice.category === '소식'
                              ? 'bg-green-100 text-green-700'
                              : notice.category === '행사'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {notice.category}
                          </span>

                          {/* 제목 */}
                          <h3 className={`font-medium ${
                            notice.isImportant ? 'text-red-600' : 'text-gray-900'
                          }`}>
                            {notice.isImportant && (
                              <AlertCircle className="inline h-4 w-4 mr-1" />
                            )}
                            {notice.title}
                          </h3>

                          {/* NEW 표시 */}
                          {isNewNotice(notice.createdAt) && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                              NEW
                            </span>
                          )}

                          {/* 첨부파일 표시 */}
                          {notice.attachments && notice.attachments.length > 0 && (
                            <FileText className="h-4 w-4 text-gray-400" />
                          )}
                        </div>

                        {/* 메타 정보 */}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{notice.author}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {notice.createdAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {notice.views}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="h-5 w-5 text-gray-400 mt-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 결과가 없을 때 */}
            {currentNotices.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500">검색 결과가 없습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              이전
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 
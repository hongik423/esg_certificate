'use client'

import React, { useState } from 'react'
import { FileDown, FileText, FileImage, FileSpreadsheet, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

// 문서 타입 정의
interface ISODocument {
  id: string
  title: string
  category: 'ISO 9001' | 'ISO 14001' | 'ISO 45001' | 'ESG'
  fileType: 'pdf' | 'doc' | 'xls' | 'img'
  size: string
  registeredDate: string
  views: number
  downloads: number
  isNew: boolean
  fileName: string
}

// 실제 ESG 인증 관련 문서 데이터
const realDocuments: ISODocument[] = [
  {
    id: '1',
    title: '인증신청서 양식 (PDF)',
    category: 'ESG',
    fileType: 'pdf',
    size: '240KB',
    registeredDate: '2024-01-15',
    views: 1234,
    downloads: 567,
    isNew: true,
    fileName: '2인증서비스_심사비용및신청_인증신청서_양식.pdf'
  },
  {
    id: '2',
    title: '인증신청서 양식 (Word)',
    category: 'ESG',
    fileType: 'doc',
    size: '36KB',
    registeredDate: '2024-01-15',
    views: 890,
    downloads: 345,
    isNew: true,
    fileName: '2인증서비스_심사비용및신청_인증신청서_양식.docx'
  },
  {
    id: '3',
    title: '인증심사 일수 산정기준',
    category: 'ESG',
    fileType: 'pdf',
    size: '135KB',
    registeredDate: '2024-01-12',
    views: 756,
    downloads: 234,
    isNew: true,
    fileName: '2-2인증서비스_심사비용및신청_인증신청서_인증심사일수_산정기준.pdf'
  },
  {
    id: '4',
    title: '고객과의 약속 첨부양식',
    category: 'ESG',
    fileType: 'pdf',
    size: '209KB',
    registeredDate: '2024-01-10',
    views: 432,
    downloads: 189,
    isNew: false,
    fileName: '2인증서비스_기업준수사항_고객과의약속_첨부양식.pdf'
  },
  {
    id: '5',
    title: '인증 마크 & 인증서 사용 및 홍보방법',
    category: 'ESG',
    fileType: 'pdf',
    size: '165KB',
    registeredDate: '2024-01-08',
    views: 789,
    downloads: 456,
    isNew: false,
    fileName: '2인증서비스_기업준수사항_인증_마크_&__인증서_사용_및_홍보방법.pdf'
  },
  {
    id: '6',
    title: 'ESG 경영시스템 인정서',
    category: 'ESG',
    fileType: 'pdf',
    size: '140KB',
    registeredDate: '2024-01-05',
    views: 1567,
    downloads: 789,
    isNew: false,
    fileName: '4고객서비스_공지사항_esg경영시스템인정서_붙임._인정서_-_ESGR.pdf'
  },
  {
    id: '7',
    title: 'ESG 경영시스템 시범 인증기관 스킴확대 인정',
    category: 'ESG',
    fileType: 'pdf',
    size: '70KB',
    registeredDate: '2024-01-03',
    views: 1234,
    downloads: 678,
    isNew: false,
    fileName: '4고객서비스_공지사항_ESG경영시스템_시범_인증기관_스킴확대_인정-ESGR.pdf'
  },
  {
    id: '8',
    title: '안전보건경영시스템 인정서',
    category: 'ISO 45001',
    fileType: 'pdf',
    size: '5.3MB',
    registeredDate: '2023-12-28',
    views: 987,
    downloads: 543,
    isNew: false,
    fileName: '4고객서비스_공지사항_안전보건경영체제인증기관인정서_안전보건경영시스템_인정서.pdf'
  }
]

export default function ISODocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('date')

  // 파일 아이콘 컴포넌트
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-500" />
      case 'xls':
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case 'img':
        return <FileImage className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  // 필터링 및 정렬
  const filteredDocuments = realDocuments
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.registeredDate).getTime() - new Date(a.registeredDate).getTime()
        case 'views':
          return b.views - a.views
        case 'downloads':
          return b.downloads - a.downloads
        default:
          return 0
      }
    })

  const handleDownload = (doc: ISODocument) => {
    // 실제 파일 다운로드 처리
    const link = document.createElement('a')
    link.href = `/documents/${doc.fileName}`
    link.download = doc.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 다운로드 카운트 증가 (실제로는 서버에서 처리)
    console.log(`다운로드: ${doc.title}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">자료실</h1>
          <p className="text-xl">ESG 인증 관련 문서 및 자료를 다운로드하실 수 있습니다</p>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 검색 */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="문서명으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* 카테고리 필터 */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="ISO 9001">ISO 9001</SelectItem>
                  <SelectItem value="ISO 14001">ISO 14001</SelectItem>
                  <SelectItem value="ISO 45001">ISO 45001</SelectItem>
                  <SelectItem value="ESG">ESG</SelectItem>
                </SelectContent>
              </Select>

              {/* 정렬 */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">최신순</SelectItem>
                  <SelectItem value="views">조회순</SelectItem>
                  <SelectItem value="downloads">다운로드순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 문서 목록 */}
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    {/* 파일 아이콘 */}
                    <div className="pt-1">
                      {getFileIcon(doc.fileType)}
                    </div>

                    {/* 문서 정보 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{doc.title}</h3>
                        {doc.isNew && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded">{doc.category}</span>
                        <span>파일크기: {doc.size}</span>
                        <span>등록일: {doc.registeredDate}</span>
                        <span>조회: {doc.views.toLocaleString()}</span>
                        <span>다운로드: {doc.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* 다운로드 버튼 */}
                  <Button
                    onClick={() => handleDownload(doc)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    다운로드
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 결과가 없을 때 */}
        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </CardContent>
          </Card>
        )}

        {/* 안내 메시지 */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h4 className="font-semibold text-blue-900 mb-2">자료 다운로드 안내</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 모든 자료는 무료로 다운로드 가능합니다.</li>
              <li>• 다운로드한 자료는 인증 준비 목적으로만 사용해 주시기 바랍니다.</li>
              <li>• 자료에 대한 문의사항은 고객센터로 연락 주시기 바랍니다.</li>
              <li>• 최신 자료는 'NEW' 표시로 확인하실 수 있습니다.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
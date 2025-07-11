'use client'

import React, { useState } from 'react'
import { Search, Download, ChevronLeft, ChevronRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// 심사원 타입 정의
interface Auditor {
  id: string
  name: string
  qualification: string
  certificationField: string
  contractType: string
  registrationDate: string
}

// 모의 데이터
const mockAuditors: Auditor[] = [
  {
    id: '1',
    name: '김철수',
    qualification: '선임심사원',
    certificationField: 'ISO 9001, ISO 14001',
    contractType: '전속',
    registrationDate: '2020-03-15'
  },
  {
    id: '2',
    name: '이영희',
    qualification: '심사원',
    certificationField: 'ISO 9001',
    contractType: '계약',
    registrationDate: '2021-06-20'
  },
  {
    id: '3',
    name: '박민수',
    qualification: '선임심사원',
    certificationField: 'ISO 45001',
    contractType: '전속',
    registrationDate: '2019-11-10'
  },
  {
    id: '4',
    name: '정수진',
    qualification: '심사원보',
    certificationField: 'ISO 14001',
    contractType: '계약',
    registrationDate: '2023-02-28'
  },
  {
    id: '5',
    name: '강동원',
    qualification: '선임심사원',
    certificationField: 'ISO 9001, ISO 45001',
    contractType: '전속',
    registrationDate: '2018-08-05'
  },
  {
    id: '6',
    name: '김미영',
    qualification: '심사원',
    certificationField: 'ESG 경영시스템',
    contractType: '전속',
    registrationDate: '2022-12-01'
  },
  {
    id: '7',
    name: '이준호',
    qualification: '선임심사원',
    certificationField: 'ISO 9001, ISO 14001, ISO 45001',
    contractType: '전속',
    registrationDate: '2017-05-15'
  },
  {
    id: '8',
    name: '최유진',
    qualification: '심사원',
    certificationField: 'ESG 경영시스템',
    contractType: '계약',
    registrationDate: '2023-08-20'
  },
  {
    id: '9',
    name: '장성훈',
    qualification: '심사원보',
    certificationField: 'ISO 9001',
    contractType: '계약',
    registrationDate: '2023-10-05'
  },
  {
    id: '10',
    name: '윤서연',
    qualification: '선임심사원',
    certificationField: 'ISO 14001, ESG 경영시스템',
    contractType: '전속',
    registrationDate: '2020-09-12'
  }
]

export default function AuditorListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [qualificationFilter, setQualificationFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // 필터링
  const filteredAuditors = mockAuditors.filter(auditor => {
    const matchesSearch = 
      auditor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auditor.certificationField.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesQualification = 
      qualificationFilter === 'all' || auditor.qualification === qualificationFilter
    return matchesSearch && matchesQualification
  })

  // 페이지네이션
  const totalPages = Math.ceil(filteredAuditors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAuditors = filteredAuditors.slice(startIndex, endIndex)

  // 엑셀 다운로드 처리
  const handleExcelDownload = () => {
    alert('심사원 명단 엑셀 파일이 다운로드됩니다.')
    // 실제로는 엑셀 파일 생성 및 다운로드 로직 구현
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">심사원 리스트</h1>
          <p className="text-xl">ESG 인증원 소속 심사원 명단을 확인하실 수 있습니다</p>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                {/* 검색 */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="심사원명 또는 인증분야로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* 자격구분 필터 */}
                <Select value={qualificationFilter} onValueChange={setQualificationFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="자격구분" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="선임심사원">선임심사원</SelectItem>
                    <SelectItem value="심사원">심사원</SelectItem>
                    <SelectItem value="심사원보">심사원보</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 엑셀 다운로드 버튼 */}
              <Button
                onClick={handleExcelDownload}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                엑셀 다운로드
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 심사원 테이블 */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-16">번호</TableHead>
                    <TableHead>성명</TableHead>
                    <TableHead>자격구분</TableHead>
                    <TableHead>심사자격</TableHead>
                    <TableHead>계약구분</TableHead>
                    <TableHead>등록일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAuditors.map((auditor, index) => (
                    <TableRow key={auditor.id} className="hover:bg-gray-50">
                      <TableCell className="text-center">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {auditor.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          auditor.qualification === '선임심사원' 
                            ? 'bg-blue-100 text-blue-700'
                            : auditor.qualification === '심사원'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {auditor.qualification}
                        </span>
                      </TableCell>
                      <TableCell>{auditor.certificationField}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          auditor.contractType === '전속' 
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {auditor.contractType}
                        </span>
                      </TableCell>
                      <TableCell>{auditor.registrationDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* 결과가 없을 때 */}
            {currentAuditors.length === 0 && (
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
              <ChevronLeft className="h-4 w-4" />
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
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* 통계 정보 */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">심사원 현황</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-green-600">{mockAuditors.length}</p>
                <p className="text-sm text-gray-600">전체 심사원</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-blue-600">
                  {mockAuditors.filter(a => a.qualification === '선임심사원').length}
                </p>
                <p className="text-sm text-gray-600">선임심사원</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-green-600">
                  {mockAuditors.filter(a => a.qualification === '심사원').length}
                </p>
                <p className="text-sm text-gray-600">심사원</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <p className="text-2xl font-bold text-orange-600">
                  {mockAuditors.filter(a => a.contractType === '전속').length}
                </p>
                <p className="text-sm text-gray-600">전속 심사원</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
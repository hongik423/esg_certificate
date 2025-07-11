'use client'

import React, { useState } from 'react'
import { 
  AlertTriangle, 
  FileText, 
  Upload, 
  Check, 
  Clock, 
  Search,
  ChevronRight,
  Mail,
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'

// 처리 프로세스 단계
const processSteps = [
  { id: 1, title: '접수', icon: FileText, description: '온라인/유선 접수' },
  { id: 2, title: '검토', icon: Search, description: '내용 검토 및 분류' },
  { id: 3, title: '조사', icon: Clock, description: '사실관계 조사' },
  { id: 4, title: '심의', icon: AlertTriangle, description: '처리방안 심의' },
  { id: 5, title: '통보', icon: Mail, description: '결과 통보' },
  { id: 6, title: '조치', icon: Check, description: '시정/개선 조치' },
  { id: 7, title: '완료', icon: Check, description: '처리 완료' }
]

export default function ComplaintPage() {
  const [activeTab, setActiveTab] = useState('process')
  const [searchNumber, setSearchNumber] = useState('')
  
  // 폼 상태
  const [formData, setFormData] = useState({
    type: 'complaint',
    name: '',
    company: '',
    email: '',
    phone: '',
    title: '',
    content: '',
    files: [] as File[]
  })

  // 유효성 검사
  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.title &&
      formData.content.length >= 100
    )
  }

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid()) {
      // 접수번호 생성 (실제로는 서버에서 생성)
      const receiptNumber = `${formData.type === 'complaint' ? 'C' : 'A'}${Date.now()}`
      alert(`접수가 완료되었습니다.\n\n접수번호: ${receiptNumber}\n\n접수번호를 기록해두시면 처리현황을 조회하실 수 있습니다.`)
      
      // 폼 초기화
      setFormData({
        type: 'complaint',
        name: '',
        company: '',
        email: '',
        phone: '',
        title: '',
        content: '',
        files: []
      })
    }
  }

  // 파일 업로드 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setFormData({ ...formData, files })
    }
  }

  // 처리현황 조회
  const handleSearch = () => {
    if (searchNumber) {
      // 실제로는 서버에서 조회
      alert(`접수번호 ${searchNumber}의 처리현황\n\n현재 상태: 조사 단계\n예상 완료일: 2024-02-15\n\n자세한 내용은 이메일로 안내드렸습니다.`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">불만 및 이의제기</h1>
          <p className="text-xl">고객님의 소중한 의견을 듣고 개선하겠습니다</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="process">처리 프로세스</TabsTrigger>
            <TabsTrigger value="submit">온라인 접수</TabsTrigger>
            <TabsTrigger value="status">처리현황 조회</TabsTrigger>
          </TabsList>

          {/* 처리 프로세스 탭 */}
          <TabsContent value="process" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>불만 및 이의제기 처리 프로세스</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* 프로세스 단계 */}
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {processSteps.map((step, index) => (
                      <div key={step.id} className="relative">
                        <div className="text-center">
                          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            <step.icon className="h-8 w-8" />
                          </div>
                          <h3 className="mt-2 font-semibold">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                        
                        {/* 화살표 */}
                        {index < processSteps.length - 1 && (
                          <div className="hidden md:block absolute top-8 left-full w-full">
                            <ChevronRight className="h-6 w-6 text-gray-400 -ml-3" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 처리 기준 */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">불만사항 처리기준</h4>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li>• 접수 후 24시간 이내 담당자 배정</li>
                        <li>• 7일 이내 1차 답변</li>
                        <li>• 30일 이내 최종 처리 완료</li>
                        <li>• 처리 결과에 대한 만족도 조사 실시</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-3">이의제기 처리기준</h4>
                      <ul className="space-y-2 text-sm text-orange-800">
                        <li>• 접수 후 48시간 이내 검토 착수</li>
                        <li>• 14일 이내 심의위원회 개최</li>
                        <li>• 45일 이내 최종 결정 및 통보</li>
                        <li>• 필요시 외부 전문가 자문 실시</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 연락처 정보 */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">다른 방법으로 접수하기</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">전화 접수</p>
                      <p className="text-sm text-gray-600">010-9251-9743</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">이메일 접수</p>
                      <p className="text-sm text-gray-600">hongik423@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">우편 접수</p>
                      <p className="text-sm text-gray-600">서울시 구로구 디지털로 273</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 온라인 접수 탭 */}
          <TabsContent value="submit" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>온라인 접수</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 접수 유형 */}
                  <div className="space-y-3">
                    <Label>접수 유형 *</Label>
                    <RadioGroup 
                      value={formData.type} 
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="complaint" id="complaint" />
                        <Label htmlFor="complaint" className="font-normal">
                          불만사항 (서비스 개선 요청)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="appeal" id="appeal" />
                        <Label htmlFor="appeal" className="font-normal">
                          이의제기 (심사 결과에 대한 이의신청)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* 신청자 정보 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">성명 *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">회사명</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일 *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">연락처 *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* 접수 내용 */}
                  <div className="space-y-2">
                    <Label htmlFor="title">제목 *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">내용 * (최소 100자 이상)</Label>
                    <Textarea
                      id="content"
                      rows={8}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="구체적인 내용을 작성해주세요. 사실관계, 발생일시, 관련자 등을 포함하여 상세히 기술해주시면 빠른 처리에 도움이 됩니다."
                      required
                    />
                    <p className="text-sm text-gray-600">
                      {formData.content.length}/100자 {formData.content.length < 100 && '(최소 100자 이상 작성해주세요)'}
                    </p>
                  </div>

                  {/* 파일 첨부 */}
                  <div className="space-y-2">
                    <Label htmlFor="files">첨부파일</Label>
                    <Input
                      id="files"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-600">
                      최대 10MB, 지원 형식: PDF, DOC, DOCX, JPG, PNG
                    </p>
                  </div>

                  {/* 개인정보 동의 */}
                  <Alert>
                    <AlertDescription>
                      <strong>개인정보 수집·이용 동의</strong><br />
                      수집항목: 성명, 연락처, 이메일, 회사명<br />
                      이용목적: 불만/이의제기 처리 및 결과 통보<br />
                      보유기간: 처리 완료 후 3년
                    </AlertDescription>
                  </Alert>

                  {/* 제출 버튼 */}
                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormData({
                        type: 'complaint',
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        title: '',
                        content: '',
                        files: []
                      })}
                    >
                      초기화
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isFormValid()}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      접수하기
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 처리현황 조회 탭 */}
          <TabsContent value="status" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>처리현황 조회</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl mx-auto">
                  <p className="text-gray-600 mb-6">
                    접수하신 불만 또는 이의제기의 처리현황을 조회하실 수 있습니다.
                    접수 시 발급받은 접수번호를 입력해주세요.
                  </p>

                  <div className="flex gap-4">
                    <Input
                      placeholder="접수번호 입력 (예: C1234567890)"
                      value={searchNumber}
                      onChange={(e) => setSearchNumber(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSearch}
                      disabled={!searchNumber}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      조회
                    </Button>
                  </div>

                  <Alert className="mt-6">
                    <AlertDescription>
                      접수번호를 분실하신 경우, 고객센터(010-9251-9743)로 문의해주시기 바랍니다.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
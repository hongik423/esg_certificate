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
  Phone,
  MapPin,
  Bell,
  MessageSquare,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
    isActive: true
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

// 처리 프로세스 단계
const processSteps = [
  { id: 1, title: '불만제기', description: '고객의 불만을 제기하고\n불만사항을 이에스지 인증원\n이메일로 접수한다.' },
  { id: 2, title: '접수사항 등록', description: '법인사항에 해당되는지 여부\n검토 후 접수 절차 접수 사항\n등록' },
  { id: 3, title: '불만 및 이의제기 타당성\n검토', description: '기업이나 접수 사항 및\n처리계획 통지' },
  { id: 4, title: '세부내용 구성', description: '불만, 이의 처리방법 구성' },
  { id: 5, title: '조사 및 분석', description: '접수 불만 또는 이의제기\n내용 분석하여 조사한다.' },
  { id: 6, title: '수집 및 사례', description: '불만 또는 이의제기의 해결을\n위하여 조치계획을 수립하여\n시행한다.' },
  { id: 7, title: '처리결과 보고 및 조치 공문', description: '불만 또는 이의제기의 해결을\n위하여 조치계획을 수립하여\n시행한다.' }
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
      <Header />
      
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <span>HOME</span>
            <ChevronRight className="w-4 h-4" />
            <span>고객서비스</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-200">불만 및 이의제기</span>
          </div>
          <h1 className="text-4xl font-bold">불만 및 이의제기</h1>
        </div>
      </div>

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
            {/* 불만처리절차 안내 */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-center text-xl text-green-700">불만처리절차</CardTitle>
                <p className="text-center text-gray-600">
                  이의제기나 불만사항이 있을 경우
                </p>
                <p className="text-center text-gray-600">
                  이에스지인증원의 고객은 이에스지 심사 및 운영사항에 대한 의의제기나 불만사항이 있을 경우
                  이에스지인증원에 아래 및 불만접수 제기할 수 있습니다.
                </p>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">불만처리절차</h4>
                  <p className="text-sm text-blue-800">
                    의의제기 및 불만이 접수되면 다음과 같은 절차를 통해 처리됩니다.
                  </p>
                  <p className="text-sm text-blue-800 mt-2">
                    이에스지 인증원 이메일 : ycpark55@naver.com
                  </p>
                </div>

                {/* 처리 단계 */}
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {processSteps.map((step, index) => (
                    <div key={step.id} className="text-center">
                      <div className="bg-blue-100 text-blue-800 rounded-lg p-4 mb-2">
                        <div className="font-semibold text-sm mb-2">STEP{String(step.id).padStart(2, '0')}</div>
                        <div className="font-bold text-base mb-2">{step.title}</div>
                        <div className="text-xs leading-relaxed whitespace-pre-line">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 연락처 정보 */}
                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">다른 방법으로 접수하기</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">전화 접수</p>
                        <p className="text-sm text-gray-600">02-588-5114</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">이메일 접수</p>
                        <p className="text-sm text-gray-600">ycpark55@naver.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">우편 접수</p>
                        <p className="text-sm text-gray-600">(06653)서울특별시 서초구 효령로53길 21 6층 603호</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 
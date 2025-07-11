'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { 
  GraduationCap,
  Users,
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Award,
  CheckCircle,
  ArrowRight,
  FileText,
  Download,
  Phone,
  Mail,
  BookOpen,
  Target,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';

// 교육 과정 데이터
const educationPrograms = [
  {
    id: 'iso-9001-internal',
    category: 'ISO 9001',
    title: 'ISO 9001 내부심사원 양성과정',
    description: '품질경영시스템 내부심사원 자격 취득 과정',
    duration: '3일 (24시간)',
    target: '품질관리 담당자, 내부심사원 희망자',
    objectives: [
      'ISO 9001 요구사항 이해',
      '내부심사 기법 습득',
      '부적합 사항 작성 능력',
      '시정조치 요구 및 검증'
    ],
    curriculum: [
      '1일차: ISO 9001 개요 및 요구사항',
      '2일차: 내부심사 계획 및 실행',
      '3일차: 심사보고서 작성 및 실습'
    ],
    certification: '수료증 발급 (출석률 80% 이상)',
    price: '450,000원',
    schedule: [
      { date: '2025년 1월 15-17일', status: 'open' },
      { date: '2025년 2월 12-14일', status: 'open' },
      { date: '2025년 3월 19-21일', status: 'planned' }
    ]
  },
  {
    id: 'iso-14001-internal',
    category: 'ISO 14001',
    title: 'ISO 14001 내부심사원 양성과정',
    description: '환경경영시스템 내부심사원 자격 취득 과정',
    duration: '3일 (24시간)',
    target: '환경관리 담당자, 내부심사원 희망자',
    objectives: [
      'ISO 14001 요구사항 이해',
      '환경측면 파악 및 평가',
      '환경법규 검토 방법',
      '환경 내부심사 기법'
    ],
    curriculum: [
      '1일차: ISO 14001 개요 및 환경법규',
      '2일차: 환경측면 평가 및 관리',
      '3일차: 내부심사 실습 및 평가'
    ],
    certification: '수료증 발급 (출석률 80% 이상)',
    price: '450,000원',
    schedule: [
      { date: '2025년 1월 22-24일', status: 'open' },
      { date: '2025년 2월 26-28일', status: 'open' },
      { date: '2025년 3월 26-28일', status: 'planned' }
    ]
  },
  {
    id: 'iso-45001-internal',
    category: 'ISO 45001',
    title: 'ISO 45001 내부심사원 양성과정',
    description: '안전보건경영시스템 내부심사원 자격 취득 과정',
    duration: '3일 (24시간)',
    target: '안전보건 담당자, 내부심사원 희망자',
    objectives: [
      'ISO 45001 요구사항 이해',
      '위험성평가 방법론',
      '안전보건 법규 이해',
      '안전보건 내부심사 기법'
    ],
    curriculum: [
      '1일차: ISO 45001 개요 및 법규',
      '2일차: 위험성평가 및 관리',
      '3일차: 내부심사 실습 및 평가'
    ],
    certification: '수료증 발급 (출석률 80% 이상)',
    price: '450,000원',
    schedule: [
      { date: '2025년 2월 5-7일', status: 'open' },
      { date: '2025년 3월 5-7일', status: 'open' },
      { date: '2025년 4월 9-11일', status: 'planned' }
    ]
  },
  {
    id: 'esg-basic',
    category: 'ESG',
    title: 'ESG 경영시스템 기본과정',
    description: 'ESG 경영의 이해와 구축 방법론',
    duration: '2일 (16시간)',
    target: 'ESG 담당자, 경영진, 관리자',
    objectives: [
      'ESG 개념 및 동향 이해',
      'ESG 경영시스템 구축 방법',
      'ESG 평가지표 이해',
      'ESG 보고서 작성 기초'
    ],
    curriculum: [
      '1일차: ESG 개요 및 국내외 동향',
      '2일차: ESG 경영시스템 구축 실무'
    ],
    certification: '수료증 발급',
    price: '350,000원',
    featured: true,
    schedule: [
      { date: '2025년 1월 29-30일', status: 'open' },
      { date: '2025년 2월 19-20일', status: 'open' },
      { date: '2025년 3월 12-13일', status: 'planned' }
    ]
  }
];

// 교육 일정 캘린더 이벤트
const calendarEvents = [
  { date: new Date(2025, 0, 15), title: 'ISO 9001 내부심사원', type: 'iso-9001' },
  { date: new Date(2025, 0, 22), title: 'ISO 14001 내부심사원', type: 'iso-14001' },
  { date: new Date(2025, 0, 29), title: 'ESG 경영시스템 기본', type: 'esg' },
  { date: new Date(2025, 1, 5), title: 'ISO 45001 내부심사원', type: 'iso-45001' },
  { date: new Date(2025, 1, 12), title: 'ISO 9001 내부심사원', type: 'iso-9001' },
  { date: new Date(2025, 1, 19), title: 'ESG 경영시스템 기본', type: 'esg' },
  { date: new Date(2025, 1, 26), title: 'ISO 14001 내부심사원', type: 'iso-14001' }
];

export default function EducationPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedProgram, setSelectedProgram] = useState<string>('all');

  const filteredPrograms = selectedProgram === 'all' 
    ? educationPrograms 
    : educationPrograms.filter(program => program.category.toLowerCase().includes(selectedProgram));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              <GraduationCap className="w-4 h-4 mr-1" />
              전문 교육 기관
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ESG 인증원 교육서비스
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              ISO 및 ESG 경영시스템 전문가 양성을 위한<br />
              체계적이고 실무 중심의 교육 프로그램
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/education/apply">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  교육 신청하기
                </Button>
              </Link>
              <Link href="/education/schedule">
                <Button variant="outline">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  교육 일정 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="programs" className="max-w-7xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full max-w-xl mx-auto">
              <TabsTrigger value="programs">교육 과정</TabsTrigger>
              <TabsTrigger value="schedule">교육 일정</TabsTrigger>
              <TabsTrigger value="info">교육 안내</TabsTrigger>
            </TabsList>

            {/* 교육 과정 탭 */}
            <TabsContent value="programs" className="mt-8">
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant={selectedProgram === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedProgram('all')}
                  >
                    전체
                  </Button>
                  <Button
                    variant={selectedProgram === '9001' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedProgram('9001')}
                  >
                    ISO 9001
                  </Button>
                  <Button
                    variant={selectedProgram === '14001' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedProgram('14001')}
                  >
                    ISO 14001
                  </Button>
                  <Button
                    variant={selectedProgram === '45001' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedProgram('45001')}
                  >
                    ISO 45001
                  </Button>
                  <Button
                    variant={selectedProgram === 'esg' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedProgram('esg')}
                  >
                    ESG
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPrograms.map((program) => (
                  <Card 
                    key={program.id} 
                    className={`hover:shadow-xl transition-all duration-300 ${
                      program.featured ? 'ring-2 ring-purple-400 ring-opacity-50' : ''
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">
                          {program.category}
                        </Badge>
                        {program.featured && (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            추천
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{program.title}</CardTitle>
                      <p className="text-gray-600">{program.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{program.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-gray-400" />
                            <span>정원 20명</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">교육 목표</h4>
                          <ul className="space-y-1">
                            {program.objectives.slice(0, 3).map((objective, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-gray-900">
                              {program.price}
                            </span>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              {program.schedule[0]?.status === 'open' ? '모집중' : '예정'}
                            </Badge>
                          </div>
                          
                          <Link href={`/education/programs/${program.id}`}>
                            <Button className="w-full" variant="outline">
                              상세 정보 보기
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* 교육 일정 탭 */}
            <TabsContent value="schedule" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>교육 캘린더</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>예정된 교육</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {educationPrograms.map((program) => (
                        <div key={program.id}>
                          <h4 className="font-semibold mb-2">{program.title}</h4>
                          <div className="space-y-2">
                            {program.schedule.map((schedule, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                                  <span className="text-sm">{schedule.date}</span>
                                </div>
                                <Badge 
                                  variant={schedule.status === 'open' ? 'default' : 'secondary'}
                                  className={schedule.status === 'open' ? 'bg-green-600' : ''}
                                >
                                  {schedule.status === 'open' ? '모집중' : '예정'}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 교육 안내 탭 */}
            <TabsContent value="info" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-green-600" />
                      교육장 안내
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">위치</h4>
                        <p className="text-gray-600">{COMPANY_INFO.address}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">교통편</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• 지하철: 2호선 역삼역 3번 출구 도보 5분</li>
                          <li>• 버스: 146, 341, 360번 역삼역 하차</li>
                          <li>• 주차: 건물 내 주차장 이용 가능 (3시간 무료)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                      교육 신청 절차
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      <li className="flex items-start">
                        <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                          1
                        </span>
                        <div>
                          <p className="font-semibold">교육 과정 선택</p>
                          <p className="text-sm text-gray-600">원하시는 교육 과정과 일정 확인</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                          2
                        </span>
                        <div>
                          <p className="font-semibold">온라인 신청</p>
                          <p className="text-sm text-gray-600">온라인 신청서 작성 및 제출</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                          3
                        </span>
                        <div>
                          <p className="font-semibold">교육비 납부</p>
                          <p className="text-sm text-gray-600">계좌이체 또는 카드 결제</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                          4
                        </span>
                        <div>
                          <p className="font-semibold">교육 참여</p>
                          <p className="text-sm text-gray-600">교육 당일 교육장 방문</p>
                        </div>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-green-600" />
                      유의사항
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">교육 시작 3일 전까지 취소 시 100% 환불</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">교육 시작 1일 전 취소 시 50% 환불</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">교육 당일 취소 시 환불 불가</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">수료증은 출석률 80% 이상 시 발급</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">교재 및 중식 제공</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">최소 인원 미달 시 교육 연기 가능</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            전문가와 함께하는 체계적인 교육
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {COMPANY_INFO.name}의 전문 강사진이 실무 중심의 교육을 제공합니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/education/apply">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <GraduationCap className="w-5 h-5 mr-2" />
                교육 신청하기
              </Button>
            </Link>
            <a href={`tel:${CONTACT_INFO.mainPhone}`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="w-5 h-5 mr-2" />
                {CONTACT_INFO.mainPhone}
              </Button>
            </a>
          </div>
          <p className="mt-6 text-sm opacity-80">
            {CONSULTANT_INFO.fullTitle} | 교육 문의 환영
          </p>
        </div>
      </section>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
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
  Briefcase,
  Brain,
  Cpu,
  Bot,
  Zap,
  Settings,
  Lightbulb,
  TrendingUp
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredPrograms = selectedProgram === 'all' 
    ? educationPrograms 
    : educationPrograms.filter(program => program.category.toLowerCase().includes(selectedProgram));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 🌟 AI-Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* AI-Powered Background Effects Layer 1 */}
        <div className="absolute inset-0 will-change-transform">
          {/* Animated Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-blue-600/20 animate-pulse"></div>
          
          {/* Floating Education Icons */}
          {isClient && (
            <div className="absolute inset-0">
              {[GraduationCap, BookOpen, Award, Target, Briefcase].map((Icon, i) => (
                <div
                  key={i}
                  className="absolute animate-float will-change-transform"
                  style={{
                    left: `${15 + (i * 18)}%`,
                    top: `${25 + (i * 8)}%`,
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: `${4.5 + i * 0.5}s`
                  }}
                >
                  <Icon className="w-5 h-5 text-white/20 animate-pulse" />
                </div>
              ))}
            </div>
          )}
          
          {/* Interactive Light Trails */}
          {isClient && (
            <div 
              className="absolute w-96 h-96 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-3xl transition-all duration-300 ease-out will-change-transform"
              style={{
                left: mousePosition.x - 192,
                top: mousePosition.y - 192,
                transform: `scale(${isHovered ? 1.5 : 1})`
              }}
            />
          )}
          
          {/* Learning Network Pattern */}
          <div className="absolute inset-0 opacity-10 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 1200 800">
              <defs>
                <pattern id="edu-grid" width="70" height="70" patternUnits="userSpaceOnUse">
                  <circle cx="35" cy="35" r="2.5" fill="currentColor" className="text-white">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="3.5s" repeatCount="indefinite" />
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#edu-grid)" />
              
              {/* Connecting Lines for Learning Network */}
              {[...Array(10)].map((_, i) => (
                <line
                  key={i}
                  x1={Math.random() * 1200}
                  y1={Math.random() * 800}
                  x2={Math.random() * 1200}
                  y2={Math.random() * 800}
                  stroke="currentColor"
                  strokeWidth="0.8"
                  className="text-white/20"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.6;0"
                    dur={`${2.5 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                </line>
              ))}
            </svg>
          </div>
        </div>

        {/* AI-Powered Background Effects Layer 2 */}
        <div className="absolute inset-0 will-change-transform">
          {/* Morphing Education Shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 md:w-52 md:h-52 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-2xl animate-morph"></div>
          <div className="absolute top-40 right-16 w-40 h-40 md:w-60 md:h-60 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-2xl animate-morph-reverse"></div>
          <div className="absolute bottom-32 left-1/3 w-36 h-36 md:w-48 md:h-48 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-morph-slow"></div>
          
          {/* Knowledge Circuit Pattern */}
          <div className="absolute inset-0 opacity-5 hidden lg:block">
            <div className="absolute top-1/4 left-1/4 w-28 h-28 border border-white/30 rounded-lg animate-pulse-slow-ai">
              <div className="absolute top-1 left-1 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/20 text-xs font-bold">EDU</div>
            </div>
            <div className="absolute top-1/3 right-1/4 w-22 h-22 border border-white/30 rounded-lg animate-pulse-slow-ai" style={{animationDelay: '2s'}}>
              <div className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/20 text-xs font-bold">AI</div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 md:py-20 lg:py-24 xl:py-32 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* AI-Enhanced Status Badge */}
            <div 
              className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-2xl hover:bg-white/20 transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-ping"></div>
              </div>
              <span className="font-semibold text-white text-xs sm:text-sm mr-2">전문 교육 기관</span>
              <div className="flex items-center space-x-1 ml-2">
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400 animate-pulse" />
                <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
            </div>
            
            {/* AI-Enhanced Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight hero-title">
              <span className="block text-white mb-2 sm:mb-4 animate-fade-in-up-ai">
                AI 기반 스마트 교육서비스
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x animate-fade-in-up-ai" style={{animationDelay: '0.3s'}}>
                전문가 양성 플랫폼
              </span>
            </h1>
            
            {/* AI-Enhanced Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up-ai" style={{animationDelay: '0.6s'}}>
              <strong className="text-white bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {COMPANY_INFO.name}
              </strong>의 AI 기반 교육 시스템으로<br className="hidden sm:block" />
              ISO 및 ESG 경영시스템 전문가로 성장하세요
            </p>
            
            {/* AI-Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 animate-fade-in-up-ai" style={{animationDelay: '0.9s'}}>
              <Link href="/education/apply">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto relative bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-[1.05] transition-all duration-300 group overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 relative z-10" />
                  <span className="relative z-10">AI 교육 신청하기</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Button>
              </Link>
              
              <Link href="/education/schedule">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl border-2 border-white/30 text-white hover:border-purple-400 hover:text-purple-400 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center">
                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-bounce" />
                    <span>AI 교육 일정 보기</span>
                  </div>
                </Button>
              </Link>
            </div>

            {/* AI-Enhanced Education Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 animate-fade-in-up-ai" style={{animationDelay: '1.2s'}}>
              {[
                { icon: Target, title: '맞춤형 교육', desc: 'AI 기반 개인화 학습', color: 'purple' },
                { icon: TrendingUp, title: '실무 중심', desc: '현장 적용 가능한 교육', color: 'indigo' },
                { icon: Award, title: '자격증 취득', desc: '공인 수료증 발급', color: 'blue' },
                { icon: Users, title: '전문 강사진', desc: '현장 경험 풍부한 전문가', color: 'cyan' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  style={{animationDelay: `${1.2 + index * 0.15}s`}}
                >
                  <feature.icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${feature.color}-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0`} />
                  <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* AI-Enhanced Contact Info */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-gray-300 text-sm sm:text-base animate-fade-in-up-ai" style={{animationDelay: '1.5s'}}>
              <div className="flex items-center justify-center hover:text-purple-400 transition-colors duration-300 cursor-pointer group">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-purple-400 group-hover:animate-pulse" />
                <span className="text-center">{CONSULTANT_INFO.fullTitle}: {CONTACT_INFO.mainPhone}</span>
              </div>
              <div className="flex items-center justify-center hover:text-indigo-400 transition-colors duration-300 cursor-pointer group">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-indigo-400 group-hover:animate-pulse" />
                <span>24시간 AI 교육 상담</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1 sm:mt-2 animate-ping"></div>
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
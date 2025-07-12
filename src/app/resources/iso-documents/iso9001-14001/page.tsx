'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  Calendar,
  Eye,
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Users,
  ArrowLeft
} from 'lucide-react';
import Header from '@/components/layout/header';

// 자료실 메뉴 데이터
const resourceMenus = [
  {
    id: 'iso-documents',
    title: 'ISO자료',
    icon: FileText,
    href: '/resources/iso-documents',
    description: 'ISO 9001, 14001, 45001 관련 자료',
    isActive: true
  },
  {
    id: 'auditor-list',
    title: '심사원리스트',
    icon: Users,
    href: '/resources/auditor-list',
    description: '인증원 소속 심사원 명단',
    isActive: false
  }
];

export default function ISO9001_14001Page() {
  const FILE_URL = '/documents/ISO_9001_구축가이드북.html';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <span>HOME</span>
            <ChevronRight className="w-4 h-4" />
            <span>자료실</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-200">ISO자료</span>
          </div>
          <h1 className="text-4xl font-bold">ISO자료</h1>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">자료실 메뉴</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {resourceMenus.map((menu) => (
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
                      (06653) 서울특시<br />
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
            {/* 뒤로가기 버튼 */}
            <div className="mb-6">
              <Link href="/resources" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                목록으로
              </Link>
            </div>

            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">ISO9001/ISO14001 인증제도</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>이에스지인증원</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>2022.01.12 18:10</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>조회 129</span>
                      </div>
                    </div>
                  </div>
                  <Link href={FILE_URL} download target="_blank" rel="noopener noreferrer">
                    <Button className="bg-green-600 hover:bg-green-700" asChild={false}>
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        다운로드
                      </>
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                {/* ISO9001 (품질경영시스템) */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">ISO9001 (품질경영시스템)</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      ISO9001은 국제표준화 기구에서 품질경영에 관한 요구사항을 정한 국제표준이며 이는 조직이 
                      품질경영시스템을 정하여 인증을 받기 위해 정하는 것으로 그 조직이 ISO 14001 표준에 
                      적합다는 것을 증명하는 것입니다.
                    </p>
                    <p>
                      기업이 ISO 14001 표준을 통하여 얻는다는 것은 그 조직이 품질에 대한 
                      통계적 관리를 하고 있다는 것을 고객 및 관련 이해관계자들에게 증명하는 것입니다.
                    </p>
                  </div>
                </div>

                {/* 세부 조항 설명 */}
                <div className="mb-8">
                  <h4 className="text-base font-semibold mb-4">세부 조항 설명</h4>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <span className="font-medium">1. 적용범위</span>
                    </div>
                    
                    <div>
                      <span className="font-medium">2. 인용표준</span>
                    </div>
                    
                    <div>
                      <span className="font-medium">3. 용어와 정의</span>
                    </div>
                    
                    <div>
                      <span className="font-medium">4. 조직상황</span>
                      <div className="ml-4 mt-1 space-y-1 text-sm">
                        <div>4.1 조직과 조직상황의 이해</div>
                        <div>4.2 이해관계자의 니즈와 기대의 이해</div>
                        <div>4.3 품질경영시스템 적용범위의 결정</div>
                        <div>4.4 품질경영시스템과 그 프로세스</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">5. 리더십</span>
                      <div className="ml-4 mt-1 space-y-1 text-sm">
                        <div>5.1 리더십과 의지표명</div>
                        <div>5.2 정책</div>
                        <div>5.3 조직의 역할, 책임 및 권한</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">6. 기획</span>
                      <div className="ml-4 mt-1 space-y-1 text-sm">
                        <div>6.1 리스크와 기회를 다루는 조치</div>
                        <div>6.2 품질목표와 품질목표 달성 계획</div>
                        <div>6.3 변경의 기획</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">7. 지원</span>
                      <div className="ml-4 mt-1 space-y-1 text-sm">
                        <div>7.1 자원</div>
                        <div>7.2 적격성</div>
                        <div>7.3 인식</div>
                        <div>7.4 의사소통</div>
                        <div>7.5 문서화된 정보</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">8. 운영</span>
                      <div className="ml-4 mt-1 space-y-1 text-sm">
                        <div>8.1 기획</div>
                        <div>8.2 제품 및 서비스에 대한 요구사항</div>
                        <div>8.3 제품 및 서비스의 설계와 개발</div>
                        <div>8.4 외부제공 프로세스, 제품 및 서비스의 관리</div>
                        <div>8.5 생산 및 서비스 제공</div>
                        <div>8.6 제품 및 서비스의 출시</div>
                        <div>8.7 부적합 아웃풋의 관리</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">9. 성과평가</span>
                      <div className="ml-4 mt-1 space-y-1 text-sm">
                        <div>9.1 모니터링, 측정, 분석 및 평가</div>
                        <div>9.2 내부심사</div>
                        <div>9.3 경영검토</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">10. 개선</span>
                      <div className="ml-4 mt-1 space-y-1 text-sm">
                        <div>10.1 일반사항</div>
                        <div>10.2 부적합 및 시정조치</div>
                        <div>10.3 지속적 개선</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ISO14001 (환경경영시스템) */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">ISO14001 (환경경영시스템)</h3>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      ISO14001은 기업 경영에 환경 경영체제를 도입하여 환경측면을 효율적으로 
                      관리하여 기업의 환경 성과를 개선하기 위한 도구로서 활용되고 있으며, 
                      환경경영체제를 통하여 기업의 국내외 경쟁력 향상을 도모하는 것입니다.
                    </p>
                    <p>
                      환경경영체제를 이용하여 나타난 것은 환경보건에 관한 법규에 대응
                    </p>
                  </div>
                </div>

                {/* 목록 버튼 */}
                <div className="flex justify-center pt-8 border-t">
                  <Link href="/resources">
                    <Button variant="outline">
                      목록
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 다음글/이전글 */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">다음글 |</span>
                    <Link href="/resources/iso-documents/iso45001" className="text-blue-600 hover:underline">
                      ISO45001 인증
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">이전글 |</span>
                    <span className="text-gray-600">이전글이 없습니다.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
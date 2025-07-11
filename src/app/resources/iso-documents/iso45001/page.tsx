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

export default function ISO45001Page() {
  const handleDownload = () => {
    // 실제 다운로드 로직 구현
    alert('ISO 45001 인증 자료를 다운로드합니다.');
  };

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
                    <CardTitle className="text-2xl mb-2">ISO45001 인증</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>이에스지인증원</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>2025.03.16 15:21</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>조회 31</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    다운로드
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                {/* ISO 45001 안전보건경영시스템 체계도 */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">ISO 45001 안전보건경영시스템 체계</h3>
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <div className="text-center">
                      {/* 최고경영진 */}
                      <div className="mb-6">
                        <div className="bg-white border-2 border-gray-300 rounded-lg p-4 inline-block">
                          <div className="text-sm font-medium">최고경영진 의무 및 리더십</div>
                          <div className="text-xs text-gray-600">리더십(5) 및 근로자 참여(5)</div>
                        </div>
                      </div>
                      
                      {/* 중앙 원형 체계 */}
                      <div className="relative mx-auto w-96 h-96 mb-6">
                        <div className="absolute inset-0 border-2 border-dashed border-gray-400 rounded-full"></div>
                        
                        {/* 중앙 핵심 */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-medium">기업</div>
                            <div className="text-xs">(4)</div>
                          </div>
                        </div>
                        
                        {/* 상단 - 계획 */}
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-medium">계획</div>
                            <div className="text-xs">(6)</div>
                          </div>
                        </div>
                        
                        {/* 우상단 - 지원 */}
                        <div className="absolute top-12 right-8 w-20 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-medium">지원</div>
                            <div className="text-xs">(7)</div>
                          </div>
                        </div>
                        
                        {/* 우측 - 운영 */}
                        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-20 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-medium">운영</div>
                            <div className="text-xs">(8)</div>
                          </div>
                        </div>
                        
                        {/* 우하단 - 성과평가 */}
                        <div className="absolute bottom-12 right-8 w-20 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-medium">성과평가</div>
                            <div className="text-xs">(9)</div>
                          </div>
                        </div>
                        
                        {/* 하단 - 개선 */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-medium">개선</div>
                            <div className="text-xs">(10)</div>
                          </div>
                        </div>
                        
                        {/* 좌하단 - 리더십 */}
                        <div className="absolute bottom-12 left-8 w-20 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-medium">리더십</div>
                            <div className="text-xs">(5)</div>
                          </div>
                        </div>
                        
                        {/* 좌측 - 근로자 참여 */}
                        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-20 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-medium">근로자</div>
                            <div className="text-xs">참여(5)</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 하단 설명 */}
                      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 inline-block">
                        <div className="text-sm font-medium">안전보건경영시스템</div>
                        <div className="text-xs text-gray-600">지속적 개선</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ISO 45001 인증의 필요성 */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">ISO 45001 인증의 필요성</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>기업의 안전 보건 문제에 대한 일관된 접근 정책 및 해결책</p>
                    <p>국내외의 안전보건 법규 준수 및 체계적으로 관리</p>
                    <p>직원의 무두 안전보건에 대한 책임 및 인식의 향상 도모</p>
                    <p>고객으로부터 안전보건경영의 투명성 및 신뢰성 확보</p>
                    <p>안전보건경영을 통하여 기업의 국내외 경쟁력 확보</p>
                    <p>국제적 안전기준에 그룹이 한 무역장벽에 대한 능동적 대응</p>
                    <p>안전 보건에 대한 위험성 평가를 통하여 리스크 관리</p>
                    <p>정성적 안전 재해 예방 및 감소</p>
                    <p>안전사고 제로화를 위한 비용 절감</p>
                    <p>안전보건 정성과 개선</p>
                    <p>중대재해 처벌법 등 안전보건에 관한 법규에 대응</p>
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
                    <Link href="/resources/iso-documents/esg-ms-001" className="text-blue-600 hover:underline">
                      ESG 경영시스템(ESG-MS-001)
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">이전글 |</span>
                    <Link href="/resources/iso-documents/iso9001-14001" className="text-blue-600 hover:underline">
                      ISO9001/ISO14001 인증제도
                    </Link>
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
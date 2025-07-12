'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Bell,
  MessageSquare,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
import Header from '@/components/layout/header';

// 고객서비스 메뉴 데이터
const customerMenus = [
  {
    id: 'notice',
    title: '공지사항',
    icon: Bell,
    href: '/customer/notice',
    description: 'ESG 인증원의 새로운 소식과 공지사항',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    iconColor: 'text-blue-600'
  },
  {
    id: 'complaint',
    title: '불만 및 이의제기',
    icon: MessageSquare,
    href: '/customer/complaint',
    description: '서비스 개선을 위한 고객님의 소중한 의견',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    iconColor: 'text-orange-600'
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: HelpCircle,
    href: '/customer/faq',
    description: '자주 묻는 질문과 답변',
    color: 'bg-green-50 text-green-700 border-green-200',
    iconColor: 'text-green-600'
  }
];

// 최근 공지사항 (예시 데이터)
const recentNotices = [
  {
    id: '1',
    title: '[기본] 안전보건경영체제 인증기관 인정서',
    date: '2024.12.20',
    isNew: true
  },
  {
    id: '2',
    title: '[기본] ESG 경영시스템 인정서 2024.6.19',
    date: '2024.06.20',
    isNew: false
  },
  {
    id: '3',
    title: '[기본] ESG 경영시스템 시범 인증기관 스킴 확대 인정',
    date: '2024.06.20',
    isNew: false
  }
];

export default function CustomerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 상단 배너 */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <span>HOME</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-200">고객서비스</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">고객서비스</h1>
          <p className="text-xl">ESG 인증원의 고객지원 서비스를 이용해보세요</p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 고객서비스 메뉴 */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {customerMenus.map((menu) => (
                <Link key={menu.id} href={menu.href}>
                  <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${menu.color}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-white`}>
                        <menu.icon className={`w-8 h-8 ${menu.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{menu.title}</h3>
                      <p className="text-sm opacity-80 mb-4">{menu.description}</p>
                      <Button variant="outline" size="sm" className="border-current">
                        바로가기 <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* 최근 공지사항 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-green-600" />
                  최근 공지사항
                </CardTitle>
                <Link href="/customer/notice">
                  <Button variant="ghost" size="sm">
                    더보기 <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotices.map((notice) => (
                    <Link 
                      key={notice.id} 
                      href={`/customer/notice/${notice.id}`}
                      className="block p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {notice.isNew && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                              NEW
                            </span>
                          )}
                          <h4 className="font-medium text-gray-900 line-clamp-1">
                            {notice.title}
                          </h4>
                        </div>
                        <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
                          {notice.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            {/* 고객 정보 */}
            <Card className="mb-6">
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

            {/* 고객지원 시간 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  고객지원 시간
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">평일</div>
                  <div className="text-gray-600">09:00 ~ 18:00</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">점심시간</div>
                  <div className="text-gray-600">12:00 ~ 13:00</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">휴무</div>
                  <div className="text-gray-600">토요일, 일요일, 공휴일</div>
                </div>
              </CardContent>
            </Card>

            {/* 빠른 링크 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">빠른 링크</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link 
                  href="/resources/iso-documents" 
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 text-sm"
                >
                  <Users className="w-4 h-4 text-green-600" />
                  ISO 자료실
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Link>
                <Link 
                  href="/resources/auditor-list" 
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 text-sm"
                >
                  <Users className="w-4 h-4 text-green-600" />
                  심사원 리스트
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Link>
                <Link 
                  href="/esg-certification/services" 
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 text-sm"
                >
                  <Users className="w-4 h-4 text-green-600" />
                  인증 서비스
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
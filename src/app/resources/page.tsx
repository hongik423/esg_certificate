'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Users, 
  ChevronRight, 
  Calendar,
  Eye,
  Download,
  Search,
  User,
  Building,
  Mail,
  Phone,
  MapPin
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

// 최신 자료 데이터 (이미지 기반)
const recentDocuments = [
  {
    id: 1,
    title: 'ESG 경영시스템(ESG-MS-001)',
    category: 'ESG',
    date: '2025.03.16 15:30',
    views: 34,
    isNew: true,
    href: '/resources/iso-documents/esg-ms-001'
  },
  {
    id: 2,
    title: 'ISO45001 인증',
    category: 'ISO 45001',
    date: '2025.03.16 15:21',
    views: 31,
    isNew: true,
    href: '/resources/iso-documents/iso45001'
  },
  {
    id: 3,
    title: 'ISO9001/ISO14001 인증제도',
    category: 'ISO 9001/14001',
    date: '2022.01.12 18:10',
    views: 129,
    isNew: false,
    href: '/resources/iso-documents/iso9001-14001'
  }
];

export default function ResourcesPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('iso-documents');

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
          <h1 className="text-4xl font-bold">자료실</h1>
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
                        activeMenu === menu.id 
                          ? 'bg-green-50 text-green-700 border-r-2 border-green-600' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveMenu(menu.id)}
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
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">ISO자료</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">총 {recentDocuments.length}건</span>
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-1" />
                      검색
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Link
                              href={doc.href}
                              className="text-lg font-medium text-gray-900 hover:text-green-600 transition-colors"
                            >
                              {doc.title}
                            </Link>
                            {doc.isNew && (
                              <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                                NEW
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>이에스지인증원</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{doc.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>조회 {doc.views}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {doc.category}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            다운로드
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">[ 1 ]</span>
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
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
    title: 'ESG 인증원 플랫폼 종합 기능 가이드',
    category: 'AI 플랫폼',
    date: '2025.01.20 10:00',
    views: 156,
    isNew: true,
    href: '/resources/platform-features-guide',
    downloadUrl: '/docs/esg_platform_features_guide.pdf',
    description: 'AI 챗봇, 세금계산기, 투자분석기 등 모든 기능 상세 설명'
  },
  {
    id: 2,
    title: 'ESG 경영시스템(ESG-MS-001)',
    category: 'ESG',
    date: '2025.03.16 15:30',
    views: 34,
    isNew: true,
    href: '/resources/iso-documents/esg-ms-001',
    downloadUrl: '/documents/esg-ms-001.pdf'
  },
  {
    id: 3,
    title: 'ISO45001 인증',
    category: 'ISO 45001',
    date: '2025.03.16 15:21',
    views: 31,
    isNew: true,
    href: '/resources/iso-documents/iso45001',
    downloadUrl: '/documents/iso45001.pdf'
  },
  {
    id: 4,
    title: 'ISO9001/ISO14001 인증제도',
    category: 'ISO 9001/14001',
    date: '2022.01.12 18:10',
    views: 129,
    isNew: false,
    href: '/resources/iso-documents/iso9001-14001',
    downloadUrl: '/documents/iso9001-14001.pdf'
  }
];

export default function ResourcesPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('iso-documents');

  const handleDownload = (downloadUrl: string, title: string) => {
    // 플랫폼 기능 가이드는 HTML 버전으로 열기
    if (downloadUrl.includes('esg_platform_features_guide')) {
      window.open('/docs/esg_platform_features_guide.html', '_blank');
    } else {
      // 기타 PDF 파일은 기존 방식으로 다운로드
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* 상단 배너 */}
      <div className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <span>HOME</span>
            <ChevronRight className="w-4 h-4" />
            <span>자료실</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-200">ISO자료</span>
          </div>
          <h1 className="text-4xl font-bold">자료실</h1>
          <p className="text-xl mt-2 opacity-90">AI 기반 플랫폼 자료 및 ISO 인증 관련 문서</p>
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
                  <CardTitle className="text-xl">ISO자료 및 플랫폼 가이드</CardTitle>
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
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
                          
                          {doc.description && (
                            <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>ESG인증원</span>
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
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              doc.category === 'AI 플랫폼' 
                                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                : 'bg-gray-50 text-gray-700'
                            }`}
                          >
                            {doc.category}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownload(doc.downloadUrl, doc.title)}
                            className="hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            다운로드
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 특별 안내 */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">🌟 플랫폼 기능 가이드 특별 제공</h3>
                  <p className="text-sm text-blue-800">
                    ESG 인증원의 AI 기반 플랫폼에 대한 상세한 기능 설명과 활용 방법을 담은 
                    종합 가이드를 무료로 제공합니다. AI 챗봇, 세금계산기, 투자타당성분석기 등 
                    모든 기능의 혜택과 사용법을 확인하세요.
                  </p>
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
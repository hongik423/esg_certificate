'use client';

import Header from '@/components/layout/header';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Video, Award, Shield } from 'lucide-react';
import DownloadSection from '@/components/ui/download-section';
import { certificationDocuments } from '@/lib/utils/download-handler';

const supportResources = [
  {
    title: '서비스 가이드북',
    description: '6대 핵심서비스 상세 안내서',
    icon: FileText,
    type: 'PDF',
    size: '2.5MB',
    fileName: null
  },
  {
    title: 'AI 활용 매뉴얼',
    description: '기업용 AI 도구 활용 가이드',
    icon: FileText,
    type: 'PDF',
    size: '3.2MB',
    fileName: null
  },
  {
    title: '정부지원 신청 가이드',
    description: '정부지원 프로그램 신청 방법',
    icon: FileText,
    type: 'PDF',
    size: '1.8MB',
    fileName: null
  },
  {
    title: '온라인 세미나 영상',
    description: 'BM ZEN 프레임워크 소개',
    icon: Video,
    type: 'Video',
    size: '45분',
    fileName: null
  },
  {
    title: 'BM ZEN 템플릿',
    description: '사업분석 템플릿 모음',
    icon: FileText,
    type: 'Excel',
    size: '1.2MB',
    fileName: null
  },
  {
    title: 'AI 도구 비교표',
    description: '업무별 AI 도구 추천',
    icon: FileText,
    type: 'PDF',
    size: '900KB',
    fileName: null
  }
];



export default function DownloadsPage() {
  const handleDownload = (fileName: string | null, title: string) => {
    if (fileName) {
      // 실제 파일 다운로드
      const link = document.createElement('a');
      link.href = `/documents/${fileName}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(`다운로드: ${title}`);
    } else {
      // 준비 중인 파일
      alert(`${title}은(는) 준비 중입니다. 곧 제공될 예정입니다.`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              자료실
            </h1>
            <p className="text-xl text-gray-600">
              ESG 인증원의 다양한 자료를 다운로드하실 수 있습니다.
            </p>
          </div>

          {/* ESG 인증 관련 문서 */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Award className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">ESG 인증 관련 문서</h2>
              <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                바로 다운로드 가능
              </span>
            </div>
            
            <DownloadSection
              title=""
              description=""
              documents={certificationDocuments}
              className="py-0 bg-white"
            />
          </div>

          {/* 기타 자료 */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Download className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">기타 자료</h2>
              <span className="ml-3 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                준비 중
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportResources.map((resource, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6 text-center">
                    <resource.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {resource.description}
                    </p>
                    <div className="text-xs text-gray-500 mb-4">
                      {resource.type} • {resource.size}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleDownload(resource.fileName, resource.title)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      다운로드
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 안내 메시지 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h4 className="font-semibold text-blue-900 mb-2">자료 다운로드 안내</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• ESG 인증 관련 문서는 무료로 다운로드 가능합니다.</li>
                <li>• 다운로드한 자료는 인증 준비 목적으로만 사용해 주시기 바랍니다.</li>
                <li>• 자료에 대한 문의사항은 고객센터로 연락 주시기 바랍니다.</li>
                <li>• 기타 자료는 순차적으로 업데이트될 예정입니다.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  FileText,
  BookOpen,
  Calculator,
  Shield,
  Award,
  Leaf,
  AlertTriangle,
  Globe,
  Scale
} from 'lucide-react';
import { DownloadDocument, handleDownload } from '@/lib/utils/download-handler';

interface DownloadSectionProps {
  title: string;
  description: string;
  documents: DownloadDocument[];
  className?: string;
}

// 아이콘 매핑
const iconMap = {
  FileText,
  BookOpen,
  Calculator,
  Shield,
  Award,
  Leaf,
  AlertTriangle,
  Globe,
  Scale
};

// 색상 매핑
const colorMap = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  teal: 'bg-teal-50 text-teal-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
  gray: 'bg-gray-50 text-gray-600'
};

export default function DownloadSection({ 
  title, 
  description, 
  documents, 
  className = '' 
}: DownloadSectionProps) {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {title}
              </CardTitle>
              <p className="text-center text-gray-600">
                {description}
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => {
                  const IconComponent = iconMap[doc.icon as keyof typeof iconMap] || FileText;
                  const colorClass = colorMap[doc.color as keyof typeof colorMap] || colorMap.gray;
                  
                  return (
                    <div key={doc.id} className={`p-4 rounded-lg border hover:shadow-md transition-shadow ${colorClass.replace('text-', 'border-').replace('-600', '-200')}`}>
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${colorClass}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1 leading-tight">
                            {doc.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                            {doc.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant="outline" 
                                className="text-xs"
                              >
                                {doc.fileType.toUpperCase()}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {doc.size}
                              </span>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownload(doc.fileName, doc.title)}
                              className="hover:bg-gray-100"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              다운로드
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {documents.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    다운로드 가능한 문서가 없습니다.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 
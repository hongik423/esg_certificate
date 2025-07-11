'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calculator,
  Award,
  FileText,
  Download,
  Phone,
  Mail,
  Calendar,
  Users,
  Building2,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Shield,
  Leaf,
  Globe,
  BadgeCheck,
  CreditCard,
  Receipt,
  Target,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';
import DownloadSection from '@/components/ui/download-section';
import { getDocumentsByCategory } from '@/lib/utils/download-handler';

// 인증 종류별 기본 정보
const certificationTypes = [
  {
    id: 'iso-9001',
    title: 'ISO 9001',
    subtitle: '품질경영시스템',
    icon: BadgeCheck,
    color: 'blue',
    basePrice: 3000000,
    duration: '3-4개월',
    description: '고객 만족과 지속적 개선을 위한 품질경영시스템 인증'
  },
  {
    id: 'iso-14001',
    title: 'ISO 14001',
    subtitle: '환경경영시스템',
    icon: Leaf,
    color: 'green',
    basePrice: 3500000,
    duration: '3-4개월',
    description: '환경 성과 개선과 지속가능경영을 위한 환경경영시스템 인증'
  },
  {
    id: 'iso-45001',
    title: 'ISO 45001',
    subtitle: '안전보건경영시스템',
    icon: Shield,
    color: 'orange',
    basePrice: 3500000,
    duration: '3-4개월',
    description: '안전하고 건강한 작업환경 구축을 위한 안전보건경영시스템 인증'
  },
  {
    id: 'esg',
    title: 'ESG 경영시스템',
    subtitle: '지속가능경영 인증',
    icon: Globe,
    color: 'purple',
    basePrice: 5000000,
    duration: '4-5개월',
    description: 'ESG 경영 체계화를 통한 지속가능한 기업 운영 인증'
  }
];

// 기업 규모별 계수
const companySizeMultipliers = [
  { size: '소규모 (20명 이하)', multiplier: 1.0, employees: '20명 이하' },
  { size: '중소규모 (21-50명)', multiplier: 1.2, employees: '21-50명' },
  { size: '중규모 (51-100명)', multiplier: 1.5, employees: '51-100명' },
  { size: '대규모 (101-300명)', multiplier: 2.0, employees: '101-300명' },
  { size: '대기업 (300명 이상)', multiplier: 2.5, employees: '300명 이상' }
];

// 심사 일수 계산
const getAuditDays = (employees: number) => {
  if (employees <= 20) return 2;
  if (employees <= 50) return 3;
  if (employees <= 100) return 4;
  if (employees <= 300) return 5;
  return 6;
};

export default function CertificationCostPage() {
  const [selectedCertification, setSelectedCertification] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [calculatedCost, setCalculatedCost] = useState(0);
  const [auditDays, setAuditDays] = useState(0);

  const calculateCost = () => {
    if (!selectedCertification || !employeeCount) return;
    
    const certification = certificationTypes.find(c => c.id === selectedCertification);
    const employees = parseInt(employeeCount);
    
    if (!certification) return;
    
    const sizeMultiplier = companySizeMultipliers.find(s => {
      const range = s.employees.split('-');
      if (range.length === 1) {
        return employees <= parseInt(range[0]) || employees >= 300;
      }
      const min = parseInt(range[0]);
      const max = parseInt(range[1]);
      return employees >= min && employees <= max;
    })?.multiplier || 1.0;
    
    const totalCost = certification.basePrice * sizeMultiplier;
    const days = getAuditDays(employees);
    
    setCalculatedCost(totalCost);
    setAuditDays(days);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              <Calculator className="w-4 h-4 mr-1" />
              투명한 비용 체계
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              심사비용 및 신청
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              투명하고 합리적인 심사비용으로<br />
              부담 없이 인증을 시작하세요
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esg-certification/consultation">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Calendar className="w-5 h-5 mr-2" />
                  인증 신청하기
                </Button>
              </Link>
              <Link href="/esg-certification/services/process">
                <Button variant="outline">
                  <FileText className="w-5 h-5 mr-2" />
                  인증 절차 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 비용 계산기 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Calculator className="w-6 h-6" />
                  심사비용 계산기
                </CardTitle>
                <p className="text-center text-gray-600">
                  기업 규모와 인증 종류에 따른 예상 비용을 계산해보세요
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="certification">인증 종류</Label>
                    <Select value={selectedCertification} onValueChange={setSelectedCertification}>
                      <SelectTrigger>
                        <SelectValue placeholder="인증 종류를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {certificationTypes.map((cert) => (
                          <SelectItem key={cert.id} value={cert.id}>
                            {cert.title} - {cert.subtitle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="employees">직원 수</Label>
                    <Input
                      id="employees"
                      type="number"
                      placeholder="직원 수를 입력하세요"
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={calculateCost}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!selectedCertification || !employeeCount}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    비용 계산하기
                  </Button>
                </div>
                
                {calculatedCost > 0 && (
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-4">예상 심사비용</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {formatPrice(calculatedCost)}원
                      </div>
                      <p className="text-gray-600 mb-4">
                        예상 심사 일수: {auditDays}일
                      </p>
                      <div className="text-sm text-gray-500">
                        * 상기 비용은 예상 금액이며, 실제 비용은 기업 상황에 따라 달라질 수 있습니다.
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 인증별 기본 비용 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              인증별 기본 비용
            </h2>
            <p className="text-lg text-gray-600">
              각 인증의 기본 비용과 특징을 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {certificationTypes.map((cert) => (
              <Card key={cert.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-${cert.color}-100 rounded-full flex items-center justify-center mr-4`}>
                        <cert.icon className={`w-6 h-6 text-${cert.color}-600`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{cert.title}</CardTitle>
                        <p className={`text-${cert.color}-600 font-medium`}>{cert.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">{cert.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">기본 비용</span>
                      <span className="font-semibold">{formatPrice(cert.basePrice)}원</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">소요 기간</span>
                      <span className="font-semibold">{cert.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 비용 구성 요소 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              심사비용 구성
            </h2>
            <p className="text-lg text-gray-600">
              투명한 비용 구성으로 신뢰할 수 있는 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">문서 심사</h3>
                <p className="text-gray-600 mb-4">
                  품질매뉴얼 및 절차서 검토
                </p>
                <div className="text-2xl font-bold text-blue-600">40%</div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">현장 심사</h3>
                <p className="text-gray-600 mb-4">
                  현장 방문 및 시스템 운영 확인
                </p>
                <div className="text-2xl font-bold text-green-600">50%</div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">인증서 발급</h3>
                <p className="text-gray-600 mb-4">
                  심사 결과 검토 및 인증서 발급
                </p>
                <div className="text-2xl font-bold text-purple-600">10%</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 결제 방법 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              결제 방법
            </h2>
            <p className="text-lg text-gray-600">
              다양한 결제 방법을 지원합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  계약 후 분할 결제
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    계약금 50% (계약 체결 시)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    잔금 50% (인증서 발급 시)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    세금계산서 발행 가능
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  일괄 결제
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    계약 체결 시 전액 결제
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    5% 할인 혜택 제공
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    우선 심사 일정 배정
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 신청 서류 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              신청 서류
            </h2>
            <p className="text-lg text-gray-600">
              인증 신청 시 필요한 서류를 확인하세요
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>필수 제출 서류</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">기본 서류</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        인증 신청서
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        사업자등록증 사본
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        회사 소개서
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        조직도
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">품질 문서</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-500" />
                        품질매뉴얼
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-500" />
                        절차서
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-500" />
                        작업지침서
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-500" />
                        기록양식
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 자료 다운로드 */}
      <DownloadSection
        title="관련 자료 다운로드"
        description="인증 신청과 관련된 자료를 다운로드하실 수 있습니다"
        documents={[
          ...getDocumentsByCategory('application'),
          ...getDocumentsByCategory('cost')
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 인증 신청하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            전문가 상담을 통해 최적의 인증 솔루션을 제공해드립니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/esg-certification/consultation">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" />
                인증 신청하기
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
            {CONSULTANT_INFO.fullTitle} | {CONTACT_INFO.consultationHours}
          </p>
        </div>
      </section>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Award,
  Phone,
  Mail,
  Building2,
  User,
  FileText,
  CheckCircle,
  Send,
  Clock,
  Shield,
  Leaf,
  Globe,
  BadgeCheck,
  MessageSquare
} from 'lucide-react';
import { COMPANY_INFO, CONSULTANT_INFO, CONTACT_INFO } from '@/lib/config/branding';

// 인증 종류
const certificationTypes = [
  { value: 'iso-9001', label: 'ISO 9001 (품질경영시스템)', icon: BadgeCheck },
  { value: 'iso-14001', label: 'ISO 14001 (환경경영시스템)', icon: Leaf },
  { value: 'iso-45001', label: 'ISO 45001 (안전보건경영시스템)', icon: Shield },
  { value: 'esg', label: 'ESG 경영시스템', icon: Globe },
  { value: 'multiple', label: '복수 인증', icon: Award },
  { value: 'other', label: '기타 문의', icon: MessageSquare }
];

// 기업 규모
const companySizes = [
  { value: 'small', label: '50명 이하' },
  { value: 'medium', label: '51-200명' },
  { value: 'large', label: '201-500명' },
  { value: 'enterprise', label: '500명 이상' }
];

export default function CertificationConsultationPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    position: '',
    phone: '',
    email: '',
    certificationTypes: [] as string[], // 복수 선택 가능하게 변경
    companySize: '',
    industry: '',
    currentStatus: '',
    message: '',
    agreeToTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCertificationTypeChange = (certType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      certificationTypes: checked 
        ? [...prev.certificationTypes, certType]
        : prev.certificationTypes.filter(type => type !== certType)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "약관 동의 필요",
        description: "개인정보 수집 및 이용에 동의해주세요.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // API 호출 (실제 구현 시)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "상담 신청 완료",
        description: "담당자가 24시간 이내에 연락드리겠습니다.",
      });
      
      // 폼 리셋
      setFormData({
        companyName: '',
        contactPerson: '',
        position: '',
        phone: '',
        email: '',
        certificationTypes: [],
        companySize: '',
        industry: '',
        currentStatus: '',
        message: '',
        agreeToTerms: false
      });
    } catch (error) {
      toast({
        title: "신청 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">
              <Award className="w-4 h-4 mr-1" />
              KAB 인정 인증기관
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              인증 상담 신청
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              ISO 9001, ISO 14001, ISO 45001, ESG 경영시스템<br />
              전문가와 함께 귀사에 최적화된 인증 솔루션을 찾아보세요
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 상담 신청 폼 */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">상담 신청서</CardTitle>
                    <p className="text-gray-600">
                      아래 정보를 입력해주시면 전문 컨설턴트가 맞춤형 상담을 제공해드립니다.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* 기업 정보 */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center">
                          <Building2 className="w-5 h-5 mr-2 text-green-600" />
                          기업 정보
                        </h3>
                        
                        <div>
                          <Label htmlFor="companyName">기업명 *</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            placeholder="(주)예시기업"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="industry">업종 *</Label>
                            <Input
                              id="industry"
                              value={formData.industry}
                              onChange={(e) => handleInputChange('industry', e.target.value)}
                              placeholder="제조업"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="companySize">기업 규모 *</Label>
                            <Select
                              value={formData.companySize}
                              onValueChange={(value) => handleInputChange('companySize', value)}
                            >
                              <SelectTrigger id="companySize">
                                <SelectValue placeholder="선택하세요" />
                              </SelectTrigger>
                              <SelectContent>
                                {companySizes.map((size) => (
                                  <SelectItem key={size.value} value={size.value}>
                                    {size.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* 담당자 정보 */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center">
                          <User className="w-5 h-5 mr-2 text-green-600" />
                          담당자 정보
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contactPerson">성명 *</Label>
                            <Input
                              id="contactPerson"
                              value={formData.contactPerson}
                              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                              placeholder="홍길동"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="position">직책 *</Label>
                            <Input
                              id="position"
                              value={formData.position}
                              onChange={(e) => handleInputChange('position', e.target.value)}
                              placeholder="품질관리팀 과장"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone">연락처 *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="010-1234-5678"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="email">이메일 *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="example@company.com"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* 인증 정보 */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center">
                          <Award className="w-5 h-5 mr-2 text-green-600" />
                          인증 정보
                        </h3>
                        
                        <div>
                          <Label>희망 인증 * (복수 선택 가능)</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                            {certificationTypes.map((type) => (
                              <div key={type.value} className="flex items-center space-x-2">
                                <Checkbox
                                  id={type.value}
                                  checked={formData.certificationTypes.includes(type.value)}
                                  onCheckedChange={(checked) => handleCertificationTypeChange(type.value, checked as boolean)}
                                />
                                <Label htmlFor={type.value} className="flex items-center cursor-pointer">
                                  <type.icon className="w-4 h-4 mr-2" />
                                  {type.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="currentStatus">현재 상태</Label>
                          <Textarea
                            id="currentStatus"
                            value={formData.currentStatus}
                            onChange={(e) => handleInputChange('currentStatus', e.target.value)}
                            placeholder="기존 인증 보유 여부, 준비 상황 등을 간략히 작성해주세요"
                            rows={3}
                          />
                        </div>
                      </div>

                      {/* 추가 메시지 */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center">
                          <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                          추가 문의사항
                        </h3>
                        
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="기타 문의사항이나 요청사항을 자유롭게 작성해주세요"
                          rows={4}
                        />
                      </div>

                      {/* 개인정보 수집 및 이용 동의 */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-green-600" />
                          개인정보 수집 및 이용 동의
                        </h3>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-sm mb-3">1. 개인정보 수집목적</h4>
                          <ul className="text-sm text-gray-600 space-y-1 mb-4">
                            <li>• 상담 서비스 제공 및 통신</li>
                            <li>• 시스템 관련 제품 및 서비스 안내</li>
                            <li>• 온라인 특성상 연락처 확인</li>
                          </ul>
                          
                          <h4 className="font-semibold text-sm mb-3">2. 수집하는 개인정보 항목</h4>
                          <ul className="text-sm text-gray-600 space-y-1 mb-4">
                            <li>• 필수항목: 성명, 연락처, 이메일, 회사명, 직책</li>
                            <li>• 선택항목: 기업규모, 업종, 현재상태, 문의사항</li>
                          </ul>
                          
                          <h4 className="font-semibold text-sm mb-3">3. 개인정보 보유 및 이용기간</h4>
                          <p className="text-sm text-gray-600">
                            수집된 개인정보는 상담 완료 후 6개월간 보관되며, 이후 안전하게 폐기됩니다.
                          </p>
                        </div>
                        
                        <div className="flex items-start">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                            className="mt-1"
                          />
                          <Label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700 cursor-pointer">
                            위 개인정보 수집 및 이용에 동의합니다. (필수)
                          </Label>
                        </div>
                      </div>

                      {/* 제출 버튼 */}
                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            제출 중...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            상담 신청하기
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* 우측 정보 패널 */}
              <div className="space-y-6">
                {/* 연락처 정보 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">빠른 상담</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-3 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold">{CONTACT_INFO.mainPhone}</p>
                        <p className="text-sm text-gray-600">{CONSULTANT_INFO.fullTitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-3 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold">{CONTACT_INFO.mainEmail}</p>
                        <p className="text-sm text-gray-600">24시간 이내 회신</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 mr-3 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold">상담 시간</p>
                        <p className="text-sm text-gray-600">{CONTACT_INFO.consultationHours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 인증 혜택 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">인증 취득 혜택</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">공공기관 입찰 가점 획득</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">대기업 협력업체 등록 요건 충족</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">체계적인 경영시스템 구축</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">기업 신뢰도 및 이미지 향상</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">지속가능경영 기반 마련</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* 자주 묻는 질문 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">자주 묻는 질문</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm mb-1">인증 취득 기간은?</p>
                      <p className="text-sm text-gray-600">
                        일반적으로 3-4개월이 소요되며, 기업 준비 상태에 따라 달라질 수 있습니다.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-sm mb-1">비용은 어떻게 되나요?</p>
                      <p className="text-sm text-gray-600">
                        기업 규모와 인증 범위에 따라 달라지며, 상담을 통해 정확한 견적을 제공해드립니다.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-sm mb-1">컨설팅도 가능한가요?</p>
                      <p className="text-sm text-gray-600">
                        네, 인증 취득을 위한 전 과정에 대한 컨설팅 서비스를 제공합니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
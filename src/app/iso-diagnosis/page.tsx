'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Shield, 
  Award, 
  FileText, 
  CheckCircle2, 
  Star, 
  Clock, 
  BarChart3,
  Building2,
  User,
  Mail,
  Phone,
  Factory,
  Users,
  Target,
  Calendar,
  AlertCircle,
  Download,
  Send,
  Loader2,
  ArrowRight,
  Zap,
  Globe,
  Leaf
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ISODiagnosisData {
  // 기본 정보
  companyName: string;
  industry: string;
  businessSize: string;
  employeeCount: string;
  desiredCertifications: string[]; // 복수 선택 가능하게 변경
  certificationExperience: string;
  certificationPurpose: string;
  expectedSchedule: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  privacyConsent: boolean;

  // 인증 준비도 평가 (1-5점)
  certificationScores: {
    policy_establishment: number;
    procedure_writing: number;
    form_management: number;
    record_management: number;
    document_control: number;
    process_definition: number;
    responsibility_authority: number;
    operation_procedure: number;
    performance_measurement: number;
    training_plan: number;
    training_implementation: number;
    competency_assessment: number;
    training_record: number;
    training_effectiveness: number;
    internal_audit: number;
    management_review: number;
    nonconformity_management: number;
    preventive_action: number;
    corrective_action: number;
    continual_improvement: number;
  };
}

interface ISODiagnosisResult {
  success: boolean;
  message: string;
  data?: {
    totalScore: number;
    categoryScores: {
      documentation: number;
      process: number;
      training: number;
      monitoring: number;
      improvement: number;
    };
    recommendations: string[];
    nextSteps: string[];
    reportUrl: string;
  };
}

export default function ISODiagnosisPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: 소개, 2: 폼, 3: 결과
  const [formData, setFormData] = useState<ISODiagnosisData>({
    companyName: '',
    industry: '',
    businessSize: '',
    employeeCount: '',
    desiredCertifications: [], // 복수 선택 가능하게 변경
    certificationExperience: '',
    certificationPurpose: '',
    expectedSchedule: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    privacyConsent: false,
    certificationScores: {
      policy_establishment: 1,
      procedure_writing: 1,
      form_management: 1,
      record_management: 1,
      document_control: 1,
      process_definition: 1,
      responsibility_authority: 1,
      operation_procedure: 1,
      performance_measurement: 1,
      training_plan: 1,
      training_implementation: 1,
      competency_assessment: 1,
      training_record: 1,
      training_effectiveness: 1,
      internal_audit: 1,
      management_review: 1,
      nonconformity_management: 1,
      preventive_action: 1,
      corrective_action: 1,
      continual_improvement: 1,
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ISODiagnosisResult | null>(null);
  const { toast } = useToast();

  // 폼 데이터 업데이트
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 희망 인증 선택 업데이트
  const handleCertificationChange = (certType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      desiredCertifications: checked 
        ? [...prev.desiredCertifications, certType]
        : prev.desiredCertifications.filter(type => type !== certType)
    }));
  };

  // 점수 업데이트
  const updateScore = (field: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      certificationScores: {
        ...prev.certificationScores,
        [field]: value
      }
    }));
  };

  // 폼 제출
  const handleSubmit = async () => {
    if (!formData.privacyConsent) {
      toast({
        title: "개인정보 처리방침 동의 필요",
        description: "개인정보 처리방침에 동의해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 총점 계산
      const totalScore = Object.values(formData.certificationScores).reduce((sum, score) => sum + score, 0);
      const averageScore = (totalScore / 20) * 20; // 100점 만점으로 변환

      // 카테고리별 점수 계산
      const categoryScores = {
        documentation: ((formData.certificationScores.policy_establishment + 
                        formData.certificationScores.procedure_writing + 
                        formData.certificationScores.form_management + 
                        formData.certificationScores.record_management + 
                        formData.certificationScores.document_control) / 5) * 20,
        process: ((formData.certificationScores.process_definition + 
                  formData.certificationScores.responsibility_authority + 
                  formData.certificationScores.operation_procedure + 
                  formData.certificationScores.performance_measurement) / 4) * 20,
        training: ((formData.certificationScores.training_plan + 
                   formData.certificationScores.training_implementation + 
                   formData.certificationScores.competency_assessment + 
                   formData.certificationScores.training_record + 
                   formData.certificationScores.training_effectiveness) / 5) * 20,
        monitoring: ((formData.certificationScores.internal_audit + 
                     formData.certificationScores.management_review) / 2) * 20,
        improvement: ((formData.certificationScores.nonconformity_management + 
                      formData.certificationScores.preventive_action + 
                      formData.certificationScores.corrective_action + 
                      formData.certificationScores.continual_improvement) / 4) * 20
      };

      // Google Apps Script로 데이터 전송
      const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'saveISODiagnosis',
          폼타입: 'ISO_무료진단',
          ...formData,
          인증준비도점수: Math.round(averageScore),
          카테고리점수: categoryScores,
          진단점수: formData.certificationScores,
          진단보고서요약: `${formData.companyName}의 ${formData.desiredCertifications.join(', ')} 인증 준비도 진단 결과입니다.`
        }),
      });

      const result = await response.json();

      if (result.success) {
        setResults({
          success: true,
          message: '진단이 완료되었습니다.',
          data: {
            totalScore: Math.round(averageScore),
            categoryScores,
            recommendations: generateRecommendations(categoryScores),
            nextSteps: generateNextSteps(averageScore),
            reportUrl: ''
          }
        });
        setCurrentStep(3);
        
        toast({
          title: "진단 완료!",
          description: "ISO 인증 준비도 진단이 완료되었습니다.",
        });
      } else {
        throw new Error(result.error || '진단 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('진단 제출 오류:', error);
      toast({
        title: "진단 실패",
        description: "진단 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 추천사항 생성
  const generateRecommendations = (categoryScores: any) => {
    const recommendations = [];
    
    if (categoryScores.documentation < 60) {
      recommendations.push('문서화 체계 구축이 우선적으로 필요합니다.');
    }
    if (categoryScores.process < 60) {
      recommendations.push('프로세스 정의 및 표준화가 필요합니다.');
    }
    if (categoryScores.training < 60) {
      recommendations.push('체계적인 교육훈련 시스템 구축이 필요합니다.');
    }
    if (categoryScores.monitoring < 60) {
      recommendations.push('내부감사 및 모니터링 체계 강화가 필요합니다.');
    }
    if (categoryScores.improvement < 60) {
      recommendations.push('지속적 개선 활동 체계화가 필요합니다.');
    }

    return recommendations.length > 0 ? recommendations : ['전반적으로 우수한 인증 준비도를 보이고 있습니다.'];
  };

  // 다음 단계 생성
  const generateNextSteps = (totalScore: number) => {
    if (totalScore >= 80) {
      return [
        '인증 신청 준비가 잘 되어 있습니다.',
        '인증기관 선정 및 심사 일정 협의',
        '최종 문서 검토 및 보완',
        '심사원 교육 및 모의 심사 실시'
      ];
    } else if (totalScore >= 60) {
      return [
        '인증 준비를 위한 보완 작업이 필요합니다.',
        '부족한 영역의 문서화 작업',
        '직원 교육 및 인식 개선',
        '3-6개월 준비 기간 필요'
      ];
    } else {
      return [
        '인증 준비를 위한 전면적인 개선이 필요합니다.',
        '전문 컨설팅 서비스 이용 권장',
        '단계별 개선 계획 수립',
        '6-12개월 준비 기간 필요'
      ];
    }
  };

  // 단계 1: 소개 페이지
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ISO 인증 무료진단
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              귀하의 기업이 ISO 인증을 위해 얼마나 준비되어 있는지 무료로 진단해드립니다.
            </p>
          </div>

          {/* 지원 인증 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Shield,
                title: 'ISO 9001',
                subtitle: '품질경영시스템',
                description: '품질 관리 및 고객 만족도 향상',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Leaf,
                title: 'ISO 14001',
                subtitle: '환경경영시스템',
                description: '환경 영향 최소화 및 지속가능성',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Users,
                title: 'ISO 45001',
                subtitle: '안전보건경영시스템',
                description: '직장 안전 및 보건 관리',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{cert.subtitle}</p>
                  <p className="text-sm text-gray-500">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 진단 특징 */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                <Award className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                진단 특징
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Clock,
                    title: '빠른 진단',
                    description: '10-15분 내 완료'
                  },
                  {
                    icon: FileText,
                    title: '상세 분석',
                    description: '20개 항목 평가'
                  },
                  {
                    icon: BarChart3,
                    title: '점수 제공',
                    description: '100점 만점 평가'
                  },
                  {
                    icon: Target,
                    title: '맞춤 추천',
                    description: '개선 방안 제시'
                  }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 진단 과정 */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                <ArrowRight className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                진단 과정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: '기본 정보 입력',
                    description: '회사 정보 및 인증 목적'
                  },
                  {
                    step: '2',
                    title: '준비도 평가',
                    description: '20개 항목 자가 평가'
                  },
                  {
                    step: '3',
                    title: '결과 확인',
                    description: '점수 및 개선 방안'
                  }
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {step.step}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button 
              onClick={() => setCurrentStep(2)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              <Zap className="w-5 h-5 mr-2" />
              진단 시작하기
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              * 완전 무료이며, 개인정보는 안전하게 보호됩니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 단계 2: 진단 폼
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 진행 상황 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                이전으로
              </Button>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">ISO 인증 준비도 진단</h1>
                <p className="text-gray-600">정확한 진단을 위해 모든 항목을 작성해주세요.</p>
              </div>
              <div className="w-20"></div>
            </div>
          </div>

          <div className="space-y-8">
            {/* 기본 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  기본 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">회사명 *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      placeholder="회사명을 입력하세요"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">업종 *</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => updateFormData('industry', e.target.value)}
                      placeholder="예: 제조업, 서비스업"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessSize">사업장 규모 *</Label>
                    <Select value={formData.businessSize} onValueChange={(value) => updateFormData('businessSize', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="사업장 규모 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="소기업">소기업 (10명 미만)</SelectItem>
                        <SelectItem value="중소기업">중소기업 (10-300명)</SelectItem>
                        <SelectItem value="중견기업">중견기업 (300-1000명)</SelectItem>
                        <SelectItem value="대기업">대기업 (1000명 이상)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="employeeCount">직원 수 *</Label>
                    <Input
                      id="employeeCount"
                      value={formData.employeeCount}
                      onChange={(e) => updateFormData('employeeCount', e.target.value)}
                      placeholder="예: 50명"
                    />
                  </div>
                </div>

                <div>
                  <Label>희망 인증 * (복수 선택 가능)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {[
                      { value: 'ISO 9001', label: 'ISO 9001 (품질경영시스템)', icon: Shield },
                      { value: 'ISO 14001', label: 'ISO 14001 (환경경영시스템)', icon: Leaf },
                      { value: 'ISO 45001', label: 'ISO 45001 (안전보건경영시스템)', icon: Users },
                      { value: 'ESG 경영시스템', label: 'ESG 경영시스템', icon: Globe }
                    ].map((cert) => (
                      <div key={cert.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={cert.value}
                          checked={formData.desiredCertifications.includes(cert.value)}
                          onCheckedChange={(checked) => handleCertificationChange(cert.value, checked as boolean)}
                        />
                        <Label htmlFor={cert.value} className="flex items-center cursor-pointer">
                          <cert.icon className="w-4 h-4 mr-2" />
                          {cert.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="certificationExperience">인증 경험 *</Label>
                    <Select value={formData.certificationExperience} onValueChange={(value) => updateFormData('certificationExperience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="인증 경험 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="없음">없음</SelectItem>
                        <SelectItem value="진행중">현재 진행 중</SelectItem>
                        <SelectItem value="보유">기존 인증 보유</SelectItem>
                        <SelectItem value="갱신">인증 갱신</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="certificationPurpose">인증 목적 *</Label>
                  <Textarea
                    id="certificationPurpose"
                    value={formData.certificationPurpose}
                    onChange={(e) => updateFormData('certificationPurpose', e.target.value)}
                    placeholder="인증을 통해 달성하고자 하는 목표를 작성해주세요"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="expectedSchedule">예상 일정 *</Label>
                  <Select value={formData.expectedSchedule} onValueChange={(value) => updateFormData('expectedSchedule', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="예상 일정 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3개월 이내">3개월 이내</SelectItem>
                      <SelectItem value="6개월 이내">6개월 이내</SelectItem>
                      <SelectItem value="1년 이내">1년 이내</SelectItem>
                      <SelectItem value="1년 이상">1년 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 담당자 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  담당자 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contactName">담당자명 *</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => updateFormData('contactName', e.target.value)}
                      placeholder="담당자명"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">연락처 *</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => updateFormData('contactPhone', e.target.value)}
                      placeholder="010-0000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">이메일 *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateFormData('contactEmail', e.target.value)}
                      placeholder="example@company.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 인증 준비도 평가 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  인증 준비도 자가 평가
                </CardTitle>
                <p className="text-sm text-gray-600">
                  각 항목에 대해 현재 상태를 1-5점으로 평가해주세요. (1: 매우 부족, 5: 매우 우수)
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {/* 문서화 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      문서화 (25%)
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { key: 'policy_establishment', label: '정책 수립 (경영방침, 품질정책 등)' },
                        { key: 'procedure_writing', label: '절차서 작성 (업무절차서, 지침서 등)' },
                        { key: 'form_management', label: '양식 관리 (각종 양식, 체크리스트 등)' },
                        { key: 'record_management', label: '기록 관리 (회의록, 점검기록 등)' },
                        { key: 'document_control', label: '문서 통제 (문서관리, 버전관리 등)' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <Label className="flex-1">{item.label}</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((score) => (
                              <Button
                                key={score}
                                variant={formData.certificationScores[item.key as keyof typeof formData.certificationScores] === score ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateScore(item.key, score)}
                                className="w-8 h-8 p-0"
                              >
                                {score}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 프로세스 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Factory className="w-5 h-5 text-green-600" />
                      프로세스 (25%)
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { key: 'process_definition', label: '프로세스 정의 (업무프로세스 정의)' },
                        { key: 'responsibility_authority', label: '책임과 권한 (역할과 책임 명확화)' },
                        { key: 'operation_procedure', label: '운영 절차 (운영절차 수립)' },
                        { key: 'performance_measurement', label: '성과 측정 (KPI 설정 및 측정)' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <Label className="flex-1">{item.label}</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((score) => (
                              <Button
                                key={score}
                                variant={formData.certificationScores[item.key as keyof typeof formData.certificationScores] === score ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateScore(item.key, score)}
                                className="w-8 h-8 p-0"
                              >
                                {score}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 교육훈련 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      교육훈련 (20%)
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { key: 'training_plan', label: '교육 계획 (연간 교육계획 수립)' },
                        { key: 'training_implementation', label: '교육 실시 (정기적 교육 실시)' },
                        { key: 'competency_assessment', label: '역량 평가 (직원 역량 평가)' },
                        { key: 'training_record', label: '교육 기록 (교육 이력 관리)' },
                        { key: 'training_effectiveness', label: '교육 효과 (교육 효과성 평가)' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <Label className="flex-1">{item.label}</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((score) => (
                              <Button
                                key={score}
                                variant={formData.certificationScores[item.key as keyof typeof formData.certificationScores] === score ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateScore(item.key, score)}
                                className="w-8 h-8 p-0"
                              >
                                {score}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 모니터링 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      모니터링 (15%)
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { key: 'internal_audit', label: '내부 감사 (내부감사 체계)' },
                        { key: 'management_review', label: '경영 검토 (경영진 검토)' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <Label className="flex-1">{item.label}</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((score) => (
                              <Button
                                key={score}
                                variant={formData.certificationScores[item.key as keyof typeof formData.certificationScores] === score ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateScore(item.key, score)}
                                className="w-8 h-8 p-0"
                              >
                                {score}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 개선활동 */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-red-600" />
                      개선활동 (15%)
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { key: 'nonconformity_management', label: '부적합 관리 (부적합 사항 관리)' },
                        { key: 'preventive_action', label: '예방 조치 (예방조치 활동)' },
                        { key: 'corrective_action', label: '시정 조치 (시정조치 활동)' },
                        { key: 'continual_improvement', label: '지속적 개선 (지속적 개선 활동)' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <Label className="flex-1">{item.label}</Label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((score) => (
                              <Button
                                key={score}
                                variant={formData.certificationScores[item.key as keyof typeof formData.certificationScores] === score ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateScore(item.key, score)}
                                className="w-8 h-8 p-0"
                              >
                                {score}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 개인정보 수집 및 이용 동의 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  개인정보 수집 및 이용 동의
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-sm mb-3">1. 개인정보 수집목적</h4>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li>• 상담 서비스 제공 및 통신</li>
                    <li>• 시스템 관련 제품 및 서비스 안내</li>
                    <li>• 온라인 특성상 연락처 확인</li>
                  </ul>
                  
                  <h4 className="font-semibold text-sm mb-3">2. 수집하는 개인정보 항목</h4>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li>• 필수항목: 성명, 연락처, 이메일, 회사명, 직책</li>
                    <li>• 선택항목: 기업규모, 업종, 인증경험, 문의사항</li>
                  </ul>
                  
                  <h4 className="font-semibold text-sm mb-3">3. 개인정보 보유 및 이용기간</h4>
                  <p className="text-sm text-gray-600">
                    수집된 개인정보는 상담 완료 후 6개월간 보관되며, 이후 안전하게 폐기됩니다.
                  </p>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyConsent}
                    onCheckedChange={(checked) => updateFormData('privacyConsent', checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
                    위 개인정보 수집 및 이용에 동의합니다. (필수)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* 제출 버튼 */}
            <div className="text-center">
              <Button 
                onClick={handleSubmit}
                disabled={isLoading || !formData.privacyConsent}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    진단 중...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    진단 결과 확인하기
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 단계 3: 결과 표시
  if (currentStep === 3 && results?.data) {
    const { totalScore, categoryScores, recommendations, nextSteps } = results.data;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ISO 인증 준비도 진단 결과
            </h1>
            <p className="text-lg text-gray-600">
              {formData.companyName}의 {formData.desiredCertifications.join(', ')} 인증 준비도 분석 결과입니다.
            </p>
          </div>

          {/* 총점 */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {totalScore}점
              </div>
              <div className="text-xl text-gray-600 mb-4">
                100점 만점 중 {totalScore}점
              </div>
              <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${
                totalScore >= 80 ? 'bg-green-500' :
                totalScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}>
                {totalScore >= 80 ? '우수' : totalScore >= 60 ? '보통' : '개선 필요'}
              </div>
            </CardContent>
          </Card>

          {/* 카테고리별 점수 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>카테고리별 점수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categoryScores).map(([category, score]) => {
                  const categoryNames = {
                    documentation: '문서화',
                    process: '프로세스',
                    training: '교육훈련',
                    monitoring: '모니터링',
                    improvement: '개선활동'
                  };
                  
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="font-medium">{categoryNames[category as keyof typeof categoryNames]}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold w-12 text-right">{Math.round(score)}점</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 개선 추천사항 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                개선 추천사항
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 다음 단계 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-blue-500" />
                다음 단계
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.print()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                결과 인쇄하기
              </Button>
              <Button 
                onClick={() => window.location.href = '/consultation'}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                전문가 상담 신청
              </Button>
            </div>
            <Button 
              onClick={() => {
                setCurrentStep(1);
                setResults(null);
                setFormData({
                  companyName: '',
                  industry: '',
                  businessSize: '',
                  employeeCount: '',
                  desiredCertifications: [],
                  certificationExperience: '',
                  certificationPurpose: '',
                  expectedSchedule: '',
                  contactName: '',
                  contactPhone: '',
                  contactEmail: '',
                  privacyConsent: false,
                  certificationScores: {
                    policy_establishment: 1,
                    procedure_writing: 1,
                    form_management: 1,
                    record_management: 1,
                    document_control: 1,
                    process_definition: 1,
                    responsibility_authority: 1,
                    operation_procedure: 1,
                    performance_measurement: 1,
                    training_plan: 1,
                    training_implementation: 1,
                    competency_assessment: 1,
                    training_record: 1,
                    training_effectiveness: 1,
                    internal_audit: 1,
                    management_review: 1,
                    nonconformity_management: 1,
                    preventive_action: 1,
                    corrective_action: 1,
                    continual_improvement: 1,
                  }
                });
              }}
              variant="ghost"
            >
              새로운 진단 시작하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 
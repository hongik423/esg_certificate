'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Calculator, TrendingUp, Users, DollarSign, Info, CheckCircle, Clock, PieChart, BarChart3, Target, Lightbulb, Gift, Heart, GraduationCap, Calendar, FileText, PiggyBank, TrendingDown, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  GiftTaxCalculator, 
  GiftTaxInputValidator
} from '@/lib/utils/gift-tax-calculations';
import { GiftTaxInput, GiftTaxResult } from '@/types/tax-calculator.types';
import { GIFT_TAX_LIMITS_2024 } from '@/constants/tax-rates-2024';
import TaxCalculatorDisclaimer from './TaxCalculatorDisclaimer';

import { formatNumber, formatWon } from '@/lib/utils';
import { NumberInput } from '@/components/ui/number-input';

export default function GiftTaxCalculatorComponent() {
  const [input, setInput] = useState<GiftTaxInput>({
    // 기본 증여 ?�보
    giftAmount: 0,
    giftDate: new Date().toISOString().split('T')[0],
    
    // 증여???�보
    donorAge: 50,
    donorRelation: 'parent',
    
    // ?�증???�보
    recipientAge: 25,
    isRecipientMinor: false,
    isRecipientDisabled: false,
    
    // 증여 ?�태
    giftType: 'money',
    isConditionalGift: false,
    giftConditionValue: 0,
    
    // ?�산 분류
    cash: 0,
    realEstate: 0,
    stock: 0,
    bond: 0,
    businessAsset: 0,
    other: 0,
    
    // ?�수 증여
    marriageGift: false,
    marriageGiftAmount: 0,
    educationGift: false,
    educationGiftAmount: 0,
    
    // 10????기존 증여
    previousGifts: [],
    
    // 공제 �?감면
    familyBusinessDiscount: false,
    farmLandDiscount: false,
    culturalAssetDiscount: false,
    startupDiscount: false,
    
    // 기�?
    previousTaxPaid: 0,
    isNonResident: false,
    hasSpecialRelationship: false
  });

  const [result, setResult] = useState<GiftTaxResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // ?�� 고도?�된 ?�동 ?�계 계산 로직
  
  // 1. �?증여???�동 계산
  const totalGiftAmount = useMemo(() => {
    return input.cash + input.realEstate + input.stock + input.bond + 
           input.businessAsset + input.other;
  }, [input.cash, input.realEstate, input.stock, input.bond, 
      input.businessAsset, input.other]);

  // 2. ?�수 증여 총액 계산
  const specialGiftTotal = useMemo(() => {
    let total = 0;
    if (input.marriageGift) total += input.marriageGiftAmount;
    if (input.educationGift) total += input.educationGiftAmount;
    return total;
  }, [input.marriageGift, input.marriageGiftAmount, input.educationGift, input.educationGiftAmount]);

  // 3. 관계별 공제?�도 ?�동 계산
  const deductionLimits = useMemo(() => {
    const relationship = input.donorRelation;
    const limits = GIFT_TAX_LIMITS_2024.relationshipLimits;
    
    let basicDeduction = 0;
    let specialDeduction = 0;
    
    switch (relationship) {
      case 'spouse':
        basicDeduction = limits.spouse.annual;
        break;
      case 'parent':
      case 'grandparent':
        basicDeduction = limits.linealAscendant.annual;
        if (input.recipientAge >= 19) {
          basicDeduction = limits.linealAscendant.annual; // 5천만??        }
        break;
      case 'child':
      case 'grandchild':
        basicDeduction = limits.linealDescendant.annual;
        if (input.isRecipientMinor) {
          basicDeduction = limits.linealDescendant.annual; // 2천만??        }
        break;
      default:
        basicDeduction = limits.other.annual;
    }
    
    // ?�수 공제 (?�인, 교육 ??
    if (input.marriageGift) {
      specialDeduction += 100000000; // ?�인증여 1?�원 추�?
    }
    if (input.educationGift) {
      specialDeduction += 30000000; // 교육�?증여 3천만??추�?
    }
    
    return {
      basic: basicDeduction,
      special: specialDeduction,
      total: basicDeduction + specialDeduction
    };
  }, [input.donorRelation, input.recipientAge, input.isRecipientMinor, 
      input.marriageGift, input.educationGift]);

  // 4. 10????기존 증여 ?�산
  const previousGiftTotal = useMemo(() => {
    return input.previousGifts.reduce((sum, gift) => sum + gift.amount, 0);
  }, [input.previousGifts]);

  // 5. 과세?��? ?�동 계산
  const estimatedTaxableIncome = useMemo(() => {
    const currentGift = Math.max(input.giftAmount, totalGiftAmount);
    const totalGiftWithPrevious = currentGift + previousGiftTotal;
    return Math.max(0, totalGiftWithPrevious - deductionLimits.total);
  }, [input.giftAmount, totalGiftAmount, previousGiftTotal, deductionLimits.total]);

  // 6. ?�상 ?�율 구간 계산
  const expectedTaxBracket = useMemo(() => {
    if (estimatedTaxableIncome <= 0) {
      return { rate: 0, description: '비과??(공제????' };
    } else if (estimatedTaxableIncome <= 100000000) {
      return { rate: 10, description: '10% 구간 (1?�원 ?�하)' };
    } else if (estimatedTaxableIncome <= 500000000) {
      return { rate: 20, description: '20% 구간 (5?�원 ?�하)' };
    } else if (estimatedTaxableIncome <= 1000000000) {
      return { rate: 30, description: '30% 구간 (10?�원 ?�하)' };
    } else if (estimatedTaxableIncome <= 3000000000) {
      return { rate: 40, description: '40% 구간 (30?�원 ?�하)' };
    } else {
      return { rate: 50, description: '50% 구간 (30?�원 초과)' };
    }
  }, [estimatedTaxableIncome]);

  // 7. ?�리???�류 체크
  const logicalErrors = useMemo(() => {
    const errors: string[] = [];
    
    // 증여??불일�?체크
    if (totalGiftAmount > 0 && Math.abs(totalGiftAmount - input.giftAmount) > 100000) {
      errors.push(`?�산�??�계(${formatWon(totalGiftAmount)})?� �?증여??${formatWon(input.giftAmount)})???�릅?�다.`);
    }
    
    // 미성?�자 ?�이 체크
    if (input.isRecipientMinor && input.recipientAge >= 19) {
      errors.push('19???�상?� 미성?�자가 ?�닙?�다.');
    }
    
    // 미래 ?�짜 체크
    const today = new Date();
    const giftDate = new Date(input.giftDate);
    if (giftDate > today) {
      errors.push('증여?�이 미래 ?�짜�??�정?�어 ?�습?�다.');
    }
    
    // ?�인 증여 조건 체크
    if (input.marriageGift && input.marriageGiftAmount === 0) {
      errors.push('?�인 증여�?체크?��?�?금액???�력?��? ?�았?�니??');
    }
    
    // 교육�?증여 조건 체크
    if (input.educationGift && input.educationGiftAmount === 0) {
      errors.push('교육�?증여�?체크?��?�?금액???�력?��? ?�았?�니??');
    }
    
    // ?�수 관�?체크
    if (input.hasSpecialRelationship && input.donorRelation === 'spouse') {
      errors.push('배우??관계�? ?�수관계�? ?�시???�용?????�습?�다.');
    }
    
    return errors;
  }, [input, totalGiftAmount]);

  // 8. ?�세 추천 로직
  const taxSavingRecommendations = useMemo(() => {
    const recommendations: string[] = [];
    
    // 공제 ?�도 ?�용 추천
    const remainingDeduction = deductionLimits.total - input.giftAmount;
    if (remainingDeduction > 10000000 && input.giftAmount > 0) {
      recommendations.push(`관계별 공제?�도 ${formatWon(remainingDeduction)} 추�? ?�용 가??);
    }
    
    // ?�인 증여 추천
    if (!input.marriageGift && input.recipientAge >= 18 && input.recipientAge <= 50 && 
        input.donorRelation === 'parent') {
      recommendations.push('?�인 ??1?�원 추�? 공제 ?�택 ?�용 검??);
    }
    
    // 교육�?증여 추천
    if (!input.educationGift && input.recipientAge <= 30 && 
        (input.donorRelation === 'parent' || input.donorRelation === 'grandparent')) {
      recommendations.push('교육�?명목 3천만??추�? 공제 검??);
    }
    
    // 분할 증여 추천
    if (estimatedTaxableIncome > 500000000) {
      recommendations.push('?�러 ?�에 걸친 분할 증여�??�진?�율 부???�화');
    }
    
    // 가?�승�??�인 추천
    if (!input.familyBusinessDiscount && input.businessAsset > 100000000) {
      recommendations.push('가?�승�??�건 충족 ??30% ?�인 ?�택');
    }
    
    // ?��? 감면 추천
    if (!input.farmLandDiscount && input.realEstate > 50000000) {
      recommendations.push('?��? 증여 ??감면 ?�택 검??);
    }
    
    return recommendations;
  }, [input, estimatedTaxableIncome, deductionLimits]);

  // 9. ?�동 �??�기??  useEffect(() => {
    // ?�산�??�계가 �?증여?�과 ?�르�? ?�산�??�력???�다�?�?증여???�데?�트
    if (totalGiftAmount > 0 && input.giftAmount === 0) {
      handleInputChange('giftAmount', totalGiftAmount);
    }
  }, [totalGiftAmount, input.giftAmount]);

  const handleInputChange = useCallback((field: keyof GiftTaxInput, value: any) => {
    setInput(prev => {
      const updated = { ...prev, [field]: value };
      
      // ?�동 계산?�는 값들
      if (field === 'recipientAge') {
        updated.isRecipientMinor = value < 19;
      }
      
      if (field === 'giftAmount' || field === 'marriageGiftAmount' || field === 'educationGiftAmount') {
        // �?증여???�데?�트??컴포?�트?�서 ?�동?�로 처리??      }
      
      return updated;
    });
  }, []);

  const handleCalculate = () => {
    setIsCalculating(true);
    setErrors({});
    
    try {
      // ?�력�?검�?      const validationErrors = GiftTaxInputValidator.validate(input);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsCalculating(false);
        return;
      }

      // ?�력�??�규??      const validatedInput = GiftTaxInputValidator.validateAndApplyLimits(input);
      
      // 계산 ?�행
      const calculator = new GiftTaxCalculator(validatedInput);
      const calculationResult = calculator.calculate();
      
      setResult(calculationResult);
    } catch (error) {
      console.error('증여??계산 ?�류:', error);
      setErrors({ general: '계산 �??�류가 발생?�습?�다.' });
    } finally {
      setIsCalculating(false);
    }
  };

  const loadSampleData = () => {
    setInput({
      // 기본 증여 ?�보
      giftAmount: 80000000, // 8천만??      giftDate: '2024-01-15',
      
      // 증여???�보
      donorAge: 60,
      donorRelation: 'parent',
      
      // ?�증???�보
      recipientAge: 30,
      isRecipientMinor: false,
      isRecipientDisabled: false,
      
      // 증여 ?�태
      giftType: 'money',
      isConditionalGift: false,
      giftConditionValue: 0,
      
      // ?�산 분류
      cash: 80000000,
      realEstate: 0,
      stock: 0,
      bond: 0,
      businessAsset: 0,
      other: 0,
      
      // ?�수 증여
      marriageGift: false,
      marriageGiftAmount: 0,
      educationGift: false,
      educationGiftAmount: 0,
      
      // 10????기존 증여
      previousGifts: [
        {
          date: '2022-03-10',
          amount: 30000000,
          taxPaid: 0
        }
      ],
      
      // 공제 �?감면
      familyBusinessDiscount: false,
      farmLandDiscount: false,
      culturalAssetDiscount: false,
      startupDiscount: false,
      
      // 기�?
      previousTaxPaid: 0,
      isNonResident: false,
      hasSpecialRelationship: false
    });
  };

  const resetInputs = () => {
    setInput({
      giftAmount: 0,
      giftDate: new Date().toISOString().split('T')[0],
      donorAge: 50,
      donorRelation: 'parent',
      recipientAge: 25,
      isRecipientMinor: false,
      isRecipientDisabled: false,
      giftType: 'money',
      isConditionalGift: false,
      giftConditionValue: 0,
      cash: 0,
      realEstate: 0,
      stock: 0,
      bond: 0,
      businessAsset: 0,
      other: 0,
      marriageGift: false,
      marriageGiftAmount: 0,
      educationGift: false,
      educationGiftAmount: 0,
      previousGifts: [],
      familyBusinessDiscount: false,
      farmLandDiscount: false,
      culturalAssetDiscount: false,
      startupDiscount: false,
      previousTaxPaid: 0,
      isNonResident: false,
      hasSpecialRelationship: false
    });
    setResult(null);
    setErrors({});
  };

  // ?�동 계산 (?�력�?변�???
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.giftAmount > 0) {
        handleCalculate();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* ?�더 */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Gift className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">증여??계산�?/h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          증여?�산??종류?� 관계에 ?�른 ?�확??증여?��? 계산?�보?�요. 
          10???�산과세?� 각종 공제�?반영?�여 ?��??�게 계산?�니??
        </p>
      </div>

      {/* 면책 조항 */}
      <TaxCalculatorDisclaimer variant="summary" />

      {/* ?�� ?�마???�동 계산 ?�?�보??*/}
      <Card className="border-pink-200 bg-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-700 text-lg">
            <Gift className="w-5 h-5" />
            ???�마??증여???�동 계산 ?�?�보??          </CardTitle>
          <CardDescription className="text-pink-600">
            ?�력?�는 즉시 관??값들???�동?�로 ?�계 계산?�고 ?�세 방안???�시?�니??          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* �?증여??*/}
            <div className="bg-white p-3 rounded border border-pink-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">�?증여??/span>
                <Badge className="text-xs bg-green-100 text-green-700 border-green-300">?�동</Badge>
              </div>
              <div className="text-lg font-bold text-pink-700">
                {formatWon(Math.max(input.giftAmount, totalGiftAmount))}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                ?�산�??�계 ?�는 직접 ?�력
              </div>
            </div>

            {/* ?�용 공제??*/}
            <div className="bg-white p-3 rounded border border-pink-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">?�용 공제??/span>
                <Badge className="text-xs bg-green-100 text-green-700 border-green-300">?�동</Badge>
              </div>
              <div className="text-lg font-bold text-pink-700">
                {formatWon(deductionLimits.total)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                관계별 + ?�수공제
              </div>
            </div>

            {/* ?�상 ?�율 구간 */}
            <div className="bg-white p-3 rounded border border-pink-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">?�상 ?�율</span>
                <Badge className={`text-xs ${expectedTaxBracket.rate === 0 ? 'bg-green-100 text-green-700' : 
                  expectedTaxBracket.rate <= 20 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {expectedTaxBracket.rate}%
                </Badge>
              </div>
              <div className={`text-lg font-bold ${expectedTaxBracket.rate === 0 ? 'text-green-700' : 
                expectedTaxBracket.rate <= 20 ? 'text-yellow-700' : 'text-red-700'}`}>
                {expectedTaxBracket.rate}% 구간
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {expectedTaxBracket.description}
              </div>
            </div>

            {/* 과세?��? */}
            <div className="bg-white p-3 rounded border border-pink-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">과세?��?</span>
                <Badge className="text-xs bg-green-100 text-green-700 border-green-300">?�동</Badge>
              </div>
              <div className="text-lg font-bold text-pink-700">
                {formatWon(estimatedTaxableIncome)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                (증여??10?�내기존) - 공제
              </div>
            </div>
          </div>

          {/* 공제 ?��? ?�역 */}
          {deductionLimits.total > 0 && (
            <div className="mt-4 p-3 bg-white rounded border border-pink-200">
              <div className="text-sm font-medium text-gray-700 mb-3">?�� 공제 ?��? ?�역</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded bg-green-50 border border-green-200">
                  <div className="font-medium text-green-800">기본공제</div>
                  <div className="font-mono text-right text-green-700">
                    {formatWon(deductionLimits.basic)}
                  </div>
                  <div className="text-right text-xs text-green-600">
                    {input.donorRelation === 'spouse' ? '배우?? :
                     input.donorRelation === 'parent' ? '부�? :
                     input.donorRelation === 'child' ? '?��?' : '기�?'} 관�?                  </div>
                </div>
                
                {deductionLimits.special > 0 && (
                  <>
                    {input.marriageGift && input.marriageGiftAmount > 0 && (
                      <div className="p-2 rounded bg-pink-50 border border-pink-200">
                        <div className="font-medium text-pink-800 flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          ?�인공제
                        </div>
                        <div className="font-mono text-right text-pink-700">
                          {formatWon(Math.min(input.marriageGiftAmount, 100000000))}
                        </div>
                        <div className="text-right text-xs text-pink-600">
                          ?�생 1??                        </div>
                      </div>
                    )}
                    
                    {input.educationGift && input.educationGiftAmount > 0 && (
                      <div className="p-2 rounded bg-blue-50 border border-blue-200">
                        <div className="font-medium text-blue-800 flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          교육비공??                        </div>
                        <div className="font-mono text-right text-blue-700">
                          {formatWon(Math.min(input.educationGiftAmount, 50000000))}
                        </div>
                        <div className="text-right text-xs text-blue-600">
                          ?�간?�도
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* ?�산 구성 분석 */}
          {totalGiftAmount > 0 && (
            <div className="mt-4 p-3 bg-white rounded border border-pink-200">
              <div className="text-sm font-medium text-gray-700 mb-3">?�� 증여?�산 구성</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {[
                  { label: '?�금', value: input.cash, color: 'bg-green-100 text-green-700', icon: '?��' },
                  { label: '부?�산', value: input.realEstate, color: 'bg-orange-100 text-orange-700', icon: '?��' },
                  { label: '주식', value: input.stock, color: 'bg-blue-100 text-blue-700', icon: '?��' },
                  { label: '채권', value: input.bond, color: 'bg-purple-100 text-purple-700', icon: '?��' },
                  { label: '?�업?�산', value: input.businessAsset, color: 'bg-gray-100 text-gray-700', icon: '?��' },
                  { label: '기�?', value: input.other, color: 'bg-yellow-100 text-yellow-700', icon: '?��' }
                ].filter(item => item.value > 0).map((item, index) => (
                  <div key={index} className={`p-2 rounded ${item.color}`}>
                    <div className="font-medium flex items-center gap-1">
                      <span>{item.icon}</span>
                      {item.label}
                    </div>
                    <div className="font-mono text-right">
                      {formatWon(item.value)}
                    </div>
                    <div className="text-right text-xs opacity-75">
                      {((item.value / totalGiftAmount) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 증여??검�?*/}
              {Math.abs(totalGiftAmount - input.giftAmount) > 100000 && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                  ?�️ ?�산�??�계({formatWon(totalGiftAmount)})?� �?증여??{formatWon(input.giftAmount)})???�릅?�다.
                </div>
              )}
            </div>
          )}

          {/* 10????기존 증여 ?�역 */}
          {previousGiftTotal > 0 && (
            <div className="mt-4 p-3 bg-white rounded border border-pink-200">
              <div className="text-sm font-medium text-gray-700 mb-3">?�� 10????기존 증여</div>
              <div className="space-y-2">
                {input.previousGifts.map((gift, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{gift.date}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono">{formatWon(gift.amount)}</div>
                      <div className="text-gray-500">?�액: {formatWon(gift.taxPaid)}</div>
                    </div>
                  </div>
                ))}
                <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                  <div className="text-sm font-medium text-blue-700">
                    10???�산?? {formatWon(previousGiftTotal + Math.max(input.giftAmount, totalGiftAmount))}
                  </div>
                  <div className="text-xs text-blue-600">
                    ?�진?�율???�용?�어 ?��??�이 증�??????�습?�다.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ?�리???�류 ?�시�?체크 */}
          {logicalErrors.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded border border-red-200">
              <div className="text-sm font-medium text-red-700 mb-2">?�� ?�리???�류 감�?</div>
              <div className="space-y-1">
                {logicalErrors.map((error, index) => (
                  <div key={index} className="text-xs text-red-600 flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ?�세 추천 */}
          {taxSavingRecommendations.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
              <div className="text-sm font-medium text-green-700 mb-2">?�� ?�세 추천</div>
              <div className="space-y-1">
                {taxSavingRecommendations.map((recommendation, index) => (
                  <div key={index} className="text-xs text-green-600 flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 계산 준�??�태 */}
          {logicalErrors.length === 0 && (input.giftAmount > 0 || totalGiftAmount > 0) && (
            <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
              <div className="text-sm font-medium text-green-700 mb-2">??계산 준�??�료</div>
              <div className="text-xs text-green-600">
                모든 ?�수 ?�보가 ?�바르게 ?�력?�었?�니?? ?�시간으�?증여?��? 계산?�고 ?�습?�다.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ?�력 ?�역 */}
        <div className="space-y-6">
          {/* 컨트�?버튼 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                계산 ?�정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {/* ?�� 개선???�플 ?�이??버튼 */}
                <Button 
                  onClick={loadSampleData}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95]
                    bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100
                    border-orange-200 text-orange-700 hover:border-orange-300 hover:shadow-md
                    relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-100 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  <span className="relative flex items-center gap-2">
                    <FileText className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    ?�플 ?�이??                  </span>
                </Button>
                
                {/* ?�� 개선??초기??버튼 */}
                <Button 
                  onClick={resetInputs}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95]
                    hover:bg-red-50 hover:border-red-300 hover:text-red-700 hover:shadow-md
                    relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  <span className="relative flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    초기??                  </span>
                </Button>
                
                {/* ?�� 개선??계산?�기 버튼 */}
                <Button 
                  onClick={handleCalculate}
                  size="sm"
                  disabled={isCalculating || !input.giftAmount}
                  className={`flex items-center gap-2 transition-all duration-200 transform
                    ${!input.giftAmount ? 
                      'bg-gray-400 cursor-not-allowed' :
                      isCalculating ? 'animate-pulse' :
                      'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                    }
                  `}
                >
                  {isCalculating ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : !input.giftAmount ? (
                    <Calculator className="w-4 h-4 opacity-50" />
                  ) : (
                    <Calculator className="w-4 h-4" />
                  )}
                  {isCalculating ? '계산 �?..' :
                   !input.giftAmount ? '증여금액 ?�력 ?�요' :
                   (result ? '?�계?�하�? : '계산?�기')
                  }
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ?�력 ??*/}
          <Card>
            <CardHeader>
              <CardTitle>증여 ?�보 ?�력</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">기본?�보</TabsTrigger>
                  <TabsTrigger value="parties">?�사??/TabsTrigger>
                  <TabsTrigger value="assets">?�산분류</TabsTrigger>
                  <TabsTrigger value="special">?�수?�항</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <NumberInput
                      label="�?증여?�산"
                      value={input.giftAmount}
                      onChange={(value) => handleInputChange('giftAmount', value)}
                      placeholder="증여?�는 �??�산가??
                      limit={GIFT_TAX_LIMITS_2024.maxGiftAmount}
                      // 기존 계산�??�환???��?

                      helpMessage={GIFT_TAX_LIMITS_2024.messages.relationshipDeduction}
                      required={true}
                      requiredMessage="증여??계산???�해 �?증여?�산 ?�력???�수?�니??
                      dynamicInfo={(value) => {
                        if (value === 0) return '';
                        
                        // 관계별 공제 ?�도 ?�인
                        const relationshipLimit = GIFT_TAX_LIMITS_2024.relationshipLimits;
                        let applicableLimit = 0;
                        let relationshipName = '';
                        
                        switch (input.donorRelation) {
                          case 'spouse':
                            applicableLimit = relationshipLimit.spouse.annual;
                            relationshipName = '배우??;
                            break;
                          case 'parent':
                          case 'grandparent':
                            applicableLimit = relationshipLimit.linealAscendant.annual;
                            if (input.isRecipientMinor) {
                              applicableLimit += relationshipLimit.linealDescendant.minorBonus;
                            }
                            relationshipName = '직계존속';
                            break;
                          case 'child':
                          case 'grandchild':
                            applicableLimit = relationshipLimit.linealDescendant.annual;
                            relationshipName = '직계비속';
                            break;
                          default:
                            applicableLimit = relationshipLimit.other.annual;
                            relationshipName = '기�?';
                        }
                        
                        if (value <= applicableLimit) {
                          return `${relationshipName} 관계로 ${applicableLimit.toLocaleString()}?�까지 공제 가?�합?�다.`;
                        } else if (value <= 100000000) {
                          return `공제 ?�도 초과�?증여??10%가 ?�용?�니??`;
                        } else if (value <= 500000000) {
                          return `증여??20%가 ?�용?�니?? 분할증여�?고려?�보?�요.`;
                        } else if (value <= 1000000000) {
                          return `증여??30%가 ?�용?�니?? ?�문가 ?�담??권장?�니??`;
                        } else {
                          return `?�️ 고액 증여�?최�? 50% ?�율 ?�용 가?? 반드???�문가 ?�담 ?�요!`;
                        }
                      }}
                    />
                    
                    <div className="space-y-2">
                      <Label htmlFor="giftDate">증여??/Label>
                      <Input
                        id="giftDate"
                        type="date"
                        value={input.giftDate}
                        onChange={(e) => handleInputChange('giftDate', e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                      />
                      <p className="text-sm text-gray-500">
                        ?�️ {GIFT_TAX_LIMITS_2024.messages.filingDeadline}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="giftType">증여?�산 ?�형</Label>
                      <Select 
                        value={input.giftType} 
                        onValueChange={(value: any) => handleInputChange('giftType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="증여?�산 ?�형 ?�택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="money">?�금·?�금</SelectItem>
                          <SelectItem value="realEstate">부?�산</SelectItem>
                          <SelectItem value="stock">주식·증권</SelectItem>
                          <SelectItem value="business">?�업?�자??/SelectItem>
                          <SelectItem value="other">기�??�산</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Checkbox
                        id="isConditionalGift"
                        checked={input.isConditionalGift}
                        onCheckedChange={(checked) => handleInputChange('isConditionalGift', checked)}
                      />
                      <Label htmlFor="isConditionalGift" className="font-medium">부?��?증여</Label>
                      <Badge variant="outline" className="text-xs text-yellow-700">
                        채무?�계 ??                      </Badge>
                    </div>

                    {input.isConditionalGift && (
                      <NumberInput
                        label="부?�액"
                        value={input.giftConditionValue}
                        onChange={(value) => handleInputChange('giftConditionValue', value)}
                        placeholder="?�증?��? 부?�하??채무 ??
                        limit={input.giftAmount * 2}

                        helpMessage={GIFT_TAX_LIMITS_2024.conditionalGiftLimits.description}
                        dynamicInfo={(value) => {
                          if (value === 0) return '';
                          
                          const giftAmount = input.giftAmount;
                          const burdenRatio = value / giftAmount;
                          const netGift = giftAmount - value;
                          const minNetGift = giftAmount * GIFT_TAX_LIMITS_2024.conditionalGiftLimits.minGiftRatio;
                          
                          if (value >= giftAmount) {
                            return '?�� 부?�액??증여?�과 같거??초과?�면 증여�??�정받�? 못합?�다.';
                          } else if (burdenRatio >= 0.8) {
                            return `?�️ 부?�비??${(burdenRatio * 100).toFixed(1)}%�?증여 ?�정??문제가 ?�을 ???�습?�다.`;
                          } else if (netGift < minNetGift) {
                            return `?�️ ?�증?�액??20% 미만?�니?? 최소 ${minNetGift.toLocaleString()}?��? ?�증?�되?�야 ?�니??`;
                          } else {
                            return `???�질 증여?? ${netGift.toLocaleString()}??(부?�비?? ${(burdenRatio * 100).toFixed(1)}%)`;
                          }
                        }}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="parties" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <NumberInput
                        label="증여???�이"
                        value={input.donorAge}
                        onChange={(value) => handleInputChange('donorAge', value)}
                        placeholder="증여??�??�이"
                        unit="??
                        limit={GIFT_TAX_LIMITS_2024.ageRestrictions.maxAge}
                        helpMessage="증여?�는 ?�람??�??�이"
                        dynamicInfo={(value) => {
                          if (value === 0) return '';
                          if (value >= GIFT_TAX_LIMITS_2024.ageRestrictions.seniorAge) {
                            return `고령??${GIFT_TAX_LIMITS_2024.ageRestrictions.seniorAge}???�상)�?조기 증여 ???�세 ?�과가 ?�니??`;
                          }
                          return '증여?�기가 빠�??�록 미래 가�??�승분에 ?�???�세 ?�과가 ?�습?�다.';
                        }}
                      />

                      <NumberInput
                        label="?�증???�이"
                        value={input.recipientAge}
                        onChange={(value) => handleInputChange('recipientAge', value)}
                        placeholder="?�증??�??�이"
                        unit="??
                        limit={GIFT_TAX_LIMITS_2024.ageRestrictions.maxAge}
                        // ?�이 ?�한 ?�용
                        helpMessage="증여받는 ?�람??�??�이 (?�별공제 조건???�향)"
                        dynamicInfo={(value) => {
                          if (value === 0) return '';
                          
                          const messages = [];
                          
                          // 미성???��?
                          if (value < GIFT_TAX_LIMITS_2024.ageRestrictions.minorAge) {
                            messages.push(`??미성?�자�?추�? ${GIFT_TAX_LIMITS_2024.relationshipLimits.linealDescendant.minorBonus.toLocaleString()}??공제 가??);
                          } else {
                            messages.push(`?�인?�로 기본 공제�??�용`);
                          }
                          
                          // 교육�?공제 가???��?
                          if (value <= GIFT_TAX_LIMITS_2024.ageRestrictions.educationMaxAge) {
                            messages.push(`??교육비공??가??${GIFT_TAX_LIMITS_2024.ageRestrictions.educationMaxAge}???�하)`);
                          } else if (value <= GIFT_TAX_LIMITS_2024.ageRestrictions.startupMaxAge) {
                            messages.push(`?�️ 교육비공??불�?, 창업?�금공제??가??);
                          } else {
                            messages.push(`?�️ 교육비공?? 창업?�금공제 모두 불�?`);
                          }
                          
                          return messages.join(' | ');
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="donorRelation">증여?��???관�?/Label>
                      <Select 
                        value={input.donorRelation} 
                        onValueChange={(value: any) => handleInputChange('donorRelation', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="관�??�택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spouse">배우??(6?�원 공제)</SelectItem>
                          <SelectItem value="parent">부�?(5천만??공제)</SelectItem>
                          <SelectItem value="grandparent">조�?�?(5천만??공제)</SelectItem>
                          <SelectItem value="child">?��? (5천만??공제)</SelectItem>
                          <SelectItem value="grandchild">?�자?� (5천만??공제)</SelectItem>
                          <SelectItem value="other">기�? (1천만??공제)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">
                        ?�️ 관계에 ?�라 공제?�이 ?�라집니??
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isRecipientDisabled"
                          checked={input.isRecipientDisabled}
                          onCheckedChange={(checked) => handleInputChange('isRecipientDisabled', checked)}
                        />
                        <Label htmlFor="isRecipientDisabled">?�애??/Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isNonResident"
                          checked={input.isNonResident}
                          onCheckedChange={(checked) => handleInputChange('isNonResident', checked)}
                        />
                        <Label htmlFor="isNonResident">비거주자</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="assets" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <NumberInput
                      label="?�금·?�금"
                      value={input.cash}
                      onChange={(value) => handleInputChange('cash', value)}
                      placeholder="?�금, ?�적�???
                    />
                    
                    <NumberInput
                      label="부?�산"
                      value={input.realEstate}
                      onChange={(value) => handleInputChange('realEstate', value)}
                      placeholder="?��?, 건물 ??
                    />
                    
                    <NumberInput
                      label="주식·증권"
                      value={input.stock}
                      onChange={(value) => handleInputChange('stock', value)}
                      placeholder="?�장주식, 비상?�주????
                    />
                    
                    <NumberInput
                      label="채권"
                      value={input.bond}
                      onChange={(value) => handleInputChange('bond', value)}
                      placeholder="�?���? ?�사�???
                    />
                    
                    <NumberInput
                      label="?�업?�자??
                      value={input.businessAsset}
                      onChange={(value) => handleInputChange('businessAsset', value)}
                      placeholder="?�업?? 기계?�비 ??
                    />
                    
                    <NumberInput
                      label="기�??�산"
                      value={input.other}
                      onChange={(value) => handleInputChange('other', value)}
                      placeholder="골프?�원�? ?�술????
                    />
                  </div>
                </TabsContent>

                <TabsContent value="special" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-2 p-3 bg-pink-50 border border-pink-200 rounded-lg">
                      <Checkbox
                        id="marriageGift"
                        checked={input.marriageGift}
                        onCheckedChange={(checked) => handleInputChange('marriageGift', checked)}
                      />
                      <Label htmlFor="marriageGift" className="font-medium">?�인증여</Label>
                      <Badge variant="outline" className="text-xs text-pink-700">
                        최�? 1?�원 공제
                      </Badge>
                    </div>

                    {input.marriageGift && (
                      <NumberInput
                        label="?�인증여 금액"
                        value={input.marriageGiftAmount}
                        onChange={(value) => handleInputChange('marriageGiftAmount', value)}
                        placeholder="?�인 ??증여받�? 금액"
                        limit={
                          input.donorRelation === 'child' || input.donorRelation === 'grandchild' 
                            ? GIFT_TAX_LIMITS_2024.specialDeductionLimits.marriage.child
                            : GIFT_TAX_LIMITS_2024.specialDeductionLimits.marriage.otherLineal
                        }
                        // ?�인 증여 ?�별 공제

                        helpMessage={GIFT_TAX_LIMITS_2024.specialDeductionLimits.marriage.description}
                        dynamicInfo={(value) => {
                          if (value === 0) return '';
                          
                          const isChild = input.donorRelation === 'child' || input.donorRelation === 'grandchild';
                          const limit = isChild 
                            ? GIFT_TAX_LIMITS_2024.specialDeductionLimits.marriage.child
                            : GIFT_TAX_LIMITS_2024.specialDeductionLimits.marriage.otherLineal;
                          
                          if (value > limit) {
                            return `?�️ ${isChild ? '?��?' : '기�? 직계비속'} ?�인증여공제 ?�도(${limit.toLocaleString()}??�?초과?�습?�다.`;
                          }
                          
                          const remaining = limit - value;
                          return `${isChild ? '?��?' : '기�? 직계비속'} ?�인증여공제 ${remaining.toLocaleString()}???�음 (?�생 1???�정)`;
                        }}
                      />
                    )}

                    <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Checkbox
                        id="educationGift"
                        checked={input.educationGift}
                        onCheckedChange={(checked) => handleInputChange('educationGift', checked)}
                      />
                      <Label htmlFor="educationGift" className="font-medium">교육비증??/Label>
                      <Badge variant="outline" className="text-xs text-blue-700">
                        �?�� 3천만?? ?�외 5천만??공제
                      </Badge>
                      {input.recipientAge > GIFT_TAX_LIMITS_2024.ageRestrictions.educationMaxAge && (
                        <Badge variant="destructive" className="text-xs">
                          ?�이 ?�한 초과
                        </Badge>
                      )}
                    </div>

                    {input.educationGift && (
                      <NumberInput
                        label="교육�?금액"
                        value={input.educationGiftAmount}
                        onChange={(value) => handleInputChange('educationGiftAmount', value)}
                        placeholder="교육비로 증여받�? 금액"
                        limit={GIFT_TAX_LIMITS_2024.specialDeductionLimits.education.foreign} // ?�외 기�? 최�?
                        // 교육�??�별 공제

                        helpMessage={GIFT_TAX_LIMITS_2024.specialDeductionLimits.education.description}
                        dynamicInfo={(value) => {
                          if (value === 0) return '';
                          
                          const domesticLimit = GIFT_TAX_LIMITS_2024.specialDeductionLimits.education.domestic;
                          const foreignLimit = GIFT_TAX_LIMITS_2024.specialDeductionLimits.education.foreign;
                          const ageLimit = GIFT_TAX_LIMITS_2024.specialDeductionLimits.education.ageLimit;
                          
                          if (input.recipientAge > ageLimit) {
                            return `?�� ?�증?��? ${ageLimit}?��? 초과?�여 교육비공?��? 받을 ???�습?�다.`;
                          }
                          
                          if (value <= domesticLimit) {
                            return `??�?�� 교육�?공제 범위 (${(domesticLimit - value).toLocaleString()}???�음)`;
                          } else if (value <= foreignLimit) {
                            return `???�외 교육�?공제 범위 (${(foreignLimit - value).toLocaleString()}???�음)`;
                          } else {
                            return `?�️ 교육비공???�도(?�외 ${foreignLimit.toLocaleString()}??�?초과?�습?�다.`;
                          }
                        }}
                      />
                    )}

                    <div className="space-y-3">
                      <Label className="text-base font-medium">감면 ?�택</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="familyBusinessDiscount"
                            checked={input.familyBusinessDiscount}
                            onCheckedChange={(checked) => handleInputChange('familyBusinessDiscount', checked)}
                          />
                          <Label htmlFor="familyBusinessDiscount">가족기??감면</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="farmLandDiscount"
                            checked={input.farmLandDiscount}
                            onCheckedChange={(checked) => handleInputChange('farmLandDiscount', checked)}
                          />
                          <Label htmlFor="farmLandDiscount">?��? 감면</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="culturalAssetDiscount"
                            checked={input.culturalAssetDiscount}
                            onCheckedChange={(checked) => handleInputChange('culturalAssetDiscount', checked)}
                          />
                          <Label htmlFor="culturalAssetDiscount">문화??감면</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="startupDiscount"
                            checked={input.startupDiscount}
                            onCheckedChange={(checked) => handleInputChange('startupDiscount', checked)}
                          />
                          <Label htmlFor="startupDiscount">창업?�금 감면</Label>
                        </div>
                      </div>
                    </div>

                    <NumberInput
                      label="기납부 증여??
                      value={input.previousTaxPaid}
                      onChange={(value) => handleInputChange('previousTaxPaid', value)}
                      placeholder="?�전???��???증여??
                      helpMessage="?�일 증여???�??기납부?�액"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* 중요 경고 메시지 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="w-5 h-5" />
                ?�️ 중요 주의?�항
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {input.giftAmount > 100000000 && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>{GIFT_TAX_LIMITS_2024.warnings.excessiveAmount}</strong>
                    <br />분할증여�??�해 ?�율 부?�을 줄일 ???�습?�다.
                  </AlertDescription>
                </Alert>
              )}
              
              {input.previousGifts.length > 0 && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <Info className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>{GIFT_TAX_LIMITS_2024.warnings.cumulativeRisk}</strong>
                    <br />10????증여 ?�력: {input.previousGifts.length}�?                  </AlertDescription>
                </Alert>
              )}
              
              {input.isConditionalGift && input.giftConditionValue / input.giftAmount > 0.7 && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>{GIFT_TAX_LIMITS_2024.warnings.conditionalGift}</strong>
                    <br />부?�비?? {((input.giftConditionValue / input.giftAmount) * 100).toFixed(1)}%
                  </AlertDescription>
                </Alert>
              )}
              
              {(input.marriageGift || input.educationGift || input.startupDiscount) && (
                <Alert className="border-purple-200 bg-purple-50">
                  <Info className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800">
                    <strong>{GIFT_TAX_LIMITS_2024.warnings.specialRequirements}</strong>
                    <br />?�별공제 ?�청 ???�건 충족 ?��?�??�전???�인?�세??
                  </AlertDescription>
                </Alert>
              )}
              
              <Alert className="border-blue-200 bg-blue-50">
                <Clock className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>{GIFT_TAX_LIMITS_2024.warnings.filingRequired}</strong>
                  <br />증여?? {input.giftDate} ???�고기한: {new Date(new Date(input.giftDate).getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR')}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* ?�세 조언 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <PiggyBank className="w-5 h-5" />
                ?�� ?�세 ?�략 조언
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-green-800 mb-2">?�� 분할증여 ?�략</h4>
                <p className="text-sm text-green-700">
                  {GIFT_TAX_LIMITS_2024.messages.taxSaving}
                </p>
                {input.donorRelation && (
                  <p className="text-xs text-green-600 mt-1">
                    ?�재 관�??�간 ?�도: {
                      input.donorRelation === 'spouse' ? GIFT_TAX_LIMITS_2024.relationshipLimits.spouse.annual :
                      ['parent', 'grandparent'].includes(input.donorRelation) ? GIFT_TAX_LIMITS_2024.relationshipLimits.linealAscendant.annual :
                      ['child', 'grandchild'].includes(input.donorRelation) ? GIFT_TAX_LIMITS_2024.relationshipLimits.linealDescendant.annual :
                      GIFT_TAX_LIMITS_2024.relationshipLimits.other.annual
                    }??                  </p>
                )}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-800 mb-2">??증여 ?�?�밍</h4>
                <p className="text-sm text-blue-700">
                  {GIFT_TAX_LIMITS_2024.messages.timing}
                </p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <h4 className="font-medium text-purple-800 mb-2">?�� ?�진?�율 ?�피</h4>
                <p className="text-sm text-purple-700">
                  {GIFT_TAX_LIMITS_2024.messages.progressiveRate}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded">
                    <span className="font-medium">1?�원 ?�하:</span> 10%
                  </div>
                  <div className="bg-white p-2 rounded">
                    <span className="font-medium">5?�원 ?�하:</span> 20%
                  </div>
                  <div className="bg-white p-2 rounded">
                    <span className="font-medium">10?�원 ?�하:</span> 30%
                  </div>
                  <div className="bg-white p-2 rounded">
                    <span className="font-medium">30?�원 초과:</span> 50%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ?�류 ?�시 */}
          {Object.keys(errors).length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(errors).map(([field, message]) => (
                    <li key={field}>{message}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* 결과 ?�역 */}
        <div className="space-y-6">
          {result && (
            <>
              {/* 계산 결과 ?�약 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-purple-600" />
                    증여??계산 결과
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">�?증여?�산</p>
                      <p className="text-xl font-bold text-blue-800">
                        {result.grossGift.toLocaleString()}??                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 mb-1">공제??/p>
                      <p className="text-xl font-bold text-green-800">
                        {result.giftDeductions.toLocaleString()}??                      </p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-orange-600 mb-1">과세?��?</p>
                      <p className="text-xl font-bold text-orange-800">
                        {result.taxableGift.toLocaleString()}??                      </p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600 mb-1">최종 ?��??�액</p>
                      <p className="text-2xl font-bold text-red-800">
                        {result.determinedTax.toLocaleString()}??                      </p>
                    </div>
                  </div>

                  {result.cumulativeTaxation.previousGifts > 0 && (
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <Info className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800">
                        <strong>?�� 10???�산과세 ?�용:</strong><br />
                                                  ??기존 증여?? {Math.round(result.cumulativeTaxation.previousGifts).toLocaleString('ko-KR')}??br />
                          ???�번 증여?? {Math.round(result.cumulativeTaxation.currentGift).toLocaleString('ko-KR')}??br />
                          ??�??�산?? {Math.round(result.cumulativeTaxation.totalGifts).toLocaleString('ko-KR')}??br />
                          ??기납부 ?�액: {Math.round(result.cumulativeTaxation.previousTaxPaid).toLocaleString('ko-KR')}??                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">?�효?�율</span>
                      <span className="text-lg font-bold">
                        {(result.effectiveRate * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">?�용?�율</span>
                      <span className="text-lg font-bold">
                        {(result.marginalRate * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 공제 ?�세 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    공제 ?�세
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>{result.relationshipDeduction.type}</span>
                    <span className="font-medium">
                      {result.relationshipDeduction.amount.toLocaleString()}??                    </span>
                  </div>
                  
                  {result.specialDeductions.marriage > 0 && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>?�인증여공제</span>
                      <span className="font-medium">
                        {result.specialDeductions.marriage.toLocaleString()}??                      </span>
                    </div>
                  )}
                  
                  {result.specialDeductions.education > 0 && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>교육비공??/span>
                      <span className="font-medium">
                        {result.specialDeductions.education.toLocaleString()}??                      </span>
                    </div>
                  )}
                  
                  {result.specialDeductions.startup > 0 && (
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>창업?�금공제</span>
                      <span className="font-medium">
                        {result.specialDeductions.startup.toLocaleString()}??                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-2 font-bold text-lg">
                    <span>�?공제??/span>
                    <span className="text-green-600">
                      {result.giftDeductions.toLocaleString()}??                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* ?�고 �??��? ?�내 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    ?�고 �??��? ?�내
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>?�고기한</span>
                    <span className="font-medium">
                      {result.filingDueDate.toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>?��?기한</span>
                    <span className="font-medium">
                      {result.paymentDueDate.toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  
                  {result.installmentAvailable && (
                    <Alert className="border-blue-200 bg-blue-50">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        <strong>분할?��? 가??</strong> 200만원 ?�상?�로 최�? 5??분할?��?가 가?�합?�다.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <p className="text-sm text-gray-500 border-t pt-3">
                    ?�️ {GIFT_TAX_LIMITS_2024.messages.filingDeadline}
                  </p>
                </CardContent>
              </Card>

              {/* ?�세 조언 */}
              {result.taxSavingAdvice.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PiggyBank className="w-5 h-5 text-yellow-600" />
                      ?�� 맞춤???�세 조언
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.taxSavingAdvice.map((advice, index) => (
                      <Alert key={index} className="border-green-200 bg-green-50">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          <strong>?�� {advice.type}:</strong><br />
                          {advice.description}
                          {advice.expectedSaving > 0 && (
                            <div className="mt-2 p-2 bg-green-100 rounded border">
                              <span className="font-medium text-green-900">
                                ?�� ?�상 ?�세?? {advice.expectedSaving.toLocaleString()}??                              </span>
                            </div>
                          )}
                        </AlertDescription>
                      </Alert>
                    ))}
                    
                    {/* 추�? ?�세 ?�략 */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-bold text-blue-900 mb-3">?? 추�? ?�세 ?�략</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium text-blue-800 mb-1">?�� ?�도�?분할증여</h5>
                          <p className="text-sm text-blue-700">
                            {input.donorRelation === 'spouse' ? '매년 6?�원?? :
                             ['parent', 'grandparent'].includes(input.donorRelation) ? '매년 5천만?�씩' :
                             ['child', 'grandchild'].includes(input.donorRelation) ? '매년 5천만?�씩' :
                             '매년 1천만?�씩'} 분할?�여 증여??부??최소??                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium text-purple-800 mb-1">?�� ?�?�밍 최적??/h5>
                          <p className="text-sm text-purple-700">
                            ?�산 가치�? ??? ?�점??증여?�여 미래 ?�승�??�세
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium text-orange-800 mb-1">?�� 부?�산 ?�략</h5>
                          <p className="text-sm text-orange-700">
                            ?��? 먼�? 증여 ??건물 ?�축?�로 가�??�승�??�피
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium text-green-800 mb-1">?�� 가�??�위 증여</h5>
                          <p className="text-sm text-green-700">
                            배우?? ?��? ???�수?�게 분산 증여�??�체 ?��???감소
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {!result && (
            <Card>
              <CardContent className="text-center py-12">
                <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  증여 ?�보�??�력?�면 계산 결과가 ?�시?�니??
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 종합 조언 �?체크리스??*/}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <CheckCircle className="w-5 h-5" />
            ?�� 증여???�고 체크리스??          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ?�고 ??준비사??*/}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 mb-3">?�� ?�고 ??준비사??/h4>
              <div className="space-y-2">
                {[
                  '증여계약???�는 증여?�인???�성',
                  '부?�산??경우 ?�기부?�본 �?공시지가 ?�인',
                  '주식??경우 주주명�? �??��?명세??,
                  '부?��?증여??부?�내??명세??,
                  '?�별공제 ?�건 충족 증빙?�류',
                  '기존 증여???�고?�류 (10????',
                  '?�분�?�?가족�?계증명서'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* ?�고 ??주의?�항 */}
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 mb-3">?�️ ?�고 ??주의?�항</h4>
              <div className="space-y-2">
                {[
                  '증여?�로부??3개월 ?�내 ?�고 ?�수',
                  '?�고 ?�락 ??20% 가?�세 부�?,
                  '?�별공제???�고?�야�??�용',
                  '부?��?증여???�확??부?�액 ?�정',
                  '?�산 ?��???증여??기�? ?��?',
                  '?�무??방문 ?�는 ?�택???�라???�고',
                  '?��????�고?� ?�시???�료'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* ?�락�??�보 */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-3">?�� ?��?받을 ???�는 �?/h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-blue-800">�?���?콜센??/div>
                <div className="text-blue-600">126</div>
                <div className="text-xs text-blue-500">24?�간 ?�담</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-green-800">?�택??/div>
                <div className="text-green-600">hometax.go.kr</div>
                <div className="text-xs text-green-500">?�라???�고</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-purple-800">?�문 ?�무??/div>
                <div className="text-purple-600">개인 ?�담</div>
                <div className="text-xs text-purple-500">복잡???�안</div>
              </div>
            </div>
          </div>
          
          {/* 최종 ?�림 */}
          <Alert className="mt-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>?�� 중요 ?�내:</strong><br />
              �?계산 결과??참고?�이�? ?�제 ?�고 ?�에??반드???�무 ?�문가??검?��? 받으?�기 바랍?�다.
              개인�??�수 ?�황?�나 최신 ?�법 변경사??�� 반영?��? ?�을 ???�습?�다.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* ?�� 베�??�스???�드�??�스??(면책조항 ?�단) */}
        calculatorName="증여??계산�?
        className="mb-6"
      />

      {/* ?�단 면책 조항 */}
      <TaxCalculatorDisclaimer variant="full" className="mt-8" />
    </div>
  );
} 

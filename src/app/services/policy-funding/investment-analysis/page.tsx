'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, CheckCircle, Building2, ChevronDown, ChevronUp, Target, Award, Clock, Star, Zap, Shield, Users, ArrowRight, Play, FileText, BarChart3, Brain, AlertTriangle, Lightbulb, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { performInvestmentAnalysis } from '@/lib/utils/investment-analysis';
import InvestmentResultDisplay from '@/components/investment-analysis/InvestmentResultDisplay';
import DSCRDetailedAnalysis from '@/components/investment-analysis/DSCRDetailedAnalysis';
import type { InvestmentResult } from '@/lib/utils/investment-analysis';
import { 
  calculateInvestmentGrade, 
  calculateAverageDSCR, 
  generateDetailedRecommendation,
  getGradingCriteria,
  type InvestmentGrade
} from '@/lib/utils/investment-grade';
import { useRouter } from 'next/navigation';

export default function PolicyFundingInvestmentAnalysisPage() {
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  // 모바일 디바이스 감지
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // 페이지 로드 시 자동으로 분석 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      handleInvestmentAnalysis();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // 투자정보 입력 상태 관리
  const [investmentInput, setInvestmentInput] = useState({
    initialInvestment: 500000000, // 5억원
    annualRevenue: 10000000000, // 100억원
    operatingProfitRate: 17.5, // 영업이익률 17.5%
    discountRate: 10, // 할인율 10%
    analysisYears: 10, // 분석기간 10년
    
    // DSCR 계산을 위한 부채 정보
    policyLoanAmount: 350000000, // 정책자금 3.5억원
    policyLoanRate: 2.5, // 정책자금 이자율 2.5%
    gracePeriod: 2, // 거치기간 2년 (이자만 납부)
    repaymentPeriod: 5, // 원금상환기간 5년 (거치기간 후 원금+이자 납부)
    
    otherDebtAmount: 3000000000, // 기타채무 30억원
    otherDebtRate: 5.3, // 기타채무 이자율 5.3%
    otherDebtGracePeriod: 0, // 기타채무 거치기간 0년 (즉시 원금상환 시작)
    otherDebtRepaymentPeriod: 10, // 기타채무 원금상환기간 10년
  });

  // 분석 결과 상태 관리
  const [analysisResult, setAnalysisResult] = useState<InvestmentResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // 고급설정 패널 상태 관리
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    revenueGrowthRate: 5, // 매출성장률 5%
    costInflationRate: 3, // 비용상승률 3%
    debtRatio: 30, // 부채비율 30%
    workingCapitalRatio: 15, // 운전자본비율 15%
    depreciationRate: 10, // 감가상각률 10%
    taxRate: 22, // 법인세율 22%
    scenarioType: 'neutral' as 'pessimistic' | 'neutral' | 'optimistic',
    enableScenarioAnalysis: false,
    selectedScenario: 'neutral',
    pessimisticAdjustment: 0,
    optimisticAdjustment: 0,
  });

  // 투자타당성 분석 실행
  const handleInvestmentAnalysis = async () => {
    setIsCalculating(true);
    setAnalysisResult(null);

    try {
      // 시나리오 분석을 반영한 분석 데이터 준비
      const yearlyDSCRData = calculateYearlyDSCR();
      
      const analysisData = {
        ...investmentInput,
        operatingMargin: investmentInput.operatingProfitRate || 15,
        scenarioType: advancedSettings.selectedScenario,
        enableScenarioAnalysis: advancedSettings.enableScenarioAnalysis,
        scenarioAdjustmentRate: advancedSettings.selectedScenario === 'pessimistic' 
          ? advancedSettings.pessimisticAdjustment 
          : advancedSettings.selectedScenario === 'optimistic' 
          ? advancedSettings.optimisticAdjustment 
          : 0,
        ...advancedSettings,
        interestRate: investmentInput.policyLoanRate,
        policyFundAmount: investmentInput.policyLoanAmount,
        loanPeriod: investmentInput.gracePeriod + investmentInput.repaymentPeriod,
        yearlyDSCRData: yearlyDSCRData
      };

      // 실제 투자분석 수행
      const result = await performInvestmentAnalysis(analysisData);
      setAnalysisResult(result);
    } catch (error) {
      console.error('투자분석 오류:', error);
      setAnalysisResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  // 입력값 업데이트 함수
  const updateInvestmentInput = (field: string, value: number) => {
    setInvestmentInput(prev => ({
      ...prev,
      [field]: value * 100000000 // 입력한 값을 억원으로 변환
    }));
    
    // 입력값 변경 시 자동으로 분석 재실행
    if (analysisResult) {
      setTimeout(() => {
        handleInvestmentAnalysis();
      }, 500);
    }
  };

  // 백분율 입력값 업데이트
  const updatePercentageInput = (field: string, value: number) => {
    setInvestmentInput(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 입력값 변경 시 자동으로 분석 재실행
    if (analysisResult) {
      setTimeout(() => {
        handleInvestmentAnalysis();
      }, 500);
    }
  };

  // 고급설정 업데이트 함수
  const updateAdvancedSettings = (field: string, value: number | string) => {
    setAdvancedSettings(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 고급설정 변경 시 자동으로 분석 재실행
    if (analysisResult) {
      setTimeout(() => {
        handleInvestmentAnalysis();
      }, 500);
    }
  };

  // DSCR 연도별 상세 계산 함수
  const calculateYearlyDSCR = () => {
    const analysisYears = investmentInput.analysisYears;
    const gracePeriod = investmentInput.gracePeriod || 0;
    const repaymentPeriod = investmentInput.repaymentPeriod || analysisYears;
    const otherDebtGracePeriod = investmentInput.otherDebtGracePeriod || 0;
    const otherDebtRepaymentPeriod = investmentInput.otherDebtRepaymentPeriod || analysisYears;
    const yearlyDSCRData = [];
    
    const revenueGrowthRate = (advancedSettings.revenueGrowthRate || 5) / 100;
    
    let scenarioMultiplier = 1;
    let profitRateAdjustment = 0;
    
    if (advancedSettings.enableScenarioAnalysis) {
      switch (advancedSettings.selectedScenario) {
        case 'pessimistic':
          scenarioMultiplier = 1 + (advancedSettings.pessimisticAdjustment / 100);
          profitRateAdjustment = -3;
          break;
        case 'optimistic':
          scenarioMultiplier = 1 + (advancedSettings.optimisticAdjustment / 100);
          profitRateAdjustment = 2;
          break;
        default:
          scenarioMultiplier = 1;
          profitRateAdjustment = 0;
      }
    }
    
    const calculateDebtPayment = (loanAmount: number, rate: number, year: number, gracePeriod: number, repaymentPeriod: number) => {
      let principal = 0;
      let interest = 0;
      let remainingBalance = loanAmount;
      
      if (loanAmount <= 0) return { principal, interest, remainingBalance };
      
      if (year <= gracePeriod) {
        principal = 0;
        interest = loanAmount * (rate / 100);
        remainingBalance = loanAmount;
      } else if (year <= gracePeriod + repaymentPeriod) {
        const repaymentYear = year - gracePeriod;
        principal = loanAmount / repaymentPeriod;
        remainingBalance = loanAmount - (principal * (repaymentYear - 1));
        interest = remainingBalance * (rate / 100);
        remainingBalance = remainingBalance - principal;
      } else {
        principal = 0;
        interest = 0;
        remainingBalance = 0;
      }
      
      return { 
        principal: Math.max(0, principal), 
        interest: Math.max(0, interest), 
        remainingBalance: Math.max(0, remainingBalance) 
      };
    };
    
    for (let year = 1; year <= analysisYears; year++) {
      const baseRevenue = investmentInput.annualRevenue * Math.pow(1 + revenueGrowthRate, year - 1);
      const yearlyRevenue = baseRevenue * scenarioMultiplier;
      
      const baseOperatingProfitRate = (investmentInput.operatingProfitRate || 15) / 100;
      const adjustedProfitRate = Math.max(0, Math.min(1, baseOperatingProfitRate + (profitRateAdjustment / 100)));
      const yearlyOperatingProfit = yearlyRevenue * adjustedProfitRate;
      
      const policyLoan = calculateDebtPayment(
        investmentInput.policyLoanAmount,
        investmentInput.policyLoanRate,
        year,
        gracePeriod,
        repaymentPeriod
      );
      
      const otherDebt = calculateDebtPayment(
        investmentInput.otherDebtAmount,
        investmentInput.otherDebtRate,
        year,
        otherDebtGracePeriod,
        otherDebtRepaymentPeriod
      );
      
      const yearlyTotalDebtService = 
        policyLoan.principal + policyLoan.interest + 
        otherDebt.principal + otherDebt.interest;
      
      let yearlyDSCR = 0;
      if (yearlyTotalDebtService > 0) {
        yearlyDSCR = yearlyOperatingProfit / yearlyTotalDebtService;
        
        if (yearlyDSCR > 100) {
          yearlyDSCR = Math.min(yearlyDSCR, 100);
        }
        
        if (!isFinite(yearlyDSCR) || isNaN(yearlyDSCR)) {
          yearlyDSCR = 0;
        }
      } else {
        yearlyDSCR = 0;
      }
      
      yearlyDSCRData.push({
        year,
        revenue: yearlyRevenue,
        operatingProfit: yearlyOperatingProfit,
        policyLoanPrincipal: policyLoan.principal,
        policyLoanInterest: policyLoan.interest,
        remainingPolicyLoan: policyLoan.remainingBalance,
        otherDebtPrincipal: otherDebt.principal,
        otherDebtInterest: otherDebt.interest,
        remainingOtherDebt: otherDebt.remainingBalance,
        totalDebtService: yearlyTotalDebtService,
        dscr: yearlyDSCR,
        isGracePeriod: year <= gracePeriod,
        isRepaymentPeriod: year > gracePeriod && year <= gracePeriod + repaymentPeriod,
        isPostRepayment: year > gracePeriod + repaymentPeriod,
        isOtherDebtGracePeriod: year <= otherDebtGracePeriod,
        isOtherDebtRepaymentPeriod: year > otherDebtGracePeriod && year <= otherDebtGracePeriod + otherDebtRepaymentPeriod,
        isOtherDebtPostRepayment: year > otherDebtGracePeriod + otherDebtRepaymentPeriod,
        scenarioType: advancedSettings.selectedScenario,
        scenarioAdjustment: advancedSettings.selectedScenario === 'pessimistic' ? 
          advancedSettings.pessimisticAdjustment : 
          advancedSettings.selectedScenario === 'optimistic' ? 
          advancedSettings.optimisticAdjustment : 0
      });
    }
    
    return yearlyDSCRData;
  };

  // 기존 DSCR 계산 함수
  const calculateDSCR = () => {
    const yearlyData = calculateYearlyDSCR();
    if (yearlyData.length === 0) return { dscr: 0 };
    
    const totalOperatingProfit = yearlyData.reduce((sum, data) => sum + data.operatingProfit, 0);
    const totalDebtService = yearlyData.reduce((sum, data) => sum + data.totalDebtService, 0);
    const avgDSCR = totalDebtService > 0 ? totalOperatingProfit / totalDebtService : 0;
    
    return {
      operatingProfit: yearlyData[0]?.operatingProfit || 0,
      policyLoanInterest: yearlyData[0]?.policyLoanInterest || 0,
      otherDebtInterest: yearlyData[0]?.otherDebtInterest || 0,
      policyLoanPrincipal: yearlyData[0]?.policyLoanPrincipal || 0,
      otherDebtPrincipal: yearlyData[0]?.otherDebtPrincipal || 0,
      totalDebtService: yearlyData[0]?.totalDebtService || 0,
      dscr: avgDSCR,
      yearlyData
    };
  };

  const getAverageDSCR = () => {
    if (analysisResult && analysisResult.dscrData && analysisResult.dscrData.length > 0) {
      const totalOperatingProfit = analysisResult.dscrData.reduce((acc, d) => acc + (d.operatingProfit || 0), 0);
      const totalDebtService = analysisResult.dscrData.reduce((acc, d) => acc + (d.totalDebtService || 0), 0);
      return totalDebtService > 0 ? totalOperatingProfit / totalDebtService : 0;
    }
    return calculateDSCR().dscr;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="container mx-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/services/policy-funding')}
            className="transition-all duration-200 transform hover:scale-[1.05] active:scale-[0.95] px-4 py-2 rounded-md hover:bg-blue-50 border-blue-300 hover:border-blue-600 text-blue-700 hover:text-blue-600 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            <span className="relative flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-[-2px] transition-transform duration-200" />
              정책자금 서비스로 돌아가기
            </span>
          </Button>
        </div>
      </div>

      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            💼 정책자금투자타당성분석기
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
            전문가급 투자분석 알고리즘으로 연도별 상세 NPV 계산과 영업이익률 연계 투자타당성 검토를 제공합니다
          </p>
          
          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              onClick={() => {
                const analysisSection = document.getElementById('analysis-section');
                analysisSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Play className="w-5 h-5 mr-3" />
              분석 시작하기
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-blue-900 border-2 border-white hover:bg-blue-50 hover:border-blue-200 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => router.push('/consultation')}
            >
              <Users className="w-5 h-5 mr-3" />
              상담신청 하기
            </Button>
          </div>
        </div>
      </div>

      {/* 분석 도구 메인 섹션 */}
      <div id="analysis-section" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              투자타당성분석기
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              전문가급 투자분석 알고리즘으로 연도별 상세 NPV 계산과 영업이익률 연계 투자타당성 검토를 제공합니다
            </p>
          </div>

          {/* 3단계 가이드 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              🔍 3단계 간편 투자분석 가이드
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-3xl mb-2">📝</div>
                <h4 className="font-bold text-blue-900 mb-2">1단계: 기본정보 입력</h4>
                <p className="text-sm text-blue-700">
                  초기투자액, 예상매출, 영업이익률을<br />
                  억원 단위로 입력해주세요
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold text-purple-900 mb-2">2단계: 분석조건 설정</h4>
                <p className="text-sm text-purple-700">
                  할인율과 분석기간을 설정하고<br />
                  '분석 시작' 버튼을 클릭하세요
                </p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-bold text-emerald-900 mb-2">3단계: 결과 확인</h4>
                <p className="text-sm text-emerald-700">
                  NPV, IRR, 투자회수기간 등<br />
                  상세한 분석결과를 확인하세요
                </p>
              </div>
            </div>
          </div>

          {/* 분석 도구 메인 컨테이너 */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* 입력 패널 - 1/4 너비 */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                  투자 정보 입력
                </h3>
                
                {/* 기본 투자 정보 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      초기투자금액 (억원)
                    </label>
                    <input
                      type="number"
                      value={investmentInput.initialInvestment / 100000000}
                      onChange={(e) => updateInvestmentInput('initialInvestment', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      연간매출액 (억원)
                    </label>
                    <input
                      type="number"
                      value={investmentInput.annualRevenue / 100000000}
                      onChange={(e) => updateInvestmentInput('annualRevenue', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      영업이익률 (%)
                    </label>
                    <input
                      type="number"
                      value={investmentInput.operatingProfitRate}
                      onChange={(e) => updatePercentageInput('operatingProfitRate', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="17.5"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      할인율 (%)
                    </label>
                    <input
                      type="number"
                      value={investmentInput.discountRate}
                      onChange={(e) => updatePercentageInput('discountRate', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      분석기간 (년)
                    </label>
                    <input
                      type="number"
                      value={investmentInput.analysisYears}
                      onChange={(e) => updatePercentageInput('analysisYears', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10"
                      min="1"
                      max="20"
                    />
                  </div>
                </div>

                {/* 정책자금 정보 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-green-600" />
                    정책자금 정보
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        정책자금 금액 (억원)
                      </label>
                      <input
                        type="number"
                        value={investmentInput.policyLoanAmount / 100000000}
                        onChange={(e) => updateInvestmentInput('policyLoanAmount', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="3.5"
                        step="0.1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        정책자금 이자율 (%)
                      </label>
                      <input
                        type="number"
                        value={investmentInput.policyLoanRate}
                        onChange={(e) => updatePercentageInput('policyLoanRate', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="2.5"
                        step="0.1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        거치기간 (년)
                      </label>
                      <input
                        type="number"
                        value={investmentInput.gracePeriod}
                        onChange={(e) => updatePercentageInput('gracePeriod', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="2"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        원금상환기간 (년)
                      </label>
                      <input
                        type="number"
                        value={investmentInput.repaymentPeriod}
                        onChange={(e) => updatePercentageInput('repaymentPeriod', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="5"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* 기타채무 정보 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                    기타채무 정보
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        기타채무 금액 (억원)
                      </label>
                      <input
                        type="number"
                        value={investmentInput.otherDebtAmount / 100000000}
                        onChange={(e) => updateInvestmentInput('otherDebtAmount', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="30"
                        step="0.1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        기타채무 이자율 (%)
                      </label>
                      <input
                        type="number"
                        value={investmentInput.otherDebtRate}
                        onChange={(e) => updatePercentageInput('otherDebtRate', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="5.3"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>

                {/* 분석 실행 버튼 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleInvestmentAnalysis}
                    disabled={isCalculating || !investmentInput.initialInvestment || !investmentInput.annualRevenue || !(investmentInput.operatingProfitRate || 15)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCalculating ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        🔄 연도별 NPV 계산 중...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Calculator className="w-5 h-5 mr-2" />
                        🚀 투자타당성 분석 시작
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* 분석 결과 표시 섹션 - 3/4 너비 */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="analysis" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    투자분석
                  </TabsTrigger>
                  <TabsTrigger value="ai-evaluation" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    🤖 AI 평가
                  </TabsTrigger>
                  <TabsTrigger value="dscr-analysis" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    DSCR 분석
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="analysis" className="space-y-6">
                  <InvestmentResultDisplay 
                    result={analysisResult} 
                    isCalculating={isCalculating}
                    selectedScenario={advancedSettings.enableScenarioAnalysis ? advancedSettings.selectedScenario : 'neutral'}
                    scenarioAdjustment={
                      advancedSettings.enableScenarioAnalysis ? 
                      (advancedSettings.selectedScenario === 'pessimistic' ? 
                        advancedSettings.pessimisticAdjustment : 
                        advancedSettings.selectedScenario === 'optimistic' ? 
                        advancedSettings.optimisticAdjustment : 0) : 0
                    }
                  />
                </TabsContent>
                
                <TabsContent value="ai-evaluation" className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                    {analysisResult ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🤖</div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">AI 투자평가 결과</h3>
                          <p className="text-gray-600">인공지능이 분석한 투자 타당성 평가입니다</p>
                        </div>
                        
                        {/* AI 평가 결과 표시 */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                          <div className="text-center">
                            <div className="text-4xl mb-2">
                              {analysisResult.npv && analysisResult.npv > 0 ? '✅' : '⚠️'}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">
                              {analysisResult.npv && analysisResult.npv > 0 ? '투자 권장' : '신중 검토 필요'}
                            </h4>
                            <p className="text-gray-600 mb-4">
                              {analysisResult.npv && analysisResult.npv > 0 
                                ? 'NPV가 양수로 경제적 타당성이 있습니다' 
                                : 'NPV가 음수이므로 투자 조건을 재검토해보세요'}
                            </p>
                          </div>
                        </div>
                        
                        {/* 상세 AI 분석 */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <h5 className="font-bold text-gray-900 mb-2 flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                              수익성 분석
                            </h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• NPV: {analysisResult.npv ? `${(analysisResult.npv / 100000000).toFixed(2)}억원` : '계산 중'}</li>
                              <li>• IRR: {analysisResult.irr ? `${(analysisResult.irr * 100).toFixed(2)}%` : '계산 중'}</li>
                              <li>• 투자회수기간: {analysisResult.paybackPeriod ? `${analysisResult.paybackPeriod.toFixed(1)}년` : '계산 중'}</li>
                            </ul>
                          </div>
                          
                          <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <h5 className="font-bold text-gray-900 mb-2 flex items-center">
                              <Shield className="w-4 h-4 mr-2 text-blue-600" />
                              리스크 분석
                            </h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>• 평균 DSCR: {getAverageDSCR().toFixed(2)}</li>
                              <li>• 영업이익률: {investmentInput.operatingProfitRate}%</li>
                              <li>• 할인율: {investmentInput.discountRate}%</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-6">📊</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">투자분석을 먼저 실행해주세요</h3>
                        <p className="text-gray-600 text-lg mb-2">AI 평가를 위해서는 투자 데이터가 필요합니다.</p>
                        <p className="text-gray-500 text-sm">왼쪽 패널에서 투자 정보를 입력하고 '🚀 투자타당성 분석 시작' 버튼을 클릭하세요.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="dscr-analysis" className="space-y-6">
                  <div id="dscr-detailed-analysis">
                    <div className="mb-6 p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl">
                      <h3 className="text-2xl font-bold mb-2 flex items-center">
                        <Shield className="h-6 w-6 mr-2" />
                        고도화된 DSCR 부채상환능력 분석
                      </h3>
                      <p className="text-blue-100">
                        연도별 상세 분석과 복합 차트로 부채상환능력을 정밀 진단합니다
                      </p>
                    </div>
                    
                    {isCalculating ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">DSCR 분석 중...</p>
                      </div>
                    ) : (
                      <DSCRDetailedAnalysis 
                        investmentInput={investmentInput}
                        advancedSettings={advancedSettings}
                        yearlyDSCRData={calculateYearlyDSCR()}
                      />
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 액션 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">전문가 상담이 필요하신가요?</h2>
          <p className="text-xl text-blue-100 mb-8">
            투자분석 결과를 바탕으로 전문가와 상담하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => router.push('/consultation')}
            >
              <Users className="mr-2 h-5 w-5" />
              전문가 상담 신청
            </Button>
            <Button 
              size="lg" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => router.push('/services/policy-funding')}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              정책자금 서비스로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
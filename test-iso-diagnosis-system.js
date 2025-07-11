/**
 * ISO 인증 무료진단 시스템 테스트
 * 
 * 이 스크립트는 ISO 인증 무료진단 시스템의 기능을 테스트합니다.
 * - Google Apps Script 연동 테스트
 * - 폼 데이터 전송 테스트
 * - 점수 계산 로직 테스트
 */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD/exec';

// 테스트 데이터
const testData = {
  action: 'saveISODiagnosis',
  폼타입: 'ISO_무료진단',
  companyName: '테스트 제조업체',
  industry: '제조업',
  businessSize: '중소기업',
  employeeCount: '50명',
  desiredCertification: 'ISO 9001',
  certificationExperience: '없음',
  certificationPurpose: '품질경영시스템 구축을 통한 경쟁력 강화',
  expectedSchedule: '6개월 이내',
  contactName: '김담당',
  contactPhone: '010-1234-5678',
  contactEmail: 'test@company.com',
  privacyConsent: true,
  
  // 인증 준비도 점수 (1-5점)
  certificationScores: {
    policy_establishment: 3,
    procedure_writing: 2,
    form_management: 3,
    record_management: 4,
    document_control: 3,
    process_definition: 3,
    responsibility_authority: 4,
    operation_procedure: 3,
    performance_measurement: 2,
    training_plan: 2,
    training_implementation: 3,
    competency_assessment: 2,
    training_record: 3,
    training_effectiveness: 2,
    internal_audit: 1,
    management_review: 2,
    nonconformity_management: 2,
    preventive_action: 2,
    corrective_action: 3,
    continual_improvement: 2
  },
  
  // 계산된 점수들
  인증준비도점수: 52, // (총 52점 / 100점 만점)
  카테고리점수: {
    documentation: 60,  // 문서화 (15/25 * 100)
    process: 60,        // 프로세스 (12/20 * 100)
    training: 48,       // 교육훈련 (12/25 * 100)
    monitoring: 30,     // 모니터링 (3/10 * 100)
    improvement: 36     // 개선활동 (9/20 * 100)
  },
  
  진단점수: {
    policy_establishment: 3,
    procedure_writing: 2,
    form_management: 3,
    record_management: 4,
    document_control: 3,
    process_definition: 3,
    responsibility_authority: 4,
    operation_procedure: 3,
    performance_measurement: 2,
    training_plan: 2,
    training_implementation: 3,
    competency_assessment: 2,
    training_record: 3,
    training_effectiveness: 2,
    internal_audit: 1,
    management_review: 2,
    nonconformity_management: 2,
    preventive_action: 2,
    corrective_action: 3,
    continual_improvement: 2
  },
  
  진단보고서요약: '테스트 제조업체의 ISO 9001 인증 준비도 진단 결과입니다. 전반적으로 보완이 필요한 상태입니다.'
};

// 테스트 실행 함수
async function testISODiagnosisSystem() {
  console.log('🧪 ISO 인증 무료진단 시스템 테스트 시작...\n');
  
  try {
    console.log('📊 테스트 데이터:');
    console.log('- 회사명:', testData.companyName);
    console.log('- 희망인증:', testData.desiredCertification);
    console.log('- 인증준비도점수:', testData.인증준비도점수, '점');
    console.log('- 카테고리별 점수:', testData.카테고리점수);
    console.log('');
    
    console.log('📡 Google Apps Script로 데이터 전송 중...');
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    console.log('📡 응답 상태:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }
    
    const result = await response.json();
    
    console.log('✅ 응답 결과:');
    console.log('- 성공 여부:', result.success);
    console.log('- 메시지:', result.message);
    console.log('- 타임스탬프:', result.timestamp);
    console.log('- 시트:', result.sheet);
    console.log('- 행 번호:', result.row);
    console.log('- 인증준비도점수:', result.인증준비도점수);
    console.log('');
    
    if (result.success) {
      console.log('🎉 테스트 성공! ISO 인증 무료진단 시스템이 정상 작동합니다.');
      console.log('');
      console.log('📋 확인사항:');
      console.log('1. 구글시트에 데이터가 정상 저장되었는지 확인');
      console.log('2. 관리자 이메일이 발송되었는지 확인');
      console.log('3. 신청자 확인 이메일이 발송되었는지 확인');
      console.log('');
      console.log('🔗 구글시트 URL:', `https://docs.google.com/spreadsheets/d/1-xdABrno18ogullhqx3UXcudUGbc1O4Def50jVEJ9i4/edit`);
    } else {
      console.log('❌ 테스트 실패:', result.error || '알 수 없는 오류');
    }
    
  } catch (error) {
    console.error('❌ 테스트 실행 중 오류 발생:', error.message);
    console.error('상세 오류:', error);
  }
}

// 점수 계산 로직 테스트
function testScoreCalculation() {
  console.log('\n🧮 점수 계산 로직 테스트...\n');
  
  const scores = testData.certificationScores;
  
  // 총점 계산
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const averageScore = (totalScore / 20) * 20; // 100점 만점으로 변환
  
  console.log('📊 점수 계산 결과:');
  console.log('- 총점:', totalScore, '/ 100점');
  console.log('- 평균점수:', averageScore, '점');
  
  // 카테고리별 점수 계산
  const categoryScores = {
    documentation: ((scores.policy_establishment + scores.procedure_writing + scores.form_management + scores.record_management + scores.document_control) / 5) * 20,
    process: ((scores.process_definition + scores.responsibility_authority + scores.operation_procedure + scores.performance_measurement) / 4) * 20,
    training: ((scores.training_plan + scores.training_implementation + scores.competency_assessment + scores.training_record + scores.training_effectiveness) / 5) * 20,
    monitoring: ((scores.internal_audit + scores.management_review) / 2) * 20,
    improvement: ((scores.nonconformity_management + scores.preventive_action + scores.corrective_action + scores.continual_improvement) / 4) * 20
  };
  
  console.log('📈 카테고리별 점수:');
  console.log('- 문서화:', Math.round(categoryScores.documentation), '점');
  console.log('- 프로세스:', Math.round(categoryScores.process), '점');
  console.log('- 교육훈련:', Math.round(categoryScores.training), '점');
  console.log('- 모니터링:', Math.round(categoryScores.monitoring), '점');
  console.log('- 개선활동:', Math.round(categoryScores.improvement), '점');
  
  // 등급 판정
  let grade = '';
  if (averageScore >= 80) grade = '우수 (A)';
  else if (averageScore >= 60) grade = '보통 (B)';
  else grade = '개선 필요 (C)';
  
  console.log('🏆 종합 등급:', grade);
  
  return {
    totalScore: Math.round(averageScore),
    categoryScores,
    grade
  };
}

// 메인 실행
async function main() {
  console.log('================================================================================');
  console.log('🎯 ISO 인증 무료진단 시스템 종합 테스트');
  console.log('================================================================================\n');
  
  // 점수 계산 테스트
  const calculationResult = testScoreCalculation();
  
  console.log('\n================================================================================');
  
  // 시스템 연동 테스트
  await testISODiagnosisSystem();
  
  console.log('\n================================================================================');
  console.log('🎉 테스트 완료!');
  console.log('================================================================================');
}

// Node.js 환경에서 실행
if (typeof require !== 'undefined' && require.main === module) {
  // fetch가 없는 경우 node-fetch 사용
  if (typeof fetch === 'undefined') {
    try {
      const fetch = require('node-fetch');
      global.fetch = fetch;
    } catch (e) {
      console.error('❌ node-fetch 모듈이 필요합니다. npm install node-fetch 실행 후 다시 시도해주세요.');
      process.exit(1);
    }
  }
  
  main().catch(console.error);
}

// 브라우저 환경에서 실행
if (typeof window !== 'undefined') {
  window.testISODiagnosisSystem = testISODiagnosisSystem;
  window.testScoreCalculation = testScoreCalculation;
  window.main = main;
} 
/**
 * ================================================================================
 * ESG 인증원 Apps Script 완전 테스트 스크립트
 * ================================================================================
 * 
 * 🎯 테스트 목표: 무오류 시스템 구축
 * 📅 테스트 일시: 2025.01.06
 * 🔧 테스트 대상: ESG 인증원 통합 Apps Script
 * 
 * 📋 테스트 항목:
 * 1. 환경변수 검증
 * 2. 시트 헤더 검증
 * 3. 데이터 입력 검증
 * 4. 이메일 발송 검증
 * 5. 오류 처리 검증
 * 6. 전체 시스템 통합 테스트
 */

// ================================================================================
// 🔧 테스트 환경 설정
// ================================================================================

const TEST_CONFIG = {
  // 환경변수 검증
  EXPECTED_SCRIPT_ID: '1XdX8JW8Q9EBF_ApRr8XEMXAm_8MYDxsqwsXMqUFdNvzx3fkvIepxoG3G',
  EXPECTED_DEPLOYMENT_ID: 'AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD',
  EXPECTED_WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD/exec',
  EXPECTED_SPREADSHEET_ID: '1-xdABrno18ogullhqx3UXcudUGbc1O4Def50jVEJ9i4',
  
  // 시트 이름 검증
  EXPECTED_SHEETS: {
    DIAGNOSIS: 'ESG_무료진단신청',
    CONSULTATION: 'ESG_상담신청',
    ERROR_REPORT: 'ESG_오류신고'
  },
  
  // 컬럼 수 검증
  EXPECTED_COLUMNS: {
    DIAGNOSIS: 48,
    CONSULTATION: 25,
    ERROR_REPORT: 13
  },
  
  // 테스트 데이터
  TEST_EMAIL: 'test@esg-certification.com',
  ADMIN_EMAIL: 'hongik423@gmail.com'
};

// ================================================================================
// 🧪 1. 환경변수 검증 테스트
// ================================================================================

function test1_EnvironmentVariables() {
  console.log('🧪 1. 환경변수 검증 테스트 시작...');
  
  const results = {
    testName: '환경변수 검증',
    passed: 0,
    failed: 0,
    errors: []
  };
  
  try {
    // SPREADSHEET_ID 검증
    if (SPREADSHEET_ID === TEST_CONFIG.EXPECTED_SPREADSHEET_ID) {
      console.log('✅ SPREADSHEET_ID 검증 통과');
      results.passed++;
    } else {
      console.error('❌ SPREADSHEET_ID 불일치:', SPREADSHEET_ID);
      results.failed++;
      results.errors.push('SPREADSHEET_ID 불일치');
    }
    
    // DEPLOYMENT_INFO 검증
    if (DEPLOYMENT_INFO.SCRIPT_ID === TEST_CONFIG.EXPECTED_SCRIPT_ID) {
      console.log('✅ SCRIPT_ID 검증 통과');
      results.passed++;
    } else {
      console.error('❌ SCRIPT_ID 불일치:', DEPLOYMENT_INFO.SCRIPT_ID);
      results.failed++;
      results.errors.push('SCRIPT_ID 불일치');
    }
    
    if (DEPLOYMENT_INFO.DEPLOYMENT_ID === TEST_CONFIG.EXPECTED_DEPLOYMENT_ID) {
      console.log('✅ DEPLOYMENT_ID 검증 통과');
      results.passed++;
    } else {
      console.error('❌ DEPLOYMENT_ID 불일치:', DEPLOYMENT_INFO.DEPLOYMENT_ID);
      results.failed++;
      results.errors.push('DEPLOYMENT_ID 불일치');
    }
    
    if (DEPLOYMENT_INFO.WEB_APP_URL === TEST_CONFIG.EXPECTED_WEB_APP_URL) {
      console.log('✅ WEB_APP_URL 검증 통과');
      results.passed++;
    } else {
      console.error('❌ WEB_APP_URL 불일치:', DEPLOYMENT_INFO.WEB_APP_URL);
      results.failed++;
      results.errors.push('WEB_APP_URL 불일치');
    }
    
    // SHEETS 검증
    Object.entries(TEST_CONFIG.EXPECTED_SHEETS).forEach(([key, expectedName]) => {
      if (SHEETS[key] === expectedName) {
        console.log(`✅ SHEETS.${key} 검증 통과`);
        results.passed++;
      } else {
        console.error(`❌ SHEETS.${key} 불일치:`, SHEETS[key]);
        results.failed++;
        results.errors.push(`SHEETS.${key} 불일치`);
      }
    });
    
    // ESG_CENTER_INFO 검증
    if (ESG_CENTER_INFO.NAME === 'ESG 인증원') {
      console.log('✅ ESG_CENTER_INFO.NAME 검증 통과');
      results.passed++;
    } else {
      console.error('❌ ESG_CENTER_INFO.NAME 불일치:', ESG_CENTER_INFO.NAME);
      results.failed++;
      results.errors.push('ESG_CENTER_INFO.NAME 불일치');
    }
    
    if (ESG_CENTER_INFO.SERVICES.includes('ISO 9001')) {
      console.log('✅ ESG_CENTER_INFO.SERVICES 검증 통과');
      results.passed++;
    } else {
      console.error('❌ ESG_CENTER_INFO.SERVICES ISO 9001 누락');
      results.failed++;
      results.errors.push('ESG_CENTER_INFO.SERVICES ISO 9001 누락');
    }
    
  } catch (error) {
    console.error('❌ 환경변수 검증 중 오류:', error);
    results.failed++;
    results.errors.push('환경변수 검증 중 오류: ' + error.toString());
  }
  
  console.log(`📊 환경변수 검증 결과: ${results.passed}개 통과, ${results.failed}개 실패`);
  return results;
}

// ================================================================================
// 🧪 2. 시트 헤더 검증 테스트
// ================================================================================

function test2_SheetHeaders() {
  console.log('🧪 2. 시트 헤더 검증 테스트 시작...');
  
  const results = {
    testName: '시트 헤더 검증',
    passed: 0,
    failed: 0,
    errors: []
  };
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // 진단 시트 헤더 검증
    try {
      const diagnosisSheet = spreadsheet.getSheetByName(SHEETS.DIAGNOSIS);
      if (diagnosisSheet) {
        const headerRow = diagnosisSheet.getRange(1, 1, 1, diagnosisSheet.getLastColumn()).getValues()[0];
        
        if (headerRow.length >= TEST_CONFIG.EXPECTED_COLUMNS.DIAGNOSIS) {
          console.log(`✅ 진단 시트 헤더 컬럼 수 검증 통과: ${headerRow.length}개`);
          results.passed++;
        } else {
          console.error(`❌ 진단 시트 헤더 컬럼 수 부족: ${headerRow.length}개 (예상: ${TEST_CONFIG.EXPECTED_COLUMNS.DIAGNOSIS}개)`);
          results.failed++;
          results.errors.push('진단 시트 헤더 컬럼 수 부족');
        }
        
        // 필수 헤더 검증
        const requiredHeaders = ['제출일시', '회사명', '희망인증', '인증준비도점수', '담당자명', '이메일'];
        const missingHeaders = requiredHeaders.filter(header => !headerRow.includes(header));
        
        if (missingHeaders.length === 0) {
          console.log('✅ 진단 시트 필수 헤더 검증 통과');
          results.passed++;
        } else {
          console.error('❌ 진단 시트 필수 헤더 누락:', missingHeaders);
          results.failed++;
          results.errors.push('진단 시트 필수 헤더 누락: ' + missingHeaders.join(', '));
        }
      } else {
        console.error('❌ 진단 시트를 찾을 수 없음');
        results.failed++;
        results.errors.push('진단 시트를 찾을 수 없음');
      }
    } catch (error) {
      console.error('❌ 진단 시트 헤더 검증 중 오류:', error);
      results.failed++;
      results.errors.push('진단 시트 헤더 검증 중 오류: ' + error.toString());
    }
    
    // 상담 시트 헤더 검증
    try {
      const consultationSheet = spreadsheet.getSheetByName(SHEETS.CONSULTATION);
      if (consultationSheet) {
        const headerRow = consultationSheet.getRange(1, 1, 1, consultationSheet.getLastColumn()).getValues()[0];
        
        if (headerRow.length >= TEST_CONFIG.EXPECTED_COLUMNS.CONSULTATION) {
          console.log(`✅ 상담 시트 헤더 컬럼 수 검증 통과: ${headerRow.length}개`);
          results.passed++;
        } else {
          console.error(`❌ 상담 시트 헤더 컬럼 수 부족: ${headerRow.length}개 (예상: ${TEST_CONFIG.EXPECTED_COLUMNS.CONSULTATION}개)`);
          results.failed++;
          results.errors.push('상담 시트 헤더 컬럼 수 부족');
        }
        
        // 필수 헤더 검증
        const requiredHeaders = ['제출일시', '상담유형', '희망인증', '성명', '이메일', '회사명'];
        const missingHeaders = requiredHeaders.filter(header => !headerRow.includes(header));
        
        if (missingHeaders.length === 0) {
          console.log('✅ 상담 시트 필수 헤더 검증 통과');
          results.passed++;
        } else {
          console.error('❌ 상담 시트 필수 헤더 누락:', missingHeaders);
          results.failed++;
          results.errors.push('상담 시트 필수 헤더 누락: ' + missingHeaders.join(', '));
        }
      } else {
        console.error('❌ 상담 시트를 찾을 수 없음');
        results.failed++;
        results.errors.push('상담 시트를 찾을 수 없음');
      }
    } catch (error) {
      console.error('❌ 상담 시트 헤더 검증 중 오류:', error);
      results.failed++;
      results.errors.push('상담 시트 헤더 검증 중 오류: ' + error.toString());
    }
    
    // 오류신고 시트 헤더 검증
    try {
      const errorSheet = spreadsheet.getSheetByName(SHEETS.ERROR_REPORT);
      if (errorSheet) {
        const headerRow = errorSheet.getRange(1, 1, 1, errorSheet.getLastColumn()).getValues()[0];
        
        if (headerRow.length >= TEST_CONFIG.EXPECTED_COLUMNS.ERROR_REPORT) {
          console.log(`✅ 오류신고 시트 헤더 컬럼 수 검증 통과: ${headerRow.length}개`);
          results.passed++;
        } else {
          console.error(`❌ 오류신고 시트 헤더 컬럼 수 부족: ${headerRow.length}개 (예상: ${TEST_CONFIG.EXPECTED_COLUMNS.ERROR_REPORT}개)`);
          results.failed++;
          results.errors.push('오류신고 시트 헤더 컬럼 수 부족');
        }
        
        // 필수 헤더 검증
        const requiredHeaders = ['제출일시', '오류유형', '사용자이메일', '오류설명'];
        const missingHeaders = requiredHeaders.filter(header => !headerRow.includes(header));
        
        if (missingHeaders.length === 0) {
          console.log('✅ 오류신고 시트 필수 헤더 검증 통과');
          results.passed++;
        } else {
          console.error('❌ 오류신고 시트 필수 헤더 누락:', missingHeaders);
          results.failed++;
          results.errors.push('오류신고 시트 필수 헤더 누락: ' + missingHeaders.join(', '));
        }
      } else {
        console.error('❌ 오류신고 시트를 찾을 수 없음');
        results.failed++;
        results.errors.push('오류신고 시트를 찾을 수 없음');
      }
    } catch (error) {
      console.error('❌ 오류신고 시트 헤더 검증 중 오류:', error);
      results.failed++;
      results.errors.push('오류신고 시트 헤더 검증 중 오류: ' + error.toString());
    }
    
  } catch (error) {
    console.error('❌ 시트 헤더 검증 중 전체 오류:', error);
    results.failed++;
    results.errors.push('시트 헤더 검증 중 전체 오류: ' + error.toString());
  }
  
  console.log(`📊 시트 헤더 검증 결과: ${results.passed}개 통과, ${results.failed}개 실패`);
  return results;
}

// ================================================================================
// 🧪 3. 데이터 입력 검증 테스트
// ================================================================================

function test3_DataInput() {
  console.log('🧪 3. 데이터 입력 검증 테스트 시작...');
  
  const results = {
    testName: '데이터 입력 검증',
    passed: 0,
    failed: 0,
    errors: []
  };
  
  try {
    // 진단 데이터 입력 테스트
    const diagnosisTestData = {
      action: 'saveDiagnosis',
      회사명: '테스트기업_진단',
      업종: '제조업',
      사업장규모: '중소기업',
      직원수: '10-50명',
      희망인증: 'ISO 9001',
      인증경험: '없음',
      인증목적: '품질경영시스템 구축 테스트',
      예상일정: '6개월 이내',
      담당자명: '김테스트',
      연락처: '010-1234-5678',
      이메일: TEST_CONFIG.TEST_EMAIL,
      개인정보동의: true,
      인증준비도점수: 70,
      진단점수: {
        정책수립: 3,
        절차서작성: 4,
        양식관리: 3,
        기록관리: 4,
        문서통제: 3
      },
      카테고리점수: {
        documentation: { score: 3.4 },
        process: { score: 3.2 },
        training: { score: 2.8 },
        monitoring: { score: 2.5 },
        improvement: { score: 2.9 }
      },
      진단보고서요약: '테스트용 진단 보고서입니다. 문서화 부분이 양호하며 교육훈련 체계 보완이 필요합니다.'
    };
    
    try {
      const diagnosisResult = processDiagnosisForm(diagnosisTestData);
      if (diagnosisResult && diagnosisResult.success) {
        console.log('✅ 진단 데이터 입력 테스트 통과');
        results.passed++;
      } else {
        console.error('❌ 진단 데이터 입력 실패:', diagnosisResult);
        results.failed++;
        results.errors.push('진단 데이터 입력 실패');
      }
    } catch (error) {
      console.error('❌ 진단 데이터 입력 중 오류:', error);
      results.failed++;
      results.errors.push('진단 데이터 입력 중 오류: ' + error.toString());
    }
    
    // 상담 데이터 입력 테스트
    const consultationTestData = {
      action: 'saveConsultation',
      상담유형: '인증컨설팅',
      희망인증: 'ISO 14001',
      성명: '이테스트',
      연락처: '010-9876-5432',
      이메일: TEST_CONFIG.TEST_EMAIL,
      회사명: '테스트기업_상담',
      직책: '품질관리자',
      업종: '환경기술',
      사업장규모: '중소기업',
      직원수: '20-50명',
      인증경험: 'ISO 9001 보유',
      인증목적: '환경경영시스템 구축 테스트',
      예상일정: '12개월 이내',
      예산범위: '1000만원 이하',
      문의내용: '테스트용 상담 문의입니다. ISO 14001 인증 절차에 대해 문의드립니다.',
      희망상담시간: '평일 오후 2-5시',
      개인정보동의: true,
      진단연계여부: 'N'
    };
    
    try {
      const consultationResult = processConsultationForm(consultationTestData);
      if (consultationResult && consultationResult.success) {
        console.log('✅ 상담 데이터 입력 테스트 통과');
        results.passed++;
      } else {
        console.error('❌ 상담 데이터 입력 실패:', consultationResult);
        results.failed++;
        results.errors.push('상담 데이터 입력 실패');
      }
    } catch (error) {
      console.error('❌ 상담 데이터 입력 중 오류:', error);
      results.failed++;
      results.errors.push('상담 데이터 입력 중 오류: ' + error.toString());
    }
    
    // 오류신고 데이터 입력 테스트
    const errorTestData = {
      action: 'saveErrorReport',
      오류유형: '테스트오류',
      사용자이메일: TEST_CONFIG.TEST_EMAIL,
      오류설명: '테스트용 오류 신고입니다.',
      기대동작: '정상적인 처리',
      실제동작: '테스트 오류 발생',
      재현단계: '1. 테스트 실행\n2. 오류 확인',
      심각도: '낮음',
      추가의견: '테스트 목적으로 생성된 오류입니다.',
      브라우저정보: 'Chrome 120.0.0.0',
      제출경로: '/test'
    };
    
    try {
      const errorResult = processErrorReport(errorTestData);
      if (errorResult && errorResult.success) {
        console.log('✅ 오류신고 데이터 입력 테스트 통과');
        results.passed++;
      } else {
        console.error('❌ 오류신고 데이터 입력 실패:', errorResult);
        results.failed++;
        results.errors.push('오류신고 데이터 입력 실패');
      }
    } catch (error) {
      console.error('❌ 오류신고 데이터 입력 중 오류:', error);
      results.failed++;
      results.errors.push('오류신고 데이터 입력 중 오류: ' + error.toString());
    }
    
  } catch (error) {
    console.error('❌ 데이터 입력 검증 중 전체 오류:', error);
    results.failed++;
    results.errors.push('데이터 입력 검증 중 전체 오류: ' + error.toString());
  }
  
  console.log(`📊 데이터 입력 검증 결과: ${results.passed}개 통과, ${results.failed}개 실패`);
  return results;
}

// ================================================================================
// 🧪 4. 함수 존재 검증 테스트
// ================================================================================

function test4_FunctionExistence() {
  console.log('🧪 4. 함수 존재 검증 테스트 시작...');
  
  const results = {
    testName: '함수 존재 검증',
    passed: 0,
    failed: 0,
    errors: []
  };
  
  const requiredFunctions = [
    'doPost',
    'doGet',
    'processDiagnosisForm',
    'processConsultationForm',
    'processErrorReport',
    'extractCertificationScores',
    'extractCategoryScores',
    'sendDiagnosisAdminNotification',
    'sendConsultationAdminNotification',
    'sendErrorReportAdminNotification',
    'sendUserConfirmation',
    'sendErrorReportUserConfirmation',
    'setupHeaders',
    'getOrCreateSheet',
    'getCurrentKoreanTime',
    'createSuccessResponse',
    'createErrorResponse',
    'isErrorReport',
    'isConsultationRequest',
    'testDiagnosisSubmission',
    'testConsultationSubmission',
    'testErrorReport',
    'testEntireSystem'
  ];
  
  requiredFunctions.forEach(funcName => {
    try {
      if (typeof eval(funcName) === 'function') {
        console.log(`✅ 함수 존재 확인: ${funcName}`);
        results.passed++;
      } else {
        console.error(`❌ 함수 누락: ${funcName}`);
        results.failed++;
        results.errors.push(`함수 누락: ${funcName}`);
      }
    } catch (error) {
      console.error(`❌ 함수 검증 오류 (${funcName}):`, error);
      results.failed++;
      results.errors.push(`함수 검증 오류 (${funcName}): ${error.toString()}`);
    }
  });
  
  console.log(`📊 함수 존재 검증 결과: ${results.passed}개 통과, ${results.failed}개 실패`);
  return results;
}

// ================================================================================
// 🧪 5. 오류 처리 검증 테스트
// ================================================================================

function test5_ErrorHandling() {
  console.log('🧪 5. 오류 처리 검증 테스트 시작...');
  
  const results = {
    testName: '오류 처리 검증',
    passed: 0,
    failed: 0,
    errors: []
  };
  
  try {
    // 빈 데이터 처리 테스트
    try {
      const emptyResult = processDiagnosisForm({});
      if (emptyResult && !emptyResult.success) {
        console.log('✅ 빈 데이터 오류 처리 테스트 통과');
        results.passed++;
      } else {
        console.error('❌ 빈 데이터 오류 처리 실패');
        results.failed++;
        results.errors.push('빈 데이터 오류 처리 실패');
      }
    } catch (error) {
      console.log('✅ 빈 데이터 예외 처리 테스트 통과 (예외 발생)');
      results.passed++;
    }
    
    // 잘못된 액션 처리 테스트
    try {
      const invalidActionData = {
        action: 'invalidAction',
        회사명: '테스트'
      };
      
      // 잘못된 액션은 진단으로 처리되어야 함
      const invalidResult = processDiagnosisForm(invalidActionData);
      if (invalidResult) {
        console.log('✅ 잘못된 액션 처리 테스트 통과');
        results.passed++;
      } else {
        console.error('❌ 잘못된 액션 처리 실패');
        results.failed++;
        results.errors.push('잘못된 액션 처리 실패');
      }
    } catch (error) {
      console.log('✅ 잘못된 액션 예외 처리 테스트 통과 (예외 발생)');
      results.passed++;
    }
    
    // createErrorResponse 테스트
    try {
      const errorResponse = createErrorResponse('테스트 오류 메시지');
      if (errorResponse && errorResponse.getContentText) {
        const responseData = JSON.parse(errorResponse.getContentText());
        if (responseData.success === false && responseData.error === '테스트 오류 메시지') {
          console.log('✅ 오류 응답 생성 테스트 통과');
          results.passed++;
        } else {
          console.error('❌ 오류 응답 생성 실패');
          results.failed++;
          results.errors.push('오류 응답 생성 실패');
        }
      } else {
        console.error('❌ 오류 응답 객체 생성 실패');
        results.failed++;
        results.errors.push('오류 응답 객체 생성 실패');
      }
    } catch (error) {
      console.error('❌ 오류 응답 생성 중 오류:', error);
      results.failed++;
      results.errors.push('오류 응답 생성 중 오류: ' + error.toString());
    }
    
    // createSuccessResponse 테스트
    try {
      const successResponse = createSuccessResponse({ message: '테스트 성공' });
      if (successResponse && successResponse.getContentText) {
        const responseData = JSON.parse(successResponse.getContentText());
        if (responseData.success === true && responseData.message === '테스트 성공') {
          console.log('✅ 성공 응답 생성 테스트 통과');
          results.passed++;
        } else {
          console.error('❌ 성공 응답 생성 실패');
          results.failed++;
          results.errors.push('성공 응답 생성 실패');
        }
      } else {
        console.error('❌ 성공 응답 객체 생성 실패');
        results.failed++;
        results.errors.push('성공 응답 객체 생성 실패');
      }
    } catch (error) {
      console.error('❌ 성공 응답 생성 중 오류:', error);
      results.failed++;
      results.errors.push('성공 응답 생성 중 오류: ' + error.toString());
    }
    
  } catch (error) {
    console.error('❌ 오류 처리 검증 중 전체 오류:', error);
    results.failed++;
    results.errors.push('오류 처리 검증 중 전체 오류: ' + error.toString());
  }
  
  console.log(`📊 오류 처리 검증 결과: ${results.passed}개 통과, ${results.failed}개 실패`);
  return results;
}

// ================================================================================
// 🧪 6. 전체 시스템 통합 테스트
// ================================================================================

function test6_SystemIntegration() {
  console.log('🧪 6. 전체 시스템 통합 테스트 시작...');
  
  const results = {
    testName: '전체 시스템 통합',
    passed: 0,
    failed: 0,
    errors: []
  };
  
  try {
    // doGet 테스트
    try {
      const getResult = doGet({ parameter: {} });
      if (getResult && getResult.getContentText) {
        const getResponseData = JSON.parse(getResult.getContentText());
        if (getResponseData.success === true && getResponseData.status.includes('ESG 인증원')) {
          console.log('✅ doGet 테스트 통과');
          results.passed++;
        } else {
          console.error('❌ doGet 테스트 실패');
          results.failed++;
          results.errors.push('doGet 테스트 실패');
        }
      } else {
        console.error('❌ doGet 응답 생성 실패');
        results.failed++;
        results.errors.push('doGet 응답 생성 실패');
      }
    } catch (error) {
      console.error('❌ doGet 테스트 중 오류:', error);
      results.failed++;
      results.errors.push('doGet 테스트 중 오류: ' + error.toString());
    }
    
    // doPost 테스트 (진단 데이터)
    try {
      const postData = {
        postData: {
          contents: JSON.stringify({
            action: 'saveDiagnosis',
            회사명: '통합테스트기업',
            희망인증: 'ISO 9001',
            담당자명: '통합테스트담당자',
            이메일: TEST_CONFIG.TEST_EMAIL,
            인증준비도점수: 75
          })
        }
      };
      
      const postResult = doPost(postData);
      if (postResult && postResult.getContentText) {
        const postResponseData = JSON.parse(postResult.getContentText());
        if (postResponseData.success === true) {
          console.log('✅ doPost 진단 테스트 통과');
          results.passed++;
        } else {
          console.error('❌ doPost 진단 테스트 실패');
          results.failed++;
          results.errors.push('doPost 진단 테스트 실패');
        }
      } else {
        console.error('❌ doPost 응답 생성 실패');
        results.failed++;
        results.errors.push('doPost 응답 생성 실패');
      }
    } catch (error) {
      console.error('❌ doPost 테스트 중 오류:', error);
      results.failed++;
      results.errors.push('doPost 테스트 중 오류: ' + error.toString());
    }
    
    // 내장 테스트 함수 실행
    try {
      const systemTestResult = testEntireSystem();
      if (systemTestResult && systemTestResult.getContentText) {
        const systemResponseData = JSON.parse(systemTestResult.getContentText());
        if (systemResponseData.success === true) {
          console.log('✅ 내장 전체 시스템 테스트 통과');
          results.passed++;
        } else {
          console.error('❌ 내장 전체 시스템 테스트 실패');
          results.failed++;
          results.errors.push('내장 전체 시스템 테스트 실패');
        }
      } else {
        console.error('❌ 내장 전체 시스템 테스트 응답 생성 실패');
        results.failed++;
        results.errors.push('내장 전체 시스템 테스트 응답 생성 실패');
      }
    } catch (error) {
      console.error('❌ 내장 전체 시스템 테스트 중 오류:', error);
      results.failed++;
      results.errors.push('내장 전체 시스템 테스트 중 오류: ' + error.toString());
    }
    
  } catch (error) {
    console.error('❌ 전체 시스템 통합 테스트 중 전체 오류:', error);
    results.failed++;
    results.errors.push('전체 시스템 통합 테스트 중 전체 오류: ' + error.toString());
  }
  
  console.log(`📊 전체 시스템 통합 테스트 결과: ${results.passed}개 통과, ${results.failed}개 실패`);
  return results;
}

// ================================================================================
// 🎯 완전한 테스트 실행 함수
// ================================================================================

function runCompleteTest() {
  console.log('🚀 ESG 인증원 Apps Script 완전 테스트 시작!');
  console.log('🎯 목표: 무오류 시스템 구축');
  console.log('📅 테스트 시작 시간:', getCurrentKoreanTime());
  console.log('=' .repeat(80));
  
  const allResults = [];
  
  // 1. 환경변수 검증 테스트
  allResults.push(test1_EnvironmentVariables());
  console.log('');
  
  // 2. 시트 헤더 검증 테스트
  allResults.push(test2_SheetHeaders());
  console.log('');
  
  // 3. 데이터 입력 검증 테스트
  allResults.push(test3_DataInput());
  console.log('');
  
  // 4. 함수 존재 검증 테스트
  allResults.push(test4_FunctionExistence());
  console.log('');
  
  // 5. 오류 처리 검증 테스트
  allResults.push(test5_ErrorHandling());
  console.log('');
  
  // 6. 전체 시스템 통합 테스트
  allResults.push(test6_SystemIntegration());
  console.log('');
  
  // 최종 결과 집계
  const totalResults = allResults.reduce((total, result) => {
    total.passed += result.passed;
    total.failed += result.failed;
    total.errors = total.errors.concat(result.errors);
    return total;
  }, { passed: 0, failed: 0, errors: [] });
  
  console.log('=' .repeat(80));
  console.log('🎯 ESG 인증원 Apps Script 완전 테스트 최종 결과');
  console.log('=' .repeat(80));
  console.log(`✅ 총 통과: ${totalResults.passed}개`);
  console.log(`❌ 총 실패: ${totalResults.failed}개`);
  console.log(`📊 성공률: ${((totalResults.passed / (totalResults.passed + totalResults.failed)) * 100).toFixed(1)}%`);
  console.log(`📅 테스트 완료 시간: ${getCurrentKoreanTime()}`);
  
  if (totalResults.failed === 0) {
    console.log('🎉 축하합니다! 모든 테스트가 통과했습니다. 무오류 시스템 구축 완료!');
  } else {
    console.log('⚠️ 일부 테스트가 실패했습니다. 다음 오류를 확인하세요:');
    totalResults.errors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
  }
  
  console.log('=' .repeat(80));
  
  // 상세 결과 반환
  return {
    success: totalResults.failed === 0,
    totalPassed: totalResults.passed,
    totalFailed: totalResults.failed,
    successRate: ((totalResults.passed / (totalResults.passed + totalResults.failed)) * 100).toFixed(1),
    errors: totalResults.errors,
    detailedResults: allResults,
    timestamp: getCurrentKoreanTime()
  };
}

// ================================================================================
// 🔧 빠른 테스트 함수들
// ================================================================================

/**
 * 빠른 기본 테스트 (핵심 기능만)
 */
function quickTest() {
  console.log('⚡ 빠른 테스트 시작...');
  
  const results = [];
  
  try {
    // 환경변수 확인
    results.push(`SPREADSHEET_ID: ${SPREADSHEET_ID === TEST_CONFIG.EXPECTED_SPREADSHEET_ID ? '✅' : '❌'}`);
    results.push(`WEB_APP_URL: ${DEPLOYMENT_INFO.WEB_APP_URL === TEST_CONFIG.EXPECTED_WEB_APP_URL ? '✅' : '❌'}`);
    
    // 핵심 함수 확인
    results.push(`processDiagnosisForm: ${typeof processDiagnosisForm === 'function' ? '✅' : '❌'}`);
    results.push(`processConsultationForm: ${typeof processConsultationForm === 'function' ? '✅' : '❌'}`);
    results.push(`processErrorReport: ${typeof processErrorReport === 'function' ? '✅' : '❌'}`);
    
    // 응답 생성 확인
    const testResponse = createSuccessResponse({ test: true });
    results.push(`createSuccessResponse: ${testResponse ? '✅' : '❌'}`);
    
    console.log('⚡ 빠른 테스트 결과:');
    results.forEach(result => console.log(`   ${result}`));
    
    const passedCount = results.filter(r => r.includes('✅')).length;
    const totalCount = results.length;
    
    console.log(`📊 빠른 테스트 성공률: ${((passedCount / totalCount) * 100).toFixed(1)}% (${passedCount}/${totalCount})`);
    
    return passedCount === totalCount;
    
  } catch (error) {
    console.error('❌ 빠른 테스트 중 오류:', error);
    return false;
  }
}

/**
 * 개별 기능 테스트
 */
function testIndividualFunction(functionName) {
  console.log(`🧪 개별 함수 테스트: ${functionName}`);
  
  try {
    switch (functionName) {
      case 'testDiagnosisSubmission':
        return testDiagnosisSubmission();
      case 'testConsultationSubmission':
        return testConsultationSubmission();
      case 'testErrorReport':
        return testErrorReport();
      case 'testEntireSystem':
        return testEntireSystem();
      default:
        console.error('❌ 알 수 없는 함수명:', functionName);
        return false;
    }
  } catch (error) {
    console.error(`❌ ${functionName} 테스트 중 오류:`, error);
    return false;
  }
}

// ================================================================================
// 📋 테스트 실행 가이드
// ================================================================================

/**
 * 테스트 실행 가이드
 */
function showTestGuide() {
  console.log('📋 ESG 인증원 Apps Script 테스트 가이드');
  console.log('=' .repeat(50));
  console.log('');
  console.log('🚀 전체 테스트 실행:');
  console.log('   runCompleteTest() - 모든 테스트 실행 (권장)');
  console.log('');
  console.log('⚡ 빠른 테스트 실행:');
  console.log('   quickTest() - 핵심 기능만 빠르게 테스트');
  console.log('');
  console.log('🧪 개별 테스트 실행:');
  console.log('   test1_EnvironmentVariables() - 환경변수 검증');
  console.log('   test2_SheetHeaders() - 시트 헤더 검증');
  console.log('   test3_DataInput() - 데이터 입력 검증');
  console.log('   test4_FunctionExistence() - 함수 존재 검증');
  console.log('   test5_ErrorHandling() - 오류 처리 검증');
  console.log('   test6_SystemIntegration() - 시스템 통합 테스트');
  console.log('');
  console.log('🎯 내장 테스트 실행:');
  console.log('   testDiagnosisSubmission() - 진단 신청 테스트');
  console.log('   testConsultationSubmission() - 상담 신청 테스트');
  console.log('   testErrorReport() - 오류 신고 테스트');
  console.log('   testEntireSystem() - 전체 시스템 테스트');
  console.log('');
  console.log('📊 개별 함수 테스트:');
  console.log('   testIndividualFunction("functionName") - 특정 함수 테스트');
  console.log('');
  console.log('🎯 무오류 목표 달성을 위해 runCompleteTest()를 실행하세요!');
  console.log('=' .repeat(50));
}

// 테스트 가이드 표시
showTestGuide(); 
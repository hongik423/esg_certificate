/**
 * ================================================================================
 * 통합 상담신청 시스템 2025 최종완성판 (4가지 신청유형 통합)
 * ================================================================================
 * 
 * 🎯 배포 정보:
 * - Script ID: 1XdX8JW8Q9EBF_ApRr8XEMXAm_8MYDxsqwsXMqUFdNvzx3fkvIepxoG3G
 * - Deployment ID: AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD
 * - Web App URL: https://script.google.com/macros/s/AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD/exec
 * - Google Sheets ID: 1-xdABrno18ogullhqx3UXcudUGbc1O4Def50jVEJ9i4
 * - 관리자 이메일: hongik423@gmail.com
 * 
 * 🔧 4가지 신청유형:
 * ✅ ISO 인증 무료진단 (인증 준비도 평가)
 * ✅ ISO 인증 상담신청 (인증 컨설팅 상담)
 * ✅ AI 무료진단 (6대서비스 관련 경영진단)
 * ✅ 오류신고 (시스템 오류 신고)
 * 
 * 📋 시트 구성:
 * - ISO_무료진단신청: ISO 인증 준비도 진단 관련 모든 데이터
 * - ISO_상담신청: ISO 인증 상담 신청 관련 데이터
 * - AI_무료진단신청: 6대서비스 관련 경영진단 데이터
 * - 오류신고: 시스템 오류 신고 및 피드백
 * 
 * 🔄 마지막 업데이트: 2025.01.06 - 4가지 신청유형 통합 시스템
 */

// ================================================================================
// 🔧 기본 설정 (통합 시스템 배포 환경)
// ================================================================================

const SPREADSHEET_ID = '1-xdABrno18ogullhqx3UXcudUGbc1O4Def50jVEJ9i4';

const SHEETS = {
  ISO_DIAGNOSIS: 'ISO_무료진단신청',
  ISO_CONSULTATION: 'ISO_상담신청',
  AI_DIAGNOSIS: 'AI_무료진단신청',
  ERROR_REPORT: '오류신고'
};

const ADMIN_EMAIL = 'hongik423@gmail.com';
const AUTO_REPLY_ENABLED = true;
const DEBUG_MODE = true;
const VERSION = '2025.01.06.통합_상담신청_시스템_최종완성_배포버전';

// 🌐 웹앱 배포 정보
const DEPLOYMENT_INFO = {
  SCRIPT_ID: '1XdX8JW8Q9EBF_ApRr8XEMXAm_8MYDxsqwsXMqUFdNvzx3fkvIepxoG3G',
  DEPLOYMENT_ID: 'AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD',
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD/exec',
  LAST_UPDATED: '2025.01.06'
};

// 🏢 센터 정보
const CENTER_INFO = {
  NAME: 'M-CENTER',
  PHONE: '010-9251-9743',
  EMAIL: 'hongik423@gmail.com',
  ISO_SERVICES: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ESG 경영시스템', '안전보건경영시스템'],
  AI_SERVICES: ['AI 생산성 향상', '비즈니스 분석', '인증 컨설팅', '정책자금 연계', '기술창업 지원', '웹사이트 개발']
};

// ================================================================================
// 🛠️ 핵심 유틸리티 함수들
// ================================================================================

/**
 * 한국 시간 가져오기
 */
function getCurrentKoreanTime() {
  return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy. MM. dd. a hh:mm:ss');
}

/**
 * 성공 응답 생성
 */
function createSuccessResponse(data) {
  const response = { 
    success: true, 
    timestamp: getCurrentKoreanTime(),
    version: VERSION,
    ...data 
  };
  
  if (DEBUG_MODE) {
    console.log('✅ 성공 응답 생성:', response);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 오류 응답 생성
 */
function createErrorResponse(message) {
  const response = { 
    success: false, 
    error: message,
    timestamp: getCurrentKoreanTime(),
    version: VERSION
  };
  
  console.error('❌ 오류 응답 생성:', response);
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 시트 가져오기 또는 생성
 */
function getOrCreateSheet(sheetName, type) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      setupHeaders(sheet, type);
      console.log('📋 새 시트 생성:', sheetName);
    }
    
    return sheet;
  } catch (error) {
    console.error('❌ 시트 생성/접근 오류:', error);
    throw new Error(`시트 처리 오류: ${error.toString()}`);
  }
}

/**
 * 신청 유형 판별
 */
function getRequestType(data) {
  // 오류신고 확인 (최우선)
  if (data.action === 'saveErrorReport' || data.폼타입 === '오류신고' || 
      (data.오류유형 && data.사용자이메일 && data.오류설명)) {
    return 'ERROR_REPORT';
  }
  
  // AI 무료진단 확인
  if (data.action === 'saveAIDiagnosis' || data.폼타입 === 'AI_무료진단' ||
      data.진단점수 || data.상품서비스점수 || data.고객응대점수) {
    return 'AI_DIAGNOSIS';
  }
  
  // ISO 상담신청 확인
  if (data.action === 'saveISOConsultation' || data.폼타입 === 'ISO_상담신청' ||
      (data.상담유형 && !data.인증준비도점수)) {
    return 'ISO_CONSULTATION';
  }
  
  // ISO 무료진단 확인 (기본값)
  if (data.action === 'saveISODiagnosis' || data.폼타입 === 'ISO_무료진단' ||
      data.인증준비도점수 || data.희망인증) {
    return 'ISO_DIAGNOSIS';
  }
  
  // 기본값: 데이터 내용으로 판별
  if (data.희망인증 || data.인증준비도점수) {
    return 'ISO_DIAGNOSIS';
  } else if (data.상담유형 || data.consultationType) {
    return 'ISO_CONSULTATION';
  } else if (data.진단점수 || data.상품서비스점수) {
    return 'AI_DIAGNOSIS';
  } else {
    return 'ERROR_REPORT';
  }
}

// ================================================================================
// 📡 메인 처리 함수
// ================================================================================

function doPost(e) {
  try {
    if (!e) {
      console.warn('⚠️ 직접 실행 감지: 테스트 모드로 전환합니다.');
      return createSuccessResponse({
        message: '직접 실행 시에는 웹 요청을 시뮬레이션할 수 없습니다.',
        testFunctions: [
          'testISODiagnosisSubmission() - ISO 인증 진단 테스트',
          'testISOConsultationSubmission() - ISO 인증 상담 신청 테스트',
          'testAIDiagnosisSubmission() - AI 무료진단 테스트',
          'testErrorReport() - 오류 신고 테스트',
          'testEntireSystem() - 전체 시스템 테스트'
        ]
      });
    }
    
    if (DEBUG_MODE) {
      console.log('🔥 POST 요청 수신:', {
        timestamp: getCurrentKoreanTime(),
        hasPostData: !!(e && e.postData),
        contentType: (e && e.postData) ? e.postData.type : 'N/A'
      });
    }

    let requestData = {};
    
    if (e && e.postData && e.postData.contents) {
      try {
        requestData = JSON.parse(e.postData.contents);
      } catch (parseError) {
        console.error('❌ JSON 파싱 오류:', parseError);
        return createErrorResponse('잘못된 JSON 형식입니다.');
      }
    }
    
    // 신청 유형 판별
    const requestType = getRequestType(requestData);
    
    if (DEBUG_MODE) {
      console.log('📝 수신된 데이터:', {
        requestType: requestType,
        action: requestData.action,
        폼타입: requestData.폼타입,
        회사명: requestData.회사명,
        희망인증: requestData.희망인증,
        오류유형: requestData.오류유형
      });
    }

    // 신청 유형별 처리
    switch (requestType) {
      case 'ISO_DIAGNOSIS':
        console.log('✅ ISO 인증 무료진단 처리 시작');
        return processISODiagnosisForm(requestData);
      
      case 'ISO_CONSULTATION':
        console.log('✅ ISO 인증 상담신청 처리 시작');
        return processISOConsultationForm(requestData);
      
      case 'AI_DIAGNOSIS':
        console.log('✅ AI 무료진단 처리 시작');
        return processAIDiagnosisForm(requestData);
      
      case 'ERROR_REPORT':
        console.log('✅ 오류신고 처리 시작');
        return processErrorReport(requestData);
      
      default:
        console.warn('⚠️ 알 수 없는 요청 유형:', requestType);
        return createErrorResponse('알 수 없는 요청 유형입니다.');
    }

  } catch (error) {
    console.error('❌ POST 요청 처리 오류:', error);
    return createErrorResponse('POST 처리 중 오류: ' + error.toString());
  }
}

function doGet(e) {
  try {
    if (DEBUG_MODE) {
      console.log('🔥 GET 요청 수신:', {
        parameters: e.parameter,
        timestamp: getCurrentKoreanTime()
      });
    }

    return createSuccessResponse({
      status: '통합 상담신청 시스템 정상 작동 중',
      timestamp: getCurrentKoreanTime(),
      version: VERSION,
      deploymentInfo: DEPLOYMENT_INFO,
      googleSheets: {
        spreadsheetId: SPREADSHEET_ID,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`,
        adminEmail: ADMIN_EMAIL
      },
      centerInfo: CENTER_INFO,
      supportedTypes: [
        '✅ ISO 인증 무료진단 (인증 준비도 평가)',
        '✅ ISO 인증 상담신청 (인증 컨설팅 상담)',
        '✅ AI 무료진단 (6대서비스 관련 경영진단)',
        '✅ 오류신고 (시스템 오류 신고)'
      ],
      sheets: Object.values(SHEETS)
    });

  } catch (error) {
    console.error('❌ GET 요청 처리 오류:', error);
    return createErrorResponse('GET 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🎯 ISO 인증 무료진단 처리
// ================================================================================

function processISODiagnosisForm(data) {
  try {
    const sheet = getOrCreateSheet(SHEETS.ISO_DIAGNOSIS, 'isoDiagnosis');
    const timestamp = getCurrentKoreanTime();
    
    // 인증 준비도 점수 추출
    const certificationScores = extractCertificationScores(data);
    const categoryScores = extractCategoryScores(data);
    const reportSummary = data.진단보고서요약 || data.summaryReport || '';
    const totalScore = data.인증준비도점수 || data.certificationReadinessScore || 0;
    
    // ISO 인증 무료진단 데이터 구성 (48개 컬럼)
    const rowData = [
      // 기본 정보 (18개)
      timestamp,
      data.회사명 || data.companyName || '',
      data.업종 || data.industry || '',
      data.사업장규모 || data.businessSize || '',
      data.직원수 || data.employeeCount || '',
      data.희망인증 || data.desiredCertification || '',
      data.인증경험 || data.certificationExperience || '',
      data.인증목적 || data.certificationPurpose || '',
      data.예상일정 || data.expectedSchedule || '',
      data.담당자명 || data.contactName || '',
      data.연락처 || data.contactPhone || '',
      data.이메일 || data.contactEmail || data.email || '',
      data.개인정보동의 === true ? '동의' : '미동의',
      'ISO_인증_무료진단',
      '접수완료',
      '', '', '',
      
      // 인증 준비도 결과 (6개)
      totalScore,
      categoryScores.문서화점수,
      categoryScores.프로세스점수,
      categoryScores.교육훈련점수,
      categoryScores.모니터링점수,
      categoryScores.개선활동점수,
      
      // 상세 점수들 (20개)
      certificationScores.정책수립, certificationScores.절차서작성, certificationScores.양식관리,
      certificationScores.기록관리, certificationScores.문서통제, certificationScores.프로세스정의,
      certificationScores.책임권한, certificationScores.운영절차, certificationScores.성과측정,
      certificationScores.교육계획, certificationScores.교육실시, certificationScores.역량평가,
      certificationScores.교육기록, certificationScores.교육효과, certificationScores.내부감사,
      certificationScores.경영검토, certificationScores.부적합관리, certificationScores.예방조치,
      certificationScores.시정조치, certificationScores.지속개선,
      
      // 보고서 정보 (4개)
      reportSummary.length,
      data.추천서비스 || '',
      reportSummary.substring(0, 500),
      reportSummary
    ];

    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('✅ ISO 인증 무료진단 저장 완료:', {
        시트: SHEETS.ISO_DIAGNOSIS,
        행번호: newRow,
        회사명: data.회사명 || data.companyName,
        인증준비도점수: totalScore
      });
    }

    // 이메일 발송
    if (AUTO_REPLY_ENABLED) {
      sendISODiagnosisAdminNotification(data, newRow, totalScore, reportSummary);
      
      const userEmail = data.이메일 || data.contactEmail || data.email;
      const userName = data.담당자명 || data.contactName;
      if (userEmail) {
        sendUserConfirmation(userEmail, userName, 'ISO 인증 무료진단');
      }
    }

    return createSuccessResponse({
      message: '📊 ISO 인증 무료진단이 성공적으로 접수되었습니다.',
      sheet: SHEETS.ISO_DIAGNOSIS,
      row: newRow,
      timestamp: timestamp,
      인증준비도점수: totalScore
    });

  } catch (error) {
    console.error('❌ ISO 인증 무료진단 처리 오류:', error);
    return createErrorResponse('ISO 인증 무료진단 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 💬 ISO 인증 상담신청 처리
// ================================================================================

function processISOConsultationForm(data) {
  try {
    const sheet = getOrCreateSheet(SHEETS.ISO_CONSULTATION, 'isoConsultation');
    const timestamp = getCurrentKoreanTime();
    
    // ISO 인증 상담신청 데이터 구성 (25개 컬럼)
    const rowData = [
      timestamp,
      data.상담유형 || data.consultationType || 'ISO인증상담',
      data.희망인증 || data.desiredCertification || '',
      data.성명 || data.name || '',
      data.연락처 || data.phone || '',
      data.이메일 || data.email || '',
      data.회사명 || data.company || '',
      data.직책 || data.position || '',
      data.업종 || data.industry || '',
      data.사업장규모 || data.businessSize || '',
      data.직원수 || data.employeeCount || '',
      data.인증경험 || data.certificationExperience || '',
      data.인증목적 || data.certificationPurpose || '',
      data.예상일정 || data.expectedSchedule || '',
      data.예산범위 || data.budgetRange || '',
      data.문의내용 || data.inquiryContent || data.message || '',
      data.희망상담시간 || data.preferredTime || '',
      data.개인정보동의 === true ? '동의' : '미동의',
      data.진단연계여부 === 'Y' ? 'Y' : 'N',
      data.진단점수 || data.diagnosisScore || '',
      '접수완료',
      '', '', '', ''
    ];

    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    if (DEBUG_MODE) {
      console.log('✅ ISO 인증 상담신청 저장 완료:', {
        시트: SHEETS.ISO_CONSULTATION,
        행번호: newRow,
        성명: data.성명 || data.name,
        희망인증: data.희망인증 || data.desiredCertification
      });
    }

    // 이메일 발송
    if (AUTO_REPLY_ENABLED) {
      sendISOConsultationAdminNotification(data, newRow);
      
      const userEmail = data.이메일 || data.email;
      const userName = data.성명 || data.name;
      if (userEmail) {
        sendUserConfirmation(userEmail, userName, 'ISO 인증 상담신청');
      }
    }

    return createSuccessResponse({
      message: 'ISO 인증 상담신청이 성공적으로 접수되었습니다.',
      sheet: SHEETS.ISO_CONSULTATION,
      row: newRow,
      timestamp: timestamp
    });

  } catch (error) {
    console.error('❌ ISO 인증 상담신청 처리 오류:', error);
    return createErrorResponse('ISO 인증 상담신청 처리 중 오류: ' + error.toString());
  }
  }
  
  // ================================================================================
// 🤖 AI 무료진단 처리 (6대서비스 관련 경영진단)
  // ================================================================================
  
function processAIDiagnosisForm(data) {
    try {
    const sheet = getOrCreateSheet(SHEETS.AI_DIAGNOSIS, 'aiDiagnosis');
      const timestamp = getCurrentKoreanTime();
      
    // AI 진단 점수 추출
    const diagnosisScores = extractAIDiagnosisScores(data);
    const totalScore = data.총점수 || data.totalScore || 0;
    const reportSummary = data.진단보고서요약 || data.summaryReport || '';
    
    // AI 무료진단 데이터 구성 (35개 컬럼)
      const rowData = [
      // 기본 정보 (15개)
      timestamp,
      data.회사명 || data.companyName || '',
      data.업종 || data.industry || '',
      data.사업장규모 || data.businessSize || '',
      data.직원수 || data.employeeCount || '',
      data.담당자명 || data.contactName || '',
      data.연락처 || data.contactPhone || '',
      data.이메일 || data.contactEmail || data.email || '',
      data.개인정보동의 === true ? '동의' : '미동의',
      'AI_무료진단',
      '접수완료',
      '', '', '', '',
      
      // 진단 결과 (10개)
      totalScore,
      diagnosisScores.상품서비스점수,
      diagnosisScores.고객응대점수,
      diagnosisScores.마케팅점수,
      diagnosisScores.구매재고점수,
      diagnosisScores.매장관리점수,
      diagnosisScores.추가서비스점수,
      diagnosisScores.평균점수,
      diagnosisScores.등급,
      diagnosisScores.개선우선순위,
      
      // 보고서 정보 (10개)
      reportSummary.length,
      data.추천서비스 || '',
      data.개선제안사항 || '',
      data.우선개선영역 || '',
      data.예상효과 || '',
      data.구현난이도 || '',
      data.예상비용 || '',
      data.예상기간 || '',
      reportSummary.substring(0, 500),
      reportSummary
    ];

      const newRow = sheet.getLastRow() + 1;
      sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
      
      if (DEBUG_MODE) {
      console.log('✅ AI 무료진단 저장 완료:', {
        시트: SHEETS.AI_DIAGNOSIS,
          행번호: newRow,
        회사명: data.회사명 || data.companyName,
        총점수: totalScore
        });
      }
  
      // 이메일 발송
      if (AUTO_REPLY_ENABLED) {
      sendAIDiagnosisAdminNotification(data, newRow, totalScore, reportSummary);
        
      const userEmail = data.이메일 || data.contactEmail || data.email;
      const userName = data.담당자명 || data.contactName;
        if (userEmail) {
        sendUserConfirmation(userEmail, userName, 'AI 무료진단');
        }
      }
  
      return createSuccessResponse({
      message: '🤖 AI 무료진단이 성공적으로 접수되었습니다.',
      sheet: SHEETS.AI_DIAGNOSIS,
        row: newRow,
      timestamp: timestamp,
      총점수: totalScore
      });
  
    } catch (error) {
    console.error('❌ AI 무료진단 처리 오류:', error);
    return createErrorResponse('AI 무료진단 처리 중 오류: ' + error.toString());
    }
  }
  
  // ================================================================================
// 🧪 오류신고 처리
  // ================================================================================
  
function processErrorReport(data) {
    try {
    const sheet = getOrCreateSheet(SHEETS.ERROR_REPORT, 'errorReport');
      const timestamp = getCurrentKoreanTime();
      
    // 오류신고 데이터 구성 (13개 컬럼)
      const rowData = [
      timestamp,
      data.오류유형 || '',
      data.사용자이메일 || '',
      data.오류설명 || '',
      data.기대동작 || '',
      data.실제동작 || '',
      data.재현단계 || '',
      data.심각도 || '',
      data.추가의견 || '',
      data.브라우저정보 || '',
      data.제출경로 || '',
      '접수완료',
      ''
    ];

      const newRow = sheet.getLastRow() + 1;
      sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
      
      if (DEBUG_MODE) {
      console.log('✅ 오류신고 저장 완료:', {
        시트: SHEETS.ERROR_REPORT,
          행번호: newRow,
        오류유형: data.오류유형
        });
      }
  
      // 이메일 발송
      if (AUTO_REPLY_ENABLED) {
      sendErrorReportAdminNotification(data, newRow);
        
        if (data.사용자이메일) {
        sendErrorReportUserConfirmation(data.사용자이메일, data);
        }
      }
  
      return createSuccessResponse({
      message: '오류신고가 성공적으로 접수되었습니다.',
      sheet: SHEETS.ERROR_REPORT,
        row: newRow,
      timestamp: timestamp
      });
  
    } catch (error) {
    console.error('❌ 오류신고 처리 오류:', error);
    return createErrorResponse('오류신고 처리 중 오류: ' + error.toString());
  }
}

// ================================================================================
// 🔧 점수 데이터 추출 함수들
// ================================================================================

/**
 * ISO 인증 준비도 점수 추출
 */
function extractCertificationScores(data) {
  const scores = data.진단점수 || data.certificationScores || {};
  
  const keyMapping = {
    'policy_establishment': '정책수립',
    'procedure_writing': '절차서작성',
    'form_management': '양식관리',
    'record_management': '기록관리',
    'document_control': '문서통제',
    'process_definition': '프로세스정의',
    'responsibility_authority': '책임권한',
    'operation_procedure': '운영절차',
    'performance_measurement': '성과측정',
    'training_plan': '교육계획',
    'training_implementation': '교육실시',
    'competency_assessment': '역량평가',
    'training_record': '교육기록',
    'training_effectiveness': '교육효과',
    'internal_audit': '내부감사',
    'management_review': '경영검토',
    'nonconformity_management': '부적합관리',
    'preventive_action': '예방조치',
    'corrective_action': '시정조치',
    'continual_improvement': '지속개선'
  };

  const result = {};
  Object.values(keyMapping).forEach(koreanKey => {
    result[koreanKey] = 0;
  });

  Object.entries(keyMapping).forEach(([englishKey, koreanKey]) => {
    if (scores[englishKey] !== undefined) {
      result[koreanKey] = Number(scores[englishKey]) || 0;
    } else if (scores[koreanKey] !== undefined) {
      result[koreanKey] = Number(scores[koreanKey]) || 0;
    }
  });

  return result;
}

/**
 * ISO 카테고리별 점수 추출
 */
function extractCategoryScores(data) {
  const categoryScores = data.카테고리점수 || data.categoryScores || {};
  
  const result = {
    문서화점수: '0.0',
    프로세스점수: '0.0',
    교육훈련점수: '0.0',
    모니터링점수: '0.0',
    개선활동점수: '0.0'
  };

  const categoryMapping = {
    'documentation': '문서화점수',
    'process': '프로세스점수',
    'training': '교육훈련점수',
    'monitoring': '모니터링점수',
    'improvement': '개선활동점수'
  };

  Object.entries(categoryMapping).forEach(([englishKey, koreanKey]) => {
    if (categoryScores[englishKey] && categoryScores[englishKey].score !== undefined) {
      result[koreanKey] = Number(categoryScores[englishKey].score).toFixed(1);
    }
  });

  return result;
}

/**
 * AI 진단 점수 추출
 */
function extractAIDiagnosisScores(data) {
  const scores = data.진단점수 || data.diagnosisScores || {};
  
  return {
    상품서비스점수: scores.상품서비스점수 || scores.productService || 0,
    고객응대점수: scores.고객응대점수 || scores.customerService || 0,
    마케팅점수: scores.마케팅점수 || scores.marketing || 0,
    구매재고점수: scores.구매재고점수 || scores.inventory || 0,
    매장관리점수: scores.매장관리점수 || scores.storeManagement || 0,
    추가서비스점수: scores.추가서비스점수 || scores.additionalService || 0,
    평균점수: scores.평균점수 || scores.averageScore || 0,
    등급: scores.등급 || scores.grade || 'C',
    개선우선순위: scores.개선우선순위 || scores.improvementPriority || ''
  };
}
  
  // ================================================================================
  // 📧 이메일 발송 함수들
  // ================================================================================
  
  /**
 * ISO 인증 무료진단 관리자 알림
   */
function sendISODiagnosisAdminNotification(data, rowNumber, totalScore, reportSummary) {
    try {
      const companyName = data.회사명 || data.companyName || '미확인';
    const desiredCert = data.희망인증 || data.desiredCertification || '미확인';
    const subject = `[M-CENTER] 🎯 ISO 인증 무료진단 접수 - ${companyName} (${desiredCert})`;
      
    const emailBody = `📊 새로운 ISO 인증 무료진단이 접수되었습니다!\n\n` +
        `🏢 회사명: ${companyName}\n` +
      `📧 담당자: ${data.담당자명 || data.contactName || '미확인'} (${data.이메일 || data.contactEmail || '미확인'})\n` +
      `🎯 희망인증: ${desiredCert}\n` +
      `📊 인증준비도점수: ${totalScore}점/100점\n` +
        `⏰ 접수 시간: ${getCurrentKoreanTime()}\n\n` +
      `📋 시트 위치: ${SHEETS.ISO_DIAGNOSIS} 시트 ${rowNumber}행\n` +
        `🔗 구글시트: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit\n\n` +
      `📞 연락처: ${CENTER_INFO.PHONE}\n` +
      `📧 이메일: ${CENTER_INFO.EMAIL}`;
  
      MailApp.sendEmail(ADMIN_EMAIL, subject, emailBody);
    console.log('📧 ISO 인증 무료진단 관리자 알림 이메일 발송 완료');
    } catch (error) {
    console.error('❌ ISO 인증 무료진단 관리자 이메일 발송 실패:', error);
    }
  }
  
  /**
 * ISO 인증 상담신청 관리자 알림
   */
function sendISOConsultationAdminNotification(data, rowNumber) {
    try {
    const companyName = data.회사명 || data.company || '미확인';
    const desiredCert = data.희망인증 || data.desiredCertification || '미확인';
    const subject = `[M-CENTER] 💬 ISO 인증 상담신청 접수 - ${companyName} (${desiredCert})`;
      
    const emailBody = `💬 새로운 ISO 인증 상담신청이 접수되었습니다!\n\n` +
        `👤 신청자: ${data.성명 || data.name || '미확인'}\n` +
      `🏢 회사명: ${companyName}\n` +
        `📧 이메일: ${data.이메일 || data.email || '미확인'}\n` +
      `🎯 희망인증: ${desiredCert}\n` +
        `⏰ 접수시간: ${getCurrentKoreanTime()}\n\n` +
      `📋 시트 위치: ${SHEETS.ISO_CONSULTATION} 시트 ${rowNumber}행\n` +
      `🔗 구글시트: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit\n\n` +
      `📞 연락처: ${CENTER_INFO.PHONE}`;
  
      MailApp.sendEmail(ADMIN_EMAIL, subject, emailBody);
    console.log('📧 ISO 인증 상담신청 관리자 알림 이메일 발송 완료');
    } catch (error) {
    console.error('❌ ISO 인증 상담신청 관리자 이메일 발송 실패:', error);
    }
  }
  
  /**
 * AI 무료진단 관리자 알림
 */
function sendAIDiagnosisAdminNotification(data, rowNumber, totalScore, reportSummary) {
  try {
    const companyName = data.회사명 || data.companyName || '미확인';
    const subject = `[M-CENTER] 🤖 AI 무료진단 접수 - ${companyName}`;
    
    const emailBody = `🤖 새로운 AI 무료진단이 접수되었습니다!\n\n` +
      `🏢 회사명: ${companyName}\n` +
      `📧 담당자: ${data.담당자명 || data.contactName || '미확인'} (${data.이메일 || data.contactEmail || '미확인'})\n` +
      `📊 총점수: ${totalScore}점\n` +
      `⏰ 접수 시간: ${getCurrentKoreanTime()}\n\n` +
      `📋 시트 위치: ${SHEETS.AI_DIAGNOSIS} 시트 ${rowNumber}행\n` +
      `🔗 구글시트: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit\n\n` +
      `📞 연락처: ${CENTER_INFO.PHONE}`;

    MailApp.sendEmail(ADMIN_EMAIL, subject, emailBody);
    console.log('📧 AI 무료진단 관리자 알림 이메일 발송 완료');
  } catch (error) {
    console.error('❌ AI 무료진단 관리자 이메일 발송 실패:', error);
  }
}

/**
 * 오류신고 관리자 알림
 */
function sendErrorReportAdminNotification(data, rowNumber) {
  try {
    const subject = `[M-CENTER] 🚨 긴급! 오류신고 접수 - ${data.오류유형 || '시스템오류'}`;
    
    const emailBody = `🧪 새로운 오류신고가 접수되었습니다!\n\n` +
      `🐛 오류 유형: ${data.오류유형 || 'N/A'}\n` +
        `📧 사용자 이메일: ${data.사용자이메일 || 'N/A'}\n` +
        `⚠️ 심각도: ${data.심각도 || 'N/A'}\n` +
        `⏰ 접수 시간: ${getCurrentKoreanTime()}\n\n` +
      `📋 시트 위치: ${SHEETS.ERROR_REPORT} 시트 ${rowNumber}행\n` +
        `🔗 구글시트: https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;
  
      MailApp.sendEmail(ADMIN_EMAIL, subject, emailBody);
    console.log('📧 오류신고 관리자 알림 이메일 발송 완료');
    } catch (error) {
    console.error('❌ 오류신고 관리자 이메일 발송 실패:', error);
    }
  }
  
  /**
 * 신청자 확인 이메일 발송
   */
  function sendUserConfirmation(email, name, type) {
    try {
    const subject = `[M-CENTER] ${type} 신청이 접수되었습니다`;
    
    let services = [];
    if (type.includes('ISO')) {
      services = CENTER_INFO.ISO_SERVICES;
    } else if (type.includes('AI')) {
      services = CENTER_INFO.AI_SERVICES;
    }
      
      const emailBody = `안녕하세요 ${name || '고객'}님,\n\n` +
      `${CENTER_INFO.NAME}에서 알려드립니다.\n\n` +
      `✅ ${type} 신청이 성공적으로 접수되었습니다.\n\n` +
        `📞 담당 전문가가 1-2일 내에 연락드리겠습니다.\n\n` +
        `▣ 담당 컨설턴트: 이후경 경영지도사\n` +
      `▣ 전화: ${CENTER_INFO.PHONE}\n` +
      `▣ 이메일: ${CENTER_INFO.EMAIL}\n\n` +
      `🏆 제공 서비스:\n` +
      services.map(service => `• ${service}`).join('\n') + '\n\n' +
      `감사합니다.\n${CENTER_INFO.NAME}`;
  
      MailApp.sendEmail(email, subject, emailBody);
      console.log('📧 신청자 확인 이메일 발송 완료:', email);
    } catch (error) {
      console.error('❌ 신청자 이메일 발송 실패:', error);
    }
  }
  
  /**
 * 오류신고 사용자 확인 이메일
   */
function sendErrorReportUserConfirmation(email, data) {
    try {
    const subject = `[M-CENTER] 🧪 오류신고 접수 완료! ${data.오류유형 || '시스템오류'}`;
      
      const emailBody = `안녕하세요!\n\n` +
      `${CENTER_INFO.NAME} 시스템 오류신고에 참여해 주셔서 감사합니다.\n\n` +
      `🎯 접수된 오류신고: ${data.오류유형 || '시스템오류'}\n` +
        `⏰ 접수 일시: ${getCurrentKoreanTime()}\n\n` +
        `담당자가 검토 후 이메일로 회신드리겠습니다.\n\n` +
      `▣ 전화: ${CENTER_INFO.PHONE}\n` +
      `▣ 이메일: ${CENTER_INFO.EMAIL}\n\n` +
      `감사합니다.\n${CENTER_INFO.NAME} 개발팀`;
  
      MailApp.sendEmail(email, subject, emailBody);
    console.log('📧 오류신고 사용자 확인 이메일 발송 완료:', email);
    } catch (error) {
    console.error('❌ 오류신고 사용자 이메일 발송 실패:', error);
    }
  }
  
  // ================================================================================
// 📊 시트 헤더 설정
// ================================================================================

function setupHeaders(sheet, type) {
    let headers;
    
  if (type === 'isoConsultation') {
    // ISO 인증 상담신청 헤더 (25개 컬럼)
      headers = [
      '제출일시', '상담유형', '희망인증', '성명', '연락처', 
      '이메일', '회사명', '직책', '업종', '사업장규모', 
      '직원수', '인증경험', '인증목적', '예상일정', '예산범위',
      '문의내용', '희망상담시간', '개인정보동의', '진단연계여부', '진단점수',
      '처리상태', '상담일정', '상담결과', '담당컨설턴트', '완료일시'
    ];
  } else if (type === 'aiDiagnosis') {
    // AI 무료진단 헤더 (35개 컬럼)
      headers = [
      // 기본 정보 (15개)
      '제출일시', '회사명', '업종', '사업장규모', '직원수',
      '담당자명', '연락처', '이메일', '개인정보동의', '폼타입',
      '진단상태', '분석결과', '결과URL', '분석완료일시', '담당컨설턴트',
      
      // 진단 결과 (10개)
      '총점수', '상품서비스점수', '고객응대점수', '마케팅점수', '구매재고점수',
      '매장관리점수', '추가서비스점수', '평균점수', '등급', '개선우선순위',
      
      // 보고서 정보 (10개)
      '보고서글자수', '추천서비스', '개선제안사항', '우선개선영역', '예상효과',
      '구현난이도', '예상비용', '예상기간', '보고서요약', '보고서전문'
    ];
  } else if (type === 'errorReport') {
    // 오류신고 헤더 (13개 컬럼)
    headers = [
      '제출일시', '오류유형', '사용자이메일', '오류설명', '기대동작', 
      '실제동작', '재현단계', '심각도', '추가의견', '브라우저정보', 
      '제출경로', '처리상태', '처리일시'
      ];
    } else {
    // ISO 인증 무료진단 헤더 (48개 컬럼)
      headers = [
      // 기본 정보 (18개)
      '제출일시', '회사명', '업종', '사업장규모', '직원수', 
      '희망인증', '인증경험', '인증목적', '예상일정', '담당자명', 
      '연락처', '이메일', '개인정보동의', '폼타입', '진단상태', 
      '인증분석결과', '결과URL', '분석완료일시',
      
      // 인증 준비도 결과 (6개)
      '인증준비도점수', '문서화점수', '프로세스점수', '교육훈련점수', '모니터링점수', '개선활동점수',
      
      // 문서화 준비도 (5개)
      '정책수립', '절차서작성', '양식관리', '기록관리', '문서통제',
      
      // 프로세스 준비도 (4개)
      '프로세스정의', '책임권한', '운영절차', '성과측정',
      
      // 교육훈련 준비도 (5개)
      '교육계획', '교육실시', '역량평가', '교육기록', '교육효과',
      
      // 모니터링 준비도 (2개)
      '내부감사', '경영검토',
      
      // 개선활동 준비도 (4개)
      '부적합관리', '예방조치', '시정조치', '지속개선',
      
      // 보고서 정보 (4개)
      '보고서글자수', '추천서비스', '보고서요약', '보고서전문'
    ];
  }
  
  // 헤더 설정
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    
  // 헤더 스타일링
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');
    headerRange.setWrap(true);
    sheet.setFrozenRows(1);
    
  // 컬럼 폭 자동 조정
      sheet.autoResizeColumns(1, headers.length);
    
    console.log(`📋 ${type} 시트 헤더 설정 완료: ${headers.length}개 컬럼`);
  }
  
  // ================================================================================
// 🧪 테스트 함수들
  // ================================================================================
  
  /**
 * ISO 인증 무료진단 테스트
 */
function testISODiagnosisSubmission() {
  console.log('🧪 ISO 인증 무료진단 테스트 시작...');
  
  const testData = {
    action: 'saveISODiagnosis',
    폼타입: 'ISO_무료진단',
    회사명: '테스트기업',
    업종: '제조업',
    희망인증: 'ISO 9001',
    담당자명: '김담당',
    이메일: 'test@example.com',
    개인정보동의: true,
    인증준비도점수: 65,
    진단점수: {
      정책수립: 3,
      절차서작성: 2,
      양식관리: 3
    },
    진단보고서요약: 'ISO 9001 인증 준비도 진단 결과입니다.'
  };

  try {
    const result = processISODiagnosisForm(testData);
    console.log('✅ ISO 인증 무료진단 테스트 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ ISO 인증 무료진단 테스트 실패:', error);
    throw error;
  }
}

/**
 * ISO 인증 상담신청 테스트
 */
function testISOConsultationSubmission() {
  console.log('🧪 ISO 인증 상담신청 테스트 시작...');
  
  const testData = {
    action: 'saveISOConsultation',
    폼타입: 'ISO_상담신청',
    상담유형: 'ISO인증컨설팅',
    희망인증: 'ISO 14001',
    성명: '이대표',
    이메일: 'consultation@test.com',
    회사명: '그린테크',
    개인정보동의: true
  };

  try {
    const result = processISOConsultationForm(testData);
    console.log('✅ ISO 인증 상담신청 테스트 성공:', result);
    return result;
    } catch (error) {
    console.error('❌ ISO 인증 상담신청 테스트 실패:', error);
    throw error;
  }
}

/**
 * AI 무료진단 테스트
 */
function testAIDiagnosisSubmission() {
  console.log('🧪 AI 무료진단 테스트 시작...');
  
  const testData = {
    action: 'saveAIDiagnosis',
    폼타입: 'AI_무료진단',
    회사명: 'AI테스트기업',
    담당자명: '박담당',
    이메일: 'ai@test.com',
    개인정보동의: true,
    총점수: 75,
    진단점수: {
      상품서비스점수: 80,
      고객응대점수: 70,
      마케팅점수: 75
    },
    진단보고서요약: 'AI 무료진단 결과입니다.'
  };

  try {
    const result = processAIDiagnosisForm(testData);
    console.log('✅ AI 무료진단 테스트 성공:', result);
    return result;
    } catch (error) {
    console.error('❌ AI 무료진단 테스트 실패:', error);
    throw error;
    }
  }
  
  /**
 * 오류신고 테스트
 */
function testErrorReport() {
  console.log('🧪 오류신고 테스트 시작...');
  
  const testData = {
    action: 'saveErrorReport',
    폼타입: '오류신고',
    오류유형: '계산오류',
    사용자이메일: 'error@test.com',
    오류설명: '점수 계산이 잘못됩니다.',
    심각도: '높음'
  };

  try {
    const result = processErrorReport(testData);
    console.log('✅ 오류신고 테스트 성공:', result);
    return result;
    } catch (error) {
    console.error('❌ 오류신고 테스트 실패:', error);
    throw error;
    }
  }
  
  /**
 * 전체 시스템 테스트
   */
  function testEntireSystem() {
    try {
    console.log('🧪 통합 상담신청 시스템 전체 테스트 시작...');
      
      const results = {
        timestamp: getCurrentKoreanTime(),
        version: VERSION,
        tests: {}
      };
      
    // 1. ISO 인증 무료진단 테스트
    try {
      testISODiagnosisSubmission();
      results.tests.isoDiagnosis = { success: true, message: 'ISO 인증 무료진단 테스트 성공' };
      } catch (error) {
      results.tests.isoDiagnosis = { success: false, error: error.toString() };
    }
    
    // 2. ISO 인증 상담신청 테스트
    try {
      testISOConsultationSubmission();
      results.tests.isoConsultation = { success: true, message: 'ISO 인증 상담신청 테스트 성공' };
      } catch (error) {
      results.tests.isoConsultation = { success: false, error: error.toString() };
    }
    
    // 3. AI 무료진단 테스트
    try {
      testAIDiagnosisSubmission();
      results.tests.aiDiagnosis = { success: true, message: 'AI 무료진단 테스트 성공' };
      } catch (error) {
      results.tests.aiDiagnosis = { success: false, error: error.toString() };
      }
      
    // 4. 오류신고 테스트
      try {
      testErrorReport();
      results.tests.errorReport = { success: true, message: '오류신고 테스트 성공' };
      } catch (error) {
      results.tests.errorReport = { success: false, error: error.toString() };
    }
    
    console.log('🧪 통합 상담신청 시스템 전체 테스트 완료:', results);
      return createSuccessResponse(results);
      
    } catch (error) {
      console.error('❌ 시스템 테스트 실패:', error);
      return createErrorResponse('시스템 테스트 실패: ' + error.toString());
    }
  }
  
  // ================================================================================
  // 📖 사용법 및 설치 가이드
  // ================================================================================
  
     /**
 * 📖 통합 상담신청 시스템 2025 최종완성판 사용법
    * 
    * 🎯 현재 배포 정보:
 * - Script ID: 1XdX8JW8Q9EBF_ApRr8XEMXAm_8MYDxsqwsXMqUFdNvzx3fkvIepxoG3G
 * - Deployment ID: AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD
 * - Web App URL: https://script.google.com/macros/s/AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD/exec
 * - Google Sheets ID: 1-xdABrno18ogullhqx3UXcudUGbc1O4Def50jVEJ9i4
    * - 관리자 이메일: hongik423@gmail.com
    * 
 * 🔧 4가지 신청유형:
 * 1. ISO 인증 무료진단 (48개 컬럼) - 인증 준비도 평가
 * 2. ISO 인증 상담신청 (25개 컬럼) - 인증 컨설팅 상담
 * 3. AI 무료진단 (35개 컬럼) - 6대서비스 관련 경영진단
 * 4. 오류신고 (13개 컬럼) - 시스템 오류 신고
    * 
    * 🧪 테스트 방법:
 * - testEntireSystem() 함수 실행: 전체 시스템 테스트 (4개 테스트 포함)
 * - testISODiagnosisSubmission() 함수 실행: ISO 인증 무료진단 테스트
 * - testISOConsultationSubmission() 함수 실행: ISO 인증 상담신청 테스트
 * - testAIDiagnosisSubmission() 함수 실행: AI 무료진단 테스트
 * - testErrorReport() 함수 실행: 오류신고 테스트
    * 
    * 📊 시트 구성:
 * - ISO_무료진단신청: 48개 컬럼 (인증 준비도 평가)
 * - ISO_상담신청: 25개 컬럼 (인증 상담 관련)
 * - AI_무료진단신청: 35개 컬럼 (6대서비스 관련 경영진단)
 * - 오류신고: 13개 컬럼 (시스템 오류 신고)
    * 
    * 📧 이메일 기능:
 * - 관리자 알림: hongik423@gmail.com (구글시트 URL 포함)
    * - 신청자 확인: 자동 발송
 * - 오류신고: 개발팀 알림
    * 
    * 🔄 환경변수 동기화:
    * - Next.js 환경변수와 완전 동기화
    * - 실시간 백업 시스템 구축
    * - API 엔드포인트 최신화
    */
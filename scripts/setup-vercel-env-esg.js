#!/usr/bin/env node

/**
 * 🚀 ESG 인증원 Vercel 배포용 환경변수 설정 스크립트
 * 
 * 사용법:
 * 1. npm install -g vercel
 * 2. vercel login
 * 3. node scripts/setup-vercel-env-esg.js
 */

const { execSync } = require('child_process');

// 🔧 ESG 인증원 환경변수 설정 목록
const ENV_VARS = {
  // Google Gemini API 키 (AI 상담사 챗봇용)
  'GEMINI_API_KEY': 'AIzaSyAP-Qa4TVNmsc-KAPTuQFjLalDNcvMHoiM',
  
  // Google Apps Script 설정 (기존 M-CENTER 시스템 재사용)
  'NEXT_PUBLIC_GOOGLE_SCRIPT_URL': 'https://script.google.com/macros/s/AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD/exec',
  'NEXT_PUBLIC_GOOGLE_SCRIPT_ID': '1XdX8JW8Q9EBF_ApRr8XEMXAm_8MYDxsqwsXMqUFdNvzx3fkvIepxoG3G',
  'NEXT_PUBLIC_GOOGLE_SCRIPT_DEPLOYMENT_ID': 'AKfycbyXZxMH337s6RyVDYwDW0Y6YiXyavQ8onnUtBSJEP-6sjSrIIUd7FVrIt4Du2JVGjoD',
  
  // 통합 구글시트 설정 (기존 M-CENTER 시트 재사용)
  'NEXT_PUBLIC_GOOGLE_SHEETS_ID': '1-xdABrno18ogullhqx3UXcudUGbc1O4Def50jVEJ9i4',
  'NEXT_PUBLIC_GOOGLE_SHEETS_URL': 'https://docs.google.com/spreadsheets/d/1-xdABrno18ogullhqx3UXcudUGbc1O4Def50jVEJ9i4/edit?gid=0#gid=0',
  
  // ESG 인증원 관리자 설정 (통일된 이메일)
  'ESG_ADMIN_EMAIL': 'hongik423@gmail.com',
  'BETA_ADMIN_EMAIL': 'hongik423@gmail.com',
  'NEXT_PUBLIC_SUPPORT_EMAIL': 'hongik423@gmail.com',
  'NEXT_PUBLIC_COMPANY_EMAIL': 'hongik423@gmail.com',
  
  // ESG 인증원 앱 설정
  'NEXT_PUBLIC_APP_NAME': 'ESG 인증원',
  'NEXT_PUBLIC_APP_DESCRIPTION': 'ESG 인증 및 컨설팅 서비스',
  'NEXT_PUBLIC_COMPANY_NAME': 'ESG-인증원',
  'NEXT_PUBLIC_BASE_URL': 'https://esg-certificate.vercel.app',
  
  // 시스템 설정
  'NODE_ENV': 'production',
  'NEXT_PUBLIC_BETA_FEEDBACK_ENABLED': 'true',
  'AUTO_REPLY_ENABLED': 'true',
  
  // ESG 인증원 기능 설정
  'NEXT_PUBLIC_ESG_CONSULTATION_ENABLED': 'true',
  'NEXT_PUBLIC_ESG_CERTIFICATION_ENABLED': 'true',
  'NEXT_PUBLIC_ESG_AUDIT_ENABLED': 'true',
  'NEXT_PUBLIC_ESG_REPORT_ENABLED': 'true',
  
  // 배포 환경 설정
  'VERCEL_ENV': 'production',
  'NEXT_TELEMETRY_DISABLED': '1'
};

console.log('🚀 ESG 인증원 Vercel 환경변수 설정을 시작합니다...\n');

function execCommand(command) {
  try {
    const result = execSync(command, { encoding: 'utf8' });
    return { success: true, output: result.trim() };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function setEnvironmentVariable(key, value, environment = 'production') {
  console.log(`📝 ${key} 설정 중...`);
  
  try {
    const child = require('child_process').spawn('vercel', ['env', 'add', key, environment], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    // 값 입력
    child.stdin.write(value + '\n');
    child.stdin.end();
    
    return new Promise((resolve) => {
      let output = '';
      let error = '';
      
      child.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      child.stderr.on('data', (data) => {
        error += data.toString();
      });
      
      child.on('close', (code) => {
        if (code === 0) {
          console.log(`  ✅ ${key} 설정 완료`);
          resolve({ success: true });
        } else {
          console.log(`  ❌ ${key} 설정 실패:`, error);
          resolve({ success: false, error });
        }
      });
    });
  } catch (error) {
    console.log(`  ❌ ${key} 설정 실패:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  // 1. Vercel CLI 설치 확인
  const vercelCheck = execCommand('vercel --version');
  if (!vercelCheck.success) {
    console.log('❌ Vercel CLI가 설치되지 않았습니다.');
    console.log('💡 설치 방법: npm install -g vercel');
    process.exit(1);
  }
  
  console.log(`✅ Vercel CLI 확인됨: ${vercelCheck.output}\n`);
  
  // 2. 로그인 상태 확인
  const whoAmI = execCommand('vercel whoami');
  if (!whoAmI.success) {
    console.log('❌ Vercel에 로그인되지 않았습니다.');
    console.log('💡 로그인 방법: vercel login');
    process.exit(1);
  }
  
  console.log(`✅ Vercel 로그인 확인됨: ${whoAmI.output}\n`);
  
  // 3. 환경변수 설정
  console.log('🔧 ESG 인증원 환경변수 설정을 시작합니다...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [key, value] of Object.entries(ENV_VARS)) {
    const result = await setEnvironmentVariable(key, value);
    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // 잠시 대기 (API 제한 방지)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 4. 결과 요약
  console.log('\n📊 환경변수 설정 결과:');
  console.log(`  ✅ 성공: ${successCount}개`);
  console.log(`  ❌ 실패: ${failCount}개`);
  console.log(`  📋 전체: ${Object.keys(ENV_VARS).length}개\n`);
  
  if (failCount > 0) {
    console.log('⚠️  일부 환경변수 설정에 실패했습니다.');
    console.log('🔧 Vercel 대시보드에서 수동으로 설정해주세요.');
    console.log('🌐 https://vercel.com/dashboard\n');
  }
  
  // 5. 배포 안내
  console.log('🎉 ESG 인증원 환경변수 설정이 완료되었습니다!');
  console.log('');
  console.log('🔗 중요 링크:');
  console.log(`📊 Google Sheets: ${ENV_VARS.NEXT_PUBLIC_GOOGLE_SHEETS_URL}`);
  console.log('🌐 Vercel 대시보드: https://vercel.com/dashboard');
  console.log('📧 관리자 이메일: hongik423@gmail.com');
  console.log('');
  console.log('🚀 다음 단계:');
  console.log('1. 배포 확인: vercel ls');
  console.log('2. 도메인 설정 (선택사항)');
  console.log('3. ESG 인증 상담 시스템 테스트');
  console.log('4. 문서 다운로드 기능 테스트');
}

// 스크립트 실행
main().catch(error => {
  console.error('❌ 스크립트 실행 중 오류 발생:', error);
  process.exit(1);
}); 
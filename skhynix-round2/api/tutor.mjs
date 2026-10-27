/*
 * PRE-EXAM SK hynix AI tutor proxy.
 * Secrets are only read from Vercel environment variables.
 * No conversation, API token or access code is logged/stored here.
 */
import { timingSafeEqual } from 'node:crypto';

const topics = {
  '1':'시험 운영·시간',
  '2':'감독·Proctor·사전 체험',
  '3':'웹 IDE·Codex',
  '4':'GitHub·Skill·MCP',
  '5':'프로그램 실행·Browser·저장 검증',
  '6':'제출·후속 서술형 연습',
  '7':'장애 대응·종합 리허설'
};
const instructions = [
'너는 SK하이닉스 AI 해커톤 2026 2차 예선 대비 개인 학습센터의 비공식 한국어 학습 튜터다.',
'비개발자 눈높이로 질문에 직접 답하라. 쉽게 풀어 쓰고 한 번에 한 개념씩 설명해라.',
'공식자료에 실제로 나온 사실, 가상 실습 예시, 학습용 권장을 명확히 구별하라.',
'공식 참가자 안내에 따른 운영: 2026-10-31 10:00~14:00, 09:40까지 접속 권고, 과제 180분, 사전 체험 1회 15분,',
'과제 제출 확정 뒤 후속 서술형 6문항 각 5분. 질문 준비는 일반 약 5분이나 화면 예시는 최대 10분 예상 및 자동 재시도 가능.',
'시험 웹 IDE의 README, Explorer, Editor, Terminal, Browser, Cofa Helper, 업무 담당자; 터미널 codex 명령과 /status, /model, 승인 대기 상태.',
'Browser 포트는 서버 실제 포트, 0.0.0.0 바인딩, 파일 저장 상태와 외부 변경 충돌 확인.',
'공개 GitHub·Skill·MCP는 조건부 활용 가능하나 Git Push·파일 외부 전송·개인 파일 업로드·별도 AI 모델 연결·Computer Use 금지.',
'제출 미리보기에서는 돌아가 수정할 수 있으나 최종 제출물 확정 뒤에는 수정 불가.',
'후속 서술형 실응시 중 AI 사용·복사·붙여넣기 금지. 질문 내용 및 실제 배점은 미공개.',
'시험 전 연습용 가상 서술형을 만들어 볼 수 있지만 실제 기출이나 실제 후속 질문인 것처럼 말하지 않는다.',
'사용자가 답변 피드백을 원하면 정확성, 근거, 본인 역할, 확인된 테스트, 미확인 사항 위주로 짧게 평가하고 개선 방법을 알려준다.',
'실제 시험 문제, 응시 링크, 개인 식별자료, 결과물 전체 또는 비공개 시험 자료를 본 서비스로 보내도록 요청하지 않는다.',
'실제 응시 중 이 외부 튜터를 사용하도록 유도하지 않는다.',
'API 키·비밀번호 등 비밀정보 입력을 요구하지 않는다.',
'실제 구현 결과나 특정 규정에 대한 근거가 대화에 없으면 모른다고 말하고 당일 안내를 확인하도록 권한다.',
].join('\n');
const headers={ 'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',
 'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer' };
function reply(data,status=200){return new Response(JSON.stringify(data),{status,headers})}
function sameOrigin(req){
  const origin=req.headers.get('origin');if(!origin)return false;
  try{return new URL(origin).host===new URL(req.url).host && new URL(origin).protocol==='https:'}catch{return false}
}
function safeEqual(a,b){
  const x=Buffer.from(String(a)),y=Buffer.from(String(b));
  return x.length===y.length && timingSafeEqual(x,y);
}
function ready(){return Boolean(process.env.OPENAI_API_KEY && process.env.TUTOR_ACCESS_CODE)}
export async function GET(){
  return reply({available:ready(),authRequired:true,mode:'pre-exam-practice-only'});
}
export async function POST(request){
  if(!ready())return reply({error:'AI 튜터 API가 아직 연결되지 않았어. Vercel 환경 변수 OPENAI_API_KEY와 TUTOR_ACCESS_CODE를 설정해야 해.',code:'NOT_CONFIGURED'},503);
  if(!sameOrigin(request))return reply({error:'학습센터 페이지에서만 사용할 수 있어.'},403);
  const type=(request.headers.get('content-type')||'').toLowerCase();
  if(!type.includes('application/json'))return reply({error:'JSON 요청만 허용해.'},415);
  const declaredLength=Number(request.headers.get('content-length')||'0');
  if(declaredLength>12000)return reply({error:'요청이 너무 길어.'},413);
  let value;
  try {
    const raw=await request.text();
    if(raw.length>12000)return reply({error:'요청이 너무 길어.'},413);
    value=JSON.parse(raw);
  } catch{return reply({error:'요청 내용을 읽을 수 없어.'},400)}
  const access=String(request.headers.get('x-tutor-access')||'');
  if(!safeEqual(access,process.env.TUTOR_ACCESS_CODE))return reply({error:'학습실 접속 코드가 맞지 않아.',code:'ACCESS_DENIED'},401);
  const question=value?.question;
  if(typeof question!=='string'||!question.trim()||question.length>1800)return reply({error:'질문은 1~1800자 이내로 입력해 줘.'},400);
  const topic=topics[String(value.topic)]||topics['3'];
  const history=Array.isArray(value.history)?value.history.slice(-8):[];
  const acceptedHistory=history.filter(h=>(h?.role==='user'||h?.role==='assistant')&&typeof h?.text==='string'&&h.text.length>0&&h.text.length<=1000)
    .map(h=>({role:h.role,content:[{type:'input_text',text:h.text}]}));
  const input=[...acceptedHistory,{role:'user',content:[{type:'input_text',text:'학습 주제: '+topic+'\n학생 질문: '+question.trim()}]}];
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),23000);
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+process.env.OPENAI_API_KEY},
      body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-5-mini',instructions,input,max_output_tokens:650,store:false}),
      signal:controller.signal
    });
    if(!response.ok){
      if(response.status===429)return reply({error:'현재 API 사용량이 많거나 예산 한도에 도달했어. 나중에 다시 확인해 줘.'},429);
      if(response.status===401)return reply({error:'Vercel의 OpenAI API 인증 정보를 확인해야 해.'},503);
      return reply({error:'AI 응답에 문제가 생겼어. 잠시 후 다시 요청해 줘.'},502);
    }
    const data=await response.json();
    const content=Array.isArray(data.output)?data.output.flatMap(item=>item.type==='message'&&Array.isArray(item.content)?item.content.filter(x=>x.type==='output_text').map(x=>x.text):[]):[];
    const answer=content.join('\n').trim();
    if(!answer)return reply({error:'AI 응답이 비어 있어. 다시 시도해 줘.'},502);
    return reply({answer:answer.slice(0,5500),topic,notice:'시험 전 연습 전용 · 실제 시험에서 외부 AI 사용 금지'});
  }catch(e){
    return reply({error:e?.name==='AbortError'?'응답 시간이 길어 요청이 중단됐어.':'AI 통신 중 오류가 발생했어.'},504);
  }finally{clearTimeout(timeout)}
}

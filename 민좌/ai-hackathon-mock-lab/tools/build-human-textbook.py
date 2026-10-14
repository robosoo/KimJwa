"""Build the human-centered practice volume; optionally append the prior food guide.

Requires reportlab, pypdf and NotoSansKR-Regular/Bold.ttf in --font-dir.
"""
import argparse
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether,
)
from reportlab.platypus.tableofcontents import TableOfContents
from pypdf import PdfReader, PdfWriter

args=argparse.ArgumentParser()
args.add_argument('--font-dir',required=True)
args.add_argument('--base-pdf')
args.add_argument('--output',required=True)
cfg=args.parse_args()
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'data/practical-sessions.json').read_text())
arith=json.loads((ROOT/'data/literacy-arithmetic-check.json').read_text())
for name,file in [('KR','NotoSansKR-Regular.ttf'),('KR-Bold','NotoSansKR-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(Path(cfg.font_dir)/file)))
pdfmetrics.registerFontFamily('KR',normal='KR',bold='KR-Bold')
INK=colors.HexColor('#17324b');TEAL=colors.HexColor('#087f78')
MUTED=colors.HexColor('#53687c');LINE=colors.HexColor('#d7e3e8')
PAGE_W,PAGE_H=A4;WIDTH=PAGE_W-100
styles={
 'body':ParagraphStyle('Body',fontName='KR',fontSize=11.5,leading=18.8,textColor=INK,wordWrap='CJK',spaceAfter=10),
 'small':ParagraphStyle('Small',fontName='KR',fontSize=9.4,leading=15.2,textColor=MUTED,wordWrap='CJK',spaceAfter=8),
 'chapter':ParagraphStyle('Chapter',fontName='KR-Bold',fontSize=25,leading=36,textColor=INK,wordWrap='CJK',spaceAfter=18,keepWithNext=True),
 'h2':ParagraphStyle('H2',fontName='KR-Bold',fontSize=16,leading=24,textColor=TEAL,wordWrap='CJK',spaceBefore=14,spaceAfter=9,keepWithNext=True),
 'h3':ParagraphStyle('H3',fontName='KR-Bold',fontSize=12.4,leading=20,textColor=INK,wordWrap='CJK',spaceBefore=10,spaceAfter=7,keepWithNext=True),
 'table':ParagraphStyle('Table',fontName='KR',fontSize=9.6,leading=15.1,textColor=INK,wordWrap='CJK'),
 'tablehead':ParagraphStyle('TableHead',fontName='KR-Bold',fontSize=9.6,leading=15.1,textColor=INK,wordWrap='CJK'),
 'prompt':ParagraphStyle('Prompt',fontName='KR',fontSize=10.5,leading=17.6,textColor=INK,wordWrap='CJK',spaceAfter=12,borderPadding=13,backColor=colors.HexColor('#eff7f5')),
 'code':ParagraphStyle('Code',fontName='KR',fontSize=8.6,leading=13.3,textColor=INK,wordWrap='CJK',spaceAfter=2),
 'cover':ParagraphStyle('Cover',fontName='KR-Bold',fontSize=35,leading=49,textColor=INK,wordWrap='CJK',spaceAfter=20),
 'tag':ParagraphStyle('Tag',fontName='KR-Bold',fontSize=10.5,leading=17,textColor=TEAL,spaceAfter=12),
}
def p(text,style='body'):
    return Paragraph(escape(str(text)).replace('\n','<br/>'),styles[style])
class Heading(Paragraph):
    def __init__(self,text,key,level=0):
        super().__init__(escape(text),styles['chapter' if level==0 else 'h2'])
        self.bookmark_key=key;self.level=level;self.title=text
class Book(BaseDocTemplate):
    def afterFlowable(self,f):
        if isinstance(f,Heading):
            self.canv.bookmarkPage(f.bookmark_key)
            self.canv.addOutlineEntry(f.title,f.bookmark_key,level=f.level,closed=False)
            if f.level==0:self.notify('TOCEntry',(0,f.title,self.page,f.bookmark_key))
def decorate(c,doc):
    c.saveState();c.setStrokeColor(LINE);c.line(50,44,PAGE_W-50,44)
    c.setFont('KR',8);c.setFillColor(MUTED)
    c.drawString(50,30,'사람이 푸는 AI 평가 | 실제 체험과 검증 수업')
    c.drawRightString(PAGE_W-50,30,str(doc.page));c.restoreState()
def tab(headers,rows,widths=None):
    vals=[[p(x,'tablehead') for x in headers]]+[[p(x,'table') for x in row] for row in rows]
    t=Table(vals,colWidths=widths or [WIDTH/len(headers)]*len(headers),repeatRows=1,hAlign='LEFT')
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),colors.HexColor('#eaf3f6')),
        ('GRID',(0,0),(-1,-1),.4,LINE),('VALIGN',(0,0),(-1,-1),'TOP'),
        ('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),
        ('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9),
    ]));return t
def note(text):
    t=Table([[p(text)]],colWidths=[WIDTH]);t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#eff7f5')),
        ('LEFTPADDING',(0,0),(-1,-1),14),('RIGHTPADDING',(0,0),(-1,-1),14),
        ('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),4),
    ]));return t
story=[]
def add(text,style='body'):story.append(p(text,style))
def chapter(title,key):story.extend([PageBreak(),Heading(title,key)])
def prose(text):
    for piece in str(text).split('\n\n'):add(piece)
def rich_answer(text):
    in_code=False
    for line in text.splitlines():
        if line.startswith('```'):
            in_code=not in_code
            story.append(Spacer(1,7));continue
        if not line.strip():story.append(Spacer(1,5));continue
        if in_code:
            story.append(Paragraph(escape(line).replace(' ','&nbsp;'),styles['code']));continue
        if line.startswith('|'):
            if re.fullmatch(r'[|:\- ]+',line):continue
            add(' | '.join(x.strip() for x in line.strip('|').split('|')),'small');continue
        if line.startswith('# '):add(line[2:],'h2')
        elif line.startswith('## '):add(line[3:],'h3')
        else:add(line.replace('**',''))

story.extend([Spacer(1,45),p('실제 기록을 따라 배우는 5과제 통합 강의서','tag'),
 p('사람이 푸는\nAI 활용평가','cover'),
 p('AI에게 맡길 일과\n내가 확인할 일을 나눠봅시다.','h2'),Spacer(1,22)])
add('간식 설문 · 구독 비용 · AI 리터러시 · 주문 API\n그리고 식품·화장품 규정 위반 식별 실전 해설')
story.append(note('이 교재의 중심은 정답 암기가 아닙니다. 처음 읽을 곳, 파일 선택의 이유, 실제 질문, AI의 오류, 사람이 확인할 원문을 연결해 설명합니다.'))
story.append(Spacer(1,25))
add('2026년10월14일 공식 공개 체험 기록\n실제 질문 전문 · 답안 · 토큰 배분 · 채점 확인 범위','small')
add('서술형의 통과 팝업은 수치 품질 점수와 구분했습니다. 인간 단독 응시 시간이나 합격 가능성을 검증한 실험은 아닙니다.','small')
chapter('차례','contents')
toc=TableOfContents();toc.levelStyles=[ParagraphStyle('TOC',fontName='KR',fontSize=12,leading=23,textColor=INK,spaceBefore=6)]
story.append(toc);story.append(Spacer(1,25))
add('읽는 방법','h2')
add('처음에는 각 과제의 “사람의 풀이”를 읽으세요. 다음으로 실제 프롬프트를 보고 왜 그 파일과 지시가 필요했는지 비교합니다. 마지막에 직접 확인 표와 제출 결과를 읽으면, AI의 잘못된 응답을 정답처럼 외우는 일을 피할 수 있습니다.')
add('전체 AI 응답은 웹 해설에서 펼쳐볼 수 있습니다. 이 PDF에는 실제 질문 전문과 응답의 핵심 오류·수정 이유를 담았습니다.','small')
story.append(Paragraph('<link href="https://skhynix-ai-hackathon-quiz.vercel.app/human-practice-guide.html" color="#087f78">웹에서 실제 질문·응답과 첨부 조합 살펴보기 →</link>',styles['body']))

chapter('1. 사람이 주도하는 풀이의 기준','human-principles')
prose(data['common']['lead'])
for i,item in enumerate(data['common']['principles'],1):
    add(f'{i}. {item["title"]}','h2');prose(item['body'])
story.append(tab(['구분','확인할 범위','이유'],data['common']['verificationLevels'],[75,225,WIDTH-300]))
add('이번 실행에서 확인한 결과','h2')
rows=[['식품·화장품','400/400','9회 · 1회 잔여','47개 · 114,857토큰']]
for c in data['cases']:
    grade=f'{c["grading"]["score"]}/{c["grading"]["maxScore"]}' if c['grading']['score'] is not None else '제출·통과 확인'
    rows.append([c['lesson']['short'],grade,f'{c["used"]}회 · {c["remaining"]}회 잔여',f'{len(c["files"])}개 · {c["distinctTokens"]:,}토큰'])
story.append(tab(['과제','실제 결과','질문 사용','고유 첨부 용량'],rows,[90,105,115,WIDTH-310]))
add('각 체험에서 처음 표시된 질문 한도는10회였습니다. 실제 시험의 한도·허용 도구는 출제 설정과 시험 공지에 따라 확인해야 합니다. 리터러시는 전송5회 중 일시 오류1회가 차감되지 않아 사용4회였습니다.','small')
add('Context Window를 첨부 한도와 혼동하지 않습니다','h2');prose(data['common']['memory'])
prose(data['common']['submission'])

for ci,c in enumerate(data['cases'],2):
    l=c['lesson'];slug=c['id']
    chapter(f'{ci}. {l["short"]} 실전 수업',slug)
    add(l['subtitle'],'h2');prose(l['opening'])
    story.append(tab(['질문·섹션','무엇을 구하는가','확인할 근거'],l['mapping'],[75,180,WIDTH-255]))
    if l.get('questions'):
        story.append(PageBreak());story.append(Heading('문항을 하나씩 따라 풀기',slug+'-questions',1))
        for q in l['questions']:
            add(f"{q['number']}번. {q['title']}",'h2')
            add('먼저 읽을 조건과 자료','h3');prose(q['read'])
            add('AI에 맡길 작업','h3');prose(q['delegate'])
            add('사람이 확인할 원문과 계산','h3');prose(q['verify'])
            story.append(note('실제 제출 답: '+q['answer']+'\n'+q['why']))
    add('파일은 왜 이렇게 골랐을까요?','h2');prose(l['selection'])
    add('시험 화면에서 찾을 파일','h2')
    add('사람이 읽기 쉬운 이름을 먼저 표시했습니다. 바로 아래 실제 파일명으로 시험 화면의 파일과 대조할 수 있습니다. 토큰은 화면 표시값입니다.','small')
    for f in c['files']:
        story.append(KeepTogether([p(f'파일 {f["number"]}. {f["label"]}  |  {f["format"]} · {f["tokens"]:,}토큰','h3'),p(f['name'],'small')]))
    for si,s in enumerate(l['steps'],1):
        add(f'풀이 {si}. {s[0]}','h2');prose(s[1]);
        add('AI에 맡길 일','h3');prose(s[2]);add('사람이 확인할 일','h3');prose(s[3])
    story.append(PageBreak());story.append(Heading('직접 확인할 원문과 실제 오류',slug+'-verify',1))
    story.append(tab(['확인 지점','어디를 보는가','확인 기준'],l['mustCheck'],[85,175,WIDTH-260]))
    for ei,e in enumerate(c['errors'],1):
        add(f'실제 검토 {ei}','h3')
        if isinstance(e,str):prose(e)
        else:
            for k in ['issue','humanCheck','sourceCheck','correction','lesson','method']:
                if e.get(k):prose(e[k])
    if slug=='literacy':
        add('수치 검산을 사람이 재현하는 방법','h2')
        add('이번 실행은 화면14행을 직접 전사한 수치로 별도 산술 스크립트를 사용했습니다. 원자료를 내려받거나 PDF를 일괄 파싱한 계산은 아닙니다. 사람이 계산기 또는 허용된 스프레드시트로 같은 산식을 재현할 수 있지만 해당 시험에서 도구 사용이 허용되는지는 확인 불가입니다. 내장AI만으로 검증을 끝냈다고 주장하지 않습니다.')
        add('예를 들어 컴퓨터공학 사후 곱합은120×81.2+95×84.5=17,771.5입니다. 예술·디자인은60×58.5+50×61=6,560입니다. 각 학과의 곱합을 더하고 인원1,235로 나눕니다.')
        story.append(tab(['학과','인원','사후 곱합','사후 평균','75 미달 가중기여p'],[[d['department'],d['n'],f'{d["sumPost"]:,.1f}',f'{d["post"]:.4f}',f'{d["shortfallContribution"]:.4f}'] for d in arith['departments']],[105,50,105,100,WIDTH-360]))
        story.append(note('Σn=1,235, Σ(n×사전)=63,070, Σ(n×사후)=84,804. 전체51.0688→68.6672(+17.5984). 가중 부족기여의 합6.3328=75−68.6672입니다. 기여도는 목표 부족분의 산술 분해이며 원인의 인과 기여율이 아닙니다.'))
    story.append(PageBreak());story.append(Heading('실제 질문 전문과 첨부 배분',slug+'-prompts',1))
    add('이후 페이지는 실제 입력한 질문입니다. 실패한 시도와 잘못된 초기 전제도 수정하지 않고 남겼습니다. 응답 전체와 오류 내용은 웹 해설에서 함께 볼 수 있습니다.','small')
    for ri,r in enumerate(c['logs']):
        if ri:story.append(PageBreak())
        story.append(Heading(f'{l["short"]} · 실제 전송 {r["round"]}회차',f'{slug}-round-{r["round"]}',1))
        add(l['roundGoals'][ri] if ri<len(l['roundGoals']) else '최종 검증과 보완','h3')
        add(f'질문 {r["chars"]}/1,000자 · 첨부 {r["tokens"]:,}/20,000토큰 · 파일 {len(r["fileNumbers"])}개','tag')
        add('첨부: '+' / '.join(c['files'][n-1]['label'] for n in r['fileNumbers']),'small')
        if r['serviceError']:add('실제 결과: 일시 오류. 이 시도는 질문 횟수가 차감되지 않았습니다.','small')
        if r['outputTruncated']:add('실제 결과: 답변이 출력 한도에 도달해 중단됐습니다. 이후 검증과 작성 범위를 나누었습니다.','small')
        story.append(p(r['prompt'],'prompt'))
        add('질문을 보내기 전 점검','h3')
        add('첨부 파일과 질문의 대상이 일치하는지, 이번 질문만으로 적용 기준을 알 수 있는지, 답을 검토할 중간 근거를 요청했는지 확인합니다. 파일이 이미 대화에 보인다는 이유로 원문 전체가 다음 질문에서도 유지된다고 가정하지 않습니다.','small')
    story.append(PageBreak());story.append(Heading('최종 답안과 실제 결과',slug+'-result',1))
    prose(l['result'])
    if c['grading'].get('note'):story.append(note(c['grading']['note']))
    answer=c['finalAnswer']
    if isinstance(answer,list):
        story.append(tab(['문항','제출 답안','근거'],[[f'{a.get("q",a.get("question"))}번',f'보기{a["option"]} · {a["answer"]}' if a.get('option') else a['answer'],a.get('reason','앞선 검증표 참고')] for a in answer],[45,115,WIDTH-160]))
    else:rich_answer(answer)
    add('다음에는 어떻게 더 효율적으로 풀까요?','h2');prose(l['efficiency'])

chapter('6. 다음 실전에 가져갈 프롬프트','next-practice')
add('아래는 실제 실행 중 발견한 오류를 반영한 개선 제안입니다. 아래 문장을 그대로 사용해 더 적은 질문으로 다시 성공했음을 검증한 것은 아닙니다. 실제 사용 질문과 혼동하지 마세요.')
for c in data['cases']:
    add(c['lesson']['short']+' · 개선 템플릿','h2');story.append(p(c['lesson']['improvedPrompt'],'prompt'))
add('제출 직전의 다섯 가지 질문','h2')
for q in ['지금 답한 번호가 실제 시험 문항 번호와 같은가?','누락된 대상·다음 페이지·예외 조건은 없는가?','결론을 바꾸는 원문 위치와 숫자 계산을 확인했는가?','사실·정적 추론·제안·미확인을 구분했는가?','개인정보·응답 형식·금지된 변경·실행하지 않은 테스트 주장을 점검했는가?']:
    add('- '+q)
add('맞는 답과 설명의 정확성을 함께 확인합니다. 질문 수를 줄이는 일도 중요하지만, 잘못된 근거를 확신 있게 제출하지 않는 것이 먼저입니다.')

chapter('7. 식품·화장품 실전 해설 이어 읽기','food-appendix')
add('다음부터는 앞서 완성한40쪽 식품·화장품 강의서를 원래 레이아웃으로 이어 붙였습니다.47개 PDF114,857토큰을9회 질문으로 나눈 실제 파일 조합, 기준문 압축, 기억 검증, 예외 조건과400점 채점 결과를 담고 있습니다.')
add('뒤에 이어지는 해설의 쪽수는 원래40쪽 기준으로 표시됩니다. PDF 책갈피로 각 과제와 실제 질문 회차를 바로 찾을 수 있습니다.','small')
add('출처와 확인 범위','h2')
add('공식 공개 체험: https://school.programmers.co.kr/ai-assessment/preview\n실행 기록:2026년10월14일. 본 교재의 결과는 해당 체험의 문서와 화면을 기준으로 합니다. 실제 법령·서비스 가격·제품 운영 현황에 대한 일반 자문이나 실제 시험 기출 보증으로 사용하지 않습니다.','small')
add('자료 읽기와 전수 추출은AI Assist, 원문 화면 확인과 산술 검산·최종 편집은 보조 AI가 수행한 기록입니다. 인간이 수행할 수 있는 절차와 실제 자동화 보조를 구분해 설명했습니다.','small')

output=Path(cfg.output);output.parent.mkdir(parents=True,exist_ok=True)
part=output.with_name('human_practice_part.tmp.pdf')
doc=Book(str(part),pagesize=A4,leftMargin=50,rightMargin=50,topMargin=48,bottomMargin=60,title='사람이 푸는 AI 활용평가 실전 강의서',author='공식 체험 기반 비공식 학습 해설')
frame=Frame(50,60,WIDTH,PAGE_H-108,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
doc.addPageTemplates([PageTemplate(id='book',frames=[frame],onPage=decorate)])
doc.multiBuild(story)
writer=PdfWriter();writer.append(str(part),import_outline=True)
new_pages=len(PdfReader(str(part)).pages)
if cfg.base_pdf:writer.append(cfg.base_pdf,outline_item='식품·화장품 규정 위반 식별 | 기존40쪽 해설',import_outline=True)
writer.add_metadata({'/Title':'사람이 푸는 AI 활용평가 | 5과제 실전 강의서','/Author':'공식 체험 기반 비공식 학습 해설','/Subject':'사람의 판단·파일선택·실제프롬프트·비판검증·토큰배분·실제제출결과'})
with output.open('wb') as stream:writer.write(stream)
print(json.dumps({'newPages':new_pages,'totalPages':len(writer.pages),'bytes':output.stat().st_size,'output':str(output)},ensure_ascii=False))
